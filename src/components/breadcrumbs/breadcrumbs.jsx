import React from 'react';
import { breads } from './bread';
import { BreadCrumb } from '../breadcrumb/breadcrumb';

export const BreadCrumbs = (props) => {
    const { page } = props;
    return (
        <div className="bread-crumbs">
            {
                breads.map((bread, index) => {
                    const showpath = false;
                    return (
                        <BreadCrumb key={index} label={bread.label} current={index === page} active={index <= page} path={bread.path} showpath={showpath} />
                    )
                })
            }
        </div>
    )
}