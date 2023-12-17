const { ethers } = require("hardhat")
const { getContracts, getProposal } = require("./utils")
require("dotenv").config();

async function vote() {
    // const proposingValues = await afterProposingFixture();
    const { governor, token } = await getContracts();
    const { proposalId } = await getProposal();

    console.log(`vote - proposalId: ${proposalId}`)
    let tx;
    try {
        tx = await governor.castVote(proposalId, 1);
    } catch (e) {
        console.error(`castVote error - `, e.message);
        throw e;
    }
    console.log(`castVote - done`)
    const receipt = await tx.wait();
    console.log(`receipt - done`)
    const voteCastEvent = receipt.events.find(x => x.event === 'VoteCast');
    console.log(`voteCastEvent: ${JSON.stringify(voteCastEvent)}`)
    const state = await governor.state(proposalId);
    console.log(`  state: ${state}`);

    // wait for the 1 block voting period
    // await hre.network.provider.send("evm_mine");

    // return { ...proposingValues, voteCastEvent } // no need to return or capture anything
}

vote().catch((error) => {
    console.error(`ERROR: `, error.message);
    console.error(error)
    process.exitCode = 1;
});

// enum ProposalState {
//     Pending,
//     Active,
//     Canceled,
//     Defeated,
//     Succeeded,
//     Queued,
//     Expired,
//     Executed
// }

// PROPOSAL_ID=86325869140045337751047815263226670708276835259841153311006790610314824567112
// blockNumber":10224117,"transactionHash":"0x3360f819776976a0ae1926c9840d8a9e850c6bcc27111c15252d68ffb43ff63d","address":"0xdC62Ea112681c9fEd8c1Cb75B2ce2dD82e50A89F

// PROPOSAL_ID=5886487266635163592368610520418452555693014883797186165129869918004641697785
// "blockNumber":10224059,"transactionHash":"0x3e46d52210d7b4b728a4aaedf14ef4c5cc0b8ac2e14e6795cb7df01767265075","address":"0xA641a4B7033917029D976e02C3252D65EeE2C70e"

// vote - proposalId: 65886725921759543552239693945142384396079159542927592722355466014050912988673
// voteCastEvent: {"transactionIndex":28,"blockNumber":10223840,"transactionHash":"0xe6a735eb5c56da7700455abc6933d7cce47d9be9aadc1c21bf330cddb6951ab1","address":"0x5Da3141Ad8945672Bca5285A002a262216feE882","topics":["0xb8e138887d0aa13bab447e82de9d5c1777041ecd21ca36ba824ff1e6c07ddda4","0x0000000000000000000000008783746a70aba0587f9c872bf52f952e50208730"],"data":"0x91aa90ba60603f6371aa75b4993be1ce5caab36d1bf70b83d49e37a853ee6e010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000","logIndex":1529,"blockHash":"0xe1a04caeee6ab76ccf867b894aee7ecb1d69240e91eb2c8eabf7fd8c45b88ee1","args":["0x8783746a70ABA0587f9C872Bf52f952E50208730",{"type":"BigNumber","hex":"0x91aa90ba60603f6371aa75b4993be1ce5caab36d1bf70b83d49e37a853ee6e01"},1,{"type":"BigNumber","hex":"0x00"},""],"event":"VoteCast","eventSignature":"VoteCast(address,uint256,uint8,uint256,string)"}

// PROPOSAL_ID=71529222434961141009246303456047588569443221318084242523012791921107457971021
// voteCastEvent: {"transactionIndex":55,"blockNumber":10223662,"transactionHash":"0x3cfcf1609aca7d6ca8f0eaa27984bc517e364078e1f88e442cdd1291303150d5","address":"0x248ED19315F2fA1274B39780604aA3faD7612f7C","topics":["0xb8e138887d0aa13bab447e82de9d5c1777041ecd21ca36ba824ff1e6c07ddda4","0x0000000000000000000000008783746a70aba0587f9c872bf52f952e50208730"],"data":"0x9e241aee18b1f79cad7abf2cb3ff5763c65b3f95845a9b828f6b8c22a7ba934d0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000","logIndex":1541,"blockHash":"0x52d7e75bd5a86cc121de9f624a0ca53b8d8a0fa8629827c91b93dcc59b330214","args":["0x8783746a70ABA0587f9C872Bf52f952E50208730",{"type":"BigNumber","hex":"0x9e241aee18b1f79cad7abf2cb3ff5763c65b3f95845a9b828f6b8c22a7ba934d"},1,{"type":"BigNumber","hex":"0x00"},""],"event":"VoteCast","eventSignature":"VoteCast(address,uint256,uint8,uint256,string)"}

// {
//     transactionIndex: 58,
//     blockNumber: 10220309,
//     transactionHash: "0x00ccf7ac9f99dc5e6a9ae58b038358f506c4c40ff717ba9fb6658a94813804c5",
//     address: "0x4dA1920ef55264Fa71937e82b347Bd65e23F732C",
//     topics: ["0xb8e138887d0aa13bab447e82de9d5c1777041ecd21ca36ba824ff1e6c07ddda4", "0x0000000000000000000000008783746a70aba0587f9c872bf52f952e50208730"]
//     data: "0x80a85bfa51c9b2738c22d4dfd2b01f328bedaa0920899498d2cbaf817f57da760000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000",
//     logIndex: 3053,
//     blockHash: "0x47db6420deea28db65d3efb52fcd6add361d06ccc6504d82817f30bea1015c45",
//     args: ["0x8783746a70ABA0587f9C872Bf52f952E50208730", {
//         type: 'BigNumber', hex: "0x80a85bfa51c9b2738c22d4dfd2b01f328bedaa0920899498d2cbaf817f57da76"
//     }, 1, { type: "BigNumber", hex: "0x00" }, ""],
//     event: VoteCast,
//     eventSignature: "VoteCast(address,uint256,uint8,uint256,string)"
// }


