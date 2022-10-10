import React, { useState,useEffect } from "react";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import fireDB from "../fireConfig";
import { toast } from "react-toastify";

// import { useFormik } from "formik"; //form handling
// import { placeOrderSchema } from "../schemas";

// const initialValues = {
//   name:"",
//   address:"",
//   pincode:"",
//   phone:""
// };


function CartPage() {

  // const { values, errors, touched, handleBlurr, handleChange, handleSubmit } =
  // useFormik({
  //   initialValues: initialValues,
  //   validationSchema: placeOrderSchema,

  //   onSubmit: (values, action) => {
  //     console.log("values", values);
  //     action.resetForm();
  //   },
  // });

  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const [totalAmount, setTotalAmount] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + cartItem.price;
    });
    setTotalAmount(temp);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  const placeorder = async () => {
    const addressInfo = {
      // Name:values.name,
      // Address:values.address,
      // Pincode:values.pincode,
      // Phone:values.phone
      name,
      address,
      pincode,
      phoneNumber,
    };
    console.log(addressInfo);

    const orderInfo = {
      cartItems,
     addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };

    try {
      setLoading(true);
      const result = await addDoc(collection(fireDB, "orders"), orderInfo);
      setLoading(false);
      toast.success("order placed successfully");
      handleClose();
    } catch (error) {
      toast.error("Order failed");
      console.log("order failed");
      setLoading(false);
    }
  };

  return (
    
    <Layout loading={loading}>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img
                    src={item.imageURL}
                    alt="image"
                    height="80px"
                    width="80px"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrash
                    onClick={() => {
                      deleteFromCart(item);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-end">
        <h2 className="total-amount">Total Amount={totalAmount} RS/-</h2>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button onClick={handleShow}>PLACE ORDER</button>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="register-form">
            <h2>REGISTER</h2>
            <hr />

            <input
              type="text"
             name="name"
             value={name}
              placeholder="name"
              className="form-control"
              
                onChange={(e)=>setName(e.target.value)}
                // values={values.name}
                // onBlurr={handleBlurr}
                 // onChange={handleChange}
            />
            {/* {errors.name && touched.name ? (
                <p className="form-error">{errors.name}</p>
              ) : null} */}
            <textarea
              type="text"
              rows={3}
             name='address'
              placeholder="address"
              className="form-control"
              autoComplete="off"
              value={address}
                // onChange={handleChange}
                // value={values.address}
                // onBlurr={handleBlurr}
              onChange={(e) => setAddress(e.target.value)}
            />
            {/* {errors.address && touched.address ? (
                <p className="form-error">{errors.address}</p>
              ) : null} */}
            <input
              type="number"
             name='pincode'
              placeholder="pincode"
              className="form-control"
              autoComplete="off"
              value={pincode}
                // onChange={handleChange}
                // values={values.pincode}
                // onBlurr={handleBlurr}
                
              onChange={(e) => setPincode(e.target.value)}
            />
            {/* {errors.pincode && touched.pincode ? (
                <p className="form-error">{errors.pincode}</p>
              ) : null} */}

            <input
              type="number"
            
              placeholder="phone number"
              className="form-control"
              autoComplete="off"
              value={phoneNumber}
                // onChange={handleChange}
                // values={values.phone}
                // onBlurr={handleBlurr}
              onChange={(e) => setphoneNumber(e.target.value)}
            />
{/* {errors.phone && touched.phone ? (
                <p className="form-error">{errors.phone}</p>
              ) : null} */}
            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={placeorder}>ORDER NOW </button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default CartPage;
