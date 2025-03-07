const { network } = require('hardhat');
const { developmentChains } = require('../helper-hardhat-config');
const { verify } = require('../utils/verify');

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log('----------------------------');
    const boxv2 = await deploy('BoxV2', {
        from: deployer,
        log: true,
        args: [],
        waitConfirmations: network.config.blockConfirmations,
    });

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(boxv2.address, args);
    }
    log('----------------------------');
};
