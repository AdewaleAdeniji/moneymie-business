import React, { useState } from 'react';
import { AppContainer } from '../../components/container';

import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea,FormField  } from '../../components/Form/form';
import { Link } from 'react-router-dom';

export const CreateAccount = (props) => {
    const [errorText, setErrorText] = useState('');

    const handleRegister = (e) => {
        props.history.push('/confirm-email');
    } 
    return (
        <AppContainer>
            <BreadCrumbs page={0}/>
                <FormArea show={true} position='align-center' title='Create an account'>
                    <div className="form-fields">
                            
                            <FormField title='Work Email Address'>
                                <input type="email" className="input-field" placeholder="Work Email Address" required/>
                            </FormField>
                            
                            <FormField title='Password'>
                                 <input type="password" className="input-field" placeholder="Password" required/>
                            </FormField>
                            <InfoBox show={true} success={true} error={true}>
                                 {errorText}
                            </InfoBox>
                            <LargeButton onClick={handleRegister}>
                                Continue
                            </LargeButton>

                            <InfoBox show={true}>
                                 Already have an account? <Link to='/login'>Sign in</Link>
                            </InfoBox>
                    </div>
            </FormArea>
           
            
        </AppContainer>
    )
}