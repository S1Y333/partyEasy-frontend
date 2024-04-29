import axios from "axios";


const SERVER_URL = "http://localhost:8080";
export const createUser = async (authtoken) => {
  return await axios.post(
    `${process.env.SERVER_URL}/createNewUser`,
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
      `${process.env.SERVER_URL}/current-user`,
      {},
      {
        headers: {
          authtoken,
        },
      }
    );
}