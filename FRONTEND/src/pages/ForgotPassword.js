import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from '../components/CustomInput'
import Container from '../components/Container'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordToken } from '../features/user/userSlice'

const emailSchema = yup.object().shape({
    email: yup.string().email("Email should be valid").required("Email is Required")
  });

const ForgotPassword = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
          email: '',
        },
        validationSchema : emailSchema,
        onSubmit: values => {
            dispatch(forgotPasswordToken(values))
        },
      });

  return (
    <>
    <Meta title="Forgot Password" />
    <BreadCrumb title="Forgot Password" />
    <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
            <div className="col-12">
                <div className="auth-card">
                    <h3 className='text-center mb-3'>Reset Your Password</h3>
                    <p className="text-center mt-2 mb-3">
                      We will send you an email to rest your password
                    </p>
                    <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                        <CustomInput type="email" name='email' placeholder="Email"  onChange={formik.handleChange("email")}
                            onBlur={formik.handleBlur("email")}
                            value={formik.values.email}/>
                             <div className='error text-center' style={{ color: 'red' }}>
                            {formik.touched.email && formik.errors.email}
                        </div> 
                        <div>
                          
                            <div className="d-flex mt-3 justify-content-center gap-15 align-items-center flex-column">
                                <button className="button border-0" type='submit'>Submit</button>
                               
                                <Link to="/login">Cancel</Link>
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

export default ForgotPassword
