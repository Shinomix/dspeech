async function main() {
  // We get the contract to deploy
  const contractFactory = await ethers.getContractFactory("SpeechRecorder");
  const contract = await contractFactory.deploy();

  await contract.deployed();

  console.log("SpeechRecorder deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
