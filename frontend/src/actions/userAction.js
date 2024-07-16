import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    CLEAR_ERRORS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants'

import axios from 'axios'

export const login = (email, password) => async (dispatch) =>{
    try {
        dispatch({
            type: LOGIN_REQUEST
        });

        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/login`, {email, password}, config);
        // console.log("data",data);
        localStorage.setItem('token',data?.token);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        })
    }
};


export const register = (userData) => async (dispatch) =>{
    try {
        dispatch({
            type: REGISTER_USER_REQUEST
        });
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/register`, userData, config);
        localStorage.setItem('token',data?.token);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const loadUser = () => async (dispatch) =>{
    try {
        dispatch({
            type: LOAD_USER_REQUEST
        });
        // console.log("tokennnn",localStorage.getItem("token"));
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/me`,{
            headers: {
                token: localStorage.getItem("token"),
            },
        });
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        })
    }
};

export const logout = () => async (dispatch) =>{
    try {
        // console.log("tokennnn",localStorage.getItem("token"));
        // await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/logout`,{
        //     headers: {
        //         token: localStorage.getItem("token"),
        //     },
        // });
        localStorage.setItem("token",null);
        // console.log("tokennnn",localStorage.getItem("token"));
        dispatch({
            type: LOGOUT_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const updateProfile = (userData) => async (dispatch) =>{
    try {
        dispatch({
            type: UPDATE_PROFILE_REQUEST
        });
        // const config = { headers: {  } };
        // console.log("tokennnn",localStorage.getItem("token"));
        const {data} = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/v1/me/update`, userData, {
            headers: {
                token: localStorage.getItem("token"),
                "Content-Type": "multipart/form-data"
            },
        });
        // localStorage.setItem('token',data?.token);
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        });
    }
};



export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}
