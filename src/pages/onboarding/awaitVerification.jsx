import React from 'react';
import { AppContainer } from '../../components/container';

import { BreadCrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { InfoBox } from '../../components/InfoArea/Info';
import { FormArea  } from '../../components/Form/form';

export const AwaitVerify = () => {
    return (
        <AppContainer>
            <BreadCrumbs page={3}/>
                            
            <FormArea show={true} position='align-left' title='' showBackButton={false}>
                <img className="align-center await-img" src="assets/await.png" alt="Awaiting Verification"/>
                <h4 className="review-title align-center">Awaiting Verification</h4>
                <InfoBox show={true}>
                     Please wait while we verify your verification, we will get back to you soon
                </InfoBox>
                      
            </FormArea>
           
            
        </AppContainer>
    )
}