const { ethers } = require("hardhat");
require("dotenv").config();

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const EXTRA_TIP_FOR_MINER = 0 //  gwei

const OWLRACLE_KEY = process.env.OWLRACLE_KEY;
const NETWORK = "goerli";

async function main(){
    // const gasStationResponse = await fetch('https://gasstation-mumbai.matic.today/v2')
    const gasStationResponse = await fetch(`https://api.owlracle.info/v4/${ NETWORK }/gas?apikey=${ OWLRACLE_KEY }&version=1`);
    const gasStationJSON = await gasStationResponse.text();
    const gasStationObj = JSON.parse(gasStationJSON);

    console.log(JSON.stringify(gasStationObj, null, 2));

    const useThisSpeedRecord=gasStationObj.speeds[1];
    let block_number = gasStationObj.lastBlock;
    let base_fee = parseFloat(useThisSpeedRecord.baseFee)
    let max_priority_fee = useThisSpeedRecord.maxPriorityFeePerGas + EXTRA_TIP_FOR_MINER
    let max_fee_per_gas = base_fee + max_priority_fee

//  In case the network gets (up to 25%) more congested
    max_fee_per_gas += (base_fee * 0.25)

    console.log(`block_number: ${block_number}`)
    console.log(`base_fee: ${base_fee.toFixed(9)} gwei`)
    console.log(`max_priority_fee_per_gas: ${max_priority_fee} gwei`)
    console.log(`max_fee_per_gas: ${max_fee_per_gas} gwei`)

//  cast gwei numbers to wei BigNumbers for ethers
    const maxFeePerGas = ethers.utils.parseUnits(max_fee_per_gas.toFixed(9), 'gwei')
    const maxPriorityFeePerGas = ethers.utils.parseUnits(max_priority_fee.toFixed(9), 'gwei')

//  Final object ready to feed into a transaction
    const transactionProperties = {
        maxFeePerGas,
        maxPriorityFeePerGas
    }

    console.log(JSON.stringify(transactionProperties, null, 2));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

