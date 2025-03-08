// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EnergyToken is ERC20 {
    constructor() ERC20("EnergyToken", "ETK") {
        _mint(msg.sender, 1 * 1 ** decimals());
    }
}

contract EnergyTrading {
    EnergyToken public energyToken;

    struct Trade {
        uint256 amount;
        uint256 price;
        address seller;
        bool active;
    }

    Trade[] public trades;
    uint256 public tradeCounter;

    event TradeCreated(uint256 tradeId, uint256 amount, uint256 price, address seller);
    event TradeCompleted(uint256 tradeId, address buyer);

    constructor(address _energyTokenAddress) {
        energyToken = EnergyToken(_energyTokenAddress);
    }

    function createTrade(uint256 _amount, uint256 _price) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(_price > 0, "Price must be greater than 0");

        trades.push(Trade({
            amount: _amount,
            price: _price,
            seller: msg.sender,
            active: true
        }));

        emit TradeCreated(tradeCounter, _amount, _price, msg.sender);
        tradeCounter++;
    }

    function executeTrade(uint256 _tradeId) external {
        Trade storage trade = trades[_tradeId];
        require(trade.active, "Trade is not active");
        require(energyToken.balanceOf(msg.sender) >= trade.price, "Insufficient balance");

        energyToken.transferFrom(msg.sender, trade.seller, trade.price);
        energyToken.transfer(msg.sender, trade.amount);

        trade.active = false;
        emit TradeCompleted(_tradeId, msg.sender);
    }

    function getTrade(uint256 _tradeId) external view returns (uint256, uint256, address, bool) {
        Trade memory trade = trades[_tradeId];
        return (trade.amount, trade.price, trade.seller, trade.active);
    }
}