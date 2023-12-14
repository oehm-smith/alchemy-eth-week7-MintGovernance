const { ethers } = require("hardhat")
const { getContracts, getProposal } = require("./utils")
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
//
// async function getProposal() {
//     const proposalId = process.env.PROPOSAL_ID;
//     if (!proposalId) {
//         throw new Error("Expecting a proposalId in env");
//     }
//     return { proposalId }
// }

async function vote() {
    // const proposingValues = await afterProposingFixture();
    const { governor, token } = await getContracts();
    const { proposalId } = await getProposal();

    const tx = await governor.castVote(proposalId, 1);
    const receipt = await tx.wait();
    const voteCastEvent = receipt.events.find(x => x.event === 'VoteCast');
    console.log(`voteCastEvent: ${JSON.stringify(voteCastEvent)}`)

    // wait for the 1 block voting period
    // await hre.network.provider.send("evm_mine");

    // return { ...proposingValues, voteCastEvent } // no need to return or capture anything
}

vote().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
