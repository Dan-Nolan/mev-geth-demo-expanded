const ethers = require('ethers');
const solc = require('solc');

const CONTRACT = `
contract Deposit {
  receive() external payable {
    // anyone can send ether to this contract
  }

  function withdraw(address payable recipient) external {
    recipient.transfer(address(this).balance);
  }
}
`;

const INPUT = {
  language: 'Solidity',
  sources: {
    'Deposit.sol': {
      content: CONTRACT
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}
const OUTPUT = JSON.parse(solc.compile(JSON.stringify(INPUT)))
const COMPILED = OUTPUT.contracts['Deposit.sol']
const ABI = COMPILED.Deposit.abi
const BIN = '0x' + COMPILED.Deposit.evm.bytecode.object

const privateKey = "0x8b52a1f725bdeb643bf55fbef096e8ae044971c78c234f775f433f16193df69c";
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

async function deploy() {
  const wallet = new ethers.Wallet(privateKey, provider);

  const cf = new ethers.ContractFactory(ABI, BIN, wallet);

  const contract = await cf.deploy();

  return contract;
}

module.exports = deploy;
