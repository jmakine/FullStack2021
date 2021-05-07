// palauttaa olion, jonka kenttinä on 
// henkilöjen käsittelyä hoitavia funktioita

import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteObj = async id => {
    const personToDelete = await axios
                      .get(`${baseUrl}/${id}`)
                      .then(response => response.data) 
                      .then(data => window.confirm(`Delete ${data.name} ?`))                     
                      
    if (personToDelete === true) {
      const request = axios.delete(`${baseUrl}/${id}`)
      window.location.reload()
    return request.then(response => response.data)}
}

export default { getAll, create, deleteObj }