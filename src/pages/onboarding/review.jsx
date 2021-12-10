import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { AppContainer } from '../../components/container';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@chakra-ui/react'
import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea } from '../../components/Form/form';
import { showToast } from '../../utils/toast';
import config from '../../config'
import { request } from '../../utils/axios';

export const ReviewInfo = (props) => {
    const [loading, setLoading] = useState(false);

    const history = useHistory()

    const user = useSelector(state => state.user.user);

    const { isLoading, data, isError, error, isFetching, refetch } = useQuery('owner-info', () => request({ url: `/user/company/owners/${user.company.id}` }), {
        select: (data) => {
            return data.data.data;
        }
    })

    const handleSubmit = () => {
        const body = { user_id: user.id, company_id: user.company.id }

        setLoading(true)
        try {
            request({ url: '/user/company/submit', method: 'POST', data: body })
            history.push('/user/dashboard')
        }
        catch (e) {
            showToast("error", e.response.data.message)
            setLoading(false)
        }
    }

    const fileName = (url) => {
        const file = url.split('.')
        return file[file.length - 1]
    }
    return (
        <AppContainer>
            <BreadCrumbs page={3} />

            <FormArea show={true} position='align-left' title='Review and Submit' showBackButton={true}>

                <InfoBox show={true} align='align-left'>
                    Please review the form you filled before submitting the documents
                </InfoBox>

                <h4 className="review-title">Registration Information</h4>
                <div className="owner-info">
                    <div className="owner-infos">
                        <div className="owner">
                            <div className="owner-sup">
                                EMAIL ADDRESS
                            </div>
                            <div className="owner-sub">
                                {user.email}
                            </div>
                        </div>
                        <div className="owner">
                            <div className="label success">
                                <div className='active crumb'>
                                    <i className='fa fa-check'></i>
                                </div>
                                Verified
                            </div>

                        </div>
                    </div>
                </div>
                <h4 className="review-title">Company Information</h4>
                <div className="owner-info">
                    <div className="title-tile">
                        <div className="owner-title">
                            Company Details
                        </div>
                        <div className="owner-cancel">

                        </div>
                    </div>
                    <div className="owner-infos">
                        <div className="owner">
                            <div className="owner-sup">
                                NAME
                            </div>
                            <div className="owner-sub">
                                {user.company.registrant_name}
                            </div>
                        </div>
                        <div className="owner">
                            <div className="owner-sup">
                                Phone Number
                            </div>
                            <div className="owner-sub">
                                {user.company.phone_number}
                            </div>
                        </div>
                    </div>

                    <div className="owner-infos edit-info">
                        <div className="owner">
                            <div className="owner-sup">
                                ADDRESS
                            </div>
                            <div className="owner-sub">
                                {user.company.address}
                            </div>
                        </div>
                        <div className="owner means">
                            <div className="owner-sup">
                                Means of Identification
                            </div>
                            <div className="owner-sub">
                                <div className="owner-image">
                                    {`image.${fileName(user.company.registration_certificate_url)}`}
                                </div>
                                <button className="btn btn-view">
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="owner-infos">
                        <div className="owner">
                            <div className="owner-sup">
                                COMPANY NAME
                            </div>
                            <div className="owner-sub">
                                {user.company.registrant_name}
                            </div>
                        </div>
                        <div className="owner">
                            <div className="owner-sup">
                                LINE OF BUSINESS
                            </div>
                            <div className="owner-sub">
                                {user.company.line_of_business}
                            </div>
                        </div>
                    </div>
                    <div className="owner-infos">
                        <div className="owner">
                            <div className="owner-sup">
                                COMPANY WEBSITE
                            </div>
                            <div className="owner-sub">
                                {user.company.website}
                            </div>
                        </div>
                        <div className="owner">
                            <div className="owner-sup">
                                COMPANY REG NO
                            </div>
                            <div className="owner-sub">
                                {user.company.reg_number}
                            </div>
                        </div>
                    </div>
                    <div className="owner-infos">
                        <div className="owner">
                            <div className="owner-sup">
                                COUNTRY OF RESIDENCE
                            </div>
                            <div className="owner-sub">
                                {user.company.country_of_operations}
                            </div>
                        </div>
                        <div className="owner">
                            <div className="owner-sup">
                                EMPLOYER ID NUMBER
                            </div>
                            <div className="owner-sub">
                                {user.company.ein}
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div style={{ marginTop: 32 }}>
                        <a href="#">Edit this Information
                            <button className="i-cancel">
                                <i className="fa fa-angle-right"></i>
                            </button>
                        </a>
                    </div>

                </div>

                <h4 className="review-title">Ownership Information</h4>

                {data?.map((owner, index) => {
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
                                            {`image.${fileName(owner.identification_photo_url)}`}
                                        </div>
                                        <button className="btn btn-view">
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: 32 }}>
                                <a href="#">Edit this Information
                                    <button className="i-cancel">
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </a>
                            </div>
                        </div>
                    )
                })}
                <LargeButton onClick={handleSubmit} disabled={loading}>
                    {loading ? <CircularProgress size={6} isIndeterminate color='green.300' /> : 'Review and submit'}
                </LargeButton>
            </FormArea>


        </AppContainer>
    )
}