import axios from "axios";
import { BASE_URL_IP } from "@env";
import { auth } from "../../firebase/authentication";

export const url = BASE_URL_IP;

if (!BASE_URL_IP) {
  alert(
    "No se cargó bien el .env! Ejemplo: BASE_URL_IP=http://100.25.46.52:8080/"
  );
}

export const GET_ALL_PETS = "GET_ALL_PETS";
export const GET_PETS_FILTERED_SPECIE = "GET_PETS_FILTERED_SPECIE";
export const GET_PETS_FILTERED_SIZE = "GET_PETS_FILTERED_SIZE";
export const GET_PETS_FILTERED_BOTH_FILTERS = "GET_PETS_FILTERED_BOTH_FILTERS";
export const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL";
export const GET_PET_BY_OWNER = "GET_PET_BY_OWNER";

export const getAllPets = () => {
  return async (dispatch) => {
    const json = await axios.get(`${url}/pet`);
    return dispatch({
      type: GET_ALL_PETS,
      payload: json.data,
    });
  };
};

export const getPetsFilteredBySpecie = (payload) => {
  return async (dispatch) => {
    const json = await axios.get(`${url}/pet/filter/specie/${payload}`);
    return dispatch({
      type: GET_PETS_FILTERED_SPECIE,
      payload: json.data,
    });
  };
};

export const getPetsFilteredBySize = (payload) => {
  return async (dispatch) => {
    const json = await axios.get(`${url}/pet/filter/size/${payload}`);
    return dispatch({
      type: GET_PETS_FILTERED_SIZE,
      payload: json.data,
    });
  };
};

export const getPetsFilteredByTwoFilters = (payload) => {
  return async (dispatch) => {
    const json = await axios.get(
      `${url}/pet/filter?size=${payload[0]}&specie=${payload[1]}`
    );
    return dispatch({
      type: GET_PETS_FILTERED_BOTH_FILTERS,
      payload: json.data,
    });
  };
};

export const putUserData = async (payload) => {
  /* 
    ¿que estructura tiene el payload? Esta
    payload ={
        "departamento": "Buenos Aires",
        "pais": "Argentina",
        "provincia": "Buenos Aires",
        "telefono": "3232"
        "conditions": {} 
    },
     */
  const config = {
    headers: {
      "Content-Type": "application/json", //IMPORTANTE, SIEMPRE AÑADIR, sino no envia el body
      Authorization: `Bearer ${auth.currentUser.stsTokenManager.accessToken}`,
    },
  };
  const objetoAenviar = {
    phone: payload.telefono,
    address: [payload.pais, payload.provincia, payload.departamento],
    conditions: payload.condiciones,
  };
  console.log(objetoAenviar);

  const json = await axios
    .put(`${url}/user/profile`, objetoAenviar, config)
    .catch((error) => alert(error.message));
  return json;

  /*  return async (dispatch) => {
        const json = await axios.put(`${url}/user/profile`,objetoAenviar,config)
        return dispatch({
            type: GET_PETS_FILTERED_BOTH_FILTERS,
            payload: json.data
        })
    } */
};

export const PetPost = async (bodyPayload) => {
  const config = {
    headers: {
      "Content-Type": "application/json", //IMPORTANTE, SIEMPRE AÑADIR, sino no envia el body
      Authorization: `Bearer ${auth.currentUser.stsTokenManager.accessToken}`,
    },
  };
  try {
    const pet = await axios.post(url + "/pet", bodyPayload, config);
    return pet;
  } catch (error) {
    throw error;
  }
};

export const PetEdit = async (bodyPayload) => {
  const config = {
    headers: {
      "Content-Type": "application/json", //IMPORTANTE, SIEMPRE AÑADIR, sino no envia el body
      Authorization: `Bearer ${auth.currentUser.stsTokenManager.accessToken}`,
    },
  };
  try {
    const pet = await axios.put(url + "/pet", bodyPayload, config);
    return pet;
  } catch (error) {
    throw error;
  }
};

export const getUser = (email) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${auth.currentUser.stsTokenManager.accessToken}`,
    },
  };

  return async function (dispatch) {
    fetch(url + "/user/profile", config)
      .then((response) => response.json())
      .then((result) => {
        return dispatch({
          type: GET_USER_BY_EMAIL,
          payload: result,
        });
      })
      .catch((err) => alert(err.message));
  };
};

export const checked = (payload) => {
  return {
    type: "CHECKED",
    payload,
  };
};
//Al fetch hay  q enviarle por body el email
//{email: email}
export const getPetByOwner = (email) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${auth.currentUser.stsTokenManager.accessToken}`,
    },
  };

  return async function (dispatch) {
    fetch(url + "/pet/byowner", config)
      .then((response) => response.json())
      .then((result) => {
        return dispatch({
          type: GET_PET_BY_OWNER,
          payload: result,
        });
      })
      .catch((error) => {
        alert("Error en el fetch de getPetByOwner!");
      });
  };
};
