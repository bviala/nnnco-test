# nnnco-test

## Live demo

**The demo needs CORS to be locally disabled, for example with a browser extension**

http://bvialaemailsender.surge.sh/

## Project setup
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
A simpler solution could be to use the API error message to provide a more accurate error to the user, but this is less resilient.

### E-mail address autocomplete
The Vuetify component can normally function as an autocomplete and suggest known e-mail addresses, but this feature was not implemented since it is bugged ATM (see https://github.com/vuetifyjs/vuetify/issues/8841)

### No subject warning
A warning modal could be opened when the user attempts to send an e-mail with an empty subject.