<template>
  <v-card flat>
    <v-snackbar v-model="snackbar" absolute top right color="success">
      <span>Tendering Uploaded Successfully!!</span>
      <v-icon dark>
        mdi-checkbox-marked-circle
      </v-icon>
    </v-snackbar>
    <v-stepper v-model="e1" v-if="!isTenderFormCompleted">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" editable>
          Tender Form
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" editable>
          Technnical or Financial Document Upload
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" editable>
          Review & Submit
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" height="600px">
            <v-form lazy-validation>
              <v-text-field
                v-model="tenderForm.name"
                :counter="10"
                :rules="nameRules"
                label="Investor name"
              ></v-text-field>
              <v-text-field
                v-model="tenderForm.city"
                :rules="nameRules"
                label="City"
              ></v-text-field>
              <v-text-field
                v-model="tenderForm.country"
                :rules="nameRules"
                label="Country"
              ></v-text-field>

              <v-text-field
                v-model="tenderForm.email"
                :rules="emailRules"
                label="E-mail"
              ></v-text-field>

              <v-text-field
                v-model="tenderForm.beneficiary"
                :rules="nameRules"
                label="Beneficiary"
              ></v-text-field>
              <v-text-field
                v-model="tenderForm.tenderCreator"
                :rules="nameRules"
                label="Tender Creator"
              ></v-text-field>

              <!-- <v-select
                v-model="tenderForm.gender"
                :items="['Male', 'Female', 'Transgender']"
                :rules="[(v) => !!v || 'Item is required']"
                label="Gender"
              ></v-select> -->

              <v-checkbox
                v-model="tenderForm.agree"
                :rules="[(v) => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              ></v-checkbox>
            </v-form>
          </v-card>

          <v-btn color="success" class="mr-4" @click="e1 = 2">
            Continue
          </v-btn>

          <v-btn text>
            Reset
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" height="300px" flat>
            <div class="text-center">
              <!-- <v-file-input
                v-model="chosenFile"
                dense
                outlined
                label="File input"
              ></v-file-input> -->
              <input type="file" aria-label="File input" />
              <v-btn color="primary" @click="fileUpload"
                >Upload & Preview</v-btn
              >
              <v-img max-height="150" max-width="500" :src="url"></v-img>
            </div>

            <v-dialog
              v-model="loaderDialog"
              hide-overlay
              persistent
              width="300"
            >
              <!-- <v-card color="primary" dark>
                <v-card-text>
                  Please stand by
                  <v-progress-linear
                    :value="progress"
                    indeterminate
                    color="white"
                    class="mb-0"
                  ></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-dialog
              v-model="resultDialog"
              hide-overlay
              persistent
              width="500"
            >
              <v-card color="primary" class="text-center" dark>
                {{ this.message }}
                <br />
                <v-btn @click="resultDialog = !resultDialog">Ok</v-btn>
              </v-card> -->
            </v-dialog>
          </v-card>
          <v-btn color="success" @click="e1 = 3">
            Continue
          </v-btn>
          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" height="300px" flat>
            <div class="text-justify">
              <!-- <p/>
        investor: "",
        investorEmail: "",
        city: "",
        country: "",
        beneficiary: "",
        tenderCreator: "",
        gender: "",
          -->
              <b>Investor name: </b>{{ tenderForm.investor }}<br />
              <b>Investor email: </b>{{ tenderForm.investorEmail }}<br />
              <b>Country: </b>{{ tenderForm.country }}<br />
              <b>City: </b>{{ tenderForm.investor }}<br />
              <b>Beneficiary: </b>{{ tenderForm.beneficiary }}<br />
              <b>Tender Creator: </b>{{ tenderForm.tenderCreator }}<br />

              <b>Gender: </b>{{ tenderForm.gender }}<br />

              <b>Agree to terms: </b>{{ tenderForm.agree }}<br />
            </div>
          </v-card>

          <v-btn color="primary" @click="submitKyc">
            Submit
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
// const ipfsClient = require("ipfs-http-client");
// const ipfs = ipfsClient(process.env.IPFS_NODE_URL || "http://localhost:5001");

export default {
  name: "UserKyc",
  data() {
    return {
      snackbar: false,
      chosenFile: "",
      progress: 0,
      loaderDialog: false,
      resultDialog: false,
      message: "",
      e1: 1,
      isTenderFormCompleted: false,
      tenderForm: {
        investor: "",
        investorEmail: "",
        city: "",
        country: "",
        beneficiary: "",
        tenderCreator: "",
        gender: "",
        agree: "",
      },
      investor: "Investor individual or group name is required",
      valid: true,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      beneficiary: "Beneficiary name is required",
      tenderCreator: "Tender Creator name is required",
      investorEmail: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      checkbox: false,
      url: "",
    };
  },
  methods: {
    async fileUpload() {
      this.progress = 0;
      let file = this.chosenFile;
      //   let fileSize = file.size;
      try {
        this.loaderDialog = true;
        /*
        const result = await ipfs.add(file, {
          progress: (prog) => {
            this.progress = (prog * 100) / fileSize;
            console.log(`received: ${prog}`);
          },
        });
        this.url = `https://ipfs.io/ipfs/${result.path}`;
        this.kycDocumentHash = result.path;
        console.log(this.url);
        */
        file.this.message = `File ${file.name} Uploaded Successfully \n URL: `;
        this.loaderDialog = false;
        this.resultDialog = true;
      } catch (err) {
        this.message = "Please Upload File";
        console.error(err);
      }
    },
    submitKyc() {
      this.isTenderFormCompleted = true;
      this.snackbar = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
