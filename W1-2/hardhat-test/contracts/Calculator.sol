// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;

contract Calculator {
    uint256 private total;
    address public deployer;

    constructor() {
        total = 0;
        deployer = msg.sender;
    }

    modifier onlyDeployer() {
        require(msg.sender == deployer,"this function is restricted to the owne");
        _;
    }

    function add(uint256 num) public returns (uint256) {
        total += num;
        return total;
    }

    function count() public view onlyDeployer returns (uint256) {
        return total;
    }
}
