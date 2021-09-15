import React, { useState } from 'react';
import { AppContainer } from '../../components/container';

import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea,FormField  } from '../../components/Form/form';
import { Link } from 'react-router-dom';

export const ConfirmEmail = (props) => {
    const [errorText, setErrorText] = useState('');

    const handleVerified = (e) => {
        props.history.push('/company-info');
    }
    
    return (
        <AppContainer>
            <BreadCrumbs page={0}/>
                <FormArea show={true} position='align-center' title='Enter OTP Code'>
                            <br/>
                            <InfoBox show={true}>
                                    Enter the code that was sent to your email address
                                <br/>
                                <a>Awotundebangalee@gmail.com</a>
                            </InfoBox>
                            <br/><br/>
                            <LargeButton onClick={handleVerified}>
                                I've verified
                            </LargeButton>
            </FormArea>
           
            
        </AppContainer>
    )
}