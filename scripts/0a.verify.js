const hre = require("hardhat");
const { ethers } = hre;
const { getContracts } = require("./utils")
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils;

require("dotenv").config();

async function verify() {
    // const deployValues = await deployFixture();
    const [owner] = await ethers.getSigners();
    const { governor, token, governorAddress, tokenAddress } = await getContracts();

    try {
        await hre.run("verify:verify", {
            address: governorAddress,
            constructorArguments: [
                tokenAddress
            ]
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.error(e.message)
        }
    }
    try {
        await hre.run("verify:verify", {
            address: tokenAddress,
            constructorArguments: [
                governorAddress
            ]
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.error(e.message)
        }
    }
}

verify().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// proposalId: 65222735417911731166980298001209397345012604238194734247653394975983995029139
