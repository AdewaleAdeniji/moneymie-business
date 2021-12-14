import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Progress, CircularProgress } from '@chakra-ui/react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { AppContainer } from '../../components/container';
import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea, FormField } from '../../components/Form/form';
import { useHistory, useLocation } from 'react-router-dom';
import config from '../../config'
import FormControl from '../../components/Form/FormControl';
import { validateUpdateCompanyInfo } from '../../validations/onboarding/updateCompanyInfo';
import { showToast } from '../../utils/toast';
import { request } from '../../utils/axios';





export const UpdateCompanyInfo = (props) => {
    const fileInputRef = useRef()
    const [progress, setProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false)

    const history = useHistory();
    const { state } = useLocation()


    const navigateAfterTo = state?.navigateAfterTo;


    const user = useSelector(state => state.user.user)


    const { isLoading, data, isError, error, isFetching, refetch } = useQuery('company-info', () => request({ url: `/user/company/${user.company.id}` }), {
        select: (data) => {
            return data.data.data;
        }
    })



    const initialValues = {
        reg_no: data?.reg_number ?? "",
        country_of_operations: data?.country_of_operations ?? "",
        company_address: data?.address ?? "",
        ein: data?.ein ?? "",
    }


    useEffect(() => {
        if (data?.registration_certificate_url) {
            setImageUrl(data.registration_certificate_url)
        }
    }, [data]);

    const handleUpdateCompanyInfo = (values, onSubmitProps) => {
        if (!imageUrl) {
            showToast("error", "Please upload your certificate of incorporation")
            return
        }
        const body = { ...values, certificate_of_incorporation: imageUrl, user_id: user.id, company_id: user.company_id }

        request({ url: '/user/company/update', method: 'POST', data: body })
            .then(res => {

                onSubmitProps.setSubmitting(false)

                if (navigateAfterTo) {
                    history.push(navigateAfterTo)
                }
                else {
                    history.push('/owner-info')
                }

            })
            .catch(err => {
                onSubmitProps.setSubmitting(false)

                showToast("error", err.message)

            })
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
        const file = url.split('.')
        return file[file.length - 1]
    }
    return (
        <AppContainer>
            <BreadCrumbs page={1} />
            <div className={`form-title align-center`} style={{ marginTop: 40 }}>
                Hello {user.company.name}, Thanks for signing up,
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
                    enableReinitialize={true}
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
                                                        {!imageUrl && 'Upload Document of Incorporation'}
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