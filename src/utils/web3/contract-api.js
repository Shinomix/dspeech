import { ethers } from "ethers";

import getSigner from "./signer";
import { store } from '../store';
import { speechAdded } from "../speech-reducer";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contract = require("./SpeechRecorder.json");

export const setupListeners = async () => {
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const messageRecorderContractProvider = new ethers.Contract(contractAddress, contract.abi, provider);

  messageRecorderContractProvider.on("SpeechRecorded", async (id, sender, content) => {
    store.dispatch(speechAdded({ id, sender, content }));
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
