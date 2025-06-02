import React from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import {HostUrl} from "../Host";


function NavBar(props) {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showAlertLogin, setShowAlertLogin] = useState(null);
    const [showAlert, setShowAlert] = useState(null);
    // const [showModal, setShowModal] = useState(true);
    const [loginShow, setLoginShow] = useState(false);
    const [registerShow, setRegisterShow] = useState(false);
    const [userId, setUserId] = useState('');

    const loginHandleClose = () => {props.setLoginPop(false);setLoginShow(false)}
    const RegisterHandleClose = () => setRegisterShow(false);


  

    const validationSchema = yup.object({
        name: yup.string()
            .min(2, 'Min 2 characters')
            .max(15, 'Max 15 characters')
            .required('Required'),

        emailRegister: yup.string()
            .email('Invalid email format')
            .required('Required'),

        address: yup.string()
            .required('Address is required'),
        phoneNumber: yup.string()
            .matches(/^(\+\d{11}|\d{10})$/, 'Enter Correct Phonr Number')
            .required('Phone number is required'),

        dateOfBirth: yup.date().required('Date of birth is required'),

        password: yup.string()
            .required('Required')
            .test('uppercase', 'Must include at least 1 uppercase character', value =>
                /[A-Z]/.test(value)
            )
            .test('lowercase', 'Must include at least 1 lowercase character', value =>
                /[a-z]/.test(value)
            )
            .test('special', 'Must include at least 1 special character', value =>
                /[@$!%*?&]/.test(value)
            )
            .test('number', 'Must include at least 1 number', value =>
                /\d/.test(value)
            )
            .test('minLength', 'Must be at least 8 characters long', value =>
                value.length >= 8
            ),

        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
    });


    // validateReg

    const formik = useFormik({
        initialValues: {
            name: '',
            emailRegister: '',
            address: '',
            phoneNumber: '',
            dateOfBirth: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            handleSignupSubmit(values);
        },
    });



    const handleSignupSubmit = async (values) => {
        const signInFormData = {
            name: values.name,
            email: values.emailRegister,
            phoneNumber: values.phoneNumber,
            dateOfBirth: values.dateOfBirth,
            address: values.address,
            password: values.password,
        }

        try {
            axios.post(HostUrl+'user/sign-up', signInFormData).then(response => {

                const responseStatusReg = response.status;
                if (responseStatusReg === 200 || responseStatusReg === 201) {
                    const registeredUser = {
                        email: values.emailRegister,
                        password: values.password
                    }



                    axios.post(HostUrl+'user/login', registeredUser).then(response2 => {
                        const responseStatusLog = response2.status;
                        if (responseStatusLog === 200 || responseStatusLog === 201) {

                            localStorage.setItem('token', response2.data['token']);
                            localStorage.setItem('phone', response2.data['phone']);
                            localStorage.setItem('role', response2.data['role']);
                            setRegisterShow(false);
                            navigate('/');

                            const registerSMSDetails = {
                                version: "1.0",
                                applicationId: "APP_008062",
                                password: "126fbbc014e43111880774470e6c4dd8",
                                message: `Hello ${values.name}! You have successfully registered to E-chanelling service HealthLink.`,                                
                                destinationAddresses: [
                                  "tel:94704934655"
                                ]
                              }

                            axios.post('https://api.mspace.lk/sms/send', registerSMSDetails).then(response2 => {
                                const responseStatusLog = response2.status;
                                if (responseStatusLog === 200 || responseStatusLog === 201) {
                                    console.log('Success');
                                } 
                            }).catch(error => { // Handle any errors
                                console.log(error);
                            });


                            Toast.fire({ icon: 'success', title: 'You have successfully Registered!' });
                        } else {
                            setShowAlert(response2.data['message'])
                        }
                    }).catch(error => { // Handle any errors
                        setShowAlert("Error")
                    });

                } else {
                    setShowAlert(response.data['message'])
                }

            }).catch(() => { // Handle any errors
                setShowAlert("Error");

            });
        } catch (err) {

        }
    }




    const submitLogForm = () => {
        if (loginEmail !== "" && loginPassword !== "") {

            const loginFormData = {
                email: loginEmail,
                password: loginPassword
            }


            axios.post(HostUrl+'user/login', loginFormData).then(response => {
                const responseStatus = response.status;

                if (responseStatus === 200 | responseStatus === 201) {
                    localStorage.setItem('token', response.data['token']);

                    navigate('/');
                    setLoginShow(false);
                    localStorage.setItem('userId', response.data['userId'])


                    Toast.fire({ icon: 'success', title: 'You have successfully logged in!' });
                } else {
                    setShowAlertLogin(response.data['message'])
                }
            }).catch(error => { // Handle any errors
                setShowAlertLogin("Error Occured")
            });
        } else {
            setShowAlertLogin("Some fiels are Empty")
        }
    }



    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
    })



    const logoutSure = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Log out!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                navigate('/');
                Toast.fire({ icon: 'success', title: 'You logged out!' });
            }
        })
    }



    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="index.php">HealthLink</Link>
                    <div>
                        <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/" >Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/mri-scan" >MRI Scan</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/doctors">Doctors</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/my-reports" >My Reports</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/my-appointments">My Appoinments</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="contact">Contact Us</Link>
                                </li>

                            </ul>
                            <div className="d-flex justify-content-end" style={{ paddingLeft: '30px' }}>

                                {(!localStorage.getItem('token')) ?
                                    <>
                                        <button type="button" className="btn btn-outline-dark  shadow-none me-lg-3 me-3"
                                            onClick={() => { setLoginShow(true) }}
                                        >
                                            Login
                                        </button>
                                        <button type="button" className="btn btn-outline-dark  shadow-none me-lg-3 me-3"
                                            onClick={() => { setRegisterShow(true) }}
                                        >
                                            Register
                                        </button>
                                    </> :
                                    <button type="button" className="btn btn-outline-dark  shadow-none me-lg-3 me-3"
                                        onClick={logoutSure}>
                                        Log Out
                                    </button>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </nav>



            {/* <!------------------- Modal--------------------------> */}
            <Modal
                size="lg"
                show={registerShow}
                onHide={RegisterHandleClose}>
                <Modal.Header closeButton className=''>
                    <h5 className="modal-title d-flex align-items-center" id="staticBackdropLabel">
                        <i className="bi bi-person-lines-fill fs-3 me-2"></i>User Registration
                    </h5>

                </Modal.Header>
                <Modal.Body>

                    {showAlert && (
                        <Alert className="my-2" severity="error">Error -<strong>{showAlert}</strong></Alert>
                    )}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 ps-0 mb-3">
                                <label className="form-label">Name</label>
                                <TextField
                                    name="name"
                                    value={formik.values.name}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    onChange={e => { formik.handleChange(e) }} id="name" label="Name" variant="outlined" fullWidth />
                            </div>
                            <div className="col-md-6 p-0">
                                <label className="form-label">Email</label>
                                <TextField
                                    name="emailRegister"
                                    value={formik.values.emailRegister}
                                    error={formik.touched.emailRegister && Boolean(formik.errors.emailRegister)}
                                    helperText={formik.touched.emailRegister && formik.errors.emailRegister}
                                    onChange={e => { formik.handleChange(e); setShowAlert(null) }} id="emailRegister" label="Email Address" variant="outlined" fullWidth />
                            </div>
                            <div className="col-md-6 ps-0 mb-3">
                                <label className="form-label">Phone Number</label>
                                <TextField
                                    name="phoneNumber" label="Phone Number" variant="outlined" type="text" fullWidth
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                />
                            </div>
                            <div className="col-md-6 p-0 mb-3">
                                <label className="form-label">Picture</label>
                                <input id="picture" type="file" className="form-control shadow-none" />
                            </div>
                            <div className="col-md-12 p-0 mb-3">
                                <label className="form-label">Address</label>
                                <TextField
                                    name="address"
                                    value={formik.values.address}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                    onChange={e => { formik.handleChange(e) }} id="address" label="Address" variant="outlined" fullWidth />
                            </div>
                            <div className="col-md-6 ps-0 mb-3">
                                <label className="form-label">Date of birth</label>
                                <TextField
                                    name="dateOfBirth" label="Date of Birth" variant="outlined" type="date" fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formik.values.dateOfBirth}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                                    helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                                />
                            </div>
                            <div className="col-md-6 p-0 mb-3">

                            </div>
                            <div className="col-md-6 ps-0 mb-3">
                                <label className="form-label">Password</label>
                                <TextField
                                    name="password"
                                    value={formik.values.password}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    onChange={e => { formik.handleChange(e) }} id="password" label="Password" variant="outlined" type="password" fullWidth />
                            </div>
                            <div className="col-md-6 p-0 mb-3">
                                <label className="form-label">Conform password</label>
                                <TextField
                                    name="confirmPassword"
                                    value={formik.values.confirmPassword}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    onChange={e => { formik.handleChange(e) }} id="confirm-password" label="Confirm Password" variant="outlined" type="password" fullWidth />
                            </div>
                            <div className="text-center my-1">
                                <button type="submit" onClick={() => {
                                    formik.handleSubmit()
                                }} className=" btn btn-dark shadow-none">
                                    Register
                                </button>
                            </div>

                        </div>
                    </div>
                </Modal.Body>

            </Modal>


            <Modal show={loginShow}
                onHide={loginHandleClose}>
                <Modal.Header closeButton className=''>
                    <h5 className="modal-title d-flex align-items-center" id="staticBackdropLabel">
                        <i className="bi bi-person-circle fs-3 me-2"></i>User Login
                    </h5>

                </Modal.Header>
                <Modal.Body>
                    {showAlertLogin && (
                        <Alert className="my-2" severity="error">Error -<strong>{showAlertLogin}</strong></Alert>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={e => { setLoginEmail(e.target.value); setShowAlertLogin(null) }}
                                    id="email" label="Email Address" variant="outlined" fullWidth />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={e => { setLoginPassword(e.target.value); setShowAlertLogin(null) }}
                                    id="password" label="Password" variant="outlined" type="password" fullWidth />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <button
                            onClick={submitLogForm}
                            type="submit" className=" btn btn-dark shadow-none">
                            LOGIN
                        </button>
                        <Link to="./" className="text-secondary text-decoration-none">Forgot
                            password?</Link>
                    </div>
                </Modal.Body>

            </Modal>


        </>
    )
}

export default NavBar;
