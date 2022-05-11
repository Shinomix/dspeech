import { ethers } from "ethers";
import getSigner from "./signer";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contract = require("./SpeechRecorder.json");

export const setupListeners = async () => {
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const eventsFilter = {
    address: contractAddress,
  }

  provider.on("SpeechRecorded", async (id, sender, speech) => {
    console.warn("SpeechRecorded", id, sender, speech);
  });
}

export const recordSpeech = async (message) => {
  const signer = await getSigner();
  const messageRecorderContract = new ethers.Contract(contractAddress, JSON.stringify(contract.abi), signer);

  const transaction = await messageRecorderContract.record(message);
  const result = await transaction.wait(0);

  return result;
}

export const getPage = async (startFrom = 0) => {
  const signer = await getSigner();
  const messageRecorderContract = new ethers.Contract(contractAddress, JSON.stringify(contract.abi), signer);

  const transaction = await messageRecorderContract.getPage(startFrom);

  return transaction;
}
