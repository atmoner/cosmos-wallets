<template> 
  
  <v-row  no-gutters>
    <v-col>
      <v-sheet border class="ma-2 pa-2" rounded="lg">
        <h3 class="ma-2 pa-2">
            <v-icon
              :color="cosmosConfig[store.setChainSelected].color"
              icon="mdi-information-outline"
              class="mr-2"
            ></v-icon>           
            Chain info
        </h3>
        <v-divider />        
        <v-table>
          <tbody>
            <tr>
              <td>Total Supply</td>
              <td>
                {{ millify((store.totalSupply / 1000000)) }} 
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                  {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                </strong>                
              </td>
            </tr>  
            <tr>
              <td>Bonded Tokens</td>
              <td>
                {{ millify(store.poolStaking.bondedTokens / 1000000) }} 
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                  {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                </strong>                 
              </td>
            </tr>   
            <tr>
              <td>Community Pool</td>
              <td>
                {{ millify(store.communityPool) }} 
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                  {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                </strong>                 
              </td>
            </tr>
  
   
            
          </tbody>
        </v-table>
      </v-sheet>
      <v-sheet border class="ma-2 pa-2" rounded="lg">
        <h3 class="ma-2 pa-2">
            <v-icon
              :color="cosmosConfig[store.setChainSelected].color"
              icon="mdi-information-outline"
              class="mr-2"
            ></v-icon>           
            Chain distribution
        </h3>
        <v-divider /> 
        <statsChart 
          :bondedTokens="store.poolStaking.bondedTokens / 1000000" 
          :totalSupply="store.totalSupply / 1000000" 
        />
      </v-sheet>      
    </v-col>
    <v-col>
      <v-sheet border class="ma-2 pa-2" rounded="lg">
        <h3 class="ma-2 pa-2">
            <v-icon
              :color="cosmosConfig[store.setChainSelected].color"
              icon="mdi-information-outline"
              class="mr-2"
            ></v-icon>           
            Price stats
        </h3>
        <v-divider />
        <v-table>
          <tbody>
            <tr>
              <td>Token price</td>
              <td>                
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                  $
                </strong> {{ store.chainSelectedPrice }}             
              </td>
            </tr>  
            <tr>
              <td>Inflation</td>
              <td>
                {{ store.chainInflation }} 
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                  %
                </strong>                 
              </td>
            </tr>
            <tr>
              <td>24h price change</td>
              <td>
                {{ store.marketTokenInfo.market_data.price_change_percentage_24h }}       
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                  %
                </strong>           
              </td>
            </tr>          
          </tbody>
        </v-table>
      </v-sheet>
      <v-sheet border class="ma-2 pa-2" rounded="lg">
        <h3 class="ma-2 pa-2">
            <v-icon
              :color="cosmosConfig[store.setChainSelected].color"
              icon="mdi-information-outline"
              class="mr-2"
            ></v-icon>           
            Price stats
        </h3>
        <v-divider /> 
test
      </v-sheet>
    </v-col>    
    <v-col>
      <v-sheet border height="600" class="ma-2 pa-2" rounded="lg">
        <h3 class="ma-2 pa-2">
            <v-icon
              :color="cosmosConfig[store.setChainSelected].color"
              icon="mdi-information-outline"
              class="mr-2"
            ></v-icon>           
            Asset info
        </h3>
        <v-divider />     
      </v-sheet>
    </v-col>
  </v-row>
  <v-row  no-gutters>
    <v-col>
      <v-sheet border class="ma-2 pa-2" rounded="lg">
        <h3 class="ma-2 pa-2">
            <v-icon
              :color="cosmosConfig[store.setChainSelected].color"
              icon="mdi-information-outline"
              class="mr-2"
            ></v-icon>           
            Cumulative delegations
        </h3>
        <v-divider />     
        <cumulativeChat 
          :bondedTokens="store.poolStaking.bondedTokens / 1000000" 
          :totalSupply="store.totalSupply / 1000000"  
        />
      </v-sheet>
    </v-col>
  </v-row>  
</template> 
<script>
import millify from "millify";
import { useAppStore } from '@/store/app'
import cosmosConfig from '../cosmos.config' 
import statsChart from '@/components/charts/statsChart.vue'
import cumulativeChat from '@/components/charts/cumulativeChat.vue'

export default {
  components: { statsChart, cumulativeChat },
  data: () => ({
    cosmosConfig: cosmosConfig,
    millify: millify
  }),
  setup() {
    const store = useAppStore()
    console.log(store.spendableBalances) 

    return {
      store
    }
  },
  methods: {
    formatNum(nombre){
      return new Intl.NumberFormat().format(nombre)
    }
  },
}
</script>