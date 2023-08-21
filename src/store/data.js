import axios from 'axios'

export const state = () => ({
  block: undefined,
  chainId: 0,
  balances: [],
  chainValidator: '',
  finalChainValidator: '',
  totalTokenBonded: '',
  inflation: '',
  allSupply: '',
  assets: ''
})

export const mutations = {
  // create set methods from data points
  ...Object.fromEntries(
    Object.keys(state()).map((entity) => {
      return [
        `set${entity.charAt(0).toUpperCase()}${entity.substr(1)}`,
        (state, value) => {
          state[entity] = value
        },
      ]
    })
  ),
  resetSessionData(state) {
    state.balances = []
  },
}

export const actions = {
  async refresh({ dispatch, state }, address) {
    const calls = [
      // dispatch('getWalletInfo', address),
      // dispatch('getDelegations', address),
    ]
    await Promise.all(calls)
  },

  async getValidatorByChain({ commit, state }, chain) {
    const allValidators = await axios(
        cosmosConfig[this.setChainSelected].apiURL + `/staking/validators`)
    // this.allValidators = allValidators.data.result

    var result = allValidators.data.result.sort(function (a, b) {
        // return a.delegator_shares.localeCompare(b.delegator_shares);
        return a.delegator_shares - b.delegator_shares;
    })
    var totalTokenBonded = 0;
    result.forEach( async function(item){
      totalTokenBonded += Number(item.tokens)
      // Get all validator 1 by 1
      // const unDelegation = await axios(foundChain.apiURL + `/cosmos/staking/v1beta1/validators/` + item.operator_address + '/unbonding_delegations')
      // console.log(unDelegation.data.unbonding_responses)
    });
    totalTokenBonded = totalTokenBonded / 1000000

    commit('setChainValidator', result.reverse())
    commit('setTotalTokenBonded', totalTokenBonded)
  },

  async getInflation({ commit, state }, chain) {
    try {
    const getInflation = await axios(
        cosmosConfig[this.setChainSelected].apiURL + '/cosmos/mint/v1beta1/inflation')
    commit('setInflation', getInflation.data.inflation)
    } catch (error) {
      commit('setInflation', 0)
    }
  },
  async getAssets({ commit, state }, chain) {
    try {
      const getassets = await axios(
        cosmosConfig[this.setChainSelected].apiURL + '/cosmos/bank/v1beta1/supply')
      commit('setAssets', getassets.data.supply)
    } catch (error) {
      commit('setAssets', '')
    }
  },
  async getAllSupply({ commit, state }, chain) {
    const allsupply = await axios(
        cosmosConfig[this.setChainSelected].apiURL + `/cosmos/bank/v1beta1/supply/` + chain.coinLookup.chainDenom)
    commit('setAllSupply', allsupply.data.amount.amount)
  },

  async getFinalValidatorData({ commit, state }, data) {
    commit('setFinalChainValidator', data)
  },

  changeChaniId({ commit }, chainId) {
    commit('setChainId', chainId)
  },
}
