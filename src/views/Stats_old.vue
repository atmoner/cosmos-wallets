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
import { mapState } from 'vuetify'
export default { //djoe
  data: () => ({
    cosmosConfig: cosmosConfig,
    //allValidators: '',
    allValidatorsProps: [],
    chainDenom: '',
    chainSlug: '',
    breadcrumbsData: [
      {
        text: 'Dashboard',
        disabled: false,
        href: '/',
      }
    ],
  }),
  computed: {
    ...mapState('data', ['chainId', 'chainValidator', 'finalChainValidator', 'totalTokenBonded', 'inflation', 'allSupply']),
  },
async mounted () {

    const foundChain = cosmosConfig.find(element => element.slot === this.$route.params.chain)
    this.chainDenom = foundChain.coinLookup.viewDenom
    this.chainSlug = foundChain.slot

    console.log(foundChain)

    await this.$store.dispatch('data/getValidatorByChain', foundChain)
    await this.$store.dispatch('data/getInflation', foundChain)
    await this.$store.dispatch('data/getAllSupply', foundChain)

    this.allValidators = this.chainValidator

    console.log(this.inflation, this.allSupply)

    var totalTokenBondedPc = this.totalTokenBonded
    var cumulativeShare = 0
    var inflation = this.inflation
    var allSupply = this.allSupply
    this.allValidators.forEach( async function(item){
      try {
        item.votingPowerPc = (((item.tokens / 1000000) * 100) / totalTokenBondedPc).toFixed(2)
        cumulativeShare += (item.tokens / 1000000)
        item.votingPowerCumulative = ((cumulativeShare + item.tokens) * 100 / totalTokenBondedPc).toFixed(2)
        item.valApr = ((allSupply / 1000000 * inflation) * item.votingPowerPc / 100 * (1 - item.commission.commission_rates.rate)) / (item.tokens / 1000000)
        // console.log(item.commission.commission_rates.rate)
        item.rewardByDay = (allSupply / 1000000) * inflation * (item.votingPowerPc / 100) * (item.commission.commission_rates.rate / 1000)
      } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
    });
    this.breadcrumbsData.push({
        text: this.chainSlug,
        disabled: true
    })


  },

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