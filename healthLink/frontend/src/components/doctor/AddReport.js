import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { FormControl, Radio, RadioGroup, FormControlLabel, FormLabel  } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import * as reqSend from "../../global/reqSender";
import Swal from "sweetalert2";
import {HostUrl} from "../../Host";


export default function AddReport(props) {
    const [rating, setRating] = useState(''); // Initialize with an empty string
    const location = useLocation();
    const locationStateFromAppoint = location.state ? location.state : '';
    const [doctorName, setDoctorName] = useState(null);
    const navigate=useNavigate();

    const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2500, timerProgressBar: true, })


    const handleRatingChange = (event) => {
        setRating(event.target.value);
      };


      useEffect(() => {
        if (locationStateFromAppoint.doctor_id) {
            axios.post(HostUrl+'appointment/getdoctorbyid', {doctor_id:locationStateFromAppoint.doctor_id}).then(response => {
                const responseStatus = response.status;

                if (responseStatus === 200 || responseStatus === 201) {
                    console.log(response.data['doctorName']);
                    setDoctorName(response.data['doctorName']);
                }   
            }).catch(error => { 
                console.log(error);
            });
        }
      }, [locationStateFromAppoint.doctor_id])
      
      

    const [reportInfo, setReportInfo] = useState({
        patient_id: locationStateFromAppoint.user_id ? locationStateFromAppoint.user_id : '',
        doctor_id: locationStateFromAppoint.doctor_id ? locationStateFromAppoint.doctor_id : '',
        appointment_id: locationStateFromAppoint.appointment_id ? locationStateFromAppoint.appointment_id : '',
        age: '',
        disease: '',
        conditionDisease: '',
        description: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReportInfo({ ...reportInfo, [name]: value });
    };

    const handleQuillValueChange = (_, value) => {
        setReportInfo({ ...reportInfo, description: value });
    };


    const handelSubmit = (event) => {
        event.preventDefault();

        const submitData = {
            patient_id: reportInfo.patient_id,
            doctor_id: reportInfo.doctor_id,
            appointment_id: reportInfo.appointment_id,
            age: reportInfo.age,
            disease: reportInfo.disease,
            conditionDisease: reportInfo.conditionDisease,
            description: 'description test'
        }

        axios.post(HostUrl+'appointment/add-report', submitData, {
            headers: {
              'Content-Type': 'application/json',
            }
        }).then(response => {
            const responseStatus = response.status;

            if (responseStatus === 200 || responseStatus === 201) {
                navigate('/doctor');
                Toast.fire({ icon: 'success', title: 'You have successfully sent the Report!' });
                
            }   
        }).catch(error => { 
            console.log(error);
        });
    }


    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Add a Report</h1>
                </div>

            </div>

            <div className="table-data " >
                <div className="order boxShadow1 " >
                    <div className="d-flex justify-content-center">
                        <h3 style={{ textAlign: 'center' }}>{locationStateFromAppoint.username ? locationStateFromAppoint.username : ''}'s Report</h3>
                    </div>

                    <div className='container mt-4'>
                        <form onSubmit={handelSubmit}>
                            <div className="row my-3">
                                <div className="col col-md-6">
                                    <TextField className='darkThemeText' required name="Patient-name" label="Patient Name" 
                                    value={locationStateFromAppoint.username ? locationStateFromAppoint.username : ''} variant="outlined" fullWidth />
                                </div>
                                <div className="col col-md-6">
                                    <TextField className='darkThemeText' required name="doctor-name" 
                                    value={doctorName ? doctorName : ''} 
                                    label="Doctor Name" variant="outlined" fullWidth />
                                </div>
                            </div>

                            <div className='row my-3'>
                                <div className="col col-md-6">
                                    <TextField className='darkThemeText' required onChange={handleChange} name="age" label="Age" variant="outlined" fullWidth />
                                </div>

                                <div className="col col-md-6">
                                    <TextField className='darkThemeText' required onChange={handleChange} name="disease" label="Disease" variant="outlined" fullWidth />
                                </div>
                            </div>


                        <div className='row my-3'>
                            <div className='col col-md-6'>
                                    <FormControl component="fieldset">
                                    <FormLabel component="legend">Condition of the Disease</FormLabel>

                                    <RadioGroup
                                        aria-label="Condition Rating"
                                        name="conditionDisease"
                                        onChange={handleChange}   
                                        row
                                    >
                                        <FormControlLabel
                                        value="low"
                                        control={<Radio />}
                                        label="Low"
                                        />
                                        <FormControlLabel
                                        value="medium"
                                        control={<Radio />}
                                        label="Medium"
                                        />
                                        <FormControlLabel
                                        value="high"
                                        control={<Radio />}
                                        label="High"
                                        />
                                    </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>


                            <div className='row my-3'>
                                <div className='col col-md-12'>
                                <FormControl fullWidth>
                                    <FormLabel>Description</FormLabel>
                                    <ReactQuill
                                        onChange={handleQuillValueChange}
                                        name="description"
                                        style={{height: '150px', marginBottom: '20px'}}
                                        placeholder="Type here..."
                                        modules={{
                                            toolbar: {
                                            container: [
                                                ['bold', 'italic', 'underline', 'strike'],
                                                [{ 'script': 'sub' }, { 'script': 'super' }],
                                                ['link', 'image', 'video'],
                                                ['blockquote', 'code-block'],
                                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                                [{ 'indent': '-1'}, { 'indent': '+1' }],
                                                [{ 'align': [] }],
                                                ['clean'],
                                            ],
                                            },
                                        }}
                                        />
                                    </FormControl>
                                </div>
                            </div>

                            <div className='row justify-content-center my-5'>
                                <button
                                    type='submit'
                                    className='btn btn-md btn-primary' style={{ borderRadius: '50px', maxWidth: '250px' }}>Add Report</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    )
}



const doctorSpecializations = [
    { label: 'Common' },
    { label: 'Neurologist' },
    { label: 'Cardiologist' },
    { label: 'Gastroenterologist' },
    { label: 'Dermatologist' },
    { label: 'Urologist' },
    { label: 'Orthopaedist' },
    { label: 'Oncologist' },
    { label: 'Ophthalmology' },
    { label: 'Anesthesiologist' },
    { label: 'Surgeon' },
    { label: 'Psychiatrist' },
    { label: 'Cardiologist' },
    { label: 'Stomach' },
    { label: 'Radiologist' },
    { label: 'Family medicine' },
    { label: 'Pediatrics' },
    { label: 'Pulmonologist' },
    { label: 'Endocrinologist' },
    // { label: 'Muscle' },
    // { label: 'Joint' },
    // { label: 'Bladder' },
    // { label: 'Pancreas' },
    // Add more body parts and their combined subparts as needed
];