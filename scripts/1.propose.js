const { ethers } = require("hardhat")
const { getContracts } = require("./utils")
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils;

require("dotenv").config();

// async function getContracts() {
//     if (!process.env.GOVERNOR_CONTRACT_ADDRESS && process.env.TOKEN_CONTRACT_ADDRESS) {
//         throw Error("Need to define both GOVERNOR_CONTRACT_ADDRESS && TOKEN_CONTRACT_ADDRESS in .env")
//     }
//     const governor = await ethers.getContractAt("MyGovernor", process.env.GOVERNOR_CONTRACT_ADDRESS);
//     const token = await ethers.getContractAt("MyToken", process.env.TOKEN_CONTRACT_ADDRESS);
//
//     if (!governor.address && token.address) {
//         throw new Error("Cannot get contracts for governor and token");
//     }
//     return { governor, token };
// }

async function propose() {
    // const deployValues = await deployFixture();
    const [owner] = await ethers.getSigners();
    const { governor, token } = await getContracts();

    const tx = await governor.propose(
        [token.address],
        [0],
        [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
        "Give the owner more tokens!"
    );
    const receipt = await tx.wait();
    const event = receipt.events.find(x => x.event === 'ProposalCreated');
    const { proposalId } = event.args;

    // wait for the 1 block voting delay
    // await hre.network.provider.send("evm_mine");

    // return { ...deployValues, proposalId }

    console.log(`proposalId: ${proposalId}`)
}

propose().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
