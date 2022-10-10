import * as Yup from "yup";

export const signUpSchema = Yup.object({
  
    email: Yup.string()
      .email("Email is invalid!")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be atleast 6 characters")
      .required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must be same")
      .required("Confirm password is required"),
  });

  export const placeOrderSchema=Yup.object({
    name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  pincode: Yup.number().required("pincode is required"),
  phone: Yup.number().required("Name is required")
  })