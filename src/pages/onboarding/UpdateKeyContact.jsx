import React from 'react';
import { CircularProgress } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { AppContainer } from '../../components/container';
import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea } from '../../components/Form/form';
import { useHistory } from 'react-router-dom';
import FormControl from '../../components/Form/FormControl';
import { showToast } from '../../utils/toast';
import { request } from '../../utils/axios';

import { validateUpdateKeyContact } from '../../validations/onboarding/updateKeyContact';

const initialValues = {
    full_name: "",
    phone_number: "",
    email: "",
    country_of_citizenship: "",
}


export const UpdateKeyContact = (props) => {
    const history = useHistory();
    const user = useSelector(state => state.user.user)

    const handleUpdateKeyContact = (values, onSubmitProps) => {

        request({ url: `/user/company/keycontact/${user.company.id}`, method: 'PATCH', data: values })
            .then(res => {
                onSubmitProps.setSubmitting(false)
                history.push('/review')
            })
            .catch(err => {
                onSubmitProps.setSubmitting(false)
                showToast("error", err.message)
            })
    }

    return (
        <AppContainer>
            <BreadCrumbs page={2} />
            <FormArea show={true} position='align-left' title='' showBackButton={true}>
                <>
                    <div className={`form-title`}>
                        Key Contact Information
                    </div>

                    <InfoBox show={true} align='align-left'>
                        Please provide us with the contact information of who we can reach when we need to ask questions
                    </InfoBox>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validateUpdateKeyContact}
                        onSubmit={handleUpdateKeyContact}
                    >
                        {(formik) => (
                            <Form>
                                <div className="form-fields">
                                    <FormControl
                                        control="input"
                                        type="text"
                                        name="full_name"
                                        label="Full Name"
                                        placeholder="Full Name"
                                    />
                                    <FormControl
                                        control="input"
                                        type="text"
                                        name="country_of_citizenship"
                                        label="Country of Citizenship"
                                        placeholder="Country of Citizenship"
                                    />

                                    <FormControl
                                        control="input"
                                        type="email"
                                        name="email"
                                        label="Email address"
                                        placeholder="Email address"
                                    />

                                    <FormControl
                                        control="input"
                                        type="tel"
                                        name="phone_number"
                                        label="Phone Number"
                                        placeholder="Phone Number"
                                    />

                                    <LargeButton type="submit" disabled={formik.isSubmitting}>
                                        {formik.isSubmitting ? <CircularProgress size={6} isIndeterminate color='green.300' /> : 'Continue'}
                                    </LargeButton>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </>
            </FormArea>
        </AppContainer>
    )
}