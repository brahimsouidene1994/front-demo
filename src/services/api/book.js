import axios from 'axios';
import sessionServices from './session';
const getAllBooks = async () => {
    const url = `${process.env.REACT_APP_BACK_URL}api/book/getAllBooks`
    try {
        const response = await axios.get(url, { headers: sessionServices.getSession() })
        return response.data.data
    } catch (error) {
        console.error("Error :", error);
        throw error;
    }
}

const deleteBook = async (id) => {
    const url = `${process.env.REACT_APP_BACK_URL}api/book/deleteBook`
    console.log("url: " + url)
    try {
        const response = await axios.delete(`${url}/${id}`, { headers: sessionServices.getSession() })
        return response.data.data
    } catch (error) {
        console.error("Error :", error);
        throw error;
    }
}

const getOneBook = async (id) => {
    const url = `${process.env.REACT_APP_BACK_URL}api/book/findBook`
    console.log("url: " + url)
    try {
        const response = await axios.get(`${url}/${id}`, { headers: sessionServices.getSession() })
        return response.data.data
    } catch (error) {
        console.error("Error :", error);
        throw error;
    }
}

const updateBook = async (id, obj) => {
    const url = `${process.env.REACT_APP_BACK_URL}api/book/updateBook`
    console.log("url: " + url)
    try {
        const response = await axios.patch(`${url}/${id}`, obj,
            {
                headers: sessionServices.getSession()
            })
        return response.data.data
    } catch (error) {
        console.error("Error :", error);
        throw error;
    }
}

const newBook = async (obj) => {
    const url = `${process.env.REACT_APP_BACK_URL}api/book/insertBook`
    try {
        const response = await axios.post(`${url}`, obj,
            {
                headers: sessionServices.getSession()
            })
        return response.data.data
    } catch (error) {
        console.error("Error :", error);
        throw error;
    }
}

const bookServices = {
    getAllBooks,
    deleteBook,
    getOneBook,
    updateBook,
    newBook
};

export default bookServices;