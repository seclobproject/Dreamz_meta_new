import { sendUSDT } from "../../utils/sendUSDT.js";
// import { proceedToWithdraw } from "../adminRoutes.js";
import { bfsNew } from "./TreeFunctions.js";

export const payUser =async (amount, sponser, lastWallet) =>{
  console.log("entered in pay user");

  let earning = sponser.earning;
  let savings=sponser.savingsIncome;
  let joining = sponser.joiningAmount;
  let rebirthAmount = sponser.rebirthAmount;
  let totalWallet = sponser.totalWallet;
  let rebirthStatus;
  let addToTotalWallet = 0;
  let variousIncome = 0;
  let currentWallet = lastWallet;
  

  // Loop until all amount is distributed
  while (amount > 0) {

    if (currentWallet === 'earning') {
      console.log("entered in earning");

      const spaceInEarning = 31 - (totalWallet % 31);
      const amountToAdd = Math.min(amount, spaceInEarning);
      earning += amountToAdd;
      totalWallet += amountToAdd;
      addToTotalWallet += amountToAdd;
      variousIncome += amountToAdd;
      amount -= amountToAdd;
      if (totalWallet % 31 === 0 ) {
        currentWallet = 'joining';
      }
      // if(savings>0&&savings % 155 === 0){
      //   currentWallet = 'rebirth';
      // }
      if(totalWallet % 93 === 0){
        currentWallet = 'rebirth';
      }
      // if(earning>=10){
      //  const reciept= await sendUSDT(sponser.walletAddress)
      //  if(reciept.status===1){
      //   await proceedToWithdraw(sponser._id)
      //   earning -= 10;
      //  }
      // }
      
    } else if(currentWallet==='joining'){

      const spaceInJoining = 31 - (joining % 31);
      const amountToAdd = Math.min(amount, spaceInJoining);
      joining += amountToAdd;
      variousIncome += amountToAdd;
      amount -= amountToAdd;
      if (joining % 31 === 0) {
        currentWallet = 'earning';
      }
      
    }else{
      const spaceInRebirth = 31 - (rebirthAmount % 31);
      const amountToAdd = Math.min(amount, spaceInRebirth);
      rebirthAmount += amountToAdd;
      variousIncome += amountToAdd;
      amount -= amountToAdd;
      if (rebirthAmount % 31 === 0) {
        currentWallet = 'joining';
        // create new user
        rebirthStatus=true;

        // const left = "left";
        // const right = "right";
        //  await bfsNew(sponser, sponser._id, left, right);
      }

    }

  }

  
  return { earning, joining,rebirthAmount, addToTotalWallet, currentWallet, variousIncome,rebirthStatus };
  
};  



export const awardCriteria = async (user) => {
  
  // Check if the user has received a specific award before
  const hasReceivedAward = (amount) => {
    return user.awardBonusHistory.some(
      (entry) => entry.amount === amount && entry.category === "Award and Reward"
    );
  };

  if (!hasReceivedAward(50) && user.children.length >= 6 && user.totalWallet >= 500) {
    user.awardBonus += 50;
    user.awardBonusHistory.push({
      amount: 50,
      category: "Award and Reward",
    });
  } else if (!hasReceivedAward(250) && user.children.length >= 12 && user.totalWallet >= 1500) {
    user.awardBonus += 250;
    user.awardBonusHistory.push({
      amount: 250,
      category: "Award and Reward",
    });
  } else if (!hasReceivedAward(750) && user.children.length >= 24 && user.totalWallet >= 3000) {
    user.awardBonus += 750;
    user.awardBonusHistory.push({
      amount: 750,
      category: "Award and Reward",
    });
  } else if (!hasReceivedAward(1200) && user.children.length >= 48 && user.totalWallet >= 6000) {
    user.awardBonus += 1200;
    user.awardBonusHistory.push({
      amount: 1200,
      category: "Award and Reward",
    });
  } else if (!hasReceivedAward(3500) && user.children.length >= 96 && user.totalWallet >= 15000) {
    user.awardBonus += 3500;
    user.awardBonusHistory.push({
      amount: 3500,
      category: "Award and Reward",
    });
  }

  

  await user.save();
};
