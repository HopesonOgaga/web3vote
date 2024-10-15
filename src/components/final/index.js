import React, { useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../../contract/contractAddress";
import walletABI from "../../contract/abi.json";

const data = [
  {
    name: "Chinwe Okonkwo",
    party: "Party A",
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/back.png",
  },
  {
    name: "John Doe",
    party: "Party B",
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/back.png",
  },
  {
    name: "Jane Smith",
    party: "Party C",
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/back.png",
  },
];

export default function Final() {
  const [sdata, setData] = useState(data);
  const [connect, setConnect] = useState(false);
  const [account, setAccount] = useState("");
  const [contractVote, setContractVote] = useState(null);

  // Connect to the contract
  const connectContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, walletABI.abi, signer);
    setContractVote(contract);
  };

  // Connect to the MetaMask wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        return alert("Please install a crypto wallet, like MetaMask.");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      setAccount(address);
      setConnect(true);
      await connectContract(); // Initialize contract after connecting wallet
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  // Function to handle voting for a candidate
  const voteForCandidate = async (index) => {
    if (!contractVote) {
      return alert("Please connect to the wallet first!");
    }

    try {
      const voteTx = await contractVote.vote(index); // Assuming 'vote' is the function in the smart contract
      await voteTx.wait();
      alert(`Voted for candidate ${sdata[index].name} successfully!`);
    } catch (error) {
      console.error("Error voting:", error);
      alert("Failed to vote.");
    }
  };

  return (
    <section className="py-6 px-4">
      {/* Connect Wallet Button */}
      <div className="w-full flex justify-end">
        <button
          onClick={connectWallet}
          className="flex items-center text-lg justify-evenly w-full md:w-2/12 h-12 md:h-14 border-2 border-white shadow-md rounded-xl text-black font-semibold capitalize transition duration-300"
        >
          <img src="/images/metamask.png" alt="Metamask logo" />{" "}
          {connect ? `Connected` : "Connect Wallet"}
        </button>
      </div>

      {/* Header */}
      <div className="text-center mt-6">
        <p className="text-2xl md:text-4xl font-bold text-black uppercase">
          betavote
        </p>
      </div>

      {/* MetaMask Address */}
      <div className="flex flex-col gap-4 items-center mt-6 justify-center w-full h-full">
        <p className="capitalize text-sm md:text-lg text-center">
          metamask: <span>{account}</span>
        </p>
        <p className="text-sm md:text-lg">
          Vote for any of the listed candidates
        </p>
      </div>

      {/* List of Candidates */}
      <div className="mt-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sdata.map((user, index) => (
            <li
              key={index}
              className="border-2 border-gray-300 rounded-lg p-4 shadow-md"
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="mt-4 text-center">
                <h2 className="text-lg md:text-xl font-bold">{user.name}</h2>
                <p className="text-teal-500 font-semibold">{user.party}</p>
                <p className="text-gray-700 mt-2 text-sm md:text-base">
                  {user.info}
                </p>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => voteForCandidate(index)} // Pass the candidate index to the voting function
                  className="w-full md:w-1/2 border-2 border-black h-10 md:h-12 shadow-md rounded-xl text-black font-semibold capitalize transition duration-300"
                  aria-label="Vote for the candidate"
                >
                  vote
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
