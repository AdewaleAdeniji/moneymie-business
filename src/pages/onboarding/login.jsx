import React,{useEffect, useState} from 'react';
import { AppContainer } from '../../components/container';

import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea,FormField  } from '../../components/Form/form';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { getLoggedInUser } from '../../components/auth';
export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    useEffect(()=>{
        const user = getLoggedInUser();
        //const loggedin =  user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
        if(user){
            props.history.push({pathname:'/user/dashboard',user:user});
        }
    },[props])
    const handleClick = () => {
        try {
            if(!validator.isEmail(email)){
                throw 'Invalid Email Address'  
            }
            else if(password.length<8){
                throw 'Password length must be 8 characters or more';
            }
            else if(validator.isAlphanumeric(password)){
                throw 'Password should contain at least an alphanumeric chraracter';
            }
            else {
                props.history.push('/user/dashboard');
                setError(false);
                setErrorText('');
            }
        }
        catch(err) { 
            //console.log('yush');
            setError(true);
            setErrorText(err);  
        }
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    return (
        <AppContainer>
           
                <FormArea show={true} title='Login'>
                    <div className="form-fields">
                            
                            <FormField title='Work Email Address'>
                                <input type="email" className="input-field" placeholder="Work Email Address" value={email} 
                                onChange={handleEmail} required/>
                            </FormField>

                            <FormField title='Password'>
                                 <input type="password" className="input-field" placeholder="Password" value={password} onChange={handlePassword} required/>
                                 <div className="text-sub">
                                    <Link to='/forgot-password'>
                                         Forgot Password
                                    </Link>
                                </div>
                            </FormField>
                            <InfoBox show={true} error={error}>
                                {errorText}
                            </InfoBox>

                            <LargeButton onClick={handleClick}>
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