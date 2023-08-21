<template> 
  <v-row no-gutters>
    <v-col
        cols="12"
        sm="4"
      >
        <v-sheet border class="ma-2 pa-2" rounded="lg" min-height="100">
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
                
 $ <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(store.chainSelectedPrice) }}</strong>
              </v-sheet>              
            </v-col>
          </v-row>  
        
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
        <v-sheet border class="ma-2 pa-2" rounded="lg" min-height="100">
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
                
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(store.totalDelegations) }}</strong>   {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                 / $ <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(store.totalDelegations * store.chainSelectedPrice) }}</strong> 
              </v-sheet>              
            </v-col>
          </v-row>  
        
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
        <v-sheet border class="ma-2 pa-2" rounded="lg" min-height="100">
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
              <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(store.totalRewards) }}</strong>
                {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }} / $ <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(store.totalRewards * store.chainSelectedPrice) }}</strong>              
              </v-sheet>
                           
            </v-col>
          </v-row>  
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
      <v-sheet border class="ma-2 pa-2" rounded="lg" min-height="300">
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="12"
            >
              <v-sheet class="text-h6 pa-2">
                My total delegations: <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                 {{ store.totalMyValidators }} </strong> 
                 
              </v-sheet>
               <v-sheet class="pa-2">
              <v-list>Validator(s) Address:
              <v-list-item
                v-for="items in store.MyValidator"
                :key="items.validatorAddress"
                
                :subtitle="items.validatorAddress"  
              />                        
            </v-list>
          </v-sheet> 
          <v-sheet class="pa-2"> Fee:{{  }}</v-sheet>
            </v-col> 
          </v-row>            
        </v-sheet>        
        </v-col>

      <v-col
        cols="12"
        sm="4"        
      >
      <v-sheet border class="ma-2 pa-2 text-center" rounded="lg" min-height="300">
          <v-row no-gutters>
          
              <v-sheet class="text-h6 pa-2 text-center ma-2" border> 
                Estimated Staking Rewards
                 <h6>With APR: <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(store.aprNow)}}</strong>% & Inflation:  <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(store.finalStats.inflation) }}</strong>%</h6>
              
              </v-sheet>
            
          </v-row> 
          <v-row no-gutters>  
            <v-col
              cols="12"
              sm="12"
              class="text-left"
            >
          
            Amount: <input type="number" v-model="requete" v-on:keypress="updateAPR">
              <v-sheet class="pa-2 ma-2">
                <div v-bind:key="posts" v-if="posts"> 
                  <p>- Yearly:
                      <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum((this.requete * store.aprNow)/100) }}</strong>
                        = $<strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(((this.requete * store.aprNow)/100) * store.chainSelectedPrice) }}</strong>              
                      </p>              
                      <p>- Monthly:
                      <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(((this.requete * store.aprNow)/100)/12) }}</strong>
                        = $<strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum((((this.requete * store.aprNow)/100)/12) * store.chainSelectedPrice) }}</strong>              
                      </p>
                      <p>- Weekly:
                      <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(((this.requete * store.aprNow)/100)/52) }}</strong>
                        = $<strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum((((this.requete * store.aprNow)/100)/52) * store.chainSelectedPrice) }}</strong>              
                      </p> 
                </div>
 <!--    <input type="number" v-model="requete">   v-on:keypress="updateAPR"
                <button v-on:click="submit">Update</button><ul>
              <li v-bind:key="post" v-for="post in posts">{{ post }}</li>
            </ul> <h4>{{ posts }}</h4>
              <p>- Yearly:
               <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum((store.totalDelegations * store.aprNow)/100) }}</strong>
                 = $<strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(((store.totalDelegations * store.aprNow)/100) * store.chainSelectedPrice) }}</strong>              
              </p>              
              <p>- Monthly:
               <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(((store.totalDelegations * store.aprNow)/100)/12) }}</strong>
                 = $<strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum((((store.totalDelegations * store.aprNow)/100)/12) * store.chainSelectedPrice) }}</strong>              
              </p>
              <p>- Weekly:
               <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(((store.totalDelegations * store.aprNow)/100)/52) }}</strong>
                = $<strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum((((store.totalDelegations * store.aprNow)/100)/52) * store.chainSelectedPrice) }}</strong>              
              </p>    <p>- If compound a year add fees in calculation>:
               <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(((this.requete *(1 + (store.aprNow/100)/12)^12*20 ))) }}</strong>
                = $<strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum((((this.requete * store.aprNow)/100)/12) * store.chainSelectedPrice) }}</strong>              
              </p>  --> 
          </v-sheet>
         
            </v-col>
            
          </v-row> 
             <v-sheet class="pa-2 ma-2 text-right" >
          <button v-on:click="updateAPR"> Update </button>
         </v-sheet>
        </v-sheet>
        
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
      <v-sheet border class="ma-2 pa-2" rounded="lg" min-height="300">
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
               <p> CommunityPool: <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(store.communityPool) }}</strong> {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}</p>
                <p>Total supply: <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(store.totalSupply) }} </strong> {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}</p>
                <p>Total supply price: <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(store.totalSupplyPrice) }}</strong> USD </p>
              <p>Bounded: <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ formatNum(store.finalStats.bondedTokens) }}</strong> {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}  </p>
            </v-sheet>              
            </v-col>
            
          </v-row>  
        </v-sheet>
        
      </v-col>

    <v-col         
      cols="12"
      sm="12"
    > 
    <v-card class="ma-2 pa-2" >
    <v-card-title>
      Search <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ cosmosConfig[store.setChainSelected].name }}</strong> validators<br /><br />
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
          <td><a :href= "item.columns['description.website']" target='_blank'>{{ item.columns['description.moniker'] }}</a></td>
          <td>{{ item.columns['commission.commission_rates.rate'] * 100 }}%</td>
          <td>{{ item.columns['tokens'] / 1000000 }}</td>
          <td>{{ item.columns['delegator_shares'] / 1000000 }}</td>
          <td><a :href= "item.columns['description.website']" target='_blank'>{{ item.columns['description.website'] }}</a></td>
          
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
        sortable: true,
        title: 'Moniker', 
      },
      { key: 'commission.commission_rates.rate', title: 'Commission' },
      { key: 'tokens', title: 'Bounded' },
      { key: 'delegator_shares', title: 'Delegator Shares' },
      { key: 'description.website', title: 'WebSite' } 
    ],
    posts: '',
    message: '',
    requete: ['requete'],
   
   /* desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: 1,
          },
          */
  }),
  setup() {
    const store = useAppStore() 
    return {
      store,
      msg:'',
      message:'',
      requete: '',
      temps:'',
     
    }
  },
  computed: {

  },
  methods: {
    submit () {  this.posts = this.requete },
    updateAPR () { this.posts = (this.requete * this.store.aprNow)/100 },
    
    formatNum(nombre){
      return new Intl.NumberFormat().format(nombre)
    },
    
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
