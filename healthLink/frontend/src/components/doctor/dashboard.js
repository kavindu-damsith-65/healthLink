import '../../styles/dashboard.css';
import { useState, useEffect } from 'react';
import { Route, Routes,Link } from 'react-router-dom';
import avatar from '../../assets/doctors/doctor1.jpg';
import { SideNavigation, TopBar } from '../sideComps/dashBoardComps';
import { dashboardDoctorData } from '../_dashBoardData';
import DoctorHome from './DoctorHome';
import MyAppointments from './MyAppointments';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AddReport from './AddReport';
import MRI from './MRI';
import {HostUrl} from "../../Host";
// import Home from './Home';
// import AddDoctors from './AddDoctors';






export default function DoctorDashboard() {

    const location = useLocation();
    const doctor_id = localStorage.getItem('doctorid') ? localStorage.getItem('doctorid') : '';
    const [patient, setPatient]= useState([]);



    useEffect(() => {
         if (doctor_id) {
            axios.post(HostUrl+'appointment/patients', {doctor_id:doctor_id}).then(response => {
                const responseStatus = response.status;

                if (responseStatus === 200 | responseStatus === 201) {
                    setPatient(response.data['results']);
                }
            }).catch(error => { 
                console.log(error);
            });
        } 
    }, [doctor_id, patient])





    const addJs = () => {
        const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
        
        allSideMenu.forEach(item => {
            const li = item.parentElement;

            item.addEventListener('click', function () {
                allSideMenu.forEach(i => {
                    i.parentElement.classList.remove('active');
                })
                li.classList.add('active');
            })
        });

        // TOGGLE SIDEBAR
        const menuBar = document.querySelector('#content nav .bx.bx-menu');
        const sidebar = document.getElementById('sidebar');

        menuBar.addEventListener('click', function () {
            sidebar.classList.toggle('hide');
        })


        const switchMode = document.getElementById('switch-mode');
        const wrapper = document.getElementById('dashboardWrapper');


        switchMode.addEventListener('change', function () {
            if (this.checked) {
                wrapper.classList.add('dark');
            } else {
                wrapper.classList.remove('dark');
            }
        })



    }

    useEffect(() => {
        addJs()
    }, [])



    return (
        <>
            <div id="dashboardWrapper">
                <SideNavigation data={dashboardDoctorData}  user={{role:'doctor',navigate:'/doctor/login'}}/>

                <section id="content">
                    <TopBar avatar={avatar} />
                    <Routes>
                        <Route path="/" element={<DoctorHome totalAppoint={patient.length} />} />
                        <Route path="/my-appointments" element={<MyAppointments patientData={patient ? patient : ''} />} />
                        <Route path="/add-report" element={<AddReport /> } />
                        <Route path="/mri" element={<MRI /> } />
                    </Routes>

                </section>
            </div>

        </>
    )
}