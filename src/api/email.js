import axios from 'axios'

export const sendEmail = emailParams => {
  return axios.post(process.env.VUE_APP_EMAIL_API_URL, {
    from: process.env.VUE_APP_EMAIL_ISSUER,
    ...emailParams
  })
}
