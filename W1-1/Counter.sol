// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;

contract Calculator {
    uint256 public total;

    constructor() {
        total = 0;
    }

    function add(uint256 num) public returns (uint256){
        total += num;
        return total;
    }
}
