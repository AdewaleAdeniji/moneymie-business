import React, { Component } from "react";
import { loggedIn } from "../../components/auth";
import { getUser } from "../../components/api/dashboard/api";
import { Loader } from "../../components/loader";
import { Container } from "../../components/container";
import './beneficiary.css';
import Pay from "../pay";
export default class Beneficiary extends Component {
  constructor(props) {
    super();
    this.state = {
      loggedin: false,
      data: {},
      loaderText: "",
      showloader: false,
      beneficiary:JSON.parse(props.location.state.beneficiary),
      showPay:false
    };
    this.goBack = this.goBack.bind(this);
    this.togglePay = this.togglePay.bind(this);
    this.editBen = this.editBen.bind(this);
  }
  componentDidMount() {
    
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
  editBen(){
      this.props.history.push('/beneficiary/edit/'+this.state.beneficiary.id);
  }
  render() {
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
                <button>
                    Delete
                </button>
                <button onClick={this.editBen}>
                    Edit
                </button>
                <button className="pay" onClick={this.togglePay}>
                    Pay User
                </button>
            </div>
        </div>
        <h4 className="ben-name">{this.state.beneficiary.contact_name}</h4>
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
                            <p>{this.state.beneficiary.contact_name}</p>
                        </div>
                    </div>
                    <div className="details">
                        <div className="detail">
                            <h5>Phone Number</h5>
                            <p>{this.state.beneficiary.phone_number}</p>
                        </div>
                        <div className="detail">
                            <h5>Beneficiary Contact name</h5>
                            <p>{this.state.beneficiary.contact_name}</p>
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
                            <p>{this.state.beneficiary.contact_name}</p>
                        </div>
                        <div className="detail">
                            <h5>Phone Number</h5>
                            <p>{this.state.beneficiary.phone_number}</p>
                        </div>
                    </div>
                    <div className="details">
                        <div className="detail">
                            <h5>Address</h5>
                            <p>{this.state.beneficiary.address}</p>
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
                                <p>{this.state.beneficiary.bank_name}</p>
                            </div>
                            <div className="detail">
                                <h5>RECEIVING BANK ADDRESS</h5>
                                <p>{this.state.beneficiary.address}</p>
                            </div>
                        </div>
                        <div className="details">
                            <div className="detail">
                                <h5>Swift Code</h5>
                                <p>{this.state.beneficiary.swift_code}</p>
                            </div>
                            <div className="detail">
                                <h5>Account Number</h5>
                                <p>{this.state.beneficiary.account_number}</p>
                            </div>
                        </div>
                        <div className="details">
                            <div className="detail">
                                <h5>Futher Credit</h5>
                                <p>{this.state.beneficiary.further_credit}</p>
                            </div>
                            <div className="detail">
                                <h5>Further Credit Address</h5>
                                <p>{this.state.beneficiary.further_credit_address}</p>
                            </div>
                        </div>
                    </div>    
                </div>
        </div>
       </Container>
    );
  }
}
