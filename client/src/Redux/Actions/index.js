import axios from "axios";
import { BASE_URL_IP } from "@env";
import { auth } from "../../firebase/authentication";

export const url = BASE_URL_IP;

if (!BASE_URL_IP) {
  alert(
    "No se cargó bien el .env! Ejemplo: BASE_URL_IP=http://100.26.168.38:8080/"
  );
}

export const GET_ALL_PETS = "GET_ALL_PETS";
export const GET_PETS_FILTERED_SPECIE = "GET_PETS_FILTERED_SPECIE";
export const GET_PETS_FILTERED_SIZE = "GET_PETS_FILTERED_SIZE";
export const GET_PETS_FILTERED_BOTH_FILTERS = "GET_PETS_FILTERED_BOTH_FILTERS";
export const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL";
export const GET_PET_BY_OWNER = "GET_PET_BY_OWNER";
export const IS_LOGGED_IN = "IS_LOGGED_IN";
export const CONFIRM_ADOPTION = "CONFIRM_ADOPTION";
export const GET_PETS_BY_ZONE = "GET_PETS_BY_ZONE";
export const SEND_NOTIFICATION = "SEND_NOTIFICATION";


//devuelve verdadero si el token se decodifico, falso otherrwise
export const checkToken = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json", //IMPORTANTE, SIEMPRE AÑADIR, sino no envia el body
      Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
    },
  };
  const response = await axios.get(`${url}/check`, config)
  .then(resp=>{
    return true
  })
  .catch(err => {
    return false

  })
  return response
}

export const getAllPets = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`${url}/pet`);
      return dispatch({
        type: GET_ALL_PETS,
        payload: json.data,
      });
    } catch (error) {
      console.error("⚠️ Error -> 🚨 Action -> 🔔  getAllPets: " + error);
    }

  };
};

export const getPetsFilteredBySpecie = (payload) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`${url}/pet/filter/specie/${payload}`);
      return dispatch({
        type: GET_PETS_FILTERED_SPECIE,
        payload: json.data,
      });
    } catch (error) {
      console.error("⚠️ Error -> 🚨 Action -> 🔔  getPetsFilteredBySpecie: " + error.message);
    }

  };
};

export const getPetsFilteredBySize = (payload) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`${url}/pet/filter/size/${payload}`);
      return dispatch({
        type: GET_PETS_FILTERED_SIZE,
        payload: json.data,
      });
    } catch (error) {
      console.error("⚠️ Error -> 🚨 Action -> 🔔  getPetsFilteredBySize: " + error.message);
    }

  };
};

export const getPetsFilteredByTwoFilters = (payload) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(
        `${url}/pet/filter?size=${payload[0]}&specie=${payload[1]}`
      )
      return dispatch({
        type: GET_PETS_FILTERED_BOTH_FILTERS,
        payload: json.data,
      });
    } catch (error) {
      console.error("⚠️ Error -> 🚨 Action -> 🔔  getPetsFilteredByTwoFilters: " + error.message);
    }

  };
};


export const getPetsByZone = (radius, coords) => {
  return async (dispatch) => {
    try {
      await axios
        .put(`${url}/pet/filter/zone/${radius}`, coords)
        .then(response => { //if
          dispatch({
            type: GET_PETS_BY_ZONE,
            payload: response.data,
          })
        })
        .catch(() => { //else
          dispatch(getAllPets());
        });

    } catch (error) {
      console.error("⚠️ - Error -> 🚨 Action -> 🔔  getPetsByZone: " + error.message);
    }

  };
};

export const putUserData = async (profile) => {
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
      Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
    },
  };
  const objetoAenviar = {
    firstName: profile.name,
    lastName: profile.firstName,
    profilePic: profile.profilePic,
    address: profile.address,
    phone: profile.phone,
  };

  const json = await axios
    .put(`${url}/user/profile`, objetoAenviar, config)
    .catch((error) => console.error("⚠️ Error -> 🚨 Action -> 🔔 putUserData: " + error.message));
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
      Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
    },
  };
  try {
    const pet = await axios.post(url + "/pet", bodyPayload, config);
    return pet;
  } catch (error) {
    console.error("⚠️ Error -> 🚨 Action -> 🔔 PetPost: " + error.message)
  }
};

export const PetEdit = async (bodyPayload) => {
  const config = {
    headers: {
      "Content-Type": "application/json", //IMPORTANTE, SIEMPRE AÑADIR, sino no envia el body
      Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
    },
  };
  try {
    const pet = await axios.put(url + "/pet/profile", bodyPayload, config);

    return pet;
  } catch (error) {
    console.error("⚠️ Error -> 🚨 Action -> 🔔 PetEdit: " + error.message)
  }
};

export const getUser = () => {
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
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
      .catch((err) =>{
        if (typeof err.response !== "undefined" && err.response.data.error)
				alert(err.response.data.error)	
        else
        alert(err.message)
      }
      );
  };
};

export const checked = (payload) => {
  return {
    type: "CHECKED",
    payload,
  };
};
export const setIsLoggedIn = (payload) => {
  return {
    type: "IS_LOGGED_IN",
    payload,
  };
};

export const getPetByOwner = () => {
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
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
        console.error("⚠️ Error -> 🚨 Action -> 🔔 PetByOwner: " + error.message)
      });
  };
};

///Accept adoption pet
export const acceptAdoption = (petId, newOwnerEmail, rating) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
      },
    };
    const bodyPayload = {
      petID: petId,
      emailOwner: auth?.currentUser?.email,
      newOwnerEmail: newOwnerEmail,
      rating: rating || 5,
    };
    try {
      console.log(bodyPayload)
      const adoptionConfirmed = await axios.put(url + "/user/confirm", bodyPayload, config);
      dispatch({
        type: CONFIRM_ADOPTION,
        payload: adoptionConfirmed.data,
      });
    } catch (error) {
      console.error("⚠️ Error -> 🚨 Action -> 🔔 Acept Adoption: " + error.message)
    }
  };
};


export const EditProfiles = async (bodyPayload) => {
  const config = {
    headers: {
      "Content-Type": "application/json", //IMPORTANTE, SIEMPRE AÑADIR, sino no envia el body
      Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
    },
  };
  try {
    const profile = await axios.put(url + "/user/profile", bodyPayload, config);

    return profile;
  } catch (error) {
    console.error("⚠️ Error -> 🚨 Action -> 🔔 Profile: " + error.message)
  }
};



///Send Push Notifications
export const PushNotifications = (token, title, body) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
      },
    };
    const bodyPayload = {
      "token": token, "title": title, "body": body
    };
    try {
      console.log(bodyPayload)
      const status = await axios.post(url + "/send/push-notify", bodyPayload, config);
      // console.log(status.data)
      dispatch({
        type: SEND_NOTIFICATION,
        payload: status.data,
      });
    } catch (error) {
      console.error("⚠️ Error -> 🚨 Action -> 🔔 PushNotifications: " + error.message)
    }
  };
};


export const DeletePet = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json", //IMPORTANTE, SIEMPRE AÑADIR, sino no envia el body
      Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
    },
  };
  const bodyPayload = {
    "id": id
  };
  try {
    const Delete = await axios.delete(url + "/admin/deletePet", bodyPayload, config);

    return Delete;
  } catch (error) {
    console.error("⚠️ Error -> 🚨 Action -> 🔔 Delete: " + error.message)
  }
};

export const UserBan = async (owner) => {
  const config = {
    headers: {
      "Content-Type": "application/json", //IMPORTANTE, SIEMPRE AÑADIR, sino no envia el body
      Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
    },
  };
  const bodyPayload = {
    "OwenerEmail": owner
  };
  try {
    const Delete = await axios.delete(url + "/admin/ban", bodyPayload, config);

    return Delete;
  } catch (error) {
    console.error("⚠️ Error -> 🚨 Action -> 🔔 Delete: " + error.message)
  }
};
<<<<<<< HEAD


export const createUserInDb = async (
  { firstName,
    lastName,
    email,
    phone,
    address,
    conditions,
    pushToken },tokenn
) => {
  const data = {
    firstName,
    lastName,
    profilePic:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Color_icon_warm.svg/600px-Color_icon_warm.svg.png?20100407180532",
    email,
    phone,
    address,
    conditions,
    pushToken
  };
  console.log("DATA FOR DB CREATION:", data);

  return await axios
    .post(`${url}/user`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenn}`,
      },
    })

};
=======
export const DesbanUser = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json", //IMPORTANTE, SIEMPRE AÑADIR, sino no envia el body
      Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
    },
  };
  const bodyPayload = {
    "id": id
  };
  try {
    const Delete = await axios.delete(url + "/admin/desbanear", bodyPayload, config);

    return Delete;
  } catch (error) {
    console.error("⚠️ Error -> 🚨 Action -> 🔔 Delete: " + error.message)
  }
};
>>>>>>> 0d015295c65e05648c9d0ab6030b0608bd48bdee
