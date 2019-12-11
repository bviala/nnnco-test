<template>
  <v-container class="px-5 container">
    <v-row>
        <h1 class="primary--text font-weight-light">
          bviala email sender
        </h1>
    </v-row>
    <form
      @submit.prevent="send">
      <v-row>
        <v-combobox
          ref="recipients"
          v-model="recipients"
          :error-messages='recipientsErrorMessage'
          label="To*"
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
              @click.stop="enableCarbonCopy">
              CC
            </v-btn>
            <v-btn
              v-if="!blindCarbonCopy"
              small
              rounded
              depressed
              color="primary"
              @click.stop="enableBlindCarbonCopy">
              BCC
            </v-btn>
          </template>
        </v-combobox>
      </v-row>
      <v-row
        v-if="carbonCopy">
        <v-combobox
          ref="carbonCopy"
          v-model="carbonCopyRecipients"
          :error-messages="carbonCopyRecipientsErrorMessage"
          label="Carbon Copy"
          chips
          deletable-chips
          multiple
        />
      </v-row>
      <v-row
        v-if="blindCarbonCopy">
        <v-combobox
          ref="blindCarbonCopy"
          v-model="blindCarbonCopyRecipients"
          :error-messages="blindCarbonCopyRecipientsErrorMessage"
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
          v-model="text"
          label="Message"
          auto-grow/>
      </v-row>
      <v-row>
        <v-btn
          type="submit"
          :disabled="!emailCanBeSent || isSending"
          :loading="isSending"
          block
          color="primary"
          depressed>
          Send
        </v-btn>
      </v-row>
    </form>

    <v-snackbar
      v-model="successSnackbar"
      color="success"
      bottom>
      E-mail successfully sent !
    </v-snackbar>

    <v-snackbar
      v-model="errorSnackbar"
      :timeout="errorTimeout"
      color="error"
      bottom>
      An error occurred, please try again.
    </v-snackbar>

  </v-container>
</template>

<script>
import { intersection } from 'lodash'
import { sendEmail } from '../api/email'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  data () {
    return {
      // UI
      carbonCopy: false,
      blindCarbonCopy: false,
      successSnackbar: false,
      errorSnackbar: false,
      isSending: false,
      errorTimeout: 2000,

      // Data
      recipients: [],
      carbonCopyRecipients: [],
      blindCarbonCopyRecipients: [],
      subject: '',
      text: ''
    }
  },

  computed: {
    recipientsErrorMessage () {
      if (!this.isRecipientListValid(this.recipients)) {
        return 'Invalid e-mail address'
      } else {
        return ''
      }
    },

    carbonCopyRecipientsErrorMessage () {
      if (!this.isRecipientListValid(this.carbonCopyRecipients)) {
        return 'Invalid e-mail address'
      } else if (intersection(this.recipients, this.carbonCopyRecipients).length !== 0) {
        return 'Duplicate e-mail address'
      } else {
        return ''
      }
    },

    blindCarbonCopyRecipientsErrorMessage () {
      if (!this.isRecipientListValid(this.blindCarbonCopyRecipients)) {
        return 'Invalid e-mail address'
      } else if (
        intersection(this.recipients, this.blindCarbonCopyRecipients).length !== 0 ||
        intersection(this.carbonCopyRecipients, this.blindCarbonCopyRecipients).length !== 0
      ) {
        return 'Duplicate e-mail address'
      } else {
        return ''
      }
    },

    emailCanBeSent () {
      return this.recipients.length > 0 &&
      this.recipientsErrorMessage === '' &&
      this.carbonCopyRecipientsErrorMessage === '' &&
      this.blindCarbonCopyRecipientsErrorMessage === '' &&
      (this.subject.length > 0 || this.text.length > 0)
    }
  },

  methods: {
    enableCarbonCopy () {
      this.carbonCopy = true
      this.$nextTick(() => {
        this.$refs.recipients.blur()
        this.$refs.carbonCopy.focus()
      })
    },

    enableBlindCarbonCopy () {
      this.blindCarbonCopy = true
      this.$nextTick(() => {
        this.$refs.recipients.blur()
        this.$refs.blindCarbonCopy.focus()
      })
    },

    async send () {
      this.isSending = true

      const emailObject = {
        toList: this.recipients,
        ccList: this.carbonCopyRecipients,
        bccList: this.blindCarbonCopyRecipients
      }

      // API won't accept an empty string, the field should not be set if they're not used
      if (this.subject) {
        emailObject.subject = this.subject
      }
      if (this.text) {
        emailObject.text = this.text
      }

      try {
        await sendEmail(emailObject)
        this.successSnackbar = true
        this.resetForm()
        this.isSending = false
      } catch (err) {
        this.errorSnackbar = true
        console.error(err)
        // Prevents user from spamming requests and triggering server overquota errors
        setTimeout(() => {
          this.isSending = false
        }, this.errorTimeout)
      }
    },

    resetForm () {
      this.recipients = []
      this.carbonCopyRecipients = []
      this.blindCarbonCopyRecipients = []
      this.subject = ''
      this.text = ''
    },

    isRecipientListValid (list) {
      let validEmail = true
      list.forEach(email => {
        if (!emailRegex.test(email, 'i')) {
          validEmail = false
        }
      })
      return validEmail
    }
  }
}
</script>

<style scoped>
  h1 {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
  }
  .container {
    max-width: 700px;
  }
</style>
