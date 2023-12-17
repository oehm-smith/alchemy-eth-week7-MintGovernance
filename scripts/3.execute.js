const { ethers } = require("hardhat")
const { getContracts, getProposal } = require("./utils")
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils;

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

async function execute() {
    const [owner] = await ethers.getSigners();
    const { governor, token } = await getContracts();
    const { proposalId } = await getProposal();

    const tx = await governor.execute(
        [token.address],
        [0],
        [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
        keccak256(toUtf8Bytes("Give the owner more tokens!"))
    );
    console.log(`execute - done`)
    const receipt = await tx.wait();
    console.log(`receipt - done`)

    const proposalExecutedEvent = receipt.events.find(x => x.event === 'ProposalExecuted');
    console.log(`ProposalExecutedEvent: ${JSON.stringify(proposalExecutedEvent)}`)

    const balance = await token.balanceOf(owner.address);
    console.log(`balance for ${owner.address} - ${balance}`)
    const state = await governor.state(proposalId);
    console.log(`  state: ${state}`);

}

execute().catch((error) => {
    console.error("EXECUTE ERROR - ", error.message);
    console.error(error);
    process.exitCode = 1;
});
