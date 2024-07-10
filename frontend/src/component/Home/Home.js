import React, { Fragment } from 'react'
import { CgMouse } from 'react-icons/cg'
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Product from './Product.js'

const product={
    name: "Blue Tshirt",
    price: "$300",
    _id: "Srijan",
    images: [{ url : "https://i.ibb.co/DRST11n/1.webp"}],
}

const Home = () => {
  return (
    <Fragment>
        <div className="banner">
            <a href="Cart" className='cart'>
                <button className='cartb'>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </button>
                {/* <p className='cartp'>CART</p> */}
            </a>
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
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>

            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
        </div>
    </Fragment>
  )
}

export default Home