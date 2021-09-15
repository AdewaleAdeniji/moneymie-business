import React,{useState} from 'react';
import { AppContainer } from '../../components/container';

import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea,FormField  } from '../../components/Form/form';
import { Link } from 'react-router-dom';
import validator from 'validator';

export const ResetPassword = (props) => {
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
        props.history.push('/login');
    }
    return (
        <AppContainer>
           
                <FormArea show={true} title='New Password'>
                    
                    <div className="form-fields">
                            <InfoBox show={true} align='align-left'>
                                 Set a new password for your Account
                            </InfoBox>
                            <FormField title='Enter Password'>
                                <input type="password" className="input-field" placeholder="New Password" required/>
                            </FormField>

                            <InfoBox show={true} error={error}>
                                {errorText}
                            </InfoBox>

                            <LargeButton onClick={handleForgot}>
                                Save Password
                            </LargeButton>

                    </div>
            </FormArea>
           
            
        </AppContainer>
    )
}