// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract EmployeeDetails {
    struct Employee {
        string name;
        address walletAddress;
        string paymentMethod;
        uint256 salary;
        uint256 dateCaptured;
    }
    
    mapping(address => Employee) public employees;
    
    event EmployeeDetailsCaptured(
        address indexed walletAddress,
        string name,
        string paymentMethod,
        uint256 salary,
        uint256 dateCaptured
    );

    event EmployeeDetailsUpdated(
        address indexed walletAddress,
        string name,
        string paymentMethod,
        uint256 salary
    );

    event EmployeeDetailsDeleted(address indexed walletAddress);

    modifier employeeExists(address _walletAddress) {
        require(employees[_walletAddress].walletAddress == _walletAddress, "Employee not found");
        _;
    }

    modifier employeeNotExists(address _walletAddress) {
        require(employees[_walletAddress].walletAddress != _walletAddress, "Employee already exists");
        _;
    }

    function captureEmployeeDetails(
        string memory _name,
        address _walletAddress,
        string memory _paymentMethod,
        uint256 _salary
    ) external employeeNotExists(_walletAddress) {
        employees[_walletAddress] = Employee(
            _name,
            _walletAddress,
            _paymentMethod,
            _salary,
            block.timestamp
        );

        emit EmployeeDetailsCaptured(
            _walletAddress,
            _name,
            _paymentMethod,
            _salary,
            block.timestamp
        );
    }

    function updateEmployeeDetails(
        address _walletAddress,
        string memory _name,
        string memory _paymentMethod,
        uint256 _salary
    ) external employeeExists(_walletAddress) {
        Employee storage employee = employees[_walletAddress];
        employee.name = _name;
        employee.paymentMethod = _paymentMethod;
        employee.salary = _salary;

        emit EmployeeDetailsUpdated(
            _walletAddress,
            _name,
            _paymentMethod,
            _salary
        );
    }

    function deleteEmployeeDetails(address _walletAddress) external employeeExists(_walletAddress) {
        delete employees[_walletAddress];

        emit EmployeeDetailsDeleted(_walletAddress);
    }

    function getEmployeeDetails(address _walletAddress) external view employeeExists(_walletAddress) returns (
        string memory,
        address,
        string memory,
        uint256,
        uint256
    ) {
        Employee storage employee = employees[_walletAddress];
        return (
            employee.name,
            employee.walletAddress,
            employee.paymentMethod,
            employee.salary,
            employee.dateCaptured
        );
    }
}
