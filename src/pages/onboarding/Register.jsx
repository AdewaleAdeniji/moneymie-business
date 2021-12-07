import React from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { AppContainer } from '../../components/container';
import { Link } from 'react-router-dom';
import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea } from '../../components/Form/form';
import FormControl from '../../components/Form/FormControl';
import { validateRegister } from '../../validations/onboarding/register';
import { saveEmail, savePassword } from '../../redux/user';
import config from '../../config'
import { showToast } from '../../utils/toast';


const initialValues = {
    email: "",
    password: ""
}
export const CreateAccount = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const handleRegister = async (values, onSubmitProps) => {

        const { email, password } = values

        const body = { email, otpType: "emailVerification" }
        try {
            await axios.post(`${config.baseUrl}/otp/email`, body)
            dispatch(saveEmail(email))
            dispatch(savePassword(password))
            history.push('/confirm-email')
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
            <BreadCrumbs page={0} />
            <FormArea show={true} position='align-center' title='Create an account'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validateRegister}
                    onSubmit={handleRegister}
                >
                    {(formik) => (
                        <Form>

                            <div className="form-fields">
                                <FormControl
                                    control="input"
                                    type="email"
                                    name="email"
                                    label="Work email address"
                                    placeholder="Work Email Address"
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
                                    Already have an account? <Link to='/login'>Sign in</Link>
                                </InfoBox>
                            </div>
                        </Form>
                    )}
                </Formik>

            </FormArea>


        </AppContainer>
    )
}