import axios from 'axios'
const url = '/api/persons'

const creator = (data) => {
    const request = axios.post(url,data)
    return request.then(response => response.data)
}

const reader = () => {
    const request = axios.get(url)
    return request.then(response => response.data) 
}


const updater = (id,data) => {
    // console.log(url+'/'+id)
    const request = axios.put(url+'/'+id,data)
    return request.then(response => response.data) 
}

const deleter = (id) => {
    const request = axios.delete(url+'/'+id)
    return request.then(response => response.data)
}


export default {creator,reader,updater,deleter}