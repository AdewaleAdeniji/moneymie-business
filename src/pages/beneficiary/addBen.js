import React,{ useState } from "react";
import { toast } from "react-toastify";
import { LargeButton } from "../../components/buttons/buttons";
import { Container } from "../../components/container";
import { FormField } from "../../components/Form/form";
import { addBen } from "./data";
import SelectCountry from "../../components/Form/SelectCountry";
import { GetLoggedInUser } from "../../utils/user";
const AddBeneficiary = (props) => {
  const [contact_name,setContactName] = useState("");
  const [address,setAddress] = useState("");
  const [payment_type,setPaymentType] = useState("");
  const [account_number,setAccountNumber] = useState("");
  const [further_credit,setFurtherCredit] = useState("");
  const [further_credit_address,setFurtherCreditAddress] = useState("");
  const [swiftCode,setSwiftCode] = useState("");
  const [bank_name,setBankName] = useState("");
  const [phone_number,setPhoneNumber] = useState("");
  const [bank_country,setBankCountry] = useState("");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [user] = useState(GetLoggedInUser());
  const [bank_city,setBankCity] = useState('');
  const [routingNumberShow,setRoutingShow] = useState(false);
  const [ibanShow,setIbanShow] = useState(false);
  const [routingNumber,setRoutingNumber] = useState('');
  const [iban,setIban] = useState('');
  const goBack = () => {
    props.history.goBack();
  };
  const addBene = async () => {
    try {
      const payload = {
        contact_name: contact_name,
        address: address,
        payment_type: payment_type,
        account_number: account_number,
        further_credit: further_credit,
        further_credit_address: further_credit_address,
        swift_code: swiftCode,
        bank_name: bank_name,
        phone_number: phone_number,
        bank_swift: swiftCode,
        bank_country: bank_country,
        bank_city:bank_city,
        company_id: user.company_id,
        name: name,
        email: email,
      };
      if(routingNumberShow){
        payload.routing_number = routingNumber;
      }
      if(ibanShow){
        payload.iban = iban;
      }
     const values = Object.values(payload);
     var error = false;
     await values.forEach((value)=>{
       if(value===''&&!error){
          toast.warn('Please fill all empty fields');
          error = true;
       }
     })
     if(!error){
      toast.loading("Adding Beneficiary");
      const res = await addBen(payload);
      toast.dismiss();
      if (res.data.status) {
        toast.info("Beneficiary Added Successfully");
        props.history.push("/user/beneficiaries");
      } else {
        toast.warning(res.data.message);
      }
    }
    } catch (e) {
      if (e?.response?.status === 401) {
        props.history.push("/login");
      }
      toast.dismiss();
      toast.error("Error Occured");
    }
  };
  const countryChange = (country) => {
    const iban_countries = ('Andorra,Austria,Azerbaijan,Belgium,Bulgaria,Croatia,Denmark,Estonia,Finland,France,Germany,Gibraltar,Greece,Guatemala,Holy See (Vatican City State),Hungary,Iceland,Ireland,Israel,Italy,Jordan,Latvia,Liechtenstein,Lithuania,Luxembourg,Malta,Monaco,Netherlands,Norway,Poland,Portugal,Romania,San Marino,Slovakia,Slovenia,Spain,Sweden,Switzerland,Turkey,United Arab Emirates,United Kingdom,Virgin Islands (British)').split(',');
    const routing_countries = ('Angola,Anguilla,Argentina,Australia,Benin,Bermuda,Brazil,Burkina Faso,Cambodia,Cameroon,Canada,Cayman Islands,Chad,Chile,Guam,Guernsey,Hong Kong,India,Indonesia,Isle Of Man,Japan,Jersey,Kenya,Korea,Madagascar,Malawi,Malaysia,Mexico,Mozambique,New Zealand,Niger,Peru,Philippines,Puerto Rico,Senegal,Singapore,South Africa,Taiwan,Tanzania,Thailand,United States Outlying Islands,Uzbekistan,Viet Nam,U.S. Virgin Islands').split(',');
    if(country==='United States'){
      setRoutingShow(true);
    }
    else if(iban_countries.indexOf(country)>-1){
      setIbanShow(true);
      setRoutingShow(false);
    }
    else if(routing_countries.indexOf(country)>-1){
      setRoutingShow(true);
      setIbanShow(false);
    }
    else {
      setRoutingShow(true);
      setIbanShow(false);
    }
    console.log(iban_countries,iban_countries.indexOf(country),routing_countries.indexOf(country));
    setBankCountry(country);
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
          <select
            className="input-field"
            placeholder="Payment Type"
            onChange={(e) => {
              setPaymentType(e.target.value);
            }}
            required
          >
            <option></option>
            <option value="Domestic">Domestic</option>
            <option value="International">International</option>
          </select>
        </FormField>

        <FormField title="Bank Country">
          <SelectCountry
            value={bank_country}
            onChange={(e) => {
              countryChange(e.target.value);
            }}
          />
        </FormField>
      </div>

      <div className="form-fields add-ben">
        <FormField title="Beneficiary Email Address">
          <input
            type="text"
            className="input-field"
            placeholder="Beneficiary Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </FormField>
        <FormField title="Beneficiary Name">
          <input
            type="text"
            className="input-field"
            placeholder="Beneficiary Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
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
            onChange={(e) => {
              setContactName(e.target.value);
            }}
            required
          />
        </FormField>
        <FormField title="Beneficiary Contact Number">
          <input
            type="text"
            className="input-field"
            placeholder="Beneficiary Contact Number"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            required
          />
        </FormField>
        
      </div>
      <div className="form-fields add-ben">
      <FormField title="Receving Bank Name">
          <input
            type="text"
            className="input-field"
            placeholder="Receving Bank Name"
            onChange={(e) => {
              setBankName(e.target.value);
            }}
            required
          />
        </FormField>
        
        <FormField title="Receiving Bank Address">
          <input
            type="text"
            className="input-field"
            placeholder="Receving Bank Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
          />
        </FormField>
      </div>
      <div className="form-fields add-ben">
      <FormField title="Bank City">
          <input
            type="text"
            className="input-field"
            placeholder="Bank City"
            onChange={(e) => {
              setBankCity(e.target.value);
            }}
            required
          />
        </FormField>
        
        {routingNumberShow&&<FormField title="Routing Number">
          <input
            type="text"
            className="input-field"
            placeholder="Routing Number"
            onChange={(e) => {
              setRoutingNumber(e.target.value);
            }}
            required
          />
        </FormField>
      } 
      {ibanShow&&<FormField title="IBAN number">
          <input
            type="text"
            className="input-field"
            placeholder="IBAN number"
            onChange={(e) => {
              setIban(e.target.value);
            }}
            required
          />
        </FormField>
      } 
      </div>
      <div className="form-fields add-ben">
        
        <FormField title="Account Number">
          <input
            type="text"
            className="input-field"
            placeholder="Account Number"
            onChange={(e) => {
              setAccountNumber(e.target.value);
            }}
            required
          />
        </FormField>
        <FormField title="Swift Code">
          <input
            type="text"
            className="input-field"
            placeholder="Swift Code"
            onChange={(e) => {
              setSwiftCode(e.target.value);
            }}
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
            onChange={(e) => {
              setFurtherCredit(e.target.value);
            }}
            required
          />
        </FormField>
        <FormField title="Further Credit Address">
          <input
            type="text"
            className="input-field"
            placeholder="Further Credit Address"
            onChange={(e) => {
              setFurtherCreditAddress(e.target.value);
            }}
            required
          />
        </FormField>
      </div>
      <div className="form-fields add-ben"></div>
      <div className="form-fields add-ben">
        <LargeButton onClick={addBene}>Add Beneficiary</LargeButton>
      </div>
    </Container>
  );
};
export default AddBeneficiary;
