import axios from 'axios'
import {
    ALL_PRODUCT_FAIL, 
    ALL_PRODUCT_REQUEST, 
    ALL_PRODUCT_SUCCESS, 
    CLEAR_ERRORS ,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';

export const getProduct = (keyword="", currentPage=1, price=[0,25000], category, ratings=0) => async(dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST,
        });


        // const x = `${process.env.REACT_APP_BASE_URL}/api/v1/products?page=1`;
        // console.log(`link = ${x}`);

        let link = `${process.env.REACT_APP_BASE_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category) link = `${process.env.REACT_APP_BASE_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;

        const {data} = await axios.get(link); 
        
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({  
            type: ALL_PRODUCT_FAIL,
            payload: error,
        })
    }
}


export const getProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
        });

        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/product/${id}`); 

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.currProd,
        })
    } catch (error) {
        dispatch({  
            type: PRODUCT_DETAILS_FAIL,
            payload: error,
        })
    }
}


export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}