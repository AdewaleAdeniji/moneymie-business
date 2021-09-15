import React,{useState} from 'react';
import { AppContainer } from '../../components/container';

import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea,FormField  } from '../../components/Form/form';
import { Link } from 'react-router-dom';
import validator from 'validator';

export const ForgotPassword = (props) => {
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
        props.history.push('/email-code');
    }
    return (
        <AppContainer>
           
                <FormArea show={true} title='Forgot Password'>
                    
                    <div className="form-fields">
                            <InfoBox show={true} align='align-left'>
                                 Enter the email address associated with this account
                            </InfoBox>
                            <FormField title='Work Email Address'>
                                <input type="email" className="input-field" placeholder="Work Email Address" value={email} 
                                onChange={handleEmail} required/>
                            </FormField>

                            <InfoBox show={true} error={error}>
                                {errorText}
                            </InfoBox>

                            <LargeButton onClick={handleForgot}>
                                Continue
                            </LargeButton>

                            <InfoBox show={true}>
                                 New here ? <Link to="/register">Create an account </Link>
                            </InfoBox>
                    </div>
            </FormArea>
           
            
        </AppContainer>
    )
}