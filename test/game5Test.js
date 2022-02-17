const { assert } = require("chai");

describe("Game5", function () {
  it("should be a winner", async function () {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    // good luck
    const signer0 = ethers.provider.getSigner(0);

    account = "0x000000000000000000000000000000000000d34d";
    tx = await signer0.sendTransaction({
      value: ethers.utils.parseEther("1.0"),
      to: account,
      from: signer0.getAddress(),
    });

    tx.wait();

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [account],
    });

    const signer = await hre.ethers.provider.getSigner(account);

    await game.connect(signer).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
