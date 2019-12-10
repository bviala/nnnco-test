# nnnco-test

## Live demo

**The demo needs CORS to be locally disabled, for example with a browser extension**

http://bvialaemailsender.surge.sh/

## Project setup

### Environment variables
Set the following variables  and  in a `.env` file at the root of the project: 

* `VUE_APP_EMAIL_ISSUER` : The email address the emails should be sent from.  
* `VUE_APP_EMAIL_API_URL` : The URL of the email API the application should use.

### Install dependencies

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Improvements list

### TLD validation
The email validation currently does not check that the TLD is valid.  
This can lead to an error, with no accurate feedback for the user.  
A solution could be to fetch the list of TLD from the IANA, then dynamically build the email validation regex.
A simpler solution could be to rely on the API error message to provide an accurate feedback to the user, but this less resilient, as the API can change, and it would only occur after an attempt to send.

### E-mail address autocomplete
The Vuetify combobox component can normally act as an autocomplete and suggest known e-mail addresses, but this feature was not implemented since it is bugged at the moment (see https://github.com/vuetifyjs/vuetify/issues/8841)

### No subject warning
A warning modal could be opened when the user attempts to send an e-mail with an empty subject.