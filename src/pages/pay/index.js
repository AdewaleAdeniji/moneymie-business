import React,{useState} from 'react';
import { toast } from 'react-toastify';
import { LargeButton } from '../../components/buttons/buttons';
import { FormField } from '../../components/Form/form';
import './index.css';
import { GetLoggedInUser } from "../../utils/user";
import { PayBeneficiary } from './pay';

const Pay =  (props) => {
    const [amount, setAmount] = useState(0);
    const [user] = useState(GetLoggedInUser());
    const payBen = async () => {
        toast.loading('Making Payment...');
        const beneficiary_id = props.beneficiary.id;
        const data = typeof user == "string" ? JSON.parse(user) : user;
        if(data){
            try {
                const pay = await PayBeneficiary(amount,beneficiary_id,data.company_id);
                toast.dismiss();
                if(pay.status){
                    toast.info('Your payment has been sent, Your BD rep will reach out to you for next steps.');
                    props.onClose();   
                }
                else {
                    toast.warning('Error Occured while making your transaction. Please try again later');   
                }
            }
            catch(e){
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
    return (
        props.show?<div className="pay-modal">
            <div className="pay-content">
                <i className='fa fa-times close' onClick={props.onClose}></i>
                <h3>Pay Beneficiary</h3>
                <div className="pay-form">
                <FormField title="Beneficiary Name">
                    <input
                        type="text"
                        className="input-field ben_name"
                        placeholder="Beneficiary Name"
                        value={props.beneficiary.contact_name||''}
                        required
                    />
                    </FormField>
                    <FormField title="Amount to Pay">
                    <input
                        type="number"
                        onChange={(e)=>setAmount(e.target.value)}
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