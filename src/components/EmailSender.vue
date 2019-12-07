<template>
  <v-container>
    <v-row>
        <h1 class="primary--text font-weight-light">
          bviala email sender
        </h1>
    </v-row>
    <v-row>
      <v-combobox
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
        label="Subject"
      />
    </v-row>
    <v-row>
      <v-textarea
        label="Message"
        height="100"
        auto-grow/>
    </v-row>
    <v-row>
      <v-btn
        block
        color="primary"
        depressed>
        Send
      </v-btn>
    </v-row>

  </v-container>
</template>

<script>
export default {
  data () {
    return {
      carbonCopy: false,
      blindCarbonCopy: false,

      recipents: [],
      carbonCopyRecipients: [],
      blindCarbonCopyRecipients: []
    }
  },

  methods: {
    enableCarbonCopy () {
      this.carbonCopy = true
    },
    enableBlindCarbonCopy () {
      this.blindCarbonCopy = true
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
