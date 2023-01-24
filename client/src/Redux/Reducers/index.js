
const GET_ALL_PETS = 'GET_ALL_PETS'
const GET_PETS_FILTERED_SPECIE = 'GET_PETS_FILTERED_SPECIE'
const GET_PETS_FILTERED_SIZE = 'GET_PETS_FILTERED_SIZE'

const initialState = {
    allPets: [],
    filteredPets: []
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
        default:
            return state;
    }
}

export default rootReducer;
