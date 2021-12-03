import React from 'react';
import { AppContainer } from '../../components/container';

import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { LargeButton } from '../../components/buttons/buttons';
import { FormArea } from '../../components/Form/form';

export const ConfirmEmail = (props) => {

    const handleVerified = (e) => {
        props.history.push('/company-info');
    }
    
    return (
        <AppContainer>
            <BreadCrumbs page={0}/>
                <FormArea show={true} position='align-center' title='Confirm email addresss'>
                            <br/>
                            <InfoBox show={true}>
                                We just sent a link to your inbox. Please confim your email address.
                                <br/>
                                <a href>Awotundebangalee@gmail.com</a>
                            </InfoBox>
                            <br/><br/>
                            <LargeButton onClick={handleVerified}>
                                I've verified
                            </LargeButton>
            </FormArea>
           
            
        </AppContainer>
    )
}