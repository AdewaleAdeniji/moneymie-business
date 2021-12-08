import React from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@chakra-ui/react'
import FormControl from '../../components/Form/FormControl';
import { AppContainer } from '../../components/container';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea } from '../../components/Form/form';
import { Link, useHistory } from 'react-router-dom';
import { validateLogin } from '../../validations/onboarding/login';
import { showToast } from '../../utils/toast';
import config from '../../config'
import { logoutUser, loginUser } from '../../redux/user';


const initialValues = {
    email: "",
    password: ""
}


export const Login = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const handleLogIn = async (values, onSubmitProps) => {
        try {
            const res = await axios.post(`${config.baseUrl}/user/login`, values)
            onSubmitProps.setSubmitting(false)

            const user = res.data.data
            localStorage.removeItem('user_meta');
            await dispatch(logoutUser());
            await dispatch(loginUser(JSON.stringify(user)));
            if (!user.email_verified) {
                return history.push('/confirm-email')
            }
            if (!user.company_id) {
                return history.push('/company-info')
            }
            if (user.status === 'PENDING') {
                return history.push('/await-verify')
            }

            history.push('/user/dashboard')


        }
        catch (e) {
            showToast("error", e.response.data.message)
            onSubmitProps.setSubmitting(false)
        }

    }
    return (
        <AppContainer>
            <FormArea show={true} title='Login'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validateLogin}
                    onSubmit={handleLogIn}
                >
                    {(formik) => (
                        <Form>

                            <div className="form-fields">
                                <FormControl
                                    control="input"
                                    type="email"
                                    name="email"
                                    label="Work email address"
                                    placeholder="Email Address"
                                />

                                <FormControl
                                    control="input"
                                    type="password"
                                    name="password"
                                    label="Password"
                                    placeholder="Password"
                                />
                                <LargeButton type="submit" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? <CircularProgress size={6} isIndeterminate color='green.300' /> : 'Continue'}
                                </LargeButton>


                                <InfoBox show={true}>
                                    New here ? <Link to="/register">Create an account </Link>
                                </InfoBox>
                            </div>
                        </Form>
                    )}
                </Formik>
            </FormArea>
        </AppContainer>
    )
}