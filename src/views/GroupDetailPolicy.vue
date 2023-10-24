<template>

<HeaderGroup :infoGroupId="infoGroupId" />  
Group policy


<v-row justify="space-around">
    <v-col>
 
      
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
        >
          <v-sheet border class="ma-2 pa-2" rounded="lg">
            <v-card-title>Group Policy</v-card-title>
            <v-card-text class="text-h6 text-right">
              <v-btn
                elevation="2"
                @click="createPolicy"
              >Create policy</v-btn>              
            </v-card-text>


            <!-- {{ store.finalGroupPolicies }} -->
            <v-table>
              <thead>
                <tr>
                    <th class="text-left">
                      Status
                    </th>
                    <th class="text-left">
                      Address
                    </th>
                    <th class="text-left">
                      Weight
                    </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in store.finalGroupPolicies"
                  :key="item.metadata"
                >
                    <td>{{ item.metadata }}</td>
                    <td>
                      
                      {{ this.truncateString(item.address, 15) }}
                      
                      <v-icon v-bind="props" color="grey-lighten-1" @click="copy(item.address)">
                        mdi-content-copy
                      </v-icon>
                    </td> 
                    <td>{{ item.version }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-sheet>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
        <v-sheet border class="ma-2 pa-2" rounded="lg">
          <v-card-title>Policy amount</v-card-title>
          <v-card-text class="text-h6 text-right"> </v-card-text>
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