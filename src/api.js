import api from "./axios";

// Define a function to handle user registration
export const registerUser = async (formData) => {
  try {
    const response = await api.post("/register", formData);
    return response.data; // Return the response data on success
  } catch (error) {
    throw error; // Throw an error on failure
  }
};
