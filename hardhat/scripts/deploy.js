const { ethers } = require('hardhat');

async function main() {
  // Load the marketplace contract artifacts
  const EmployeeDetailsFactory = await ethers.getContractFactory(
    'EmployeeDetails'
  );

  // Deploy the contract
  const EmployeeDetailsContract = await EmployeeDetailsFactory.deploy();

  // Wait for deployment to finish
  await EmployeeDetailsContract.deployed();

  // Log the address of the new contract
  console.log(
    'Employee Details deployed to:',
    EmployeeDetailsContract.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
