<template> 
  
  <v-row  no-gutters>
    <v-col>
      <v-sheet border class="ma-2 pa-2" rounded="lg">
        <v-table>
          <tbody>
            <tr >
              <td>Total Supply</td>
              <td>
                {{ formatNum((store.totalSupply / 1000000)) }} 
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                  {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                </strong> 
                
              </td>
              <td> 
                ${{ formatNum(store.totalSupplyPrice) }}
              </td>
            </tr>
            <tr >
              <td>communityPool</td>
              <td>
                {{ formatNum(store.communityPool) }} 
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                  {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                </strong> 
                
              </td>
              <td> 
                 <!-- {{ store }} -->
              </td>
            </tr>
            
          </tbody>
        </v-table>
      </v-sheet>
    </v-col>
  </v-row>
</template> 
<script>
import { useAppStore } from '@/store/app'
import cosmosConfig from '../cosmos.config' 

export default {
  data: () => ({
    cosmosConfig: cosmosConfig,
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