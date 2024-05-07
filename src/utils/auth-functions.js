import axios from "axios";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const createNewUser = async (authtoken, formData) => {
  return await axios.post(
    `${SERVER_URL}/user/createNewUser`,
    formData,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
   
    return await axios.post(
      `${SERVER_URL}/user/currentUser`,
      {},
      {
        headers: {
          authtoken,
        },
      }
    );
}

