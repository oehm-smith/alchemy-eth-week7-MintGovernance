const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const transactionCount = await owner.getTransactionCount();

  // gets the address of the token before it is deployed
  const futureAddress = ethers.utils.getContractAddress({
    from: owner.address,
    nonce: transactionCount + 1
  });

  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = await MyGovernor.deploy(futureAddress);

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(governor.address);

  await token.delegate(owner.address);

  const balance = await token.balanceOf(owner.address);

  console.log(
    `Governor deployed to ${governor.address}`,
    `Token deployed to ${token.address}`
  );
  console.log(`balance for ${owner.address} - ${balance}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Governor deployed to 0x03252566A932ecbcB837F6Db5D4F816804A8BfEE Token deployed to 0xfFd06417f5E85B66fF6F4Aa454589beBD36e897D
// Governor deployed to 0xf8e051E8c353e84d2AD520B2165C672c826acC62 Token deployed to 0xBCE454e1174d25d5c6D55dD1c48D7A773D89cEC0
//    999_000_000_000_000_000_000 (999 Eth)
// 10_000_000_000_000_000_000_000 (10,000 Eth)
