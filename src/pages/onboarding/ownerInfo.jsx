import React, { useState } from 'react';
import { AppContainer } from '../../components/container';

import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton, LargeButtonGrey } from '../../components/buttons/buttons';
import { FormArea,FormField  } from '../../components/Form/form';

export const OwnerInfo = (props) => {
    const [errorText, setErrorText] = useState('');
    const [saved, setSavedOwner] = useState(true);
    const handleRegister = (e) => {
        props.history.push('/review');
    } 
    return (
        <AppContainer>
            <BreadCrumbs page={2}/>
                            
                <FormArea show={true} position='align-left' title='Owner Information' showBackButton={true}>

                            <InfoBox show={true} align='align-left'>
                             Please ensure to fill information of someone who owns &gt; 20% of the company
                            </InfoBox>
                            <div className="owner-info">
                                <div className="title-tile">
                                    <div className="owner-title">
                                        Owner Information
                                    </div>
                                    <div className="owner-cancel">
                                        <button className="i-cancel">
                                             &#215;
                                            {/* <i className="fa fa-times"></i> */}
                                        </button>
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
                            
                                <div className="owner-infos">
                                    <div className="owner">
                                        <div className="owner-sup">
                                          NAME
                                        </div>
                                        <div className="owner-sub">
                                            Feranmi Adeniji
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
                    <div className="form-fields">
                            <FormField title='Name'>
                                <input type="text" className="input-field" placeholder="Name" required/>
                            </FormField>
                            
                            <FormField title='Phone Number'>
                                 <input type="tel" className="input-field" placeholder="Phone Number" required/>
                            </FormField>
                            <FormField title='Address'>
                                 <input type="text" className="input-field" placeholder="Address" required/>
                            </FormField>
                            <FormField title='Upload Means of Identification'>
                                <br/>
                                 <div className="filearea">
                                    <div className="file-inside">
                                        <i className="fa fa-camera"></i>
                                        <div className="file-desc">
                                        Tap on the camera icon to upload your documents
                                        </div>
                                    </div>
                                 </div>
                            </FormField>

                            <InfoBox show={true} success={true} error={true}>
                                 {errorText}
                            </InfoBox>
                            <LargeButtonGrey onClick={handleRegister}>
                                {saved ? 'Save Owner' : 'Add Another owner'}
                            </LargeButtonGrey>

                            <LargeButton onClick={handleRegister}>
                                Continue
                            </LargeButton>

                    </div>
            
            </FormArea>
           
            
        </AppContainer>
    )
}