import axios from "axios";
const { REACT_API_URL } = process.env;

const createApiClient = (baseURL) => {
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      //   Authorization: `Bearer ${token}`,
    },
  });

  const handleRequest = async (req) => {
    try {
      const response = await req();
      return response.data;
    } catch (err) {
      console.error("API request error:", err);
      throw err;
    }
  };

  return {
    insertURL: async (endpoint, data) => {
      return handleRequest(() => api.post(endpoint, data));
    },
    // first parameter is url and 2nd is the data which needs to be sent.
    getAllURL: async (endpoint) => {
      return handleRequest(() => api.get(endpoint));
    },

    getURLByShortURLId: async (endpoint, shortURLId) => {
      return handleRequest(() => api.get(`${endpoint}/${shortURLId}`));
    },

    deleteURLById: async (endpoint, id) => {
      return handleRequest(() => api.delete(`${endpoint}/${id}`));
    },
  };
};

// const authenticate = async (username, password) => {
//   try {
//     const response = await axios.post(`${REACT_API_URL}/auth/login`, {
//       username,
//       password,
//     });
//     return response.data.token;
//   } catch (err) {
//     console.error("Authentication error:", err);
//     throw err;
//   }
// };

const apiClient = async () => {
  try {
    // const token = await authenticate(username, password);
    const apiClientfunc = createApiClient("http://localhost:7081");
    console.log(REACT_API_URL);
    return apiClientfunc;
  } catch (err) {
    console.error("Failed to setup API client:", err);
    throw err;
  }
};

export default apiClient;
