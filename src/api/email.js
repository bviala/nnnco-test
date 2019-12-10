import axios from 'axios'

// this way we can deploy on a different domain than the API, while still using devServer proxy in development
const baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : ''

export const sendEmail = emailParams => {
  return axios.post(`${baseURL}/api/emails`, {
    from: process.env.VUE_APP_EMAIL_ISSUER,
    ...emailParams
  })
}
