export function setMsgGroup(data) { 
  let finalType = data.typeUrl;
  let finalData = '';
  let titleMsg = "";  


  // console.log(all)
 
  switch (finalType) {
    case "/cosmos.bank.v1beta1.MsgSend":
      console.log('data.value', data.value)
      titleMsg = "Send"
      finalData = {
        from: {
          data: data.value.fromAddress,
          name: "From",
        },
        to: {
          data: data.value.toAddress,
          name: "To",
        },
        amount: {
          data: {
            amount: data.value.amount[0].amount,
            denom: data.value.amount[0].denom
          },
          name: "Amount",
        }
      };
      //console.log(finalData) 
      break;
      case "/cosmos.staking.v1beta1.MsgDelegate":
        titleMsg = "Delegate"
        console.log(data)
        finalData = {
          from: {
            data: data.delegator_address,
            name: "From",
          },
          to: {
            data: data.validator_address,
            name: "To",
          },
          amount: {
            data: data.amount,
            name: "Amount",
          }, 
        };
        break;

    default:
      console.log("Sorry, dont know " + finalType + ".");
  }
  return { finalType, finalData, titleMsg };
}
