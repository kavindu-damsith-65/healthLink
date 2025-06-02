import bg1 from '../../assets/bg/1.jpg';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {HostUrl} from "../../Host";

const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2500, timerProgressBar: true, })



export default function Login() {
    const navigate=useNavigate();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [showAlertLogin, setShowAlertLogin] = useState(null);

    const handelLogin = () => {
        if (email && password) {
            axios.post(HostUrl+'user/admin/login', {email:email,password:password}).then(response => {
                const responseStatus = response.status;

                if (responseStatus === 200 | responseStatus === 201) {
                    localStorage.setItem('token', response.data['token']);
                    localStorage.setItem('role', response.data['role']);
                    navigate('/admin');
                    Toast.fire({ icon: 'success', title: 'You have successfully logged in!' });
                } else {
                    setShowAlertLogin(response.data['message'])
                }
            }).catch(error => { 
                setShowAlertLogin("Error Occured")
            });
        } else {
            setShowAlertLogin("Fill All Fields")
        }
    }

    const loginPageStyles = {
        position: 'relative',
        background: `url(${bg1}) center`,
        backgroundSize: 'cover',
        height: '100vh',
    };

    const overlayStyles = {
        content: '',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.7)', // Adjust the color and opacity as needed
    };

    const loginFormStyles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        background: 'white',
        padding: '30px',
        borderRadius: '6px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    };

    return (
        <div style={loginPageStyles}>
            <div style={overlayStyles}></div>
            <div style={loginFormStyles} className="text-center">

                <h5 className="text-white bg-dark py-3"><h3>HEALTHLINK</h3> ADMIN LOGIN</h5>
                <div className="pb-3 pt-1">
                    {showAlertLogin && (
                        <Alert className="my-2" severity="error">Error -<strong>{showAlertLogin}</strong></Alert>
                    )}
                    <div className="mt-4 mb-3">
                        <TextField onChange={(e) => { setEmail(e.target.value) ;setShowAlertLogin(null)}} id="outlined-required" label="Email" fullWidth />
                    </div>
                    <div className="mb-3">
                        <TextField onChange={(e) => { setPassword(e.target.value) ;setShowAlertLogin(null)}} id="outlined-required" type="password" label="Password" fullWidth />
                    </div>
                    <button onClick={handelLogin} name="login" type="submit" className="px-5 btn text-white custom-bg shadow-none">LOGIN</button>
                </div>

            </div>
        </div>
    );
}