<template>

<HeaderGroup :infoGroupId="infoGroupId" />  
 
<v-row justify="space-around">
    <v-col>
 
      
      <v-row no-gutters>
        <v-col 
          v-for="item in store.finalGroupPolicies"
            :key="item.metadata"
        >
          <v-sheet 

            border class="ma-2 pa-2" rounded="lg"
          >

          
    <v-layout>
      <v-app-bar 
        density="compact"
      >
        <template v-slot:prepend>
          <h2>
            {{ item.metadata }}
          </h2>

        </template>
 
        <template v-slot:append>
          {{ this.truncateString(item.address, 25) }}       
          <v-btn
                elevation="2" 
              >Set authz</v-btn>
        </template>
      </v-app-bar>
      <v-main> 
      </v-main>
    </v-layout>
 
          </v-sheet>
        </v-col>
 
      </v-row>
      <br />
    </v-col>
    </v-row>    
</template>

<script>
import { useAppStore } from '@/store/app'
import HeaderGroup from '@/components/headerGroup.vue'

export default {
  
  components: { HeaderGroup },
  data: () => ({
    infoGroupId: ''
  }),
  setup() {
    const store = useAppStore()
    return {
      store
    }
  },
  async mounted () {
    this.infoGroupId = this.$route.params.id

  },
  methods: {
    copy(value) {
      // Copy the text inside the text field
      navigator.clipboard.writeText(value);
    },
    createPolicy () {
      
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