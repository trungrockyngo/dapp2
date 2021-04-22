<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <h1>Create Tender</h1>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <br />
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#32a852" dark v-bind="attrs" v-on="on">
            Create
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Bill Details</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Bidder" :value="bidderName" enabled></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Beneficiary" :value="beneficiary" enabled></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="ProjectCost" :value="cost" enabled></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
