const GET_ALL_PETS = 'GET_ALL_PETS'

const initialState = {
    allPets: []
}
// console.log(initialState.allPets);
const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ALL_PETS:
            return {
                ...state,
                allPets: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer