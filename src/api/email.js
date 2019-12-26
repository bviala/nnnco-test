import axios from 'axios'

export const sendEmail = emailParams => {
  return axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/emails`, {
    from: process.env.VUE_APP_EMAIL_ISSUER,
    ...emailParams
  })
}
