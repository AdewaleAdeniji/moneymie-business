import React, { useState } from 'react';
import { AppContainer } from '../../components/container';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea } from '../../components/Form/form';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@chakra-ui/react'

import config from '../../config';
import { showToast } from '../../utils/toast';

export const ConfirmEmail = (props) => {

    const history = useHistory()

    const user = useSelector((state) => state.user.user)

    console.log({ user })

    const [loading, setLoading] = useState({ verified: false, resend: false })

    const handleVerified = async (e) => {

        setLoading({ ...loading, verified: true })
        try {
            const res = await axios.post(`${config.baseUrl}/user/auth/isemailverified`, { email: user.email })

            if (res.data.status) {
                history.push('/company-info');
            }
            else {
                showToast("error", "This email address has not been verified yet");
            }
        }
        catch (e) {
            showToast("error", e.response.data.message)
        }
        finally {
            setLoading({ ...loading, verified: false })
        }
    }

    const handleResend = async () => {
        setLoading({ ...loading, resend: true })

        const body = {
            email: user.email,
            otpType: "emailVerification"

        }
        try {
            const res = await axios.post(`${config.baseUrl}/otp/email`, body)
            showToast("success", res.data.message);
        }
        catch (e) {
            showToast("error", e.response.data.message)
        }
        finally {
            setLoading({ ...loading, resend: false })
        }
    }

    return (
        <AppContainer>
            <BreadCrumbs page={0} />
            <FormArea show={true} position='align-center' title='Confirm email addresss'>
                <br />
                <InfoBox show={true}>
                    We sent a link to your inbox. Please confim your email address.
                    <br />
                    <a>{user.email}</a>
                </InfoBox>
                <br /><br />
                <LargeButton onClick={handleVerified}>
                    {loading.verified ? <CircularProgress size={6} isIndeterminate color='green.300' /> : "I've verified"}
                </LargeButton>
                <br /><br />
                <div className="align-center pointer resend" onClick={handleResend}>
                    {loading.resend ? <CircularProgress size={10} isIndeterminate color='green.300' /> : "Resend"}
                </div>
            </FormArea>


        </AppContainer>
    )
}