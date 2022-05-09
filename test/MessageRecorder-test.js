const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SpeechRecorder", function () {
  let contract;

  beforeEach(async function () {
    contract = await ethers.getContractFactory("SpeechRecorder");
  });

  describe("record", async function () {
    it("reverts if the message is empty", async function () {
      const contractInstance = await contract.deploy();
      await contractInstance.deployed();

      await expect(contractInstance.record(""))
        .to.be.revertedWith("content is empty or too long");
    });

    it("reverts if the message is too long", async function () {
      const tooLongMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at neque non enim tristique semper. Donec bibendum sapien nec dolor posuere, eu fringilla libero luctus. Cras vitae elit ac augue pharetra interdum. Nullam pretium efficitur metus sed fermentum. Pellentesque eget mauris nec magna tempor et.";
      const contractInstance = await contract.deploy();
      await contractInstance.deployed();

      await expect(contractInstance.record(tooLongMessage))
        .to.be.revertedWith("content is empty or too long");
    });

    it("emits an event when a new speech is created", async function () {
      const message = "this is a message";
      const [sender] = await ethers.getSigners();
      const senderAddress = await sender.getAddress();

      const contractInstance = await contract.deploy();
      await contractInstance.deployed();

      await expect(contractInstance.record(message))
        .to.emit(contractInstance, "SpeechRecorded")
        .withArgs(1, senderAddress, message);
    });

    it("increments the ID for each new message", async function () {
      const message = "this is a second message";
      const [sender] = await ethers.getSigners();
      const senderAddress = await sender.getAddress();

      const contractInstance = await contract.deploy();
      await contractInstance.deployed();

      await contractInstance.record("discard this message");
      await expect(contractInstance.record(message))
        .to.emit(contractInstance, "SpeechRecorded")
        .withArgs(2, senderAddress, message);
    });
  });
});
