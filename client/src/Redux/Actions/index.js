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
export const PAYMENT_LINK = "PAYMENT_LINK";
export const GET_PET_DATA_BY_ID = "GET_PET_DATA_BY_ID";
export const RATING_REVIEW = "RATING_REVIEW";

//devuelve verdadero si el token se decodifico, falso otherrwise
export const checkToken = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json", //IMPORTANTE, SIEMPRE AÑADIR, sino no envia el body
      Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
    },
  };
  const response = await axios
    .get(`${url}/check`, config)
    .then((resp) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
  return response;
};
//devuelve verdadero si el usuario existe en la base de datos
export const checkEmail = async (email) => {
  const response = await axios
    .get(`${url}/user/checkemail?email=${email}`)
    .then((resp) => {
      return resp.data.payload;
    })
    .catch((err) => {
      return false;
    });
  return response;
};

export const getAllPets = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`${url}/pet`);
      return dispatch({
        type: GET_ALL_PETS,
        payload: json.data,
      });
    } catch (error) {
      console.error(
        "⚠️ Error -> 🚨 Action -> 🔔  getAllPets: " + error.response.data
      );
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
      console.error(
        "⚠️ Error -> 🚨 Action -> 🔔  getPetsFilteredBySpecie: " +
          error.response.data
      );
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
      console.error(
        "⚠️ Error -> 🚨 Action -> 🔔  getPetsFilteredBySize: " +
          error.response.data
      );
    }
  };
};

export const getPetsFilteredByTwoFilters = (payload) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(
        `${url}/pet/filter?size=${payload[0]}&specie=${payload[1]}`
      );
      return dispatch({
        type: GET_PETS_FILTERED_BOTH_FILTERS,
        payload: json.data,
      });
    } catch (error) {
      console.error(
        "⚠️ Error -> 🚨 Action -> 🔔  getPetsFilteredByTwoFilters: " +
          error.response.data
      );
    }
  };
};
/* export const getPetdataById = async (payload) => {
  try {
    const json = await axios.get(`${url}/pet/${payload}}`);
    return json;
  } catch (error) {
    console.error(
      "⚠️ Error -> 🚨 Action -> 🔔  getPetdataById: " + error.response.data
    );
  }
}; */

export const getPetsByZone = (radius, coords) => {
  return async (dispatch) => {
    try {
      await axios
        .put(`${url}/pet/filter/zone/${radius}`, coords)
        .then((response) => {
          //if
          dispatch({
            type: GET_PETS_BY_ZONE,
            payload: response.data,
          });
        })
        .catch(() => {
          //else
          dispatch(getAllPets());
        });
    } catch (error) {
      console.error(
        "⚠️ - Error -> 🚨 Action -> 🔔  getPetsByZone: " + error.response.data
      );
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
    .catch((error) =>
      console.error(
        "⚠️ Error -> 🚨 Action -> 🔔 putUserData: " + error.response.data
      )
    );
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
  } catch (err) {
    if (typeof err.response !== "undefined" && err.response.data.error)
      throw new Error(err.response.data.error);
    else throw err;
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
    console.error(
      "⚠️ Error -> 🚨 Action -> 🔔 PetEdit: " + error.response.data
    );
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
      .catch((err) => {
        if (typeof err.response !== "undefined" && err.response.data.error)
          alert(err.response.data.error);
        else alert("index.js " + err.message);
      });
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
        console.error(
          "⚠️ Error -> 🚨 Action -> 🔔 PetByOwner: " + error.response.data
        );
      });
  };
};

///Accept adoption pet
export const acceptAdoption = (petId, newOwnerEmail) => {
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
    };
    try {
      const adoptionConfirmed = await axios.put(
        url + "/user/confirm",
        bodyPayload,
        config
      );
      dispatch({
        type: CONFIRM_ADOPTION,
        payload: adoptionConfirmed.data,
      });
    } catch (error) {
      console.error(
        "⚠️ Error -> 🚨 Action -> 🔔 acceptAdoption: " + error.message
      );
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
    console.error(
      "⚠️ Error -> 🚨 Action -> 🔔 Profile: " + error.response.data
    );
  }
};

///Send Push Notifications
export const PushNotifications = (token, title, body, email) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
      },
    };
    const bodyPayload = {
      token: token,
      title: title,
      body: body,
      email: email,
    };
    try {
      const status = await axios.post(
        url + "/send/push-notify",
        bodyPayload,
        config
      );
      console.log(status.data);
      dispatch({
        type: SEND_NOTIFICATION,
        payload: status.data,
      });
    } catch (error) {
      console.error(
        "⚠️ Error -> 🚨 Action -> 🔔 PushNotifications: " + error.response.data
      );
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
    id: id,
  };
  try {
    const desbanear = await axios.delete(
      url + "/admin/deletePet",
      bodyPayload,
      config
    );

    return desbanear;
  } catch (error) {
    console.error("⚠️ Error -> 🚨 Action -> 🔔 delete: " + error.response.data);
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
    OwenerEmail: owner,
  };
  try {
    const banear = await axios.put(url + "/admin/ban", bodyPayload, config);

    return banear;
  } catch (error) {
    console.error("⚠️ Error -> 🚨 Action -> 🔔 banear: " + error.response.data);
  }
};

export const DesbanUser = async (owner) => {
  const config = {
    headers: {
      "Content-Type": "application/json", //IMPORTANTE, SIEMPRE AÑADIR, sino no envia el body
      Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
    },
  };
  const bodyPayload = {
    OwenerEmail: owner,
  };
  try {
    const banear = await axios.put(
      url + "/admin/desbanear",
      bodyPayload,
      config
    );

    return banear;
  } catch (error) {
    console.error("⚠️ Error -> 🚨 Action -> 🔔 banear: " + error.response.data);
  }
};
export const MakeAdmin = async (owner) => {
  const config = {
    headers: {
      "Content-Type": "application/json", //IMPORTANTE, SIEMPRE AÑADIR, sino no envia el body
      Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
    },
  };
  const bodyPayload = {
    OwenerEmail: owner,
  };
  try {
    const banear = await axios.put(url + "/admin/admin", bodyPayload, config);

    return banear;
  } catch (error) {
    console.error("⚠️ Error -> 🚨 Action -> 🔔 banear: " + error.response.data);
  }
};
export const ReportPets = async (id, denuncia) => {
  const config = {
    headers: {
      "Content-Type": "application/json", //IMPORTANTE, SIEMPRE AÑADIR, sino no envia el body
      Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
    },
  };
  const bodyPayload = {
    id: id,
    denuncia: denuncia,
  };
  try {
    const banear = await axios.put(url + "/pet/denunciar", bodyPayload, config);

    return banear;
  } catch (error) {
    console.error(
      "⚠️ Error -> 🚨 Action -> 🔔 denunciar: " + error.response.data
    );
  }
};

export const createUserInDb = async (
  { firstName, lastName, email, phone, address, conditions, pushToken },
  tokenn
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
    pushToken,
  };
  console.log("DATA FOR DB CREATION:", data);

  return await axios.post(`${url}/user`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenn}`,
    },
  });
};

export const amountDonate = (payload) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`${url}/donation?cantidad=${payload}`);
      return dispatch({
        type: PAYMENT_LINK,
        payload: json.data.init_point,
      });
    } catch (error) {
      console.error(
        "⚠️ Error -> 🚨 Action -> 🔔 amountDonate: " + error.response.data
      );
    }
  };
};

export const reviewAndRating = (ratedEmail, rating, review) => {
  const config = {
    headers: {
      "Content-Type": "application/json", //IMPORTANTE, SIEMPRE AÑADIR, sino no envia el body
      Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
    },
  };
  const bodyPayload = {
    ratedEmail,
    rating,
    review,
  };
  return async () => {
    try {
      await axios.put(`${url}/user/ratingreview`, bodyPayload, config);
    } catch (error) {
      console.error(
        "⚠️ Error -> 🚨 Action -> 🔔 reviewAndRating: " + error.response.data
      );
    }
  };
};

export const Donacion = async (cash) => {
  const config = {
    headers: {
      "Content-Type": "application/json", //IMPORTANTE, SIEMPRE AÑADIR, sino no envia el body
      Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
    },
  };
  const bodyPayload = {
    monto: cash,
  };
  try {
    const donacion = await axios.put(url + "/user/donate", bodyPayload, config);

    return banear;
  } catch (error) {
    console.error(
      "⚠️ Error -> 🚨 Action -> 🔔 donacion: " + error.response.data
    );
  }
};
