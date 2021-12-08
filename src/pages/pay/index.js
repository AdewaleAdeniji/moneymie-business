import React from 'react';
import { toast } from 'react-toastify';
import { LargeButton } from '../../components/buttons/buttons';
import { FormField } from '../../components/Form/form';
import './index.css';

const Pay =  (props) => {
    const payBen = () => {
        toast.loading('Making Payment...');
        setTimeout(()=>{
            toast.dismiss();
            toast.info('Payment Successful');
            props.onClose();
        },5000)
    }
    return (
        props.show?<div className="pay-modal">
            <div className="pay-content">
                <i className='fa fa-times close' onClick={props.onClose}></i>
                <h3>Pay Beneficiary</h3>
                <div className="pay-form">
                <FormField title="Beneficiary Name">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Beneficiary Name"
                        value={props.beneficiary_name||''}
                        required
                    />
                    </FormField>
                    <FormField title="Amount to Pay">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Amount to Pay"
                        required
                    />
                    </FormField>
                    <LargeButton onClick={payBen}>Pay Beneficiary</LargeButton>
                </div>
            </div>
        </div>:<></>
    )
}
export default Pay;