
import '../styles/style.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



import * as reqSend from "../global/reqSender";
import { motion } from 'framer-motion';
import doc1 from '../assets/doctors/doctor1.jpg';
import doc2 from '../assets/doctors/doctor2.jpg';
import doc3 from '../assets/doctors/doctor3.jpg';
import doc4 from '../assets/doctors/doctor4.jpg';
import doc5 from '../assets/doctors/doctor5.jpg';
import doc6 from '../assets/doctors/doctor6.jpg';
import reportSample from '../assets/reportSample.png';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import axios from 'axios';
import {HostUrl} from "../Host";


const doctorImages = [doc1, doc2, doc3, doc4, doc5, doc6];


export default function MyReports(props) {
    const navigate = useNavigate();
    const [isComponentChanged, setIsComponentChanged] = useState(false);
    const [expandedRows, setExpandedRows] = useState({});
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    // const location = useLocation();
    // const locationStateFromUserLogin = location.state ? location.state : '';
    const [myReportDetails, setMyReportDetails] = useState(null);





    useEffect(() => {
        if (localStorage.getItem('userId')) {
            axios.post(HostUrl+'appointment/myreports/user', {user_id: localStorage.getItem('userId')}).then(response => {
                const responseStatus = response.status;

                if (responseStatus === 200 || responseStatus === 201) {
                    console.log(response.data);
                    setMyReportDetails(response.data['reports']);
                }   
            }).catch(error => { 
                console.log(error);
            });
        }
      }, [localStorage.getItem('userId')])



    const toggleRowExpansion = (index) => {
        setExpandedRows((prevState) => ({
          ...prevState,
          [index]: !prevState[index],
        }));
      };



    return (
        <>
            <div className="my-5 px-4">
                <h2 className="fw-bold h-font text-center">MY REPORTS</h2>
                <div className="h-line bg-dark"></div>

            </div>

            <div className='d-flex justify-content-center mb-5'>
                <main className="table pt-5">

                    <section className="table__body">
                        <table>
                            <thead>
                                <tr>
                                    <th> Id </th>
                                    <th> Doctor </th>
                                    <th> Date </th>
                                    <th> Time </th>
                                    <th> View Report </th>
                                </tr>
                            </thead>
                            <tbody>
                {myReportDetails &&
                  myReportDetails.map((report, index) => {
                    const date = new Date(report.time);
                    const formattedDate = date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    });

                    const formattedDate2 = date.toISOString().split('T')[0];

                    const [hours, minutes] = report.time.split(':').map(Number);
                    const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${
                      hours >= 12 ? 'PM' : 'AM'
                    }`;

                    const isExpanded = expandedRows[index] || false;

                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <td> {index + 1} </td>
                          <td>
                            {' '}
                            <img style={{ objectFit: 'cover' }} src={doctorImages[index % doctorImages.length]} alt="" />
                            &nbsp;Dr.{report.doctor_name}
                          </td>
                          <td> {formattedDate} </td>
                          <td>{formattedTime}</td>
                          <td>
                            <motion.p
                              onClick={() => toggleRowExpansion(index)}
                              whileHover={{ scale: 1.2, cursor: 'pointer' }}
                              transition={{ delay: 0, duration: 0.05 }}
                              className={`viewReport status ${isExpanded ? 'expanded shipped' : 'pending'}`}
                            >
                              {isExpanded ? 'Collapse' : 'View'}
                            </motion.p>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="expanded-row">
                          <td colSpan="5">
                            <div className="expanded-content">
                              <div className="details">
                                <p>
                                  <strong>Age:</strong> {report.age}
                                </p>
                                <p>
                                  <strong>Disease:</strong> {report.disease}
                                </p>
                                <p>
                                  <strong>Condition Level:</strong> {report.condition_level}
                                </p>
                                <p>
                                  <strong>Description:</strong> <div>{report.description}</div>
                                </p>
                              </div>
                              <div className="image-container">
                              <img
                                    className='reportImg'
                                    src={reportSample}
                                    alt="Patient"
                                    onClick={() => {
                                        setLightboxOpen(true);
                                        setLightboxIndex(0); // Set the index to 0 to display the clicked image
                                    }}
                                    style={{ cursor: 'pointer' }}
                                    />

                                    {lightboxOpen && (
                                    <Lightbox
                                        mainSrc={reportSample}
                                        onCloseRequest={() => setLightboxOpen(false)}
                                        imageTitle={`Patient Report Image`}
                                    />
                                    )}

                              </div>
                            </div>
                          </td>
                        </tr>
                        
                        )}
                      </React.Fragment>
                    );
                  })}
              </tbody>
                        </table>
                    </section>
                </main>
            </div>
        </>
    )
}