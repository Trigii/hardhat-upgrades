const { network } = require('hardhat');
const { developmentChains } = require('../helper-hardhat-config');
const { verify } = require('../utils/verify');

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log('----------------------------');
    const box = await deploy('Box', {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations,
        // we are going to use openzeppelin proxy
        proxy: {
            proxyContract: 'OpenZeppelinTransparentProxy',
            // instead of having an admin address for the proxy contract, we are going to have a proxy contract owned by an admin contract
            viaAdminContract: {
                name: 'BoxProxyAdmin',
                artifact: 'BoxProxyAdmin',
            },
        },
    });

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(box.address, args);
    }
    log('----------------------------');
};
