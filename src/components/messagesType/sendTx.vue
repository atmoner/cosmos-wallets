<template>
  <v-container>
    <v-row class="mt-4">
      <v-spacer></v-spacer>
      {{ selectPolicy }}
      <v-col
        v-if="viewJson"
        cols="12"
        sm="12"
        md="12"
      >
        <vue-json-pretty :data="jsonData" show-line show-line-number show-length show-icon />
      </v-col>

      <v-col
        v-if="!viewJson"
        cols="12"
        sm="12"
        md="12"
      >

        <v-text-field
          v-model="selectPolicy"
          label="From address"
          required
          outlined
          disabled
        ></v-text-field>
        <v-text-field
          v-model="toAddress"
          label="To address"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="amount"
          label="Amount" 
          required
          outlined
        ></v-text-field>
        <v-btn
          elevation="2"
          @click="checkMsg"
        >Check message</v-btn>
        <span v-if="showValidateData">
        {{ finalMsgProp }}
          <v-icon
            v-if="validateData"
            color="teal"
          >
            mdi-check
          </v-icon>

          <v-icon
            v-else
            color="red"
          >
            mdi-alert-circle
          </v-icon>
        </span>
        </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {
  defaultRegistryTypes,
  assertIsDeliverTxSuccess,
  SigningStargateClient,
  GasPrice,
  calculateFee,
} from "@cosmjs/stargate";
import {
  coin,
  coins,
} from "@cosmjs/proto-signing";
import bech32 from "bech32";
import { selectSigner, calculFee } from "../../libs/signer";
import { useAppStore } from '@/store/app'
import cosmosConfig from '../../cosmos.config' 
 
  export default {
    props: ['from'],
 
    data (props) {
      return {
        dialog: false,
        selectPolicy: props.from,
        toAddress: '',
        amount: '',
        viewJson: false,
        jsonData: '',
        validateData: false,
        showValidateData: false, 
      }
    },
    setup() {
      const store = useAppStore()
      return {
        store
      }
    },   
    mounted () {
      console.log('mounted')
      console.log('mounted', this.from)
    },
    computed: { 
    },
    watch: {
 
    },
    methods: {
      async checkMsg() {
        this.showValidateData = true
        if (this.selectPolicy !== '' && this.toAddress !== '' && this.amount !== '' ) {
          this.validateData = true

        let signer = await selectSigner(this.store.setChainSelected)
        const foundMsgType = defaultRegistryTypes.find(
            (element) =>
              element[0] ===
              "/cosmos.bank.v1beta1.MsgSend"
          );
          
          const amount = coins(this.amount, cosmosConfig[this.store.setChainSelected].coinLookup.chainDenom);
          const finalMsg = {
          typeUrl: foundMsgType[0],
            value: foundMsgType[1].fromPartial({
              fromAddress: this.selectPolicy,
              toAddress: this.toAddress,
              amount: amount,
            }),
          }     
          console.log('sendTx', finalMsg) 
          
          this.store.addGroupMessage(finalMsg)
          // await this.$store.dispatch('data/formatFinalMsgProp', msgSend)
        } else
          this.validateData = false

      },
    }
  }
</script>
