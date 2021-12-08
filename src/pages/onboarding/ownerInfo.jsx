import React, { useState, useRef } from 'react';
import { Progress, CircularProgress } from '@chakra-ui/react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { AppContainer } from '../../components/container';
import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton, LargeButtonGrey } from '../../components/buttons/buttons';
import { FormArea, FormField } from '../../components/Form/form';
import FormControl from '../../components/Form/FormControl';
import { validateAddOwner } from '../../validations/onboarding/addOwnerInfo';
import config from '../../config'
import { showToast } from '../../utils/toast';
import { useSelector } from 'react-redux';


const initialValues = {
    name: "",
    phone_number: "",
    address: "",
}

export const OwnerInfo = (props) => {
    const history = useHistory()
    const fileInputRef = useRef()
    const [editing, setEditing] = useState(true)

    const [progress, setProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false)

    const [owners, setOwners] = useState([])


    const user = useSelector(state => state.user.user)

    const handleAddOwner = async (values, onSubmitProps) => {

        if (!imageUrl) {
            showToast("error", "Please upload a means of identification")
            return
        }

        const body = { ...values, means_of_identification: imageUrl, user_id: user.id, company_id: user.company_id }
        try {
            await axios.post(`${config.baseUrl}/user/company/owner/add`, body)
            setOwners([...owners, body])
            setImageUrl(null)
            setEditing(false)
            onSubmitProps.setSubmitting(false)
        }
        catch (e) {
            showToast("error", e.response.data.message)
        }
    }

    const handleContinue = () => {
        if (owners.length === 0) {
            showToast("error", "Please add at least one owner")
            return;
        }
        else {
            history.push('/review')
        }
    }

    const uploadImage = async (file) => {
        if (!file) return
        const data = new FormData()
        data.append('image', file)
        data.append('imageType', 'means_of_identification')

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
            <BreadCrumbs page={2} />
            <FormArea show={true} position='align-left' title='' showBackButton={true}>
                {owners.map((owner, index) => {
                    return (
                        <div key={index} className="owner-info">
                            <div className="title-tile">
                                <div className="owner-title">
                                    Owner {index + 1} Information
                                </div>
                                <div className="owner-cancel">
                                    <div className="i-cancel">
                                        &#215;
                                        {/* <i className="fa fa-times"></i> */}
                                    </div>
                                </div>
                            </div>
                            <div className="owner-infos">
                                <div className="owner">
                                    <div className="owner-sup">
                                        NAME
                                    </div>
                                    <div className="owner-sub">
                                        {owner.name}
                                    </div>
                                </div>
                                <div className="owner">
                                    <div className="owner-sup">
                                        Phone Number
                                    </div>
                                    <div className="owner-sub">
                                        {owner.phone_number}
                                    </div>
                                </div>
                            </div>

                            <div className="owner-infos">
                                <div className="owner">
                                    <div className="owner-sup">
                                        Address
                                    </div>
                                    <div className="owner-sub">
                                        {owner.address}
                                    </div>
                                </div>
                                <div className="owner means">
                                    <div className="owner-sup">
                                        Means of Identification
                                    </div>
                                    <div className="owner-sub">
                                        <div className="owner-image">
                                            {fileName(owner.means_of_identification)}
                                        </div>
                                        <button className="btn btn-view">
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <a href="#">Edit this Information
                                <button className="i-cancel">
                                    <i className="fa fa-angle-right"></i>
                                </button>
                            </a>
                            <br />
                            <br />
                            <LargeButtonGrey onClick={() => setEditing(true)}>
                                Add Another owner
                            </LargeButtonGrey>
                        </div>
                    )
                })}
                {editing &&
                    <>
                        <br />
                        <div className={`form-title`}>
                            Owner Information
                        </div>

                        <InfoBox show={true} align='align-left'>
                            Please ensure to fill information of someone who owns &gt; 20% of the company
                        </InfoBox>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validateAddOwner}
                            onSubmit={handleAddOwner}
                        >
                            {(formik) => (
                                <Form>
                                    <div className="form-fields">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="name"
                                            label="Name"
                                            placeholder="Name"
                                        />
                                        <FormControl
                                            control="input"
                                            type="tel"
                                            name="phone_number"
                                            label="Phone Number"
                                            placeholder="Phone Number"
                                        />
                                        <FormControl
                                            control="textarea"
                                            type="text"
                                            name="address"
                                            label="Residential Address"
                                            placeholder="Residential Address"
                                        />
                                        <FormField title='Upload Means of Identification'>
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
                                        <LargeButtonGrey type="submit" disabled={formik.isSubmitting}>
                                            {formik.isSubmitting ? <CircularProgress size={6} isIndeterminate color='green.300' /> : 'Save Owner'}
                                        </LargeButtonGrey>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </>


                }
                <br />
                <LargeButton onClick={handleContinue}>
                    Continue
                </LargeButton>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => uploadImage(e.target?.files?.[0])}
                />

            </FormArea>


        </AppContainer>
    )
}