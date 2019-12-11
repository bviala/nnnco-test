<template>
  <v-app>
    <v-content>
      <EmailSender />
    </v-content>
  </v-app>
</template>

<script>
import EmailSender from './components/EmailSender'

export default {
  name: 'App',

  components: {
    EmailSender
  }
}
</script>
