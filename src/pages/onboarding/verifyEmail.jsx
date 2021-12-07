import React, { useState, useEffect } from 'react';
import { CircularProgress, Center } from '@chakra-ui/react'


import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { FormArea } from '../../components/Form/form';
import config from '../../config'

export const VerifyEmail = (props) => {

    const [loading, setLoading] = useState(true)
    const [successText, setSuccessText] = useState("")
    const [errorText, setErrorText] = useState("")

    const { token: otp } = useParams()

    const email = useSelector((state) => state.user.email)

    useEffect(() => {
        const handleVerify = async () => {

            const body = { otp, otpType: "emailVerification", email }
            try {
                const res = await axios.post(`${config.baseUrl}/otp/validate`, body)
                setSuccessText(res.data.message)
            }
            catch (e) {
                setErrorText(e.response.data.message)
            }
            finally {
                setLoading(false)
            }
        }
        handleVerify()
    }, [email, otp]);

    return (

        <div className="logincontainer">

            <FormArea show={true} position='align-center' title='Verifying email addresss'>
                <br />
                <Center>
                    {loading && <CircularProgress isIndeterminate color="#19145C" />}
                    {successText &&
                        <div>
                            {/* <Icon as={GoVerified} /> */}
                            {successText}
                        </div>
                    }
                    <br />
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