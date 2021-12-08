import React from "react";
import { toast } from "react-toastify";
import { LargeButton } from "../../components/buttons/buttons";
import { Container } from "../../components/container";
import { FormField } from "../../components/Form/form";
import {addBen} from './data';

const AddBeneficiary = (props) => {
  const goBack = () => {
    props.history.goBack();
  };
  const addBene = async () => {
      toast.loading('Adding Beneficiary');
      try {
      const res =  await addBen({
        "contact_name" : "bolu",
        "address" : "lagos",
        "payment_type" : "wire transfer",
        "account_number" : "2119177552",
        "further_credit" : "next year",
        "further_credit_address" : "lagos",
        "swift_code" : "65464",
        "bank_name" : "sterling",   
        "phone_number" : "0906537371",
        "bank_swift" : "54322",
        "bank_country" : "Nigeria",
        "company_id" : 4,
         "name" : "Ayo",
        "email" : "waplurd1@gmail.com"
        
    })
    toast.dismiss();
    toast.info('Beneficiary Added Successfully');
    props.history.push('/user/beneficiaries');
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
            required
          />
        </FormField>
      </div>
      <div className="form-fields add-ben">
        <FormField title="Beneficiary Name">
          <input
            type="email"
            className="input-field"
            placeholder="Beneficiary Name"
            required
          />
        </FormField>
        <FormField title="Beneficiary Account Number">
          <input
            type="number"
            className="input-field"
            placeholder="Payment Type"
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
            required
          />
        </FormField>
        <FormField title="Beneficiary Address">
          <input
            type="address"
            className="input-field"
            placeholder="Payment Type"
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
            required
          />
        </FormField>
        <FormField title="Receving Bank Name">
          <input
            type="text"
            className="input-field"
            placeholder="Receving Bank Name"
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
            required
          />
        </FormField>
        <FormField title="Receving Bank Address">
          <input
            type="text"
            className="input-field"
            placeholder="Receving Bank Address"
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
            required
          />
        </FormField>
        <FormField title="Account Number">
          <input
            type="text"
            className="input-field"
            placeholder="Account Number"
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
