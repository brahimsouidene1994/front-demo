import axios from 'axios';
const signin = async (credentials) =>{
    const url = `${process.env.REACT_APP_BACK_URL}api/auth/signin`
    console.log("url: " + url)
    try {
        const response = await axios.post(url, credentials)
        console.log("response", response)
        return response.data
    } catch (error) {
        console.error("Error :", error);
        throw error;
    }
}
const signup = async (credentials) =>{
    const url = `${process.env.REACT_APP_BACK_URL}api/auth/signup`
    try {
        const response = await axios.post(url, credentials)
        return response.data
    } catch (error) {
        console.error("Error :", error)
        throw error;
    }
}

export default{
    signin,
    signup
}