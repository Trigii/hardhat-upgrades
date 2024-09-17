// any contract that calls this proxy contract, if its not the "setImplementation" function its going to pass the call to whatever is inside the _IMPLEMENTATION_SLOT address
// We are overriding the Proxy contract from openzeppelin. This contract what it does is: if someone calls the Proxy with a function that is not defined inside the contract, it will call the fallback function that calls the delegateCall
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/proxy/Proxy.sol";

contract SmallProxy is Proxy {
    // This is the keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1
    bytes32 private constant _IMPLEMENTATION_SLOT =
        0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

    // function that sets to the current implementation (like setting the current version).
    /**
     *
     * @param newImplementation contract address of the new implementation
     */
    function setImplementation(address newImplementation) public {
        assembly {
            sstore(_IMPLEMENTATION_SLOT, newImplementation)
        }
    }

    function _implementation()
        internal
        view
        override
        returns (address implementationAddress)
    {
        assembly {
            implementationAddress := sload(_IMPLEMENTATION_SLOT)
        }
    }

    // helper function called by the user to get the function hash and be able to call the function using the low level calldata interaction
    // When the user calls the function using the hash, The proxy will try to call setValue(uint256) with the number, but the proxy wont see any function like this so it will delegate the call to the current implementation
    function getDataToTransact(
        uint256 numberToUpdate
    ) public pure returns (bytes memory) {
        return abi.encodeWithSignature("setValue(uint256)", numberToUpdate); // call the function
    }

    // reads the storage in index 0
    // in this contract we dont have any variable in storage 0 but it doesent matter. When it delegates the call and updates the value from the ImplementationA/B, it will store the result in the storage 0
    function readStorage()
        public
        view
        returns (uint256 valueAtStorageSlotZero)
    {
        assembly {
            valueAtStorageSlotZero := sload(0) // reading directly from storage
        }
    }
}

// smallProxy -> ImplementationA (delegate call to ImplementationA and save the storage in the smallProxy address)
contract ImplementationA {
    uint256 public value;

    function setValue(uint256 newValue) public {
        value = newValue;
    }
}

contract ImplementationB {
    uint256 public value;

    function setValue(uint256 newValue) public {
        value = newValue + 2;
    }
}

// function setImplementation(){}
// Transparent Proxy -> Ok, only admins can call functions on the proxy
// anyone else ALWAYS gets sent to the fallback contract.

// UUPS -> Where all upgrade logic is in the implementation contract, and
// you can't have 2 functions with the same function selector.
