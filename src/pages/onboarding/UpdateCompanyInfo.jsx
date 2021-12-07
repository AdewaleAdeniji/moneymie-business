import React, { useState, useRef } from 'react';
import { Progress } from '@chakra-ui/react'
import axios from 'axios';
import { AppContainer } from '../../components/container';
import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea, FormField } from '../../components/Form/form';
import { Link } from 'react-router-dom';
import config from '../../config'
import FormControl from '../../components/Form/FormControl';


const initialValues = {
    registrant_name: "",
    company_name: "",
    line_of_business: "",
    phone_number: "",
    company_website: ""
}


export const UpdateCompanyInfo = (props) => {
    const [errorText, setErrorText] = useState('');
    const fileInputRef = useRef()
    const [progress, setProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false)

    const handleRegister = (e) => {
        props.history.push('/owner-info');
    }


    const updateCompanyInfo = (values, onSubmitProps) => {

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


            <InfoBox show={true} align='align-center'>
                Hello Company Name, Thanks for signing up,
                Please complete your registration to start making paymemts
            </InfoBox>

            <FormArea show={true} position='align-left' title='Company Information' showBackButton={true}>
                <InfoBox show={true} align='align-left'>
                    Please complete your company’s information so we can know about your business?
                </InfoBox>

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
                                        type="text"
                                        name="company_name"
                                        label="Company Name"
                                        placeholder="Company Name"
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

                <div className="form-fields">



                    <FormField title='Business Name'>
                        <input type="text" className="input-field" placeholder="Enter your Business Name" required />
                    </FormField>

                    <FormField title='Business Address'>
                        <input type="text" className="input-field" placeholder="Enter your Business Address" required />
                    </FormField>
                    <FormField title='Country of Incorporation'>
                        <br />
                        <select className="input-field" placeholder="Select Country">
                            <option></option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Nigeria">Nigeria</option>
                        </select>
                    </FormField>

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
                    <InfoBox show={true} success={true} error={true}>
                        {errorText}
                    </InfoBox>

                    <LargeButton onClick={handleRegister}>
                        Continue
                    </LargeButton>

                </div>
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