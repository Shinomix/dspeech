import { ethers } from "ethers";

// Prompt user for account connections
const getSigner = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  return signer;
}

export default getSigner;
