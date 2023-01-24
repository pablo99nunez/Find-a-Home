import axios from 'axios'

const url = 'http://192.168.68.54:8080'

const GET_ALL_PETS = 'GET_ALL_PETS'
const GET_PETS_FILTERED_SPECIE = 'GET_PETS_FILTERED_SPECIE'
const GET_PETS_FILTERED_SIZE = 'GET_PETS_FILTERED_SIZE'
const GET_PETS_FILTERED_BOTH_FILTERS = 'GET_PETS_FILTERED_BOTH_FILTERS'

export const getAllPets = () => {
    return async (dispatch) => {
        const json = await axios.get('http://192.168.68.54:8080/pet')
        return dispatch({
            type: GET_ALL_PETS,
            payload: json.data
        })
    }
}

export const getPetsFilteredBySpecie = (payload) => {
    return async (dispatch) => {
        const json = await axios.get(url+`/pet/filter/specie/${payload}`)
        return dispatch({
            type: GET_PETS_FILTERED_SPECIE,
            payload: json.data
        })
    }
}

export const getPetsFilteredBySize = (payload) => {
    return async (dispatch) => {
        const json = await axios.get(url+`/pet/filter/size/${payload}`)
        return dispatch({
            type: GET_PETS_FILTERED_SIZE,
            payload: json.data
        })
    }
}

export const getPetsFilteredByTwoFilters = (payload) => {
    return async (dispatch) => {
        const json = await axios.get(url+`/pet/filter?size=${payload[0]}&specie=${payload[1]}`)
        return dispatch({
            type: GET_PETS_FILTERED_BOTH_FILTERS,
            payload: json.data
        })
    }
}

