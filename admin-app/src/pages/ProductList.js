import React, { useEffect } from 'react'
import {Table} from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"

const columns = [
    {
      title: 'S.No',
      dataIndex: 'key',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      sorter : (a,b) => a.title.length - b.title.length
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter : (a,b) => a.price - b.price
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Color',
      dataIndex: 'color',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];


const ProductList = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProducts())
  },[])
  const productState = useSelector((state)=>state?.product?.products);
  const data1 = [];
  console.log(productState);
  for (let i = 0; i < productState?.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color,
      price: `${productState[i].price}`,
      action: (
      <div>
        <Link className='fs-3 text-danger' to="/"><BiEdit/></Link>
        <Link className='ms-3 fs-3 text-danger' to="/"><AiFillDelete/></Link>
      </div>
      ),
    });
  }
  console.log(data1)
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
      <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default ProductList
