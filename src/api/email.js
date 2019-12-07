import axios from 'axios'

import { emailIssuer, emailApiUrl } from '../conf'

export const sendEmail = emailParams => {
  return axios.post(emailApiUrl, {
    from: emailIssuer,
    ...emailParams
  })
}
