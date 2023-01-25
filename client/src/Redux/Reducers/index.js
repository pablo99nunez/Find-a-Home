import { GET_ALL_PETS, GET_PETS_FILTERED_BOTH_FILTERS, GET_USER_BY_EMAIL, GET_PETS_FILTERED_SPECIE, GET_PETS_FILTERED_SIZE } from "../Actions"

const initialState = {
    allPets: [],
    currentUser: {}
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ALL_PETS:
            return {
                ...state,
                allPets: action.payload
            }
        case GET_PETS_FILTERED_SPECIE:
            return {
                ...state,
                allPets: action.payload
            }
        case GET_PETS_FILTERED_SIZE:
            return {
                ...state,
                allPets: action.payload
            }
        case GET_PETS_FILTERED_BOTH_FILTERS:
            return {
                ...state,
                allPets: action.payload
            }
        case GET_USER_BY_EMAIL :
            return {
                ...state,
                currentUser: action.payload
            }    
        default:
            return state;
    }
}

export default rootReducer;
