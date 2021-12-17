import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import { useParams, useHistory } from "react-router-dom";
import { CircularProgress } from "@chakra-ui/react";
import { LargeButton, LargeButtonGrey } from "../../components/buttons/buttons";
import { Container } from "../../components/container";
import { FormField } from "../../components/Form/form";
import { addBen } from "./data";
import SelectCountry from "../../components/Form/SelectCountry";
import { GetLoggedInUser } from "../../utils/user";
import FormControl from "../../components/Form/FormControl";
import { validateEditBeneficiary } from "../../validations/beneficiaries/editBeneficiary";
import { request } from "../../utils/axios";

const EditBeneficiary = (props) => {
  const [contact_name, setContactName] = useState("");
  const [address, setAddress] = useState("");
  const [payment_type, setPaymentType] = useState("");
  const [account_number, setAccountNumber] = useState("");
  const [further_credit, setFurtherCredit] = useState("");
  const [further_credit_address, setFurtherCreditAddress] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [bank_name, setBankName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [bank_country, setBankCountry] = useState("");
  const [user] = useState(GetLoggedInUser());

  const history = useHistory();

  const { id } = useParams();

  const { data: beneficiary } = useQuery(
    "beneficiary",
    () => request({ url: `/beneficiary/company/${id}` }),
    {
      select: (data) => data.data.data,
    }
  );

  const initialValues = {
    contact_name: beneficiary?.contact_name ?? "",
    address: beneficiary?.address ?? "",
    payment_type: beneficiary?.payment_type ?? "",
    account_number: beneficiary?.account_number ?? "",
    further_credit: beneficiary?.further_credit ?? "",
    further_credit_address: beneficiary?.further_credit_address ?? "",
    swift_code: beneficiary?.swift_code ?? "",
    bank_name: beneficiary?.bank_name ?? "",
    phone_number: beneficiary?.phone_number ?? "",
    bank_country: beneficiary?.bank_country ?? "",
  };

  const goBack = () => {
    props.history.goBack();
  };
  const editBeneficiary = async (values, onSubmitProps) => {
    toast.loading("Editing Beneficiary");

    const body = {
      ...values,
      company_id: user.company_id,
      email: user.email,
      name: values.contact_name,
      bank_swift: values.swift_code,
    };

    try {
      await request({
        url: `/beneficiary/company/${id}`,
        method: "POST",
        data: body,
      });
      onSubmitProps.setSubmitting(false);
      toast.dismiss();
      history.goBack();
    } catch (e) {
      onSubmitProps.setSubmitting(false);
      toast.dismiss();
      toast.error(e.response.data.message);
    }

    // try {
    //     console.log(bank_country);
    //     const res = await addBen({
    //         "contact_name": contact_name,
    //         "address": address,
    //         "payment_type": payment_type,
    //         "account_number": account_number,
    //         "further_credit": further_credit,
    //         "further_credit_address": further_credit_address,
    //         "swift_code": swiftCode,
    //         "bank_name": bank_name,
    //         "phone_number": phone_number,
    //         "bank_swift": swiftCode,
    //         "bank_country": bank_country,
    //         "company_id": user.company_id,
    //         "name": contact_name,
    //         "email": user.email
    //     })
    //     toast.dismiss();
    //     if (res.data.status) {
    //         toast.info('Beneficiary Added Successfully');
    //         props.history.push('/user/beneficiaries');
    //     }
    //     else {
    //         toast.warning(res.data.message)
    //     }
    // }
    // catch (e) {
    //     if (e?.response?.status === 401) {
    //         props.history.push('/login');
    //     }
    //     toast.dismiss();
    //     toast.error('Error Occured');
    // }
  };
  return (
    <Container page="beneficiary">
      <div className="col-md-12 ben">
        <button className="back-btn" onClick={goBack}>
          <i>&larr;</i>
          Back
        </button>
      </div>
      <h4 className="ben-name">Edit Beneficiary</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validateEditBeneficiary}
        onSubmit={editBeneficiary}
        enableReinitialize={true}
      >
        {(formik) => (
          <Form>
            <div className="form-fields add-ben">
              <FormControl
                control="input"
                type="text"
                name="payment_type"
                label="Payment Type"
                placeholder="Payment Type"
              />
            </div>
            <div className="form-fields add-ben">
              <FormControl
                control="input"
                type="text"
                name="contact_name"
                label="Beneficiary Contact Name"
                placeholder="Beneficiary Contact Name"
              />
              <FormControl
                control="input"
                type="number"
                name="account_number"
                label="Beneficiary Account Number"
                placeholder="Beneficiary Account Number"
              />
            </div>
            <div className="form-fields add-ben">
              <FormControl
                control="textarea"
                type="text"
                name="address"
                label="Beneficiary Address"
                placeholder="Beneficiary Address"
              />
              <FormControl
                control="input"
                type="tel"
                name="phone_number"
                label="Beneficiary Contact Number"
                placeholder="Beneficiary Contact Number"
              />
            </div>
            <div className="form-fields add-ben">
              <FormControl
                control="input"
                type="text"
                name="bank_name"
                label="Receiving Bank Name"
                placeholder="Receiving Bank Name"
              />
              <FormControl
                control="input"
                type="text"
                name="swift_code"
                label="SWIFT code"
                placeholder="SWIFT code"
              />
            </div>
            <div className="form-fields add-ben">
              <FormControl
                control="input"
                type="text"
                name="further_credit"
                label="Further Credit"
                placeholder="Further Credit"
              />

              <FormControl
                control="textarea"
                type="text"
                name="further_credit_address"
                label="Further Credit Corresponding Address"
                placeholder="Further Credit Address"
              />
            </div>
            <div className="form-fields add-ben">
              <FormField title="Bank Country">
                <SelectCountry
                  value={beneficiary?.bank_country}
                  onChange={(e) => {
                    setBankCountry(e.target.value);
                  }}
                />
              </FormField>
            </div>
            <div className="form-fields add-ben">
              <LargeButton type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? (
                  <CircularProgress
                    size={6}
                    isIndeterminate
                    color="green.300"
                  />
                ) : (
                  "Submit"
                )}
              </LargeButton>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
export default EditBeneficiary;
