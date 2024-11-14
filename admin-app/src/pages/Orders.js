import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrders, updateAOrder } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.shippingInfo?.firstName + " " + orderState[i]?.shippingInfo?.lastName,
      product: (
        <Link to={`/admin/order/${orderState[i]._id}`}>
          View Orders
        </Link>
      ),
      amount: orderState[i]?.totalPrice,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action: (
        <>
            <select name="" id="" defaultValue={orderState[i]?.orderStatus} onChange={(e)=> updateOrderStatus(orderState[i]?._id , e.target.value)} className="form-control form-select">
              <option value="Ordered" disabled selected>Ordered</option>
              <option value="Processed">Processed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delievery</option>
              <option value="Delivered">Delieverd</option>
            </select>
        </>
      ),
    });
  }

  const updateOrderStatus = (a,b) =>{
    dispatch(updateAOrder({id : a, status : b}))
  }

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div><Table columns={columns} dataSource={data1} /></div>
    </div>
  );
};

export default Orders;