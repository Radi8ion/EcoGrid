const hre = require("hardhat");

async function main() {
    // Deploy EnergyToken contract
    const EnergyToken = await hre.ethers.getContractFactory("EnergyToken");
    const energyToken = await EnergyToken.deploy();
    await energyToken.waitForDeployment(); // Wait for the contract to be deployed
    console.log("EnergyToken deployed to:", energyToken.target);

    // Deploy EnergyTrading contract
    const EnergyTrading = await hre.ethers.getContractFactory("EnergyTrading");
    const energyTrading = await EnergyTrading.deploy(energyToken.target);
    await energyTrading.waitForDeployment(); // Wait for the contract to be deployed
    console.log("EnergyTrading deployed to:", energyTrading.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});