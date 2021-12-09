import React, { useState, useRef } from 'react';
import { Progress, CircularProgress } from '@chakra-ui/react'
import axios from 'axios';

import { Formik, Form } from 'formik';
import { AppContainer } from '../../components/container';
import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea, FormField } from '../../components/Form/form';
import { useHistory } from 'react-router-dom';
import config from '../../config'
import FormControl from '../../components/Form/FormControl';
import { validateUpdateCompanyInfo } from '../../validations/onboarding/updateCompanyInfo';
import { showToast } from '../../utils/toast';


const initialValues = {
    reg_no: "",
    country_of_operations: "",
    company_address: "",
    ein: "",
}


export const UpdateCompanyInfo = (props) => {
    const fileInputRef = useRef()
    const [progress, setProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false)

    const history = useHistory();

    const handleUpdateCompanyInfo = async (values, onSubmitProps) => {
        if (!imageUrl) {
            showToast("error", "Please upload your certificate of incorporation")
            return
        }
        const body = { ...values, certificate_of_incorporation: imageUrl }
        try {
            const res = await axios.post(`${config.baseUrl}/user/login`, body)
            history.push('/owner-info');

        }
        catch (e) {
            showToast("error", e.response.data.message)
        }
        finally {
            onSubmitProps.setSubmitting(false)
        }
    }

    const uploadImage = async (file) => {
        if (!file) return
        const data = new FormData()
        data.append('image', file)
        data.append('imageType', 'cerficate_of_incorporation')

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
        const file = url.split('/')
        const lastElement = file[file.length - 1]
        return lastElement
    }
    return (
        <AppContainer>
            <BreadCrumbs page={1} />
            <div className={`form-title align-center`} style={{ marginTop: 40 }}>
                Hello Company Name, Thanks for signing up,
                Please complete your registration to start making paymemts
            </div>

            <FormArea show={true} position='align-left' title='Company Information' showBackButton={true}>
                <InfoBox show={true} align='align-left'>
                    Please complete your company’s information so we can know about your business?
                </InfoBox>


                <Formik
                    initialValues={initialValues}
                    validationSchema={validateUpdateCompanyInfo}
                    onSubmit={handleUpdateCompanyInfo}
                >
                    {(formik) => (
                        <Form>

                            <div className="form-fields">
                                <FormControl
                                    control="input"
                                    type="text"
                                    name="reg_no"
                                    label="Company Registration Number"
                                    placeholder="Company Registration Number"
                                />

                                <FormControl
                                    control="input"
                                    type="text"
                                    name="country_of_operations"
                                    label="Country of Operations/Residence"
                                    placeholder="Country of Operations/Residence"
                                />
                                <FormControl
                                    control="textarea"
                                    type="text"
                                    name="company_address"
                                    label="Company Address"
                                    placeholder="Company Address"
                                />
                                <FormControl
                                    control="input"
                                    type="text"
                                    name="ein"
                                    label="US Employer Identification Number (EIN). {Insert N/A if not a US company}"
                                    placeholder="US Employer Identification Number (EIN). {Insert N/A if not a US company}"
                                />

                                <FormField title='Upload Document of Incorporation'>
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
                                                    {fileName(imageUrl)}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </FormField>

                                <LargeButton type="submit" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? <CircularProgress size={6} isIndeterminate color='green.300' /> : 'Continue'}
                                </LargeButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </FormArea>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => uploadImage(e.target?.files?.[0])}
            />

        </AppContainer>
    )
}