import React, { useState, useEffect } from 'react';
import { CircularProgress, Center } from '@chakra-ui/react'
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';
import { FormArea } from '../../components/Form/form';
import config from '../../config'
import { LargeButton } from '../../components/buttons/buttons';
import { showToast } from '../../utils/toast';
import { saveUser } from '../../redux/user';


export const VerifyEmail = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [successText, setSuccessText] = useState("")
    const [errorText, setErrorText] = useState("")

    const { token: otp } = useParams()


    useEffect(() => {
        const handleVerify = async () => {

            const decoded = jwt_decode(otp)

            const body = { otp, otpType: "emailVerification", email: decoded.email }
            try {
                const res = await axios.post(`${config.baseUrl}/user/auth/signup/verify`, body)
                dispatch(saveUser(res.data.data))
                showToast("success", res.data.message);
                setSuccessText(res.data.message)
            }
            catch (e) {
                showToast("error", e.response.data.message);
                setErrorText(e.response.data.message)
            }
            finally {
                setLoading(false)
            }
        }
        handleVerify()
    }, [otp, history, dispatch]);

    return (

        <div className="logincontainer">

            <FormArea show={true} position='align-center' title='Verifying email addresss'>
                <br />
                <Center>
                    {loading && <CircularProgress isIndeterminate color="#19145C" />}
                    <br />
                    {successText &&
                        <div>
                            <div>{successText}</div>
                            <br />
                            <LargeButton onClick={() => history.push('/company-info')}>
                                Continue
                            </LargeButton>

                        </div>

                    }
                    {errorText &&
                        <div>
                            {/* <Icon as={AiFillCloseCircle} /> */}
                            {errorText}
                        </div>
                    }
                </Center>

            </FormArea>
        </div>
    )
}