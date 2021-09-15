import React, { useState } from 'react';
import { AppContainer } from '../../components/container';

import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton, LargeButtonGrey } from '../../components/buttons/buttons';
import { FormArea,FormField  } from '../../components/Form/form';
import { Link } from 'react-router-dom';

export const ReviewInfo = (props) => {
    const [errorText, setErrorText] = useState('');
    const [saved, setSavedOwner] = useState(true);
    const handleRegister = (e) => {
        props.history.push('/await-verify');
    } 
    return (
        <AppContainer>
            <BreadCrumbs page={3}/>
                            
                <FormArea show={true} position='align-left' title='Review and Submit' showBackButton={true}>

                            <InfoBox show={true} align='align-left'>
                             Please review the form you filled before submitting the documents
                            </InfoBox>

                            <h4 className="review-title">Registration Information</h4>
                            <div className="owner-info">
                                <div className="title-tile">
                                    <div className="owner-title">
                                        Owner Information
                                    </div>
                                    <div className="owner-cancel">
                                    </div>
                                </div>
                                <div className="owner-infos">
                                    <div className="owner">
                                        <div className="owner-sup">
                                          EMAIL
                                        </div>
                                        <div className="owner-sub">
                                            devferanmi@gmail.com
                                        </div>
                                    </div>
                                    <div className="owner">
                                        <div className="label success">
                                            <div className='active crumb'>
                                                <i className='fa fa-check'></i>
                                            </div>
                                            Verified
                                       </div>
                                 
                                    </div>
                                </div>
                            
                                   
                                </div>
                    

                            <h4 className="review-title">Company Information</h4>
                            <div className="owner-info">
                                <div className="title-tile">
                                    <div className="owner-title">
                                        Company Details
                                    </div>
                                    <div className="owner-cancel">
                                        
                                    </div>
                                </div>
                                <div className="owner-infos">
                                    <div className="owner">
                                        <div className="owner-sup">
                                          NAME
                                        </div>
                                        <div className="owner-sub">
                                            Feranmi Adeniji
                                        </div>
                                    </div>
                                    <div className="owner">
                                        <div className="owner-sup">
                                            Phone Number
                                        </div>
                                        <div className="owner-sub">
                                            +233495949290
                                        </div>
                                    </div>
                                </div>
                            
                                <div className="owner-infos edit-info">
                                    <div className="owner">
                                        <div className="owner-sup">
                                          ADDRESS
                                        </div>
                                        <div className="owner-sub">
                                        No 33, Selhurst Way, London CarPark United States
                                        </div>
                                    </div>
                                    <div className="owner means">
                                        <div className="owner-sup">
                                            Means of Identification
                                        </div>
                                        <div className="owner-sub">
                                           <div className="owner-image">
                                                  Image 001.png
                                            </div>
                                            <button className="btn btn-view">
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                    <a href="#">Edit this Information 
                                        <button className="i-cancel">
                                            <i className="fa fa-angle-right"></i>
                                        </button>
                                    </a>
                                </div>
                    
                            <h4 className="review-title">Ownership Information</h4>
                            <div className="owner-info">
                                <div className="title-tile">
                                    <div className="owner-title">
                                        Owner 1 Information
                                    </div>
                                    <div className="owner-cancel">
                                       
                                    </div>
                                </div>
                                <div className="owner-infos">
                                    <div className="owner">
                                        <div className="owner-sup">
                                          NAME
                                        </div>
                                        <div className="owner-sub">
                                            Feranmi Adeniji
                                        </div>
                                    </div>
                                    <div className="owner">
                                        <div className="owner-sup">
                                            Phone Number
                                        </div>
                                        <div className="owner-sub">
                                            +233495949290
                                        </div>
                                    </div>
                                </div>
                            
                                <div className="owner-infos edit-info">
                                    <div className="owner">
                                        <div className="owner-sup">
                                          ADDRESS
                                        </div>
                                        <div className="owner-sub">
                                        No 33, Selhurst Way, London CarPark United States
                                        </div>
                                    </div>
                                    <div className="owner means">
                                        <div className="owner-sup">
                                            Means of Identification
                                        </div>
                                        <div className="owner-sub">
                                           <div className="owner-image">
                                                  Image 001.png
                                            </div>
                                            <button className="btn btn-view">
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                    <a href="#">Edit this Information 
                                        <button className="i-cancel">
                                            <i className="fa fa-angle-right"></i>
                                        </button>
                                    </a>
                                </div>
                    
                    
                    
                    
                            <LargeButton onClick={handleRegister}>
                                Review and Submit 
                            </LargeButton>
            </FormArea>
           
            
        </AppContainer>
    )
}