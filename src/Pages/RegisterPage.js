import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {Link} from 'react-router-dom'

import { useFormik } from "formik"; //form handling
import { signUpSchema } from "../schemas";

const initialValues = {
  email: "",
  password: "",
  confirmpassword: "",
};

const RegisterPage = () => {
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
  const register = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(result)
      //toast.success('Registration Successfull')
    } catch (error) {
      console.log(error);
      //toast.error(Registration Failed)
    }
  };

  return (
    <div className="register-parent">
      <div className="register-top"></div>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <lottie-player
            src="https://assets7.lottiefiles.com/packages/lf20_5tkzkblw.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>

        <div className="col-md-4 z1">
          <form onSubmit={handleSubmit}>
            <div className="register-form">
              <h2>Register</h2>
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

              <input
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
              ) : null}

              <button className="my-3" onClick={register} type="submit">
                Register
              </button>

              <hr />
              <Link to='/LoginPage'>Already registered, Click here to Login!</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
