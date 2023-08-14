<template>
  <v-app id="inspire">
    <v-app-bar
      class="px-3"
      flat
      density="compact"
      id="appbar"
    >
      <!-- <v-avatar
        color="grey-darken-1"
        size="32"
      >
        <v-img src="@/assets/main_logo.png" alt="Darkmatter" />
      </v-avatar> -->

      <v-spacer></v-spacer>

      <v-tabs
        v-if="store.isLogged"
        centered
        :color="cosmosConfig[store.setChainSelected].color"
      >
        <v-tab to="/">
          <span>Dashboard</span>
        </v-tab>
        <v-tab to="/transactions">
          <span>Transactions</span>
        </v-tab>
        <v-tab to="/staking">
          <span>Staking</span>
        </v-tab>
        <v-tab to="/proposals">
          <span>Proposals</span>
        </v-tab>
        <v-tab v-if="cosmosConfig[store.setChainSelected].modules.wasm" to="/wasm">
          <span>Wasm</span>
        </v-tab>
        <v-tab v-if="cosmosConfig[store.setChainSelected].modules.authz" to="/authz">
          <span>Authz</span>
        </v-tab>
        <v-tab v-if="cosmosConfig[store.setChainSelected].modules.feeGrant" to="/feegrant">
          <span>Feegrant</span>
        </v-tab>
        <v-tab to="/stats">
          <span>Stats</span>
        </v-tab>
        <v-tab v-if="store.isValidator" to="/my-validator">
          <span>My validator</span>
        </v-tab>
        <!-- <v-tab
          v-for="item in links"
          :key="item.title"
          :to="item.link"
        >
          <span>{{ item.title }}</span>
          <span v-if="item.title === 'Wasm' && cosmosConfig[store.setChainSelected].modules.wasm">{{ item.title }}</span>
        </v-tab> -->
      </v-tabs>
      <v-spacer></v-spacer>

      <v-avatar
        v-if="!store.isLogged"
        rounded="0"
        color="grey-darken-1"
        size="25"
      >
      <v-img src="@/assets/keplr.svg" alt="keplr" @click="keplrConnect" />

    </v-avatar>

    <v-icon
      v-if="store.isLogged"
      size="large"
      icon="mdi-theme-light-dark"
      @click="toggleTheme"
    ></v-icon>

    </v-app-bar>

    <v-main>
      <Login v-if="!store.isLogged" />
      <v-img
          v-if="store.isLogged"
          :src="cosmosConfig[store.setChainSelected].coinLookup.banner"
          max-height="125"
          cover
          class="bg-grey-lighten-2"
        >
        <div class="d-flex flex-column fill-height justify-center align-center text-white">
          <h1 class="text-h4 mb-4">
            {{ cosmosConfig[store.setChainSelected].name }}
          </h1>
          <!-- <h4 class="subheading">
            Build your application today!
          </h4> -->
        </div>
      </v-img>
      
      <v-container>

        <v-breadcrumbs
              :items="breadcrumbsItems"
              divider="-"
            ></v-breadcrumbs>
        <v-row v-if="store.isLogged" > 
          <v-col
            v-if="viewLeftMenu"
            cols="12"
            sm="2"
          >
            <v-sheet
              border
              rounded="lg"
              class="mb-4 mt-2"
            >
              <v-row no-gutters>
                <v-col
                  cols="12"
                  sm="3"
                >
                  <v-sheet class="mt-3 ma-2 pa-2" rounded="lg">
                    <v-avatar>
                      <v-img
                        :src="cosmosConfig[store.setChainSelected].coinLookup.icon"
                        alt="John"
                      ></v-img>
                    </v-avatar>
                  </v-sheet>
                </v-col>
                <v-col
                  cols="12"
                  sm="9"
                >
                  <v-sheet class="ma-2 pa-2" rounded="lg">
                    {{ store.nameWallet.name }}
                    {{ this.truncateString(store.addrWallet, 15) }}
                  </v-sheet>
                </v-col>
              </v-row>
            </v-sheet>
            <v-sheet
              border
              rounded="lg"
              class="mb-4 mt-2"
            >

            <v-table>
                  <tbody>
                    <tr>
                      <td>SDK version</td>
                      <td class="text-right">
                        <span :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ store.sdkVersion }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>IBC version</td>
                      <td class="text-right">
                        <span :style="'color:' + cosmosConfig[store.setChainSelected].color">{{ store.ibcVersion }}</span>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
            </v-sheet>

<!--             <v-sheet
              rounded="lg"
              min-height="268"
            >
              <v-list rounded="lg">
                <v-list-subheader>Menu</v-list-subheader>

                <v-list-item
                  v-for="(item, i) in links"
                  :key="i"
                  :value="item"
                  :to="item.link"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>

                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet> -->
            <v-sheet
              border
              rounded="lg"
              min-height="268"
              class="mb-4 mt-2"
            >

              <v-list rounded="lg">
                <span class="ma-4 text-h6">Select chain</span>
                <v-list-item to="/allchains">
                  <template v-slot:prepend>
                    <v-icon
                      class="ml-2"
                      size="large" 
                      icon="mdi-border-all"
                    ></v-icon>                   
                  </template>                  
                  All chains
                </v-list-item>
                <v-list-item
                  v-model="chainSelected"
                  v-for="(item, i) in cosmosConfig"
                  :key="i"
                  :value="item"
                  @click="changeChain(i)"
                >
                  <template v-slot:prepend>
                    <v-avatar>
                      <v-img
                        :src="item.coinLookup.icon"
                        :alt="item.name"
                        max-height="32"
                        max-width="32"
                      ></v-img>
                    </v-avatar>
                  </template>

                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
            <v-sheet
              rounded="lg"
              class="mt-4"
              border
            >
            <v-list rounded="lg">
                <v-list-item
                  @click="addNewChain()"
                >


                  <v-list-item-title >Add new chain (soon)</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            :sm="currentPageSize"
          >


             <router-view />
          </v-col>
        </v-row>
        <v-row v-else class="mt-4" >
          <!--Not loged-->
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script  >
import { useTheme } from 'vuetify'
import { useAppStore } from '@/store/app'
import cosmosConfig from './cosmos.config'
import Login from '@/components/Login.vue'


export default {
  name: 'App',
  components: { Login },
  data: () => ({
      cosmosConfig: cosmosConfig,
      chainSelected: 0,
      currentPage: '',
      currentPageSize: 10, 
      finalLinks: [],
      viewLeftMenu: true,
      breadcrumbsItems: [
        {
          title: 'Dashboard',
          disabled: false,
          to: '/',
        },
        {
          title: 'All chains',
          disabled: true,
          to: '',
        }
      ],
      links: [
        {
          title: 'Dashboard',
          icon: 'mdi-home',
          link: '/'
        },
        {
          title: 'Transactions',
          icon: 'mdi-home',
          link: '/transactions'
        },
        {
          title: 'Staking',
          icon: 'mdi-web',
          link: '/staking'
        },
        {
          title: 'Proposals',
          icon: 'mdi-home',
          link: '/proposals'
        },
        {
          title: 'Wasm',
          icon: 'mdi-home',
          link: '/wasm'
        },
        {
          title: 'Authz',
          icon: 'mdi-home',
          link: '/authz'
        },
        {
          title: 'Feegrant',
          icon: 'mdi-home',
          link: '/feegrant'
        },
        {
          title: 'Stats',
          icon: 'mdi-home',
          link: '/stats'
        },

        {
          title: 'My validator',
          icon: 'mdi-home',
          link: '/my-validator'
        },
      ],
    }),
  setup() {
    const store = useAppStore()
    const theme = useTheme()

    return {
      store,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  },
  watch: {
    async $route(to, from) {
      //console.log(to)
      //console.log(from)
      this.currentPage = to.name
      if(
        to.name === 'txDetail' || 
        to.name === 'Proposal' ||
        to.name === 'AllChains'
      ) {
        this.viewLeftMenu = false
        this.currentPageSize = 12
        this.breadcrumbsItems[1].title = this.currentPage
      } else {
        this.viewLeftMenu = true
        this.currentPageSize = 10
        this.breadcrumbsItems[1].title = this.currentPage
      }
    }

  },
  computed: {

  },
  async created() {
    this.finalLinks = this.links
    await this.store.getAllPrice()

    window.addEventListener("keplr_keystorechange", async () => {
      await this.store.keplrConnect()
      await this.store.initRpc()
      await this.store.getSdkVersion()
      await this.store.getBankModule()
      await this.store.getStakingModule()
      await this.store.getDistribModule()
      await this.store.getAllValidators()
      await this.store.getTransactions()
      await this.store.getAllProps()
      await this.store.getHomeProps()
      await this.store.getAuthzModule()
      await this.store.getFeeGrantModule()
      await this.store.checkIsValidator()
      //await this.store.getChainStats()
      //await this.store.getApr()

      //await this.store.getAllPrice()
    })
    setInterval(async ()=> {
      await this.store.getDistribModule()
    },10000)
  },
  methods: {
    async changeChain(index) {
      this.store.resetData()
      this.store.setChainSelected = index
      //this.$router.push('/')
      await this.store.keplrConnect()
      await this.store.initRpc()
      await this.store.getSdkVersion()

      await this.store.setChainPrice()
      await this.store.getBankModule()
      await this.store.getStakingModule()
      await this.store.getDistribModule()
      await this.store.getAllValidators()
      await this.store.getTransactions()
      await this.store.getAllProps()
      await this.store.getHomeProps()
      await this.store.getAuthzModule()
      await this.store.getFeeGrantModule()
      await this.store.checkIsValidator()
      await this.store.getWalletAmount()
      //await this.store.getChainStats()
      //await this.store.getApr()
    },
    async keplrConnect() {
      await this.store.keplrConnect()
      await this.store.initRpc()
      await this.store.getSdkVersion()
      await this.store.getBankModule()
      await this.store.getStakingModule()
      await this.store.getDistribModule()
      await this.store.getAllValidators()
      await this.store.getTransactions()
      await this.store.getAllProps()
      await this.store.getHomeProps()
      await this.store.getAuthzModule()
      await this.store.getFeeGrantModule()
      await this.store.checkIsValidator()
      await this.store.setChainPrice()
      await this.store.getWalletAmount()
      //await this.store.getChainStats()
      //await this.store.getApr()
    },
    addNewChain() {
      console.log('addNewChain')
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
