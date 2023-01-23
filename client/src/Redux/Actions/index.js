import axios from 'axios'

const url = 'http://localhost:8080/'

const GET_ALL_PETS = 'GET_ALL_PETS'


export const getAllPets = () => {
    return async (dispatch) => {
        const json = await axios.get('http://localhost:8080/pet')
        return dispatch({
            type: GET_ALL_PETS,
            payload: json.payload
        })
    }
}