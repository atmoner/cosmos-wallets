<template>
  <div > 
             <br />
            <span v-if="store.myFeeAllowances.length > 0" class="mt-4">Select your fee payer</span><br />
            <v-sheet v-if="store.myFeeAllowances.length > 0" class="mt-4 pa-2" border>
              <v-radio-group v-model="finalFeeGranter" >
                <v-radio v-for="addr in store.formFeeGranter" :label="truncate(addr)" :value="addr"></v-radio>
              </v-radio-group>
            </v-sheet>
  </div>
</template>

<script>
import { useAppStore } from '@/store/app'

export default {
  data: (store) => ({
    finalFeeGranter: ''
  }),
  setup() {
    const store = useAppStore()
    return {
      store
    }
  },
  watch: {
    finalFeeGranter: function (newVal, oldVal) { 
      this.store.setFeePayer = newVal
    }
  },
  methods: {
      truncate(
      fullStr,
      strLen = 16,
      separator = ".........",
      frontChars = 8,
      backChars = 8
    ) {
      if (fullStr.length <= strLen) return fullStr;

      return (
        fullStr.substr(0, frontChars) +
        separator +
        fullStr.substr(fullStr.length - backChars)
      );
    }
  }
}
</script>
