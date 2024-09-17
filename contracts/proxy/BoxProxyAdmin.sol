// admin contract for controling the proxy of our box
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.8;

import '@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol';

contract BoxProxyAdmin is ProxyAdmin {
    constructor(address /*initialOwner*/) ProxyAdmin() {}
}
