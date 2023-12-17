require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    networks: {
        goerli: {
            url: process.env.GOERLI_RPC_URL,
            accounts: [process.env.GOERLI_PRIVATE_KEY1],
            // ref: https://discord.com/channels/1039895401832128532/1047627278722551939/1185449719380582411 (My post re: gas)
            // Ok in summary for what I've learnt:
            //
            // In hardhat / ethers, "Gas" is "Gas Limit" in Ethereum speak and is the max you are willing to pay IN GAS UNITS for a transaction.  Each transaction operation uses a different number of Gas Units.  According to the Eth docs (linked many times above), straight transfer of Eth from one account to another costs 21_000_000 units.  This calculation should be straight forward.  But the difference is refunded so entering a value higher than required is ok, and good to do since if not enough is specified then the transaction performed so far will consume all the gas it can and fail when there is not enough to complete the operation(s).
            // Although specifying extra doesn't matter due to the refund, a malicious actor could use that to drain you wallet of that total amount.
            //
            // GasPrice is what you will pain in WEI per UNIT.  The greater the amount the faster it will get executed and added to a block.  OWLRACLE shows the lower and upper bounds of what price you should pay.
            //
            // I believe the 'MINIMUM GAS' in https://www.evm.codes/?fork=shanghai is the number of units for the low-level operation.
            // ref: https://ethereum.org/en/developers/docs/gas/#what-is-gas-limit
            // ref: https://eth-converter.com/
            // ref: https://hardhat.org/hardhat-runner/docs/config
            // Seems to be Gwei
            gas: 3_000_000,
            gasPrice: 10_000
        }
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY
    },
    // sourcify: {
    //     enabled: true,
    // }
};
