import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // 1. UpNextToken
  const UpNextToken = await ethers.getContractFactory("UpNextToken");
  const upnToken = await UpNextToken.deploy();
  await upnToken.waitForDeployment();
  console.log("UpNextToken deployed to:", await upnToken.getAddress());

  // 2. InsuranceFund
  const InsuranceFund = await ethers.getContractFactory("InsuranceFund");
  const insuranceFund = await InsuranceFund.deploy(await upnToken.getAddress());
  await insuranceFund.waitForDeployment();
  console.log("InsuranceFund deployed to:", await insuranceFund.getAddress());

  // 3. EarningsOracle
  const EarningsOracle = await ethers.getContractFactory("EarningsOracle");
  const oracle = await EarningsOracle.deploy();
  await oracle.waitForDeployment();
  console.log("EarningsOracle deployed to:", await oracle.getAddress());

  // 4. TalentShare
  const TalentShare = await ethers.getContractFactory("TalentShare");
  const talentShare = await TalentShare.deploy(
    deployer.address, // talent
    ethers.parseEther("10"), // target
    500, // 5% equity
    10, // duration
    await insuranceFund.getAddress()
  );
  await talentShare.waitForDeployment();
  console.log("TalentShare deployed to:", await talentShare.getAddress());

  // 5. TalentShareToken
  const TalentShareToken = await ethers.getContractFactory("TalentShareToken");
  const talentShareToken = await TalentShareToken.deploy();
  await talentShareToken.waitForDeployment();
  console.log("TalentShareToken deployed to:", await talentShareToken.getAddress());

  // 6. SecondaryMarket
  const SecondaryMarket = await ethers.getContractFactory("SecondaryMarket");
  const secondaryMarket = await SecondaryMarket.deploy(
    await talentShareToken.getAddress(),
    deployer.address, // platform fee address
    await insuranceFund.getAddress()
  );
  await secondaryMarket.waitForDeployment();
  console.log("SecondaryMarket deployed to:", await secondaryMarket.getAddress());

  // 7. MilestoneEscrow
  const MilestoneEscrow = await ethers.getContractFactory("MilestoneEscrow");
  const milestoneEscrow = await MilestoneEscrow.deploy(deployer.address, await upnToken.getAddress());
  await milestoneEscrow.waitForDeployment();
  console.log("MilestoneEscrow deployed to:", await milestoneEscrow.getAddress());

  // 8. PredictionMarket
  const PredictionMarket = await ethers.getContractFactory("PredictionMarket");
  const predictionMarket = await PredictionMarket.deploy(deployer.address); // Mock USDT address
  await predictionMarket.waitForDeployment();
  console.log("PredictionMarket deployed to:", await predictionMarket.getAddress());

  // 9. TalentWars
  const TalentWars = await ethers.getContractFactory("TalentWars");
  const talentWars = await TalentWars.deploy(await upnToken.getAddress());
  await talentWars.waitForDeployment();
  console.log("TalentWars deployed to:", await talentWars.getAddress());

  // 10. CommunityFlagging
  const CommunityFlagging = await ethers.getContractFactory("CommunityFlagging");
  const flagging = await CommunityFlagging.deploy(await upnToken.getAddress());
  await flagging.waitForDeployment();
  console.log("CommunityFlagging deployed to:", await flagging.getAddress());

  // 11. EarlyBackerBadge
  const EarlyBackerBadge = await ethers.getContractFactory("EarlyBackerBadge");
  const badge = await EarlyBackerBadge.deploy();
  await badge.waitForDeployment();
  console.log("EarlyBackerBadge deployed to:", await badge.getAddress());

  // 12. UpNextVault
  const UpNextVault = await ethers.getContractFactory("UpNextVault");
  const vault = await UpNextVault.deploy();
  await vault.waitForDeployment();
  console.log("UpNextVault deployed to:", await vault.getAddress());

  // 13. TalentPack
  const TalentPack = await ethers.getContractFactory("TalentPack");
  const pack = await TalentPack.deploy();
  await pack.waitForDeployment();
  console.log("TalentPack deployed to:", await pack.getAddress());

  // 14. TalentStockIndex
  const TalentStockIndex = await ethers.getContractFactory("TalentStockIndex");
  const index = await TalentStockIndex.deploy();
  await index.waitForDeployment();
  console.log("TalentStockIndex deployed to:", await index.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
