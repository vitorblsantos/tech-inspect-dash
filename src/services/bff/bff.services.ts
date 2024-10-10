import axios from 'axios'

export const ServiceBFF = axios.create({
  baseURL: 'https://tech-inspect-bff-824385020093.us-central1.run.app'
})
