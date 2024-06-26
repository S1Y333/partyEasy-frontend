import axios from "axios";

 const SERVER_URL = process.env.REACT_APP_SERVER_URL;
//const SERVER_URL = "http://localhost:8080/api";

export const createNewPackage = async (authtoken, newPackageInfo) => { 
 try { const response = await axios.post(
    `${SERVER_URL}/package/createNewPackage`,
    newPackageInfo,
    {
      headers: {
        authtoken,
      },
    }
  );
 
     return response.data;
 } catch (error) {

     console.log(error);
 }
};

export const getAllPackages = async () => {
  try {const response = await axios.get(`${SERVER_URL}/package`);

      return response.data;
  } catch (error) {
       console.log(error);
  }
};

export const getPackageById = async (id) => {
 try {  const response = await axios.get(`${SERVER_URL}/package/${id}`);

    return response.data;
 } catch (error) {
     console.log(error);
  }
}

export const getUserPackages = async (authtoken) => {
  
    try {
        const response = await axios.post(`${SERVER_URL}/package/userPackage`,{},
            {
          headers: {
            authtoken,
          },
        });
        return response.data;
    } catch (error) {
        console.log(error);
  }
}

export const likeOnePackage = async (authtoken, packageId) => {
   try {
     const response = await axios.post(
       `${SERVER_URL}/package/like/${packageId}`,
       {},
       {
         headers: {
           authtoken,
         },
       }
     );

     return response.data;
   } catch (error) {
     console.log(error);
   }
}

export const unLikeOnePackage = async (authtoken, packageId) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/package/unlike/${packageId}`,
      {},
      {
        headers: {
          authtoken,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const saveOnePackage = async (authtoken, packageId) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/package/save/${packageId}`,
     {},
      {
        headers: {
          authtoken,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const unSaveOnePackage = async (authtoken, packageId) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/package/unsave/${packageId}`,
      {},
      {
        headers: {
          authtoken,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
