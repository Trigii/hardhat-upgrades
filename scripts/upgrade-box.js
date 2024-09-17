const { ethers } = require('hardhat');

// manual way
async function main() {
    const boxProxyAdmin = await ethers.getContract('BoxProxyAdmin'); // get the proxy admin contract
    const transparentProxy = await ethers.getContract('Box_Proxy'); // get the actual proxy

    // check current implementation version
    const proxyBoxV1 = await ethers.getContractAt('Box', transparentProxy.target); // load the first version at the transparent proxy address (this means: we are going to call all the functions on the transparent proxy address but the proxybox instance is going to have the abi of Box contract)
    const versionV1 = await proxyBoxV1.version();
    console.log(`Old version: ${versionV1}`);

    // upgrade
    const boxV2 = await ethers.getContract('BoxV2'); // get the version 2 of the implementation contract
    const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.target, boxV2.target); // we call the upgrade function on the proxy admin, which calls the transparent proxy, which will change the implementation from box to boxv2
    await upgradeTx.wait(1);

    // check new implementation version
    const proxyBoxV2 = await ethers.getContractAt('BoxV2', transparentProxy.target); // load the second version at the transparent proxy address (this means: we are going to call all the functions on the transparent proxy address but the proxybox instance is going to have the abi of BoxV2 contract)
    const versionV2 = await proxyBoxV2.version();
    console.log(`New version: ${versionV2}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
