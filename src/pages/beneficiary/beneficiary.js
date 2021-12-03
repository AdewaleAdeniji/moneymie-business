import React, { Component } from "react";
import { loggedIn } from "../../components/auth";
import { getUser } from "../../components/api/dashboard/api";
import { Loader } from "../../components/loader";
import { Container } from "../../components/container";
import './beneficiary.css';
import { Link } from "react-router-dom";
import { Transaction } from "../transaction/transaction";

export default class Beneficiary extends Component {
  constructor(props) {
    super();
    this.state = {
      loggedin: false,
      data: {},
      loaderText: "",
      showloader: true,
    };
  }
  componentDidMount() {
    document.title = 'Beneficiaries';
    if (!loggedIn()) {
      this.props.history.push("/login");
    }
    // get user balances
    this.getUserBalance();
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
  render() {
    return (
      <Container page="beneficiary">
        <Loader show={this.state.showloader} text={this.state.loaderText} />
        
        <div className="col-md-12 ben">
            <button className="back-btn">
                <i>&larr;</i>
                Back
            </button>
            <div className="left-aligned">
                <button>
                    Delete
                </button>
                <button>
                    Edit
                </button>
                <button className="pay">
                    Pay User
                </button>
            </div>
        </div>
        <h4 className="ben-name">Awotunde Bengalee</h4>
        <div className="col-md-12">
            <div className="box-col">
                <div className="ben-box">
                    <h4>
                        Contact Details
                    </h4>
                    <div className="details">
                        <div className="detail">
                            <h5>NAME</h5>
                            <p>Domestic Type</p>
                        </div>
                        <div className="detail">
                            <h5>NAME</h5>
                            <p>Domestic Type</p>
                        </div>
                    </div>
                    <div className="details">
                        <div className="detail">
                            <h5>NAME</h5>
                            <p>Domestic Type</p>
                        </div>
                        <div className="detail">
                            <h5>NAME</h5>
                            <p>Domestic Type</p>
                        </div>
                    </div>
                    <div className="details">
                        <div className="detail">
                            <h5>NAME</h5>
                            <p>Domestic Type</p>
                        </div>
                        <div className="detail">
                            <h5>NAME</h5>
                            <p>Domestic Type</p>
                        </div>
                    </div>
                </div>
                
                <div className="ben-box">
                    <h4>
                        Contact Details
                    </h4>
                    <div className="details">
                        <div className="detail">
                            <h5>NAME</h5>
                            <p>Domestic Type</p>
                        </div>
                        <div className="detail">
                            <h5>NAME</h5>
                            <p>Domestic Type</p>
                        </div>
                    </div>
                    <div className="details">
                        <div className="detail">
                            <h5>NAME</h5>
                            <p>Domestic Type</p>
                        </div>
                        <div className="detail">
                            <h5>NAME</h5>
                            <p>Domestic Type</p>
                        </div>
                    </div>
                    <div className="details">
                        <div className="detail">
                            <h5>NAME</h5>
                            <p>Domestic Type</p>
                        </div>
                        <div className="detail">
                            <h5>NAME</h5>
                            <p>Domestic Type</p>
                        </div>
                    </div>
                </div>
                   
            </div>
            <div className="box-col">
                <div className="ben-box">
                        <h4>
                            Contact Details
                        </h4>
                        <div className="details">
                            <div className="detail">
                                <h5>NAME</h5>
                                <p>Domestic Type</p>
                            </div>
                            <div className="detail">
                                <h5>NAME</h5>
                                <p>Domestic Type</p>
                            </div>
                        </div>
                        <div className="details">
                            <div className="detail">
                                <h5>NAME</h5>
                                <p>Domestic Type</p>
                            </div>
                            <div className="detail">
                                <h5>NAME</h5>
                                <p>Domestic Type</p>
                            </div>
                        </div>
                        <div className="details">
                            <div className="detail">
                                <h5>NAME</h5>
                                <p>Domestic Type</p>
                            </div>
                            <div className="detail">
                                <h5>NAME</h5>
                                <p>Domestic Type</p>
                            </div>
                        </div>
                    </div>    
                </div>
        </div>
       </Container>
    );
  }
}
