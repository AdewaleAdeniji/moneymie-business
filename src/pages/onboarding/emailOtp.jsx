import React,{useState} from 'react';
import { AppContainer } from '../../components/container';

import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea,FormField  } from '../../components/Form/form';
import { Link } from 'react-router-dom';
import validator from 'validator';

export const EmailOTP = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleForgot =(e) => {
        props.history.push('/reset-password');
    }
    return (
        <AppContainer>
           
                <FormArea show={true} position='align-center' title='Enter OTP Code'>
                    
                    <div className="form-fields">
                            <InfoBox show={true}>
                                Enter the code that was sent to your email address
                            </InfoBox>
                            
                            <div className="input-items-flex">
                                
                                <input type="tel" className="input-item-flex" maxLength="1"/>
                                <input type="tel" className="input-item-flex" maxLength="1"/>
                                <input type="tel" className="input-item-flex" maxLength="1"/>
                                <input type="tel" className="input-item-flex" maxLength="1"/>
                                <input type="tel" className="input-item-flex" maxLength="1"/>
                                <input type="tel" className="input-item-flex" maxLength="1"/>

                            </div>

                            <InfoBox show={true} error={error}>
                                {errorText}
                            </InfoBox>

                            <LargeButton onClick={handleForgot}>
                                Continue
                            </LargeButton>

                           
                    </div>
            </FormArea>
           
            
        </AppContainer>
    )
}