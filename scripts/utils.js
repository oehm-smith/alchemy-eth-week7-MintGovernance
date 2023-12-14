const { ethers } = require("hardhat")
require("dotenv").config();

export async function getContracts() {
    if (!process.env.GOVERNOR_CONTRACT_ADDRESS && process.env.TOKEN_CONTRACT_ADDRESS) {
        throw Error("Need to define both GOVERNOR_CONTRACT_ADDRESS && TOKEN_CONTRACT_ADDRESS in .env")
    }
    const governor = await ethers.getContractAt("MyGovernor", process.env.GOVERNOR_CONTRACT_ADDRESS);
    const token = await ethers.getContractAt("MyToken", process.env.TOKEN_CONTRACT_ADDRESS);

    if (!governor.address && token.address) {
        throw new Error("Cannot get contracts for governor and token");
    }
    return { governor, token };
}

export async function getProposal() {
    const proposalId = process.env.PROPOSAL_ID;
    if (!proposalId) {
        throw new Error("Expecting a proposalId in env");
    }
    return { proposalId }
}
