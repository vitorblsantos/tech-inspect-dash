import axios from 'axios'

export const ServiceBFF = axios.create({
  baseURL: 'http://localhost:8080'
})
