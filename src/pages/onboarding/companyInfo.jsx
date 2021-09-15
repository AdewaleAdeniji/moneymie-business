import React, { useState } from 'react';
import { AppContainer } from '../../components/container';

import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea,FormField  } from '../../components/Form/form';
import { Link } from 'react-router-dom';

export const CompanyInfo = (props) => {
    const [errorText, setErrorText] = useState('');

    const handleRegister = (e) => {
        props.history.push('/owner-info');
    } 
    return (
        <AppContainer>
            <BreadCrumbs page={1}/>
                            
                <FormArea show={true} position='align-left' title='Company Information' showBackButton={true}>
                            <InfoBox show={true} align='align-left'>
                             Please fill in your company’s information so we can know about your business?
                            </InfoBox>
                
                    <div className="form-fields">
                            
                            
                            <FormField title='Business Name'>
                                <input type="text" className="input-field" placeholder="Enter your Business Name" required/>
                            </FormField>
                            
                            <FormField title='Business Address'>
                                 <input type="text" className="input-field" placeholder="Enter your Business Address" required/>
                            </FormField>
                            <FormField title='Country of Incorporation'>
                                <br/>
                                 <select className="input-field" placeholder="Select Country">
                                    <option></option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Nigeria">Nigeria</option>
                                 </select>
                            </FormField>

                            <FormField title='Upload Document of Incorporation'>
                                <br/>
                                 <div className="filearea">
                                    <div className="file-inside">
                                        <i className="fa fa-camera"></i>
                                        <div className="file-desc">
                                            Upload Document of Incorporation
                                        </div>
                                    </div>
                                 </div>
                            </FormField>
                            <InfoBox show={true} success={true} error={true}>
                                 {errorText}
                            </InfoBox>

                            <LargeButton onClick={handleRegister}>
                                Continue
                            </LargeButton>

                    </div>
            </FormArea>
           
            
        </AppContainer>
    )
}