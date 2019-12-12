# nnnco-test

## Live demo

**The demo needs CORS to be locally disabled, for example with a browser extension**

http://bvialaemailsender.surge.sh/

## Project setup

### Environment variables
The following variables are set in the `.env` file at the root of the project: 

* `VUE_APP_EMAIL_ISSUER` : The email address the emails should be sent from.  
* `VUE_APP_API_BASE_URL` : The base URL of the API the application should use.

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

### Display name email validation
The validation for addresses in the form `Name <name@domain.com>` is pretty lose. A lot of character are not allowed in the Name part by the API. The best solution would be to use the same regex used by the API.

### TLD validation
The email validation currently does not check that the TLD is valid.  
This can lead to an error, with no accurate feedback for the user.  
A solution could be to fetch the list of TLD from the IANA, then dynamically build the email validation regex.

### E-mail address autocomplete
The Vuetify combobox component can normally act as an autocomplete and suggest known e-mail addresses, but this feature was not implemented since it is bugged at the moment (see https://github.com/vuetifyjs/vuetify/issues/8841)