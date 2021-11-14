// palauttaa olion, jonka kenttinä on 
// henkilöjen käsittelyä hoitavia funktioita

import axios from 'axios'

//const baseUrl = 'http://localhost:3001/persons'
// muutettu vastaamaan osan3 backendin urlia, jossa muistiinpanot/puhelinluettelo on
const baseUrl = '/api/persons'

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
      axios.delete(`${baseUrl}/${id}`)
      window.location.reload()
    }
}

export default { getAll, create, deleteObj }