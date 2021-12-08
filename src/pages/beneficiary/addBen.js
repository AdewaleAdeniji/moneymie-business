import React from "react";
import { Container } from "../../components/container";
import { FormField } from "../../components/Form/form";

const AddBeneficiary = (props) => {
  const goBack = () => {
    props.history.goBack();
  };
  return (
    <Container page="beneficiary">
      <div className="col-md-12 ben">
        <button className="back-btn" onClick={goBack}>
          <i>&larr;</i>
          Back
        </button>
      </div>
      <h4 className="ben-name">Payment Type</h4>
      <div className="form-fields add-ben">
        <FormField title="Work Email Address">
          <input
            type="email"
            className="input-field"
            placeholder="Work Email Address"
            required
          />
        </FormField>
      </div>
    </Container>
  );
};
export default AddBeneficiary;
