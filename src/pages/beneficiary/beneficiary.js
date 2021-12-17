import React, { Component } from "react";
import { loggedIn } from "../../components/auth";
import { getUser } from "../../components/api/dashboard/api";
import { Loader } from "../../components/loader";
import { Container } from "../../components/container";
import './beneficiary.css';
import Pay from "../pay";
import Swal from 'sweetalert2'
import { deleteBen } from "./data";
import { toast } from "react-toastify";
export default class Beneficiary extends Component {
  constructor(props) {
    super();
    this.state = {
      loggedin: false,
      data: {},
      loaderText: "",
      showloader: false,
      beneficiary:{},
      showPay:false
    };
    this.goBack = this.goBack.bind(this);
    this.togglePay = this.togglePay.bind(this);
    this.deleteBeneficiary  =  this.deleteBeneficiary.bind(this);
  }
  componentDidMount() {
    if(this.props?.location?.state?.beneficiary){
        this.setState({beneficiary:JSON.parse(this.props?.location?.state?.beneficiary)});
    }
    else {
        //maybe make an api call to get the beneficiary
        this.props.history.push('/user/beneficiaries');
    }
    return;
  }
  getUserBalance() {
    this.setState({ loaderText: "Fetching Profile..." });
    getUser()
      .then((response) => response.json())
      .then((data) => {
        this.setState({ loggedin: true, data: data, showloader: false });
      })
      .catch((err) => {});
  }
  goBack(){
      this.props.history.goBack();
  }
  togglePay(){
    this.setState({showPay:!this.state.showPay})
  }
  deleteBeneficiary(){
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
                const deleteben = await deleteBen(this.state.beneficiary.id);
                toast.dismiss();
                toast.success('Beneficiary Deleted Successfully');
                this.goBack();
            }
            catch(e){
                toast.dismiss();
                toast.warning('Failed to delete Beneficiary');
            }
          
        }
      })
  }
  render() {
    const {beneficiary} = this.state;
    return (
      <Container page="beneficiary">
          <Pay show={this.state.showPay} onClose={this.togglePay} beneficiary={this.state.beneficiary}/>
        <Loader show={this.state.showloader} text={this.state.loaderText} />
        
        <div className="col-md-12 ben">
            <button className="back-btn" onClick={this.goBack}>
                <i>&larr;</i>
                Back
            </button>
            <div className="left-aligned">
                <button onClick={this.deleteBeneficiary}>
                    Delete
                </button>
                <button>
                    Edit
                </button>
                <button className="pay" onClick={this.togglePay}>
                    Pay User
                </button>
            </div>
        </div>
        <h4 className="ben-name">{beneficiary.contact_name}</h4>
        <div className="col-md-12">
            <div className="box-col">

                <div className="ben-box">
                    <h4>
                        Beneficiary Details
                    </h4>
                    <div className="details">
                        <div className="detail">
                            <h5>Type</h5>
                            <p>Domestic Type</p>
                        </div>
                        <div className="detail">
                            <h5>NAME</h5>
                            <p>{beneficiary.contact_name}</p>
                        </div>
                    </div>
                    <div className="details">
                        <div className="detail">
                            <h5>Phone Number</h5>
                            <p>{beneficiary.phone_number}</p>
                        </div>
                        <div className="detail">
                            <h5>Beneficiary Contact name</h5>
                            <p>{beneficiary.contact_name}</p>
                        </div>
                    </div>
                    
                </div>
                
                <div className="ben-box">
                    <h4>
                        Contact Details
                    </h4>
                    <div className="details">
                        <div className="detail">
                            <h5>Contact name</h5>
                            <p>{beneficiary.contact_name}</p>
                        </div>
                        <div className="detail">
                            <h5>Phone Number</h5>
                            <p>{beneficiary.phone_number}</p>
                        </div>
                    </div>
                    <div className="details">
                        <div className="detail">
                            <h5>Address</h5>
                            <p>{beneficiary.address}</p>
                        </div>
                    </div>
                    
                </div>
                   
            </div>
            <div className="box-col">
                <div className="ben-box">
                        <h4>
                            Bank Details
                        </h4>
                        <div className="details">
                            <div className="detail">
                                <h5>RECEIVING BANK NAME</h5>
                                <p>{beneficiary.bank_name}</p>
                            </div>
                            <div className="detail">
                                <h5>RECEIVING BANK ADDRESS</h5>
                                <p>{beneficiary.address}</p>
                            </div>
                        </div>
                        <div className="details">
                            <div className="detail">
                                <h5>Swift Code</h5>
                                <p>{beneficiary.swift_code}</p>
                            </div>
                            <div className="detail">
                                <h5>Account Number</h5>
                                <p>{beneficiary.account_number}</p>
                            </div>
                        </div>
                        <div className="details">
                            <div className="detail">
                                <h5>Futher Credit</h5>
                                <p>{beneficiary.further_credit}</p>
                            </div>
                            <div className="detail">
                                <h5>Further Credit Address</h5>
                                <p>{beneficiary.further_credit_address}</p>
                            </div>
                        </div>
                    </div>    
                </div>
        </div>
       </Container>
    );
  }
}
