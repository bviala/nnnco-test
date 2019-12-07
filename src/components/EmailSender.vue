<template>
  <v-container class="px-5">
    <v-row>
        <h1 class="primary--text font-weight-light">
          bviala email sender
        </h1>
    </v-row>
    <v-row>
      <v-combobox
        v-model="recipients"
        label="To"
        chips
        deletable-chips
        multiple
      >
        <template v-slot:append>
          <v-btn
            v-if="!carbonCopy"
            class="mx-1"
            small
            rounded
            depressed
            color="primary"
            @click="enableCarbonCopy">
            CC
          </v-btn>
          <v-btn
            v-if="!blindCarbonCopy"
            small
            rounded
            depressed
            color="primary"
            @click="enableBlindCarbonCopy">
            BCC
          </v-btn>
        </template>
      </v-combobox>
    </v-row>
    <v-row
      v-if="carbonCopy">
      <v-combobox
        label="Carbon Copy"
        chips
        deletable-chips
        multiple
      />
    </v-row>
    <v-row
      v-if="blindCarbonCopy">
      <v-combobox
        label="Blind Carbon Copy"
        chips
        deletable-chips
        multiple
      />
    </v-row>
    <v-row>
      <v-text-field
        v-model="subject"
        label="Subject"
      />
    </v-row>
    <v-row>
      <v-textarea
        v-model="message"
        label="Message"
        height="100"
        auto-grow/>
    </v-row>
    <v-row>
      <v-btn
        :disabled="!canBeSent || isSending"
        :loading="isSending"
        block
        color="primary"
        depressed
        @click="send">
        Send
      </v-btn>
    </v-row>

    <v-snackbar
      v-model="successSnackbar"
      color="success"
      bottom>
      E-mail successfully sent !
    </v-snackbar>

    <v-snackbar
      v-model="errorSnackbar"
      color="error"
      bottom>
      An error occurred, please try again
    </v-snackbar>

  </v-container>
</template>

<script>
import { sendEmail } from '../api/email'

export default {
  data () {
    return {
      // UI
      carbonCopy: false,
      blindCarbonCopy: false,
      successSnackbar: false,
      errorSnackbar: false,
      isSending: false,

      // Data
      recipients: [],
      carbonCopyRecipients: [],
      blindCarbonCopyRecipients: [],
      subject: '',
      message: ''
    }
  },

  computed: {
    canBeSent () {
      return this.recipients.length > 0 && this.message.length > 0
    }
  },

  methods: {
    enableCarbonCopy () {
      this.carbonCopy = true
    },
    enableBlindCarbonCopy () {
      this.blindCarbonCopy = true
    },
    send () {
      this.isSending = true

      const emailObject = {
        toList: this.recipients,
        ccList: this.carbonCopyRecipients,
        bccList: this.blindCarbonCopyRecipients,
        text: this.message
      }

      // API allows email without subject only if the parameter is not sent
      if (this.subject) {
        emailObject.subject = this.subject
      }

      sendEmail(emailObject)
        .then(res => {
          this.successSnackbar = true
          this.resetForm()
        })
        .catch(err => {
          this.errorSnackbar = true
          console.error(err)
        })
        .then(() => {
          this.isSending = false
        })
    },
    resetForm () {
      this.recipients = []
      this.carbonCopyRecipients = []
      this.blindCarbonCopyRecipients = []
      this.subject = ''
      this.message = ''
    }
  }
}
</script>

<style scoped>
  h1 {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
  }
</style>
