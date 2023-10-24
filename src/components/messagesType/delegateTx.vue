<template>
  <v-container>
    <v-row class="mt-4">
      <v-spacer></v-spacer>
 

      <v-col 
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

        <v-select
          v-model="valSelected"
          :items="allValSelect"
          item-title="text"
          item-value="value"
          label="To validator"
          return-object
          required
          outlined
        ></v-select>
        <!--<v-text-field
          label="To validator"
          required
          outlined
        ></v-text-field>-->
        <v-text-field
          v-model="amount"
          label="Amount"
          suffix=""
          required
          outlined
        ></v-text-field>
        <v-btn
          elevation="2"
          @click="checkMsg"
        >Check message</v-btn>
        <span v-if="showValidateData">

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
import { selectSigner, calculFee } from "../../libs/signer";
import cosmosConfig from '../../cosmos.config' 
import { useAppStore } from '@/store/app'

export default {
    props: ['from'],
 
    data (props) {
      return { 
        selectPolicy: props.from, 
        allValSelect: [],
        valSelected: '',
        amount: '',
      }
    },
    setup() {
    const store = useAppStore()  
    return {
      store
    }
  }, 
  async mounted () {
    let allValSelect = this.allValSelect
    this.store.allValidators.forEach(async (item) => {
      allValSelect.push({ text: item.description.moniker, value: item.operator_address })
    })
  },
  methods: {
      async checkMsg() {
        this.showValidateData = true
        console.log('checkMsg', this.selectPolicy, this.valSelected, this.amount)
        if (this.selectPolicy !== '' && this.valSelected !== '' && this.amount !== '' ) {
          this.validateData = true

          

        let signer = await selectSigner(this.store.setChainSelected)
        const foundMsgType = defaultRegistryTypes.find(
            (element) =>
              element[0] ===
              "/cosmos.staking.v1beta1.MsgDelegate"
          );
 
          const finalAmount =  {
              denom: cosmosConfig[this.store.setChainSelected].coinLookup.chainDenom,
              amount: (this.amount * 1000000).toString(),
          }
          const finalMsg = {
          typeUrl: foundMsgType[0],
            value: foundMsgType[1].encode(foundMsgType[1].fromPartial({
              delegatorAddress: this.selectPolicy,
              validatorAddress: this.valSelected.value,
              amount: finalAmount,
            })).finish()
          }     
          console.log('delegateTx', finalMsg)
          this.store.addGroupMessage(finalMsg)
 
        } else
          this.validateData = false

      },
    }
} 
/* import { mapState } from 'vuex'
import axios from 'axios'
import { coins } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { cosmos, cosmosProtoRegistry, cosmosAminoConverters } from 'interchain46';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import pkg from 'protobufjs';
const { Type, Field } = pkg;
import cosmosConfig from '~/cosmos.config'

  export default {
    props: ['from'],
    components: {
      VueJsonPretty,
    },
    data (props) {
      return {
        dialog: false,
        selectPolicy: props.from,
        valSelected: '',
        allValSelect: [],
        amount: '',
        viewJson: false,
        jsonData: '',
        validateData: false,
        showValidateData: false,
        cosmosConfig: cosmosConfig
      }
    },
    watch: {
      from(newData, oldData) {
        this.selectPolicy = newData
      },
      viewJson(newData, oldData) {
        const { delegate } = cosmos.staking.v1beta1.MessageComposer.withTypeUrl;

        const msgDelegate = delegate(
            {
              delegatorAddress: this.selectPolicy,
              validatorAddress: this.valSelected,
              amount:[{ "denom": cosmosConfig[0].coinLookup.chainDenom, "amount": this.amount }]
            }
        )
        console.log(msgDelegate)
        this.jsonData = msgDelegate
      },
    },
    computed: {
      ...mapState('data', [`allValidators`])
    },
    async mounted () {
      await this.$store.dispatch('data/getAllValidator')

      let allValSelect = this.allValSelect
      this.allValidators.forEach(async (item) => {
        allValSelect.push({ text: item.description.moniker, value: item.operator_address })
      })
    },
    methods: {
      async checkMsg() {
        this.showValidateData = true
        if (this.selectPolicy !== '' && this.valSelected !== '' && this.amount !== '' ) {
          this.validateData = true
          console.log(cosmos.staking.v1beta1)
          const { delegate } = cosmos.staking.v1beta1.MessageComposer.withTypeUrl;
          const {
              MsgDelegate
          } = cosmos.staking.v1beta1;

          const convertAmount = Number(this.amount).toFixed(2) * 1000000
          const amount = {
            denom: cosmosConfig[0].coinLookup.chainDenom,
            amount: convertAmount.toString(),
          }

          const msgDelegate = delegate(
              MsgDelegate.encode(MsgDelegate.fromPartial({
                delegatorAddress: this.selectPolicy,
                validatorAddress: this.valSelected,
                amount: amount
              })).finish()
          )

          console.log(amount)

          await this.$store.dispatch('data/formatFinalMsgProp', msgDelegate)
        } else
          this.validateData = false
      },
    }
  } */
</script>
