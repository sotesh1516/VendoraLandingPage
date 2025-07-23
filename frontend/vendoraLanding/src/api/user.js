import axios from "axios";

export const signUpUser = async (userInfo) => {
  try {
    const response = await axios.post(
      "https://vendoralandingpage.onrender.com/user",
      {
        userEmail: userInfo.userEmail,
      }
    );

    if (response.status === 200) {
      return response.data; 
    } else {
      console.error("Unexpected status code:", response.status);
      return { error: "Unexpected response from server." };
    }
  } catch (error) {
    console.error("Error in signUpUser:", error.response?.data || error.message);
    return { error: "Failed to sign up. Please try again later." };
  }
};
