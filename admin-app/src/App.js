import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login"
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import BlogList from './pages/BlogList';
import BlogCatlist from './pages/BlogCatlist';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import ColorList from './pages/ColorList';
import Categorylist from './pages/Categorylist';
import BrandList from './pages/BrandList';
import ProductList from './pages/ProductList';
import AddBlog from './pages/AddBlog';
import AddBlogCat from './pages/AddBlogCat';
import AddColor from './pages/AddColor';
import AddCat from './pages/AddCat';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
import Couponlist from './pages/Couponlist';
import AddCoupon from './pages/AddCoupon';
import ViewEnq from './pages/ViewEnq';
import ViewOrder from './pages/ViewOrder';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/admin' element={<PrivateRoutes><MainLayout/></PrivateRoutes>}>
              <Route index element={<Dashboard/>}></Route>
              <Route path='enquiries' element={<Enquiries/>}></Route>
              <Route path='enquiries/:id' element={<ViewEnq/>}></Route>
              <Route path='blog-list' element={<BlogList/>}></Route>
              <Route path='blog' element={<AddBlog/>}></Route>
              <Route path='blog/:id' element={<AddBlog/>}></Route>
              <Route path='coupon' element={<AddCoupon/>}></Route>
              <Route path='coupon/:id' element={<AddCoupon/>}></Route>
              <Route path='coupon-list' element={<Couponlist/>}></Route>
              <Route path='blog-category-list' element={<BlogCatlist/>}></Route>
              <Route path='blog-category' element={<AddBlogCat/>}></Route>
              <Route path='blog-category/:id' element={<AddBlogCat/>}></Route>
              <Route path='orders' element={<Orders/>}></Route>
              <Route path='order/:id' element={<ViewOrder/>}></Route>
              <Route path='customers' element={<Customers/>}></Route>
              <Route path='list-color' element={<ColorList/>}></Route>
              <Route path='color' element={<AddColor/>}></Route>
              <Route path='color/:id' element={<AddColor/>}></Route>
              <Route path='list-category' element={<Categorylist/>}></Route>
              <Route path='category' element={<AddCat/>}></Route>
              <Route path='category/:id' element={<AddCat/>}></Route>
              <Route path='list-brand' element={<BrandList/>}></Route>
              <Route path='brand' element={<AddBrand/>}></Route>
              <Route path='brand/:id' element={<AddBrand/>}></Route>
              <Route path='list-product' element={<ProductList/>}></Route>
              <Route path='product' element={<AddProduct/>}></Route>
            </Route> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
