// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

 contract Voting {

    // Struct to represent each candidate
    struct Candidate {
        string name;
        string party;
        uint256 voteCount;
        address voters; 
    }
    
    Candidate[] public listOfCandidate;

    // Mapping to store each candidate by its ID
    mapping(uint256 => Candidate) public candidates;

    // Mapping to track whether a voter has already voted
    mapping(address => bool) public hasVoted;

    // Number of candidates
    uint256 public candidatesCount;

    // Event that will be emitted whenever a vote is cast
    event Voted(uint256 indexed candidateId, address indexed voter);

    // Constructor to initialize the contract with some candidates
    constructor() {
    
    }

    // Function to add a new candidate (private, only called during deployment)
    function addCandidate(string memory _name, string memory _party) public {
        listOfCandidate.push(Candidate(_name, _party,candidatesCount++,msg.sender));
    }

    // Function to vote for a candidate
    function vote(uint256 _candidateId) public {
        // Ensure the voter hasn't already voted
        require(!hasVoted[msg.sender], "You have already voted.");

        // Ensure the candidate ID is valid
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");

        // Record that this voter has voted
        hasVoted[msg.sender] = true;

        // Increase the candidate's vote count
        candidates[_candidateId].voteCount++;

        // Emit an event for the vote
        emit Voted(_candidateId, msg.sender);
    }

    // Get the total votes for a candidate
    function getVotes() public view returns (Candidate[] memory) {
        return listOfCandidate;
    }

    // Get candidate details by ID
    function getCandidate(uint256 _candidateId) public view returns (uint256) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");
        return _candidateId;
    }
}
