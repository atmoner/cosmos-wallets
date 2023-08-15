<template>
    <v-app id="inspire">
      <v-app-bar
        class="px-3"
        flat
        density="compact"
        id="appbar"
      >
        <v-spacer></v-spacer>
  
        <v-menu
          v-if="store.isLogged"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-tabs
              centered
              :color="cosmosConfig[store.setChainSelected].color"
              v-bind="attrs"
              v-on="on"
            >
            </v-tabs>
          </template>
          <v-list>
            <!-- Tab items for small screens -->
          </v-list>
        </v-menu>
  
        <v-avatar
          v-if="!store.isLogged"
          rounded="1"
          color="grey-darken-1"
          size="25"
        >
          <v-img src="@/assets/keplr.png" alt="keplr" @click="keplrConnect" />
        </v-avatar>
  
        <v-icon
          v-if="store.isLogged"
          size="large"
          icon="mdi-theme-light-dark"
          @click="toggleTheme"
        ></v-icon>
      </v-app-bar>
  
      <!-- Main App -->
  
      <v-main>
        <Login v-if="!store.isLogged" />
        <v-img
          v-if="store.isLogged"
          :src="cosmosConfig[store.setChainSelected].coinLookup.banner"
          max-height="125"
          cover
          class="bg-grey-lighten-2"
        >
          <!-- Banner content -->
        </v-img>
  
        <v-container>
  
          <!-- Breadcrumbs -->
  
          <v-row v-if="store.isLogged">
            <v-col
              v-if="viewLeftMenu"
              cols="12"
              sm="3"
              md="2"
            >
              <!-- Left menu content -->
            </v-col>
  
            <v-col
              cols="12"
              :sm="currentPageSize"
              class="d-flex"
            >
              <!-- Main content (Router View) -->
              <router-view />
            </v-col>
          </v-row>
          <v-row v-else class="mt-4">
            <!-- Not logged in -->
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  // ... (Import statements and setup function)
  
  export default {
    // ... (Component properties and lifecycle methods)
  
    methods: {
      // ... (Your methods)
    }
  }
  </script>
  
  <style scoped>
  /* Responsive styling for specific screen sizes */
  @media (max-width: 599px) {
    /* Mobile styles */
  
    /* Example: Adjust spacing for mobile screens */
    .d-flex {
      flex-direction: column;
    }
  }
  
  @media (min-width: 600px) and (max-width: 959px) {
    /* Tablet styles */
  
    /* Example: Adjust columns layout for tablet screens */
    .d-flex {
      flex-direction: row;
    }
  }
  
  @media (min-width: 960px) {
    /* Desktop styles */
  
    /* Example: Restore default layout for desktop screens */
    .d-flex {
      flex-direction: row;
    }
  }
  </style>
  