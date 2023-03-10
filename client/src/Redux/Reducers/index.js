import {
  GET_ALL_PETS,
  GET_PETS_FILTERED_BOTH_FILTERS,
  GET_USER_BY_EMAIL,
  GET_PETS_FILTERED_SPECIE,
  GET_PETS_FILTERED_SIZE,
  GET_PET_BY_OWNER,
  IS_LOGGED_IN,
  GET_PETS_BY_ZONE,
  PAYMENT_LINK,
} from "../Actions";

const initialState = {
  allPets: [],
  check: "false",
  currentUser: {},
  currentPets: {},
  isLoggedIn: false,
  paymentLink: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case GET_ALL_PETS:
      return {
        ...state,
        allPets: action.payload,
      };
    case GET_PETS_FILTERED_SPECIE:
      return {
        ...state,
        allPets: action.payload,
      };
    case GET_PETS_FILTERED_SIZE:
      return {
        ...state,
        allPets: action.payload,
      };
    case GET_PETS_FILTERED_BOTH_FILTERS:
      return {
        ...state,
        allPets: action.payload,
      };
    case GET_PETS_BY_ZONE:
      return {
        ...state,
        allPets: action.payload,
      };
    case GET_USER_BY_EMAIL:
      return {
        ...state,
        currentUser: action.payload,
      };

    case GET_PET_BY_OWNER:
      return {
        ...state,
        currentPets: action.payload,
      };

    case "CHECKED":
      return {
        ...state,
        check: action.payload,
      };
    case PAYMENT_LINK:
      return {
        ...state,
        paymentLink: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
