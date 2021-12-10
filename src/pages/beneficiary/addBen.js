import React, { useState } from "react";
import { toast } from "react-toastify";
import { LargeButton } from "../../components/buttons/buttons";
import { Container } from "../../components/container";
import { FormField } from "../../components/Form/form";
import {addBen} from './data';
import SelectCountry from "../../components/Form/SelectCountry";
import { GetLoggedInUser } from "../../utils/user";
const AddBeneficiary = (props) => {
  const [contact_name,setContactName] = useState('');
  const [address, setAddress] = useState('')
  const [payment_type, setPaymentType] = useState('')
  const [account_number, setAccountNumber] = useState('')
  const [further_credit, setFurtherCredit] = useState('')
  const [further_credit_address, setFurtherCreditAddress] = useState('')
  const [swiftCode, setSwiftCode] = useState('')
  const [bank_name, setBankName] = useState('')
  const [phone_number, setPhoneNumber] = useState('');
  const [bank_country, setBankCountry] = useState('');
  const [user] = useState(GetLoggedInUser());
  const goBack = () => {
    props.history.goBack();
  };
  const addBene = async () => {
      toast.loading('Adding Beneficiary');
      try {
        console.log(bank_country);
      const res =  await addBen({
        "contact_name" : contact_name,
        "address" : address,
        "payment_type" : payment_type,
        "account_number" : account_number,
        "further_credit" :further_credit,
        "further_credit_address" : further_credit_address,
        "swift_code" : swiftCode,
        "bank_name" :bank_name,   
        "phone_number" : phone_number,
        "bank_swift" : swiftCode,
        "bank_country" : bank_country,
        "company_id" : user.company_id,
         "name" : contact_name,
        "email" : user.email
    })
    toast.dismiss();
    if(res.data.status){
      toast.info('Beneficiary Added Successfully');
      props.history.push('/user/beneficiaries');
    }
    else {
      toast.warning(res.data.message)
    }
    }
    catch(e){
        if(e?.response?.status===401){
            props.history.push('/login');
          }
        toast.dismiss();
        toast.error('Error Occured');
    }
  }
  return (
    <Container page="beneficiary">
      <div className="col-md-12 ben">
        <button className="back-btn" onClick={goBack}>
          <i>&larr;</i>
          Back
        </button>
      </div>
      <h4 className="ben-name">Add Beneficiary</h4>
      <div className="form-fields add-ben">
        <FormField title="Payment Type">
          <input
            type="email"
            className="input-field"
            placeholder="Payment Type"
            onChange={(e)=>{setPaymentType(e.target.value)}}
            required
          />
        </FormField>
      </div>
      
      <div className="form-fields add-ben">
        <FormField title="Beneficiary Contact Name">
          <input
            type="text"
            className="input-field"
            placeholder="Beneficiary Contact Name"
            onChange={(e)=>{setContactName(e.target.value)}}
            required
          />
        </FormField>
        <FormField title="Beneficiary Address">
          <input
            type="address"
            className="input-field"
            placeholder="Payment Type"
            onChange={(e)=>{setAddress(e.target.value)}}
            required
          />
        </FormField>
      </div>
      <div className="form-fields add-ben">
        <FormField title="Beneficiary Contact Number">
          <input
            type="text"
            className="input-field"
            placeholder="Beneficiary Contact Number"
            onChange={(e)=>{setPhoneNumber(e.target.value)}}
            required
          />
        </FormField>
        <FormField title="Receving Bank Name">
          <input
            type="text"
            className="input-field"
            placeholder="Receving Bank Name"
            onChange={(e)=>{setBankName(e.target.value)}}
            required
          />
        </FormField>
      </div>
      <div className="form-fields add-ben">
        <FormField title="Swift Code">
          <input
            type="text"
            className="input-field"
            placeholder="Swift Code"
            onChange={(e)=>{setSwiftCode(e.target.value)}}
            required
          />
        </FormField>
        <FormField title="Receving Bank Address">
          <input
            type="text"
            className="input-field"
            placeholder="Receving Bank Address"
            onChange={(e)=>{setBankCountry(e.target.value)}}
            required
          />
        </FormField>
      </div>
      <div className="form-fields add-ben">
        <FormField title="Further Credit">
          <input
            type="text"
            className="input-field"
            placeholder="Further Credit"
            onChange={(e)=>{setFurtherCredit(e.target.value)}}
            required
          />
        </FormField>
        <FormField title="Account Number">
          <input
            type="text"
            className="input-field"
            placeholder="Account Number"
            onChange={(e)=>{setAccountNumber(e.target.value)}}
            required
          />
        </FormField>
      </div>
      <div className="form-fields add-ben">
        <FormField title="Further Credit Address">
          <input
            type="text"
            className="input-field"
            placeholder="Further Credit Address"
            onChange={(e)=>{setFurtherCreditAddress(e.target.value)}}
            required
          />
        </FormField>
        <FormField title="Bank Country">
          <SelectCountry onChange={(e)=>{setBankCountry(e.target.value)}}/>
        </FormField>
        
      </div>
      <div className="form-fields add-ben">
        <FormField title="Beneficiary Name">
          <input
            type="email"
            className="input-field"
            placeholder="Beneficiary Name"
            onChange={(e)=>{setContactName(e.target.value)}}
            required
          />
        </FormField>
        
      </div>
      <div className="form-fields add-ben">
        <LargeButton onClick={addBene}>Add Beneficiary</LargeButton>
      </div>

    </Container>
  );
};
export default AddBeneficiary;
