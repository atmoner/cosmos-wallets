<template> 
  
    <v-row  v-if="txStatus !== 0" no-gutters>
      <v-col>
        <v-alert
          variant="outlined"
          type="error"
          title="Transaction failed"
          prominent
          border="top"
          class="ma-2 pa-2"
        >
        {{ txMsgStatus }}
        </v-alert>
      </v-col>
    </v-row>
     <v-row no-gutters>
      <v-col>
        <v-sheet border class="ma-2 pa-2" rounded="lg">
          <h3 class="ma-2">
            <v-icon
              :color="foundChain.color"
              icon="mdi-state-machine"
              class="mr-2"
            ></v-icon>            
            Tx status</h3>
          <v-divider /> 
          <span v-if="txStatus !== 0">
            <p class="mt-6 text-right">
              <v-icon
                color="red-darken-2"
                icon="mdi-close-thick"
                class="mr-2"
              ></v-icon>
              Failed
            </p>
            
          </span>
          <span v-else>
            <p class="mt-6 text-right">
              <v-icon
                color="green-darken-2"
                icon="mdi-check-bold"
                class="mr-2"
              ></v-icon>
              Success
            </p>
          </span>  
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet border class="ma-2 pa-2" rounded="lg">
          <h3 class="ma-2">            
            <v-icon
              :color="foundChain.color"
              icon="mdi-counter"
              class="mr-2"
            ></v-icon>  
            Total messages</h3>
          <v-divider /> 
            <p class="mt-6 text-right">
              {{ totalMessages }}
              <strong :style="'color:' + foundChain.color">
                messages
              </strong>                  
            </p>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet border class="ma-2 pa-2" rounded="lg">
          <h3 class="ma-2">              
            <v-icon
              :color="foundChain.color"
              icon="mdi-calendar-range"
              class="mr-2"
            ></v-icon>               
            Date transaction</h3>
          <v-divider /> 
            <p class="mt-6 text-right">

              {{ txData.tx_response?.timestamp }}
            </p>
        </v-sheet>
      </v-col>
    </v-row>

     <v-row no-gutters>
      <v-col>
        <v-sheet border class="ma-2 pa-2" min-height="300" rounded="lg">
          <h3 class="ma-2 pa-2">
            <v-icon
              :color="foundChain.color"
              icon="mdi-information-outline"
              class="mr-2"
            ></v-icon>           
            Tx Info
          </h3>
          <v-divider />
          <v-table>
            <tbody>
              <tr>
                <td>Tx hash</td>
                <td>{{ txHash }}</td>
              </tr>
              <tr
                v-for="(value, key) in txData.tx?.body.messages[0]"
                :key="key"                
              >    
                          
                <td>
                  
                  {{ key }}
                

                </td>
                <td v-if="key === 'amount'">{{ value[0]?.amount / 1000000 }} 
                  <strong :style="'color:' + foundChain.color">
                    {{ foundChain.coinLookup.viewDenom }}
                  </strong>
                </td>
                <td v-else-if="key === 'allowance'">
                  <v-table>
                    <tbody>                      
                      <tr>
                        <td>Fee allowance type</td>
                        <td>{{ value['@type'] }}</td>
                      </tr>
                      <tr>
                        <td>Spend limit</td>
                        <td>
                          {{ value.spend_limit[0].amount / 1000000 }}
                          <strong :style="'color:' + foundChain.color">
                            {{ foundChain.coinLookup.viewDenom }}
                          </strong>                        
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </td>
                <td v-else-if="key === 'token'">
                  {{ value.amount / 1000000 }}
                  <strong :style="'color:' + foundChain.color">
                    {{ foundChain.coinLookup.viewDenom }}
                  </strong>
                </td>
                <td v-else-if="key === 'timeout_height'">
                  revision number: {{ value.revision_number  }} / revision height: {{ value.revision_height }} 
                </td>
                 

                <td v-else>{{ value }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet border class="ma-2 pa-2" min-height="300" rounded="lg">
          <h3 class="ma-2 pa-2">
            
            <v-icon
              :color="foundChain.color"
              icon="mdi-currency-usd"
              class="mr-2"
            ></v-icon>                
            Tx Fee</h3>
          <v-divider />
          <v-table>
            <tbody>
              <tr
                v-for="(value, key) in txData.tx?.auth_info.fee"
                :key="key"                
              >    
                          
                <td v-if="key === 'amount'">Amount Fee</td> 
                <td v-else-if="key === 'gas_limit'">Gas wanted / Gas used</td> 
                <td v-else-if="key === 'payer'">Payer</td> 
                <td v-else-if="key === 'granter'">Granter</td> 
                <td v-else>{{ key }}</td>

                <td v-if="key === 'amount'">{{ value[0].amount / 1000000 }} 
                  <strong :style="'color:' + foundChain.color">
                    {{ foundChain.coinLookup.viewDenom }}
                  </strong>                
                </td>
                <td v-else-if="key === 'gas_limit'">
                  {{ txData.tx_response.gas_wanted }} / {{ txData.tx_response.gas_used }}
              
                </td>
                <td v-else>{{ value }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-sheet>
      </v-col>
    </v-row>
    <!-- <v-row no-gutters>
      <v-col>
        <v-sheet border class="ma-2 pa-2" min-height="300" rounded="lg">
          <h3 class="ma-2 pa-2">Tx Fee</h3>
          <v-divider />
 
          <div class="text-center d-flex pb-4">
            <v-btn class="ma-2" @click="all">
              All
            </v-btn>
            <v-btn class="ma-2" @click="none">
              None
            </v-btn>
          </div>

          <div class="pb-4">v-model {{ panel }}</div>

          <v-expansion-panels
            v-model="panel"
            multiple
          >
            <v-expansion-panel
              v-for="(item, i) in txData.tx?.body.messages"
              :title="item['@type']"
              :text="item.delegator_address"
              :value="i"
            > </v-expansion-panel>
          </v-expansion-panels>
      
        </v-sheet>
      </v-col> 
    </v-row> -->

    <v-sheet border class="ma-2 pa-2" min-height="100" rounded="lg">        
      <h3 class="ma-2 pa-2">Json transaction</h3>
      <v-divider />      
      <!-- detail tx {{ txHash }} - {{ chain }}
      txData: 
      <pre>{{ txData }}</pre>  -->
 
      <json-viewer :value="txData" theme="jv-dark"></json-viewer>
    </v-sheet>
 
</template>
<script>
import axios from "axios";
import { useAppStore } from '@/store/app' 
import cosmosConfig from '../cosmos.config'
import JsonViewer from 'vue-json-viewer'
import { setMsgTx } from "../libs/msgTypeTx";

export default {
  name: 'DetailTx',
  components: {
    JsonViewer,
  },
  data: () => ({
    txHash: '',
    chain: '',
    foundChain: '',
    txData: '',
    totalMessages: 0,
    txStatus: '',
    txMsgStatus: '',
    panel: [],
    formatedData: [],
  }),
  setup() {
    const store = useAppStore() 
    return {
      store
    }
  },
  async created() {
    this.txHash = this.$route.params.txhash;  
    this.chain = this.$route.params.chain;  
    const found = cosmosConfig.find(element => element.slot === this.chain);
    this.foundChain = found

    const allProposals = await axios(
      found.apiURL + '/cosmos/tx/v1beta1/txs/' + this.txHash
    ); 
    console.log(allProposals.data);
    this.txData = allProposals.data
    this.totalMessages = allProposals.data.tx.body.messages.length
    this.txStatus = allProposals.data.tx_response.code
    this.txMsgStatus = allProposals.data.tx_response.raw_log

    this.formatedData = setMsgTx(this.txData, this.foundChain)
  },
  methods: { 
    formatDate(dateString) {
            const date = new Date(dateString);
                // Then specify how you want your dates to be formatted
            return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(date);
        }
  }
}
</script>
