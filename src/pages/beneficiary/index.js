import React, { useEffect, useState } from "react";
import { Loader } from "../../components/loader";
import { Container } from "../../components/container";
import "./beneficiary.css";
import { Button } from "@chakra-ui/button";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { GetLoggedInUser } from "../../utils/user";
import { beneficiaries } from "./data";
import { showToast } from "../../utils/toast";
import { useStatus } from "../../utils/user";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { deleteBen } from "./data";
import {toast} from 'react-toastify';

const Beneficiaries = (props) => {
  const [showloader, setShowLoader] = useState(true);
  const [loaderText, setLoaderText] = useState("");
  const [pending, setPending] = useState(false);
  const [user, setUser] = useState(GetLoggedInUser());
  const [firstRun, setFirstRun] = useState(true);
  const [beneficiarieslist, setBeneficiaries] = useState([]);
  useEffect(() => {
    if (firstRun) {
      getUser();
      setFirstRun(false);
    }
    document.title = "Beneficiaries";
  });
  const getUser = async () => {
    const data = typeof user == "string" ? JSON.parse(user) : user;
    setPending(data.status === "PENDING");
    try {
      const beneficiariesdata = await beneficiaries(data.company_id);
      const { rows } = beneficiariesdata?.data?.data;
      setBeneficiaries(rows);
    } catch (e) {
      if (e?.response?.status === 401) {
        props.history.push("/login");
      } else {
        showToast("error", "Error Occured while fetching beneficiaries");
      }
    } finally {
      setShowLoader(false);
    }
  };
  const viewBeneficiary = (beneficiary) => {
    //const ben = e.target.getAttribute("beneficiary");
    props.history.push("/user/beneficiary/45", { beneficiary: beneficiary });
  };
  const addBen = () => {
    props.history.push("/beneficiary/create");
  };
  const deleteBeneficiary = (id) => {
    Swal.fire({
        text: 'Are you sure you want to delete this beneficiary?',
        footer: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3A3391',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
            toast.loading('Deleting Beneficiary');
            try {
                const deleteben = await deleteBen(id);
                toast.dismiss();
                toast.success('Beneficiary Deleted Successfully');
                getUser();
            }
            catch(e){
                console.log(e);
                toast.dismiss();
                toast.warning('Failed to delete Beneficiary');
            }
          
        }
      })
  }
  return (
    <Container page="dashboard">
      <Loader show={showloader} text={loaderText} />

      {/* <div className="welcome-message">Hi {}</div> */}

      {/* {pending && (
        <div className="col-md-12 note">
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
        </div>
      )} */}

      <div className="col-md-12">
        <div className="col-title">Beneficiaries list</div>
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
            <div className="trx"></div>
          </div>

          <div className="transactions-body">
            {beneficiarieslist.map((beneficiary) => {
              return (
                <div className="beneficiary">
                  <div className="trx type">{beneficiary.payment_type}</div>
                  <div className="trx">{beneficiary.contact_name}</div>
                  <div className="trx">{beneficiary.address}</div>
                  <div className="trx">{beneficiary.phone_number}</div>
                  <div className="trx float-center">
                    <Menu>
                      <MenuButton as={Button} className="btn-more">
                        <i className="fa fa-ellipsis-v"></i>
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          onClick={()=>viewBeneficiary(JSON.stringify(beneficiary))}
                          beneficiary={JSON.stringify(beneficiary)}
                        >
                         <i className="fa fa-eye"></i> &nbsp; View
                        </MenuItem>
                        <MenuItem onClick={()=>deleteBeneficiary(beneficiary.id)}>
                          <i className='fa fa-trash'></i> &nbsp; Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    {/* <Link to="/user/beneficiary/45" className="float-center">View</Link> */}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </Container>
  );
};
export default Beneficiaries;
