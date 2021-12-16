import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { Flex, Progress, CircularProgress } from '@chakra-ui/react'
import axios from 'axios';
import { LargeButton } from '../../components/buttons/buttons';
import { FormField } from '../../components/Form/form';
import './index.css';
import config from '../../config'
import { GetLoggedInUser } from "../../utils/user";
import { PayBeneficiary } from './pay';

const Pay = (props) => {
    const fileInputRef = useRef()
    const [amount, setAmount] = useState(0);
    const [user] = useState(GetLoggedInUser());

    const [showContinue, setShowContinue] = useState(false)
    const [paymentReason, setPaymentReason] = useState("")

    const [progress, setProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const payBen = async () => {

        if (!amount) {
            toast.warning('Please enter an amount');
            return;
        }
        if (amount >= 10000 && !paymentReason) {
            toast.warning('Please enter your reason for payment');
            return
        }
        if (amount >= 10000 && !imageUrl) {
            toast.warning('Please add a supporting document for your payment');
            return
        }
        toast.loading('Making Payment...');
        const beneficiary_id = props.beneficiary.id;
        const data = typeof user == "string" ? JSON.parse(user) : user;
        if (data) {
            try {
                const pay = await PayBeneficiary(amount, beneficiary_id, data.company_id, paymentReason, imageUrl);
                toast.dismiss();
                if (pay.status) {
                    toast.info('Your payment has been sent, Your BD rep will reach out to you for next steps.');
                    props.onClose();
                }
                else {
                    toast.warning('Error Occured while making your transaction. Please try again later');
                }
            }
            catch (e) {
                console.log(e)
                toast.dismiss();
                if (e?.response?.status === 401) {
                    props.history.push("/login");
                } else {
                    toast.error('Error Occured');
                }
            }
        }
        else {
            toast.dismiss();
            toast.error('Error Occured');
        }
    }


    const uploadImage = async (file) => {
        if (!file) return
        const data = new FormData()
        data.append('image', file)
        data.append('imageType', 'payment_document')

        const requestOpts = {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                setProgress(percentCompleted)
                if (percentCompleted === 100) {
                    // toast.success("Image uploaded successfully")
                    return
                }
            }
        }

        try {
            setIsUploading(true)
            const res = await axios.post(`${config.baseUrl}/images/upload`, data, requestOpts)
            setImageUrl(res.data.data)
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setIsUploading(false)
        }
    }

    const fileName = (url) => {
        const file = url.split('.')
        return file[file.length - 1]
    }

    return (
        props.show ?
            <div className="pay-modal">
                <div className="pay-content">
                    {
                        showContinue ?

                            <>
                                <Flex justify="space-between">
                                    <button onClick={() => setShowContinue(false)}>
                                        <i>&larr;</i>
                                        <span>Back</span>
                                    </button>

                                    <i className='fa fa-times close' onClick={props.onClose}></i>

                                </Flex>
                                <br />

                                <h3>Payment reason</h3>

                                <div className="pay-form">
                                    <FormField title="Reason for payment">
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="Payment reason"
                                            onChange={(e) => setPaymentReason(e.target.value)}
                                            required
                                        />
                                    </FormField>
                                    <br />
                                    <FormField title='Upload supporting document'>
                                        <br />
                                        <div className="filearea" onClick={() => fileInputRef.current?.click()}>
                                            <div className="file-inside">
                                                {isUploading && !imageUrl ?
                                                    <>
                                                        <div className="file-desc">
                                                            Uploading
                                                        </div>
                                                        <br />
                                                        <Progress hasStripe value={progress} colorScheme='green' />
                                                    </> :
                                                    <>
                                                        <i className="fa fa-camera"></i>
                                                        <div className="file-desc">
                                                            Upload Document of Incorporation
                                                        </div>

                                                    </>
                                                }

                                                {imageUrl && !isUploading &&
                                                    <div className="file-desc">
                                                        {`image.${fileName(imageUrl)}`}
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </FormField>
                                    <br />
                                    <LargeButton onClick={() => {
                                        payBen()
                                    }}>
                                        {isLoading ? <CircularProgress size={6} isIndeterminate color='green.300' /> : 'Pay Beneficiary'}
                                    </LargeButton>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => uploadImage(e.target?.files?.[0])}
                                    />

                                </div>

                            </> : <>
                                <i className='fa fa-times close' onClick={props.onClose}></i>
                                <h3>Pay Beneficiary</h3>
                                <div className="pay-form">
                                    <FormField title="Beneficiary Name">
                                        <input
                                            type="text"
                                            className="input-field ben_name"
                                            placeholder="Beneficiary Name"
                                            value={props.beneficiary.contact_name || ''}
                                            disabled={true}
                                            required
                                        />
                                    </FormField>
                                    <FormField title="Amount to Pay">
                                        <input
                                            type="number"
                                            onChange={(e) => setAmount(parseInt(e.target.value))}
                                            className="input-field"
                                            placeholder="Amount to Pay"
                                            required
                                        />
                                    </FormField>
                                    <br />
                                    <LargeButton onClick={() => {
                                        if (amount >= 10000) {
                                            setShowContinue(true)
                                        }
                                        else {
                                            payBen()
                                        }
                                    }}>{amount >= 10000 ? 'Continue' : 'Pay Beneficiary'}</LargeButton>
                                </div>
                            </>
                    }


                </div>
            </div> : <></>
    )
}
export default Pay;