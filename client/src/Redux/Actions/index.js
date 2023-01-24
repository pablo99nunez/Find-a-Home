import axios from 'axios'

const url = 'http://192.168.68.54:8080/pet'

const GET_ALL_PETS = 'GET_ALL_PETS'

export const getAllPets = () => {
    return async (dispatch) => {
        const json = await axios.get(url)
        return dispatch({
            type: GET_ALL_PETS,
            payload: json.data
        })
    }
}