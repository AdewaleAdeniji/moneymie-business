import React, { useEffect, useState } from "react";
import { Loader } from "../../components/loader";
import { Container } from "../../components/container";
import './beneficiary.css';
import { Button } from "@chakra-ui/button";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import { GetLoggedInUser } from "../../utils/user";
import { beneficiaries } from "./data";
import { showToast } from '../../utils/toast';
import { useStatus } from "../../utils/user";
import { Link } from "react-router-dom";
const Beneficiaries = (props) => {
  const [ showloader, setShowLoader] = useState(true);
  const [loaderText, setLoaderText] = useState('');
  const [pending, setPending] = useState(false);
  const [user, setUser] = useState(GetLoggedInUser());
  const [firstRun, setFirstRun] = useState(true);
  const [beneficiarieslist, setBeneficiaries] = useState([{
    "id": 1,
    "contact_name": "bolu",
    "address": "lagos",
    "phone_number": "0906537371",
    "payment_type": "wire transfer",
    "account_number": "2119177552",
    "further_credit": "next year",
    "further_credit_address": "lagos",
    "swift_code": "65464",
    "bank_name": "sterling",
    "bank_swift": "54322",
    "bank_country": "Nigeria",
    "company_id": 1,
    "createdAt": "2021-12-02T17:02:45.000Z",
    "updatedAt": "2021-12-02T17:02:45.000Z"
}]);
  useEffect(()=>{
    if(firstRun){
      getUser();
      setFirstRun(false);
    }
    document.title = 'Beneficiaries';
  })
  const getUser = async () => {
    const {data} = typeof(user)=='string'?JSON.parse(user):user;
    setPending(data.status==='PENDING');
    
    try {
    const beneficiariesdata = await beneficiaries(data.company_id);
    const {rows} = beneficiariesdata?.data?.data;
    setBeneficiaries(rows);
    }
    catch(e){
      if(e?.response?.status===401){
        props.history.push('/login');
      }
      else {
      showToast("error", 'Error Occured while fetching beneficiaries')
      }
    }
    finally {
      setShowLoader(false);
    }
  }
    const viewBeneficiary = (e) => {
      const ben = e.target.getAttribute("beneficiary");
      props.history.push("/user/beneficiary/45", { beneficiary:ben });
    }
    const addBen = () => {
      props.history.push('/beneficiary/create');
    }
    return (
      <Container page="dashboard">
        <Loader show={showloader} text={loaderText} />
        
        {/* <div className="welcome-message">Hi {}</div> */}
        
        {pending&&<div className="col-md-12 note">
          <div className="light-toast">
            <div className="img-section">
              <img
                className="align-center await-img"
                src="../assets/await.png"
                alt="Awaiting Verification"
              />
            </div>
            <div className="text-section">
              <h4>Verification Pending</h4>
              <h6>
                Your KYC/KYB details has been submitted , please wait while we
                check your details and verify your business account. We will bet
                back to you in 48 hours
              </h6>
            </div>
          </div>
        </div>}

        <div className="col-md-12">
            <div className="col-title">
            Beneficiaries list
            </div>
            <button className="add-ben" onClick={addBen}>
                Add Beneficiaries
            </button>
        </div>
        
        <div className="beneficiary-list">
           
           <section>
          <div className="transactions-title">
            <div className="trx type">Type</div>
            <div className="trx">Beneficiary Name</div>
            <div className="trx">Beneficiary Address</div>
            <div className="trx">Beneficiary Contact Number</div>
            <div className="trx">
            </div>
          </div>
          
          <div className="transactions-body">
          {
            beneficiarieslist.map((beneficiary)=>{
                return (
                  <div className="beneficiary">
                    <div className="trx type">Domestic</div>
                    <div className="trx">{beneficiary.contact_name}</div>
                    <div className="trx">{beneficiary.address}</div>
                    <div className="trx">{beneficiary.phone_number}</div>
                    <div className="trx float-center">
                    <Menu>
                        <MenuButton as={Button} className="btn-more">
                          <i className="fa fa-ellipsis-v"></i>
                        </MenuButton>
                        <MenuList>
                          <MenuItem onClick={viewBeneficiary} beneficiary={JSON.stringify(beneficiary)}>View</MenuItem>
                          <MenuItem>Send Money</MenuItem>
                        </MenuList>
                      </Menu>
                      {/* <Link to="/user/beneficiary/45" className="float-center">View</Link> */}
                    </div>
                  </div>
          
                )
            })
          }
          </div>
           </section>
        </div>
      </Container>
    );
}
export default Beneficiaries;
