import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/user/userSlice'
import { useEffect } from 'react'

const loginSchema = yup.object().shape({
    email: yup.string().email("Email should be valid").required("Email is Required"),
    password : yup.string().required("Password is required")
  });

const Login = () => {
    const navigate = useNavigate()
    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
          email: '',
          password : ""
        },
        validationSchema : loginSchema,
        onSubmit: values => {
            dispatch(loginUser(values))
        },
      });

      useEffect(()=>{
        if(authState?.user !== null && authState.isError === false){
            navigate("/")
        }
      },[authState])

  return (
    <>
    <Meta title="Login" />
    <BreadCrumb title="Login" />
    <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
            <div className="col-12">
                <div className="auth-card">
                    <h3 className='text-center mb-3'>Login</h3>
                    <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                        <CustomInput type="email" name='email' placeholder="Email" 
                            onChange={formik.handleChange("email")}
                            onBlur={formik.handleBlur("email")}
                            value={formik.values.email}
                        />
                        <div className='error' style={{ color: 'red' }}>
                            {formik.touched.email && formik.errors.email}
                        </div>
                        <CustomInput type="password" name="password" placeholder='Password' onChange={formik.handleChange("password")}
                            onBlur={formik.handleBlur("password")}
                            value={formik.values.password}
                        />
                        <div className='error' style={{ color: 'red' }}>
                            {formik.touched.password && formik.errors.password}
                        </div>
                        <div>
                            <Link to="/forgot-password">Forgot Password?</Link>
                            <div className="d-flex mt-3 justify-content-center gap-15 align-items-center">
                                <button className="button border-0" type='submit'>Login</button>
                                <Link to='/signup' className='button signup'>SignUp</Link>
                            </div>
                        </div>
                    </form>
            </div>
        </div>
        </div>
    </Container>
    </>
  )
}

export default Login
