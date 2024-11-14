import React from 'react';
import ReactStars from "react-rating-stars-component";
import { NavLink, Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg"
import wish from "../images/wish.svg"
import wishlist from "../images/wishlist.svg"
import watch from "../images/watch.jpg"
import watch2 from "../images/watch-2.jpg"
import addcart from "../images/add-cart.svg"
import view from "../images/view.svg"
import {useDispatch, useSelector} from "react-redux"
import { addToWishlist } from '../features/products/productSlice';

const ProductCard = (props) => {
    let location = useLocation();
    const {grid,data} = props;                                  
    const dispatch = useDispatch();
    const addToWish = (id) =>{
        dispatch(addToWishlist(id))
    }
  return (
    <>{
        data && data?.map((item,index)=>{
            return(
                <div key={index} className={`${location.pathname=="/product" ? `gr-${grid}`: "col-3"}`}>
                <div
                    className="product-card position-relative">
                    <div className="wishlist-icon position-absolute">
                        <button className='border-0 bg-transparent'  onClick={(e)=> addToWish(item?._id)} ><img src={wish} alt="wishlist"/></button>
                    </div>
                    <div className="product-image">
                        <img src={item?.images[0].url} className='img-fluid d-block mx-auto' width={160} alt="product image" />
                        {/* <img src={watch} className='img-fluid d-block mx-auto' width={160} alt="product image" /> */}
                        {/* <img src={watch2} className='img-fluid' alt="product image" /> */}
                    </div>
                    <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">
                            {item?.title}
                        </h5>
                        <ReactStars count={5} size={24} value={item?.totalrating.toString()} activeColor="#ffd700" edit={false}/>
                        <p className={`description ${grid === 12 ? "d-block" : "d-none"}`} dangerouslySetInnerHTML={{__html:item?.description}}></p>
                        <p className="price">$ {item?.price}</p>
                    </div>
                    <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                            {/* <button  className='border-0 bg-transparent'><img src={prodcompare} alt="Product compare" /></button> */}
                            <Link to={"/product/" + item?._id}  className='border-0 bg-transparent'><img src={view} alt="view" /></Link>
                            {/* <button  className='border-0 bg-transparent'><img src={addcart} alt="add-cart" /></button> */}
                        </div>
                    </div>
                </div>
            </div>
            )
        })
    }

    </>
  )
}

export default ProductCard
