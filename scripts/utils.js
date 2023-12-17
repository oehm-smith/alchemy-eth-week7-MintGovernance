const { ethers } = require("hardhat")
require("dotenv").config();

const getContracts = async() => {
    if (!process.env.GOVERNOR_CONTRACT_ADDRESS && process.env.TOKEN_CONTRACT_ADDRESS) {
        throw Error("Need to define both GOVERNOR_CONTRACT_ADDRESS && TOKEN_CONTRACT_ADDRESS in .env")
    }
    const [owner] = await ethers.getSigners();
    const governorAddress=process.env.GOVERNOR_CONTRACT_ADDRESS
    const tokenAddress=process.env.TOKEN_CONTRACT_ADDRESS
    const governor = await ethers.getContractAt("MyGovernor", governorAddress, owner);
    const token = await ethers.getContractAt("MyToken", tokenAddress, owner);

    if (!governor.address && token.address) {
        throw new Error("Cannot get contracts for governor and token");
    }
    return { governor, token, governorAddress, tokenAddress };
}

const getProposal = async() => {
    const proposalId = process.env.PROPOSAL_ID;
    if (!proposalId) {
        throw new Error("Expecting a proposalId in env");
    }
    return { proposalId }
}

module.exports = { getContracts, getProposal }
