<template> 
  <v-row no-gutters>
    <v-col
        cols="12"
        sm="4"
      >
        <v-sheet border class="ma-2 pa-2" rounded="lg">
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="6"
            >
              <v-sheet class="text-h6 pa-2">
                Price
              </v-sheet>
            </v-col> 
          </v-row>      
          <v-row no-gutters>  
            <v-col
              cols="12"
              sm="12"
              class="text-end"
            >
              <v-sheet class="pa-2">
                
 $ <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ store.chainSelectedPrice }}</strong>
              </v-sheet>              
            </v-col>
          </v-row>  
        
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
        <v-sheet border class="ma-2 pa-2" rounded="lg">
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="6"
            >
              <v-sheet class="text-h6 pa-2">
                Total delegated
              </v-sheet>
            </v-col> 
          </v-row>      
          <v-row no-gutters>  
            <v-col
              cols="12"
              sm="12"
              class="text-end"
            >
              <v-sheet class="pa-2">
                
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ parseFloat(store.totalDelegations) }}</strong>   {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                 / $ <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ parseFloat(store.totalDelegations) * store.chainSelectedPrice }}</strong>
              </v-sheet>              
            </v-col>
          </v-row>  
        
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
        <v-sheet border class="ma-2 pa-2" rounded="lg">
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="6"
            >
              <v-sheet class="text-h6 pa-2">
                Total rewards
              </v-sheet>
            </v-col> 
          </v-row> 
          <v-row no-gutters>  
            <v-col
              cols="12"
              sm="12"
              class="text-end"
            >
              <v-sheet class="pa-2">
              <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ parseFloat(store.totalRewards) }}</strong>
                {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }} / $ <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ store.totalRewards * store.chainSelectedPrice }}</strong>              
              </v-sheet>
                           
            </v-col>
          </v-row>  
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
      <v-sheet border class="ma-2 pa-2" rounded="lg">
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="6"
            >
              <v-sheet class="text-h6 pa-2">
                My total delegations: <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                 {{ store.totalMyValidators }} </strong> 
              </v-sheet>
            </v-col> 
          </v-row> 
          <v-row no-gutters>  
            <v-col
              cols="12"
              sm="12"
              class="text-end"
            >
              <v-sheet class="pa-2">
               
                 Name supply vote
                
              </v-sheet>              
            </v-col>
          </v-row>  
        </v-sheet>
      </v-col>

      <v-col
        cols="12"
        sm="4"
      >
      <v-sheet border class="ma-2 pa-2" rounded="lg">
          <v-row no-gutters>
          
              <v-sheet class="text-h6 pa-1 text-left">
                Estimated {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }} Staking Rewards</v-sheet>
            
          </v-row> 
          <v-row no-gutters>  
            <v-col
              cols="12"
              sm="12"
              class="text-left"
            >
              <v-sheet class="pa-2">
                <!--<br>Inflation: <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ store.Inflation }}</strong>-->
              </v-sheet>- Yearly:
              <v-sheet class="pa-2">
               <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ (store.totalDelegations * 18.90)/100 }}</strong>
                 = $ <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ ((store.totalDelegations * 18.90)/100) * store.chainSelectedPrice }}</strong>              
              </v-sheet>- Monthly:              
              <v-sheet class="pa-2">
               <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ ((store.totalDelegations * 18.90)/100)/12 }}</strong>
                 = $ <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ (((store.totalDelegations * 18.90)/100)/12) * store.chainSelectedPrice }}</strong>              
              </v-sheet>- Weekly:
              <v-sheet class="pa-2">
               <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ ((store.totalDelegations * 18.90)/100)/52 }}</strong>
                = $ <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ (((store.totalDelegations * 18.90)/100)/52) * store.chainSelectedPrice }}</strong>              
              </v-sheet> 
              
               
            </v-col>
            
          </v-row>  
        </v-sheet>
        
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
      <v-sheet border class="ma-2 pa-2" rounded="lg">
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="6"
            >
              <v-sheet class="text-h6 pa-2">
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ store.countAllValidators }}</strong> Validators 
              </v-sheet>
            </v-col> 
          </v-row> 
          <v-row no-gutters>  
            <v-col
              cols="12"
              sm="12"
              class="text-left"
            >
              <v-sheet class="pa-2">
                CommunityPool: <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ store.communityPool }}</strong> {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                <br>Total supply: <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ store.totalSupply }} </strong> {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                <br>Total supply price: $ <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ store.totalSupplyPrice }}</strong> 
                <br>Totalsupplybonded: <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ store.bondedTokens }}</strong> {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}

                <br>Infaltion: <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ store.finalInflation }}</strong> %

              </v-sheet>              
            </v-col>
            
          </v-row>  
        </v-sheet>
        
      </v-col>
<!--     <v-col         
      cols="12"
      sm="12"
    >
    
    <v-table class="ma-2 pa-2" rounded="lg" style="border-radius: 7px;">
      
      <thead class="">
        <tr>
          <th class="text-left ">
            Name
          </th>
          <th class="text-left">
            Delegated
          </th>
          <th class="text-left">
            Comission
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in store.allValidators" 
          :key="item.moniker"
          
        >
          <td>{{ item.description.moniker }}</td>
          <td>{{ item.tokens / 1000000 }}</td>
          <td>{{ item.commission.commission_rates.rate * 100 }} %</td>
        </tr>
      </tbody>
    </v-table> 
    </v-col>  -->
    <v-col         
      cols="12"
      sm="12"
    > 
    <v-card class="ma-2 pa-2" >
    <v-card-title>
      Search {{ cosmosConfig[store.setChainSelected].name }} validators<br /><br />
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search" 
        variant="outlined"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <!-- {{ store.allValidators  }} -->
    <v-data-table
      rounded="lg" style="border-radius: 7px;"
      :headers="headers"
      :items="store.allValidators"
      :search="search"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.columns['description.moniker'] }}</td>
          <td>{{ item.columns['commission.commission_rates.rate'] * 100 }}%</td>
          <td>{{ item.columns['tokens'] / 1000000 }}</td>
          <td>{{ item.columns['description.website'] }}</td> 
        </tr>
      </template> 
    </v-data-table>
  </v-card>
</v-col> 
  </v-row>
</template>

<script>
import { useAppStore } from '@/store/app'
import cosmosConfig from '../cosmos.config'

export default {
  name: 'App', 
  data: () => ({
    cosmosConfig: cosmosConfig,
    search: '',
    headers: [
      {
        align: 'start',
        key: 'description.moniker',
        sortable: false,
        title: 'Moniker', 
      },
      { key: 'commission.commission_rates.rate', title: 'Commission' },
      { key: 'tokens', title: 'Bounded' },
      { key: 'description.website', title: 'Website' } 
    ],
    desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: 1,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: 1,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: 7,
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: 8,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: 16,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: 0,
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: 2,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: 45,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: 22,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: 6,
          },
        ],
  }),
  setup() {
    const store = useAppStore() 
    return {
      store
    }
  },
  computed: {

  },
  methods: {
 
    truncateString(str, num) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
  }
}   
</script>
<style> 
 
</style>
