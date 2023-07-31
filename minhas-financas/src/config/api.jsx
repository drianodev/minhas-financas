import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'http://localhost:8080'
})

export const get = (url) => {
    return httpClient.get(url)
}

export const post = (url, objeto) => {
    return httpClient.post(url, objeto)
}

export const put = (url, objeto) => {
    return httpClient.put(url, objeto)
}

export const del = (url) => {
    return httpClient.delete(url)
}