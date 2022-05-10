const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SpeechRecorder", function () {
  let contract;
  let contractInstance;

  beforeEach(async function () {
    contract = await ethers.getContractFactory("SpeechRecorder");
    contractInstance = await contract.deploy();
    await contractInstance.deployed();
  });

  describe("record", async function () {
    it("reverts if the message is empty", async function () {
      await expect(contractInstance.record(""))
        .to.be.revertedWith("content is empty or too long");
    });

    it("reverts if the message is too long", async function () {
      const tooLongMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at neque non enim tristique semper. Donec bibendum sapien nec dolor posuere, eu fringilla libero luctus. Cras vitae elit ac augue pharetra interdum. Nullam pretium efficitur metus sed fermentum. Pellentesque eget mauris nec magna tempor et.";

      await expect(contractInstance.record(tooLongMessage))
        .to.be.revertedWith("content is empty or too long");
    });

    it("emits an event when a new speech is created", async function () {
      const message = "this is a message";
      const [sender] = await ethers.getSigners();
      const senderAddress = await sender.getAddress();

      await expect(contractInstance.record(message))
        .to.emit(contractInstance, "SpeechRecorded")
        .withArgs(1, senderAddress, message);
    });

    it("increments the ID for each new message", async function () {
      const message = "this is a second message";
      const [sender] = await ethers.getSigners();
      const senderAddress = await sender.getAddress();

      await contractInstance.record("discard this message");
      await expect(contractInstance.record(message))
        .to.emit(contractInstance, "SpeechRecorded")
        .withArgs(2, senderAddress, message);
    });
  });

  describe("get", async function () {
    beforeEach(async function () {
      await contractInstance.record("discard this message");
    });


    it("returns the speech for a given ID", async function () {
      const [sender] = await ethers.getSigners();
      const senderAddress = await sender.getAddress();

      const speech = await contractInstance.get(1);

      expect(speech.content).to.equal("discard this message");
      expect(speech.sender).to.equal(senderAddress);
      expect(speech.id).to.equal(1);
    });

    it("returns an empty speech for an unexisting ID", async function () {
      const speech = await contractInstance.get(2);

      expect(speech.content).to.equal("");
      expect(speech.sender).to.be.hexEqual("0x0");
    });
  });

  describe("getPage", async function () {
    beforeEach(async function () {
      await contractInstance.record("1");
      await contractInstance.record("2");
      await contractInstance.record("3");
      await contractInstance.record("4");
      await contractInstance.record("5");
      await contractInstance.record("6");
      await contractInstance.record("7");
      await contractInstance.record("8");
      await contractInstance.record("9");
      await contractInstance.record("10");
      await contractInstance.record("11");
    });

    it("returns the first page of speeches", async function () {
      const speeches = await contractInstance.getPage(0);

      expect(speeches.length).to.equal(10);
      expect(speeches[0].id).to.equal(1);
      expect(speeches[speeches.length - 1].id).to.equal(10);
    });

    it("returns a page from startFrom param", async function () {
      const speeches = await contractInstance.getPage(1);

      expect(speeches.length).to.equal(10);
      expect(speeches[0].id).to.equal(2);
      expect(speeches[speeches.length - 1].id).to.equal(11);
    });

    it ("returns a partial page if it reaches the end of the list", async function () {
      const speeches = await contractInstance.getPage(9);

      expect(speeches.length).to.equal(2);
      expect(speeches[0].id).to.equal(10);
    });

    it("throws if startFrom is negative", async function () {
      expect(contractInstance.getPage(-1)).to.throw;
    });
  });
});
