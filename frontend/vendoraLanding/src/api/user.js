import axios from "axios"

export const signUpUser = async (userInfo) => {
    const response = await axios.post("http://localhost:3000/user", {
        userEmail: userInfo.userEmail,
    });

    if (response.status == 200)
    {
        return response.data;
    }
}