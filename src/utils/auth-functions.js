import axios from "axios";


const SERVER_URL = "http://localhost:8080/api";
export const createUser = async (authtoken) => {
  
  return await axios.post(
    `${SERVER_URL}/user/createNewUser`,
    {},
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