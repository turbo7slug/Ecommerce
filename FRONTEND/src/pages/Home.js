import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom"
import ReactStars from "react-rating-stars-component";
import Marquee from 'react-fast-marquee'
import BlogCard from '../components/BlogCard'
import ProductCard from '../components/ProductCard'
import SpecialProducts from '../components/SpecialProducts'
import Container from '../components/Container'
import { services } from "../utils/Data"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { getAllBlogs } from '../features/blog/blogSlice'
import { getAllProducts } from '../features/products/productSlice'
import { addToWishlist } from '../features/products/productSlice';
import wish from "../images/wish.svg"
import view from "../images/view.svg"

const Home = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.product)
  const navigate = useNavigate()
  const blogState = useSelector((state) => state?.blog?.blog)

  useEffect(() => {
    getblogs();
    getProducts()
  }, [])
  const getblogs = () => {
    dispatch(getAllBlogs())
  }
  const getProducts = () => {
    dispatch(getAllProducts())
  }
  const addToWish = (id) => {
    dispatch(addToWishlist(id))
  }
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img src="images/main-banner-1.jpg" className='img-fluid rounded-3' alt="main banner" />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo.</p>
                <Link></Link>
                <Link className='button'>Buy Now</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative ">
                <img src="images/catbanner-01.jpg" className='img-fluid rounded-3' alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>Best Sale</h4>
                  <h5>Laptops Max</h5>
                  <p>From $999.00 <br /> or $41.62/mo.</p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img src="images/catbanner-02.jpg" className='img-fluid rounded-3' alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy IPAD Air</h5>
                  <p>From $999.00 or $41.62/mo.</p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img src="images/catbanner-03.jpg" className='img-fluid rounded-3' alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>From $999.00 <br /> or $41.62/mo.</p>
                </div>
              </div>  <div className="small-banner position-relative ">
                <img src="images/catbanner-04.jpg" className='img-fluid rounded-3' alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>From $999.00 <br /> or $41.62/mo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {
                services?.map((i, j) => {
                  return (
                    <div className='d-flex align-items-center gap-15' key={j}>
                      <img src={i.image} alt="services" />
                      <div>
                        <h6>{i.title}</h6>
                        <p className='mb-0'>{i.tagline}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className='d-flex gap-30 align-items-center'>
                <div>
                  <h6>
                    Cameras
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className='d-flex gap-30 align-items-center'>
                <div>
                  <h6>
                    Smart Tv
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className='d-flex gap-30 align-items-center'>
                <div>
                  <h6>
                    Headphones
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className='d-flex gap-30 align-items-center'>
                <div>
                  <h6>
                    Cameras
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className='d-flex gap-30 align-items-center'>
                <div>
                  <h6>
                    Cameras
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className='d-flex gap-30 align-items-center'>
                <div>
                  <h6>
                    Smart Tv
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className='d-flex gap-30 align-items-center'>
                <div>
                  <h6>
                    Headphones
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className='d-flex gap-30 align-items-center'>
                <div>
                  <h6>
                    Cameras
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">
              Our Popular Products
            </h3>
          </div>
        </div>
        <div className="row">
          {
            productState && productState?.map((item, index) => {
              if (item.tags === "popular") {
                return (
                  <div key={index} className="col-3">
                    <div
                      className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button className='border-0 bg-transparent' onClick={(e) => addToWish(item?._id)} ><img src={wish} alt="wishlist" /></button>
                      </div>
                      <div className="product-image">
                        <img src={item?.images[0].url} className='d-block mx-auto' width={160} alt="product image" />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">
                          {item?.title}
                        </h5>
                        <ReactStars count={5} size={24} value={item?.totalrating} activeColor="#ffd700" edit={false} />

                        <p className="price">$ {item?.price}</p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          {/* <button  className='border-0 bg-transparent'><img src={prodcompare} alt="Product compare" /></button> */}
                          <button className='border-0 bg-transparent'><img onClick={() => navigate("/product/" + item?._id)} src={view} alt="view" /></button>
                          {/* <button  className='border-0 bg-transparent'><img src={addcart} alt="add-cart" /></button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
      </Container>
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">
              Featured Collection
            </h3>
          </div>
          {
            productState && productState?.map((item, index) => {
              if (item.tags === "featured") {
                return (
                  <div key={index} className="col-3">
                    <div
                      className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button className='border-0 bg-transparent' onClick={(e) => addToWish(item?._id)} ><img src={wish} alt="wishlist" /></button>
                      </div>
                      <div className="product-image">
                        <img src={item?.images[0].url} className='d-block mx-auto' width={160} alt="product image" />
                        {/* <img src={watch} className='img-fluid d-block mx-auto' width={160} alt="product image" />
                        <img src={watch2} className='img-fluid' alt="product image" /> */}
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">
                          {item?.title}
                        </h5>
                        <ReactStars count={5} size={24} value={item?.totalrating.toString()} activeColor="#ffd700" edit={false} />

                        <p className="price">$ {item?.price}</p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          {/* <button  className='border-0 bg-transparent'><img src={prodcompare} alt="Product compare" /></button> */}
                          <button className='border-0 bg-transparent'><img onClick={() => navigate("/product/" + item?._id)} src={view} alt="view" /></button>
                          {/* <button  className='border-0 bg-transparent'><img src={addcart} alt="add-cart" /></button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
      </Container>
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">
              Special Products
            </h3>
          </div>
        </div>
        <div className="row">
          {
            productState && productState?.map((item, index) => {
              if (item.tags === "special") {
                return (
                  <SpecialProducts
                    key={index}
                    id={item?._id}
                    title={item?.title}
                    brand={item?.brand}
                    totalrating={item?.totalrating}
                    price={item?.price}
                    sold={item?.sold}
                    quantity={item?.quantity}
                  />

                )
              }
            })
          }
        </div>
      </Container>
      <Container class1="marquee-wrapper home-wrapper-2 py-5">

        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper">
              <Marquee>
                <div className='mx-4 w-25'>
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>

      </Container>
      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">
              Our Latest Blogs
            </h3>
          </div>

        </div>
        <div className="row">
          {/* {
                                blogState && blogState?.map((item,index)=>{
                                    if(index<3){
                                      return(
                                        <div className="col-3" key={index}>
                                
                                        <BlogCard id={item?._id} title={item?.title} description={item?.description}
                                        //  image={item?.images[0]?.url}
                                        image={item[0]?.image}
                                          date={moment(item?.createdAt).format("MMMM Do YYYY, h:mm a")}/>
                                        </div>
                                    )
                                    }
                                })
                            } */}
          {
            blogState && blogState?.map((item, index) => {
              if (index < 3) {
                return (
                  <div className="col-3" key={index}>
                  <div className="blog-card">
                    <div className="card-image">
                      <img src={item?.images[0].url} className='img-fluid w-100' alt="blog" />
                    </div>
                    <div className="blog-content">
                      <p className="date">
                        {moment(item?.createdAt).format("MMMM Do YYYY, h:mm a")}
                      </p>
                      <h5 className="title">
                        {item?.title}
                      </h5>
                      <p className="desc" dangerouslySetInnerHTML={{ __html: item?.description?.substr(0, 70) }}></p>
                      <Link className="button" to={"/blog/" + item?.id}>Read More</Link>
                    </div>
                  </div>
                  </div>
                )
              }
            })
          }

        </div>
      </Container>
    </>
  )
}

export default Home
