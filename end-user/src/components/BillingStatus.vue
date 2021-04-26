<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <h1>Provenance Data</h1>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <br />
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#32a852"
            dark
            v-bind="attrs"
            v-on="on"
            @click="updateOracle"
          >
            Get Data
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
                  <v-text-field
                    label="Total Units"
                    :value="totalUnits"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Last Meter Reading"
                    :value="lastMeterReading"
                    disabled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>

</script>

<style scoped></style>
