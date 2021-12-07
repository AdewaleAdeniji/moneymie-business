import React from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import FormControl from '../../components/Form/FormControl';
import { AppContainer } from '../../components/container';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea } from '../../components/Form/form';
import { Link } from 'react-router-dom';
import { validateLogin } from '../../validations/onboarding/login';
import { showToast } from '../../utils/toast';
import config from '../../config'


const initialValues = {
    email: "",
    password: ""
}


export const Login = (props) => {

    const handleLogIn = async (values, onSubmitProps) => {
        try {
            await axios.post(`${config.baseUrl}/user/login`, values)
        }
        catch (e) {
            showToast("error", e.response.data.message)
        }
        finally {
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
                                    {formik.isSubmitting ? 'Submitting' : 'Continue'}
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