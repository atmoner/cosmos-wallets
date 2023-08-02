export function setMsgTx(txData, foundChain) { 
  console.log(txData, foundChain)
/*   let finalType = data["@type"];
  let finalData = '';
  let titleMsg = ""; 
 
  switch (finalType) {
    case "/cosmos.bank.v1beta1.MsgSend":
      titleMsg = "Send"
      finalData = {
        from: {
          data: data.from_address,
          name: "From",
        },
        to: {
          data: data.to_address,
          name: "To",
        },
        amount: {
          data: data.amount[0],
          name: "Amount",
        }, 
      };
      //console.log(finalData) 
      break;
    case "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission":
      titleMsg = "Withdraw Validator"
      //console.log(data) 
      finalData = data
      finalData = {
        validator_address: {
          data: data.validator_address,
          name: "Validator address",
        },
      };
      break;     
    default:
      console.log("Sorry, dont know " + finalType + ".");
  }
  return { finalType, finalData, titleMsg, timestamp, txhash }; */
}
