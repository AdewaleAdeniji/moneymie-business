import React from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { CircularProgress } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppContainer } from '../../components/container';
import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea } from '../../components/Form/form';
import config from '../../config'
import FormControl from '../../components/Form/FormControl';
import { validateAddCompanyInfo } from '../../validations/onboarding/addCompany';
import { showToast } from '../../utils/toast';
import { BreadCrumb } from '../../components/breadcrumb/breadcrumb';


const initialValues = {
    registrant_name: "",
    company_name: "",
    line_of_business: "",
    phone_number: "",
    company_website: ""
}


export const CompanyInfo = (props) => {
    const history = useHistory()

    const user = useSelector(state => state.user.user)
    const addCompanyInfo = async (values, onSubmitProps) => {

        const body = { ...values, "user_id": user.id, }
        try {
            const res = await axios.post(`${config.baseUrl}/user/application/intent/new`, body)
            showToast("success", res.data.message)
            onSubmitProps.setSubmitting(false)
            history.push('/await-verify')

        }
        catch (e) {
            onSubmitProps.setSubmitting(false)
            showToast("error", e.response.data.message)
        }

    }


    return (
        <AppContainer>
            <BreadCrumbs page={1} />
            <BreadCrumb label="Company Info" />
            <FormArea show={true} position='align-left' title='Company Information' showBackButton={true}>
                <InfoBox show={true} align='align-left'>
                    Please fill in your company’s information so we can know about your business?
                </InfoBox>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validateAddCompanyInfo}
                    onSubmit={addCompanyInfo}
                >
                    {(formik) => (
                        <Form>

                            <div className="form-fields">

                                <FormControl
                                    control="input"
                                    type="text"
                                    name="registrant_name"
                                    label="Your Full Name"
                                    placeholder="Your Full Name"
                                />
                                <FormControl
                                    control="input"
                                    type="text"
                                    name="company_name"
                                    label="Company Name"
                                    placeholder="Company Name"
                                />

                                <FormControl
                                    control="input"
                                    type="text"
                                    name="line_of_business"
                                    label="Your line of Business"
                                    placeholder="Your line of Business"
                                />

                                <FormControl
                                    control="input"
                                    type="text"
                                    name="phone_number"
                                    label="Phone number"
                                    placeholder="Phone number"
                                />

                                <FormControl
                                    control="input"
                                    type="text"
                                    name="company_website"
                                    label="Company website (optional)"
                                    placeholder="Company website"
                                />
                                <LargeButton type="submit" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? <CircularProgress size={6} isIndeterminate color='green.300' /> : 'Continue'}
                                </LargeButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </FormArea>
        </AppContainer >
    )
}