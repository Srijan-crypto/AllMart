import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import './Home.css'
import Product from './ProductCard.js'
import MetaData from "../layout/metaData.js"
import {clearErrors, getProduct} from "../../actions/productAction.js"
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../layout/Loader/Loader.js'
import { toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const {loading, error, products} = useSelector(state=>state.products);


  useEffect(() => {
    if(error){
        // console.log(error);
        toast(error.message,{
            autoClose: 3000,
        });
        dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch,error]);
  
  

  return (
    
    <Fragment>
        {loading ? (
            <Loader/> 
        ) : (
            <Fragment>
        
                <MetaData title="AllMart"/>
        
        
                <div className="banner">
                    
                    
                    <p>Welcome to AllMart</p>
                    <h1>FIND AMAZING PRODUCTS BELOW</h1>
                    <a href="#container">
                        <button className='scroll'>
                            Scroll <CgMouse/>
                        </button>
                    </a>
                </div>
        
                <h2 className='homeHeading'>Featured Products</h2>
        
                <div className="container" id='container'>
                    {/* <Product product={product}/>
                    <Product product={product}/>
                    <Product product={product}/>
                    <Product product={product}/>
        
                    <Product product={product}/>
                    <Product product={product}/>
                    <Product product={product}/>
                    <Product product={product}/> */}
        
                    {products && products.map(product => (
                        <Product product={product}/>
                    ))}
        
        
                </div>
            </Fragment>

            )
        }
    </Fragment>
  )
}

export default Home