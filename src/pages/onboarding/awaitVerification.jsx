import React, { useState } from 'react';
import { AppContainer } from '../../components/container';

import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton, LargeButtonGrey } from '../../components/buttons/buttons';
import { FormArea,FormField  } from '../../components/Form/form';
import { Link } from 'react-router-dom';

export const AwaitVerify = (props) => {
    const [errorText, setErrorText] = useState('');
    const [saved, setSavedOwner] = useState(true);
    const handleRegister = (e) => {
        props.history.push('/review');
    } 
    return (
        <AppContainer>
            <BreadCrumbs page={3}/>
                            
            <FormArea show={true} position='align-left' title='' showBackButton={false}>
                <img className="align-center await-img" src="assets/await.png"/>
                <h4 className="review-title align-center">Awaiting Verification</h4>
                <InfoBox show={true}>
                     Please wait while we verify your verification, we will get back to you soon
                </InfoBox>
                      
            </FormArea>
           
            
        </AppContainer>
    )
}