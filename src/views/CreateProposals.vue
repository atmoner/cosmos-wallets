<template>
  <v-row
    align="center"
    justify="center"
    dense
  >
    <v-col
      cols="12"
      lg="6"
      md="6"
      class="fill-height d-flex flex-column align-center"
    >
      <v-alert
        v-if="isSend"
        dense
        text
        color="#00b786"
        type="success"
        width="600"
      >
        Your proposal has been created! <strong>Click here</strong> to see the
        proposal
      </v-alert>
      <v-card
        class="accent"
        max-width="600"
      >
        <v-card-title>
          <span class="text-h5">Create QWOYN proposal (v1beta)</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
              >
                <v-select
                  v-model="propType"
                  :items="items"
                  label="Proposal type"
                  required
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                sm="12"
              >
                <v-text-field
                  v-model="propTitle"
                  label="Proposal title"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="12"
              >
                <v-textarea
                  v-model="propText"
                  outlined
                  name="input-7-4"
                  label="Proposal text"
                  required
                />
                <!--     <div id="editor">
      <textarea :value="input" @input="update"></textarea>
      <div v-html="compiledMarkdown"></div>
    </div>      -->
              </v-col>

              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-text-field
                  v-model="initDeposit"
                  outlined
                  label="Initial Deposit (ubcna)"
                  required
                />
              </v-col>

              <v-col
                v-if="propType === 'Community Pool Spend Proposal'"
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="amountSpend"
                  outlined
                  label="Amount spend"
                  required
                />
              </v-col>
              <v-col
                v-if="propType === 'Community Pool Spend Proposal'"
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="receivingAddress"
                  outlined
                  label="Receiving address"
                  required
                />
              </v-col>
              <!-- <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="proposer" outlined label="Proposer" required></v-text-field>
              </v-col> -->

              <v-col
                v-if="propType === 'Software Upgrade Proposal'"
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="upgradeName"
                  outlined
                  label="Upgrade Name"
                  required
                />
              </v-col>
              <v-col
                v-if="propType === 'Software Upgrade Proposal'"
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="upgradeHeight"
                  outlined
                  label="Upgrade Height"
                  required
                />
              </v-col>
              <v-col
                v-if="propType === 'Software Upgrade Proposal'"
                cols="12"
                sm="12"
                md="12"
              >
                <v-text-field
                  v-model="upgradeInfo"
                  outlined
                  label="Upgrade Info"
                  required
                />
              </v-col>

              <v-col
                v-if="propType === 'Parameter Change Proposal'"
                cols="12"
                sm="4"
                md="4"
              >
                <v-text-field
                  v-model="amountSpend"
                  outlined
                  label="Subspace"
                  required
                />
              </v-col>
              <v-col
                v-if="propType === 'Parameter Change Proposal'"
                cols="12"
                sm="4"
                md="4"
              >
                <v-text-field
                  v-model="receivingAddress"
                  outlined
                  label="Key"
                  required
                />
              </v-col>
              <v-col
                v-if="propType === 'Parameter Change Proposal'"
                cols="12"
                sm="4"
                md="4"
              >
                <v-text-field
                  v-model="receivingAddress"
                  outlined
                  label="Value"
                  required
                />
              </v-col>
            </v-row>
            <span 
              v-for="(textField, i) in textFields"              
              :key="i"
            >
              <!-- <v-text-field
              :label="textField.label1"
              v-model="textField.value1"
              ></v-text-field>

              <v-text-field
              :label="textField.label2"
              v-model="textField.value2"
              ></v-text-field> -->
              <v-row>
                <v-col
                  v-if="propType === 'Parameter Change Proposal'"
                  cols="12"
                >
                  <v-btn
                    class="error"
                    @click="remove(i)"
                  >
                    <v-icon large> mdi-delete-forever-outline </v-icon>
                  </v-btn>
                </v-col>
                <v-col
                  v-if="propType === 'Parameter Change Proposal'"
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    v-model="amountSpend"
                    outlined
                    label="Subspace"
                    required
                  />
                </v-col>
                <v-col
                  v-if="propType === 'Parameter Change Proposal'"
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    v-model="receivingAddress"
                    outlined
                    label="Key"
                    required
                  />
                </v-col>
                <v-col
                  v-if="propType === 'Parameter Change Proposal'"
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    v-model="receivingAddress"
                    outlined
                    label="Value"
                    required
                  />
                </v-col>
              </v-row>
            </span>
            <v-btn
              v-if="propType === 'Parameter Change Proposal'"
              @click="add"
            >
              add
            </v-btn>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />

          <v-btn
            color="#00b786"
            @click="createProposalv1Beta"
          >
            Submit proposal
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import axios from "axios";
import { useAppStore } from '@/store/app'
import cosmosConfig from '../cosmos.config'
import { selectSigner, calculFee } from "../libs/signer";
import {
  SigningStargateClient,
  defaultRegistryTypes,
  GasPrice,
  assertIsDeliverTxSuccess,
} from "@cosmjs/stargate";
import { Registry, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

import { Any } from "cosmjs-types/google/protobuf/any";
import { TextProposal } from "cosmjs-types/cosmos/gov/v1beta1/gov"; 
import { MsgExecLegacyContent } from "cosmjs-types/cosmos/gov/v1/tx"; 

export default {
  name: 'App', 
  data: () => ({
    search: '',
        // New
        propType: "",
    propText: "",
    propTitle: "",
    proposer: "",
    amountSpend: "",
    receivingAddress: "",
    initDeposit: "10000000",
    isSend: false,
    items: [
      "Text Proposal",
      "Community Pool Spend Proposal",
      //'Community Pool Spend Proposal With Deposit',
      "Software Upgrade Proposal",
      "Parameter Change Proposal",
    ],
  }),
  setup() {
    const store = useAppStore()  
    return {
      store
    }
  }, 
  async mounted() {
    console.log(defaultRegistryTypes)
    
  },
  methods: {
    async createProposalv1Beta() {

   
      //let signer = await selectSigner(this.store.setChainSelected)   
      let signer = await selectSigner(this.store.setChainSelected)

      const foundMsgType = defaultRegistryTypes.find(
        (element) =>
          element[0] ===
          "/cosmos.gov.v1.MsgSubmitProposal"
      );
      console.log(foundMsgType) // /cosmos.gov.v1.MsgSubmitProposal
      console.log(MsgExecLegacyContent) // /cosmos.gov.v1.MsgSubmitProposal
      
 
/*         finalMsg = {
          typeUrl: foundMsgType[0],
          value: foundMsgType[1].fromPartial({
            content: Any.fromPartial({
              typeUrl: "/cosmos.gov.v1beta1.TextProposal",
              value: Uint8Array.from(
                TextProposal.encode(textProposal).finish()
              ),
            }),
            proposer: signer.accounts[0].address,
            initialDeposit: initialDeposit,
          }),
        }; */
        const getAuthority = await axios(cosmosConfig[this.store.setChainSelected].apiURL + `/cosmos/auth/v1beta1/module_accounts`)
        let find = getAuthority.data.accounts.find(element => element.name === 'gov')
        
        let finalMsgs = {};
        if (this.propType === "Text Proposal") {
          const TextProposalFinal = {
            typeUrl: "/cosmos.gov.v1beta1.TextProposal",
            value: TextProposal.encode(TextProposal.fromPartial({
              title: 'Test proposal gov.v1 LegacyContent',
              description: 'Test proposal gov.v1 LegacyContentTest proposal gov.v1 LegacyContentTest proposal gov.v1 LegacyContentTest proposal gov.v1 LegacyContentTest proposal gov.v1 LegacyContentTest proposal gov.v1 LegacyContentTest proposal gov.v1 LegacyContent',
            })).finish()
          }
          finalMsgs = {
            typeUrl: "/cosmos.gov.v1.MsgExecLegacyContent",
            value: MsgExecLegacyContent.encode(MsgExecLegacyContent.fromPartial({
              content: TextProposalFinal,
              authority: find.base_account.address,
            })).finish()
          } 
          console.log('finalMsgs', finalMsgs)
        }
      if (this.propType === "Community Pool Spend Proposal") {
 
      }
      if (this.propType === "Software Upgrade Proposal") {
      
      }



        let deposite = {  
              denom: cosmosConfig[this.store.setChainSelected].coinLookup.chainDenom,
              amount: "10000000" 
        }
        const finalMsgsBroadcast = {
          typeUrl: foundMsgType[0],
          value: foundMsgType[1].fromPartial({
            messages: [finalMsgs],
            initialDeposit: [deposite],
            proposer: signer.accounts[0].address,
            metadata: "Test proposal gov.v1 LegacyContent",
            title: "Test proposal gov.v1 LegacyContent",
            summary: "Test proposal gov.v1 LegacyContent",
          }),
        }     
        console.log('/cosmos.gov.v1.MsgSubmitProposal', finalMsgsBroadcast)  

      try {
          const result = await signer.client.signAndBroadcast(signer.accounts[0].address, [finalMsgsBroadcast], 'auto', '')
          assertIsDeliverTxSuccess(result)
          console.log(result)
          this.txResult = result
          this.step3 = false;
          this.step4 = true;
        } catch (error) {
          console.error(error);
          this.step3 = false;
          this.step2 = true;
        }  
    }
  }
}
</script>