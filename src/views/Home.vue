<template> 

  <v-row no-gutters>
    <v-col
      cols="12"
      sm="6"
    >    

      <!-- Wallet Value -->

      <v-sheet border class="ma-2 pa-2" rounded="lg">
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="6"
          >
            <v-sheet class="text-h6 pa-2">
              My Wallet value
            </v-sheet>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-sheet class="text-right text-h6 pa-2">
              ${{ formatNum(store.fiatWalletValue) }} 
            </v-sheet>
          </v-col>

        </v-row> 
      </v-sheet>

    </v-col>

    <v-col
      cols="12"
      sm="6"
    >    

      <!-- Total tokens -->

      <v-sheet border class="ma-2 pa-2" rounded="lg">
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="6"
          >
            <v-sheet class="text-h6 pa-2">
              My total tokens
            </v-sheet>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-sheet class="text-right text-h6 pa-2">
              {{ formatNum(store.totalTokens) }} 
              <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
              </strong>            
            </v-sheet>
          </v-col>

        </v-row> 
      </v-sheet>

    </v-col>

    <v-col
      cols="12"
      sm="4"
    > 

      <!-- Wallet Distribution -->

      <v-sheet border min-height="400" class="ma-2 pa-2" rounded="lg">
        <v-sheet class="text-h6 pa-2">
              Wallet distridution
            <div class="text-right">

            </div>
        </v-sheet>

        <v-row no-gutters>
          <v-col
            cols="12"
            sm="6"
          >

          </v-col> 
        </v-row>      
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="6" 
          >
            <v-sheet class="pa-2 mt-4 mb-4">
              Total wallet value
            </v-sheet>
            <v-sheet class="pa-2">
              Spendable Balances
            </v-sheet>
            <v-sheet class="pa-2">
              Delegated
            </v-sheet>
            <v-sheet class="pa-2">
              Undelegated
            </v-sheet>
            <v-sheet class="pa-2">
              Redelegated
            </v-sheet>
            <v-sheet class="pa-2">
              Rewards
            </v-sheet>
            <v-sheet v-if="store.isValidator" class="pa-2">
              Validator Rewards
            </v-sheet>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="text-end"
          >
            <v-sheet class="pa-2 mt-4 mb-4">
              ${{ formatNum((store.fiatWalletValue)) }} 
            </v-sheet>
            <v-sheet class="pa-2">
              {{ formatNum(store.spendableBalances) }} 
              <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
              </strong>
            </v-sheet>
            <v-sheet class="pa-2">
              {{ formatNum(store.totalDelegations) }} 
              <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
              </strong> 
            </v-sheet>
            <v-sheet class="pa-2">
              {{ formatNum(store.totalUnbound) }} 
              <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
              </strong>
            </v-sheet>
            <v-sheet class="pa-2">
              {{ formatNum(0) }} 
              <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
              </strong>
            </v-sheet> 
            <v-sheet class="pa-2">
              {{ formatNum(store.totalRewards) }} 
              <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
              </strong>
            </v-sheet>     
            <v-sheet v-if="store.isValidator" class="pa-2">
              {{ store.myValidatorReward }} 
              <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
              </strong>
            </v-sheet>            
          </v-col>
        </v-row>  
      
      </v-sheet>

    </v-col>

    <v-col
      cols="12"
      sm="4"
    >

      <!-- Available repartition donut -->

      <v-sheet border min-height="400" class="ma-2 pa-2" rounded="lg">
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="6"
          >
            <v-sheet class="text-h6 pa-2">
              Available repartition
            </v-sheet>

          </v-col> 
        </v-row>   
        <v-row no-gutters justify="center">
          <v-col
            cols="12" 
          > 

            <homeChart 
              :balance="balance" 
              :totalDelegations="totalDelegations"
              :totalUnbound="totalUnbound"
              :totalRewards="totalRewards"
            />
          </v-col> 
        </v-row>  
      </v-sheet>

      </v-col>

      <v-col
        cols="12"
        sm="4"
      >

        <!-- Quick Action-->

        <v-sheet border min-height="400" class="ma-2 pa-2" rounded="lg">

          <!-- Title -->

            <v-row no-gutters>
              <v-col
                cols="12"
                sm="6"
              >
                <v-sheet class="text-h6 pa-2">
                  Quick actions
                </v-sheet>
              </v-col> 
            </v-row>

            <v-row no-gutters>
              <v-col
                cols="12"
                sm="12"
              >

                <v-list lines="one">

                  <!-- To claim -->

                  <v-list-item
                    title="To claim"
                    :subtitle="store.totalRewards + ' ' + cosmosConfig[store.setChainSelected].coinLookup.viewDenom"
                    class="mb-2"
                  >
                    <template v-slot:prepend>                    
                      <v-avatar>
                        <v-icon size="32" :color="cosmosConfig[store.setChainSelected].color">mdi-download</v-icon>
                      </v-avatar>
                    </template>
                    <template v-slot:append> 
                      <actionsModals type="getRewards" />
                    </template>
                  </v-list-item> 

                  <v-divider></v-divider>

                  <!-- Available -->

                  <v-list-item
                    title="Available"
                    :subtitle="store.spendableBalances + ' ' + cosmosConfig[store.setChainSelected].coinLookup.viewDenom"
                    class="mb-2"
                  >
                    <template v-slot:prepend> 
                      <v-avatar>
                        <v-icon size="32"  :color="cosmosConfig[store.setChainSelected].color">mdi-send-circle-outline</v-icon> 
                      </v-avatar>
                    </template>
                    <template v-slot:append>
                      <actionsModals 
                        type="sendTokens" 
                        :spendableBalances="store.spendableBalances" 
                        :chain="cosmosConfig[store.setChainSelected]" 
                      /> 
                    </template>
                  </v-list-item> 

                  <v-divider></v-divider>

                  <!-- To delegate -->

                  <v-list-item
                    title="To delegate"
                    :subtitle="store.spendableBalances + ' ' + cosmosConfig[store.setChainSelected].coinLookup.viewDenom"
                    class="mb-2"
                  >
                    <template v-slot:prepend>
                      <v-avatar size="38" :color="grey">
                        <v-icon :color="cosmosConfig[store.setChainSelected].color">mdi-upload</v-icon>
                      </v-avatar>
                    </template>
                    <template v-slot:append>
                      <v-tooltip location="start" text="Soon">
                        <template v-slot:activator="{ props }">
                          <actionsModals 
                            type="delegate" 
                            :spendableBalances="store.spendableBalances" 
                            :chain="cosmosConfig[store.setChainSelected]" 
                          />                         
                          
                        </template>
                      </v-tooltip>
                    </template>
                  </v-list-item> 

                  <v-divider></v-divider>

                  <!-- Undelegate / Redelegate -->

                  <v-list-item
                    title="Undelegate / Redelegate"
                    :subtitle="store.totalDelegations + ' ' + cosmosConfig[store.setChainSelected].coinLookup.viewDenom"
                    class="mb-2"
                  >
                    <template v-slot:prepend>
                      <v-avatar size="38" :color="grey">
                        <v-icon>mdi-arrow-u-up-left-bold</v-icon>
                      </v-avatar>
                    </template>
                    <template v-slot:append>
                      <v-tooltip location="start" text="Soon">
                        <template v-slot:activator="{ props }">
                          <v-btn
                          :color="grey"
                            icon="mdi-arrow-u-up-left-bold"
                            variant="text" 
                            v-bind="props"
                          ></v-btn> 
                        </template>
                      </v-tooltip> 
                    </template>
                  </v-list-item>

                  <v-divider v-if="store.isValidator"></v-divider>

                  <!-- Claim validator rewards -->

                  <v-list-item
                    v-if="store.isValidator"
                    title="Validator rewards"
                    :subtitle="store.myValidatorReward + ' ' + cosmosConfig[store.setChainSelected].coinLookup.viewDenom"
                  >
                    <template v-slot:prepend>
                      <v-avatar size="32" :color="grey">
                        <v-icon>mdi-cash</v-icon>
                      </v-avatar>
                    </template>
                    <template v-slot:append>
                      <v-tooltip location="start" text="Soon">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            :color="grey"
                            icon="mdi-cash"
                            variant="text" 
                            v-bind="props"
                          ></v-btn> 
                        </template>
                      </v-tooltip>
                    </template>
                  </v-list-item> 

                </v-list>

              </v-col> 

            </v-row>         
        </v-sheet>

      </v-col>

      <v-col>
        <v-row no-gutters>
          <v-col               
            cols="12"
            sm="8"
          >
          
            <v-sheet border min-height="300" class="ma-2 pa-2" rounded="lg">
              <v-row no-gutters>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-sheet class="text-h6 pa-2">
                    Last transactions
                  </v-sheet>

                </v-col>
                
              </v-row>                
              <v-data-table
                rounded="lg" style="border-radius: 7px;"
                :headers="headers"
                :items="store.lastTransactions"
                :search="search"
              >
                <template v-slot:item="{ item }"> 
                  <tr>
                    <td>
                      <v-chip
                        class="ma-2"
                        :color="cosmosConfig[store.setChainSelected].color" 
                        label 
                        variant="outlined"
                        >{{ item.columns['titleMsg'] }}
                      </v-chip>  
                    </td>
                    <td>{{ formatDate(item.columns['timestamp']) }}</td> 
                    <td v-if="item.columns['finalData'].amount?.data.amount">
                      {{ formatNum(item.columns['finalData'].amount?.data.amount / 1000000) }} 
                      <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                        {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                      </strong>
                    </td>
                    <td v-else></td> 
                    <td> 
                      <v-icon v-if="item.columns['code'] === 0" color="success" icon="mdi-check-bold"></v-icon>
                      <v-icon v-else color="error" icon="mdi-close-thick"></v-icon> 
                    </td> 
                    <td>
                      <v-chip
                      :color="cosmosConfig[store.setChainSelected].color" 
                        class="ma-2"
                        label
                        :to="'/transactions/' + cosmosConfig[store.setChainSelected].slot + '/' + item.columns['txhash']"
                      >
                        View detail
                      </v-chip>                  
                    </td> 

                    
                  </tr>
                </template> 
              </v-data-table>
            </v-sheet>       
          </v-col>
          <v-col            
            cols="12"
            sm="4"
          >
            <v-sheet border min-height="300" class="ma-2 pa-2" rounded="lg">

              <v-row no-gutters>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-sheet class="text-h6 pa-2">
                    Last proposals
                  </v-sheet>
                </v-col> 
              </v-row>   

              <v-list>
                <v-list-item
                  v-for="item in store.allHomeProposals"
                  :key="item.proposal_id"
                  :title="'#' + item.proposal_id + ' ' + item.title"
                  :subtitle="item.description"
                  :class="getDotColorClass(item)" 
                />
              </v-list>

            </v-sheet>  
          </v-col>
        </v-row>

      </v-col>
  </v-row>
  
</template>

<script>
import Vue3autocounter from 'vue3-autocounter';
import { useAppStore } from '@/store/app'
import cosmosConfig from '../cosmos.config'
import homeChart from '@/components/charts/homeChart.vue'
import actionsModals from '@/components/actionsModals.vue'


export default {
  name: 'App', 
  components: { homeChart, actionsModals, Vue3autocounter },
  data: (store) => ({
    cosmosConfig: cosmosConfig,
    dialog: false,
    headers: [
      {
        align: 'start',
        key: 'titleMsg',
        sortable: false,
        title: 'Tx type', 
      },
      { key: 'finalData', title: 'Date' },
      { key: 'timestamp', title: 'Data' },
      { key: 'txhash', title: '' },
      { key: 'code', title: 'State' } 
    ],
  }),
  setup() {
    const store = useAppStore()
    console.log(store.spendableBalances) 

    return {
      store
    }
  },
  mounted() {
 
  },
  computed: {

  },
  methods: {
    getDotColorClass(item) {
      if (item.status === 'PROPOSAL_STATUS_PASSED') {
        return "colored-dot-green";
      } else if (item.status === 'PROPOSAL_STATUS_VOTING_PERIOD') {
        return "colored-dot-orange";
      } else if (item.status === 'PROPOSAL_STATUS_REJECTED') {
        return "colored-dot-red";
      }
    }, 
    truncateString(str, num) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    },
    formatDate(dateStr) {
      return Intl.DateTimeFormat("us-EN", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      }).format(new Date(dateStr))
    }, 
    formatNum(nombre){
      return new Intl.NumberFormat().format(nombre)
    }
  }
}   
</script>

<style scoped>
.colored-dot-green::before {
  content: "•";
  color: #00c853;
  font-size: 30px;
  margin-right: 8px;
}

.colored-dot-orange::before {
  content: "•";
  color: #ff9800;
  font-size: 30px;
  margin-right: 8px;
}

.colored-dot-red::before {
  content: "•";
  color: #f44336;
  font-size: 30px;
  margin-right: 8px;
}
</style>