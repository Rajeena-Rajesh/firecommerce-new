import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Link} from 'react-router-dom'

import { useFormik } from "formik"; //form handling
import { signUpSchema } from "../schemas";
import { toast } from "react-toastify";

const initialValues = {
  email: "",
  password: ""
  
};

const LoginPage = () => {
  const { values, errors, touched, handleBlurr, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,

      onSubmit: (values, action) => {
        console.log("values", values);
        action.resetForm();
      },
    });

  const auth = getAuth();

  const login = async () => {
    try {
      const result = signInWithEmailAndPassword(auth,
        values.email,
        values.password
      );
      //console.log(result)
      
localStorage.setItem("currentUser",JSON.stringify({email:values.email,password:values.password}));
//toast.success('Login Successfull')
//window.location.href="/"
    } catch (error) {
      console.log(error);
      //toast.error('Login Failed')
    }
  };

  return (
    <div className="register-parent">
      <div className="register-top"></div>
      <div className="row justify-content-center">
        <div className="col-md-4 z1">
        <form onSubmit={handleSubmit}>
            <div className="register-form">
              <h2>Login</h2>
              <hr />

              <input
              className="form-control"
                name="email"
                type="text"
                placeholder="email"
                 autoComplete="off"
                onChange={handleChange}
                values={values.email}
                onBlurr={handleBlurr}
              />
              {errors.email && touched.email ? (
                <p className="form-error">{errors.email}</p>
              ) : null}

              <input
               className="form-control"
                name="password"
                type="text"
                autoComplete="off"
                placeholder="Password"
                onChange={handleChange}
                values={values.password}
                onBlurr={handleBlurr}
              />

              {errors.password && touched.password ? (
                <p className="form-error">{errors.password}</p>
              ) : null}

              {/* <input
               className="form-control"
                name="confirmpassword"
                type="text"
                autoComplete="off"
                placeholder="Confirm Password"
                onChange={handleChange}
                values={values.confirmpassword}
                onBlurr={handleBlurr}
              />

              {errors.confirmpassword && touched.confirmpassword ? (
                <p className="form-error">{errors.confirmpassword}</p>
              ) : null} */}

              <button className="my-3" onClick={login} type="submit">
               Login
              </button>

              <hr />
              <Link to='/RegisterPage'>Not registered, Click here to Register!</Link>
            </div>
          </form>
          
        </div>

        <div className="col-md-5">
        <lottie-player
            src="https://assets7.lottiefiles.com/packages/lf20_5tkzkblw.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
