# Hardhat Upgrades

This repo shows how to use a proxy to upgrade a smart contract to different versions.

## Quickstart

```sh
git clone https://github.com/Trigii/hardhat-upgrades
cd hardhat-upgrades-fcc
yarn
```

## Usage

Deploy:

```sh
yarn hardhat deploy
```

### Testing

```sh
yarn hardhat test
```

### Test Coverage

```sh
yarn hardhat coverage
```

## Deploy to a development chain and Upgrade

1. Create a hardhat node to deploy the contracts

```sh
yarn hardhat nod
```

2. On a different terminal, run the upgrade script to perform the upgrade

```sh
yarn hardhat run scripts/upgrade-box.js --network localhost
```
