import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice"
import { getColors } from "../features/color/colorSlice"
import Dropzone from 'react-dropzone'
import {Select} from "antd"
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import {createProducts, resetState} from "../features/product/productSlice"
import { toast } from 'react-toastify';


let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is required"),
  brand: yup.string().required("brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  color: yup.array().min(1,"Pick atleast one color").required("Colors are required"),
  quantity: yup.number().required("Quantity is required"),
})

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [color, setColor] = useState([])
  const [images, setImages] = useState([])

  useEffect(() => {
    dispatch(getBrands())
    dispatch(getCategories())
    dispatch(getColors())
  }, []);


  const brandState = useSelector((state) => state.brand.brands)
  const catState = useSelector((state) => state.pCategory.pCategories)
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images) 
  const newProduct = useSelector((state) => state.product)
  const {isSuccess, isError, isLoading, createdProduct} = newProduct
   useEffect(()=>{
      if(isSuccess && createdProduct){
toast.success('Product Added Successfully');

      }
      if(isError){
        toast.error("Something went wrong")
      }
  },[isSuccess, isError, isLoading,])

  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id
    })
  })

  const img = [];
  imgState.forEach((i) => {
    img.push({
     public_id : i.public_id,
      url: i.url
    })
  })

  useEffect(()=>{
    formik.values.color = color ? color : "";
    formik.values.images = img;
  },[color,img])

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      color: "",
      quantity: "",
      images : "",
      tags : ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(()=>{
        dispatch(resetState())
      },3000)
    }
  })


  const handleColors = (e) =>{
    setColor(e)
    console.log(color)
  }

  const [desc, setDesc] = useState()
  const handleDesc = (e) => {
    setDesc(e)
  }
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className='d-flex gap-3 flex-column'>
          <CustomInput type="text" label="Enter Product Title" name="title" onChange={formik.handleChange("title")} val={formik.values.title} onBlur={formik.handleBlur("title")} />
          <div className="error">
            {
              formik.touched.title && formik.errors.title
            }
          </div>
          <div className=''>
            <ReactQuill theme="snow" name="description" value={formik.values.description} onChange={formik.handleChange("description")} />
          </div>
          <div className="error">
            {
              formik.touched.description && formik.errors.description
            }
          </div>
          <CustomInput type="number" label="Enter Product Price" name="price" val={formik.values.price} onChange={formik.handleChange("price")} onBlur={formik.handleBlur("price")} />
          <div className="error">
            {
              formik.touched.price && formik.errors.price
            }
          </div>
          <select name="brand" value={formik.values.brand} onChange={formik.handleChange("brand")} onBlur={formik.handleBlur("brand")} id="" className='form-control py-3 mb-3'>
            <option value="">Select Brand</option>
            {
              brandState.map((i, j) => {
                return (
                  <option key={j} value={i.title}>
                    {i.title}
                  </option>
                )
              })
            }
          </select>
          <div className="error">
            {
              formik.touched.brand && formik.errors.brand
            }
          </div>
          <select name="category" value={formik.values.category} onChange={formik.handleChange("category")} onBlur={formik.handleBlur("category")} id="" className='form-control py-3 mb-3'>
            <option value="">Select Category</option>
            {
              catState.map((i, j) => {
                return (
                  <option key={j} value={i.title}>
                    {i.title}
                  </option>
                )
              })
            }
          </select>
          <div className="error">
            {
              formik.touched.category && formik.errors.category
            }
          </div>
          <select name="tags" value={formik.values.tags} onChange={formik.handleChange("tags")} onBlur={formik.handleBlur("tags")} id="" className='form-control py-3 mb-3'>
            <option value="" disabled>Select tags</option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {
              formik.touched.tags && formik.errors.tags
            }
          </div>
         <Select mode='multiple' allowClear className='w-100' placeholder="Select color" defaultValue={color} onChange={(i) => handleColors(i)} options={coloropt}/>
          <div className="error">
            {
              formik.touched.color && formik.errors.color
            }
          </div>
          <CustomInput type="number" label="Enter Product Quantity" name="quantity" val={formik.values.quantity} onChange={formik.handleChange("quantity")} />
          <div className="error">
            {
              formik.touched.quantity && formik.errors.quantity
            }
          </div>
          <div className='bg-white border-1 p-5 text-center'>
            <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="show-images d-flex">
            {imgState.map((i,j)=>{
              return(
                <div className='position-relative' key={j}>
                  <button type='button' onClick={()=>dispatch(delImg(i.public_id))} className="btn-close position-absolute" style={{top : "10px", right : "10px"}}></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              )
            })}
          </div>
          <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>Add Product</button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
