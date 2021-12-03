import React, { Component } from "react";
import { loggedIn } from "../../components/auth";
import { getUser } from "../../components/api/dashboard/api";
import { Loader } from "../../components/loader";
import { Container } from "../../components/container";
import './beneficiary.css';
import { Link } from "react-router-dom";
import { Transaction } from "../transaction/transaction";

export default class Beneficiaries extends Component {
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
      <Container page="dashboard">
        <Loader show={this.state.showloader} text={this.state.loaderText} />
        <div className="welcome-message"></div>
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
        <div className="col-md-12">
            <div className="col-title">
            Beneficiaries list
            </div>
            <button className="add-ben">
                Add Beneficiaries
            </button>
        </div>
        
        <div className="beneficiary-list">
           
            {/* <table className="ben-list">
                <thead>
                    <tr>
                        <th>
                            Type
                        </th>
                        <th>
                            Beneficiary Name
                        </th>
                        <th>
                            Account number
                        </th>
                        <th>
                            Beneficiary Address
                        </th>
                        <th>
                            Beneficiary Account Name
                        </th>
                        <th>
                            Beneficiary Contact Name
                        </th>
                        <th>
                            Beneficiary Contact Number
                        </th>
                        <th>
                            Rec Bank Name
                        </th>
                        <th>
                            Swift/BIC code
                        </th>
                    </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Beneficiary Contact Number</td>
                    <td>Beneficiary Contact Number</td>
                    <td>Beneficiary Contact Number</td>
                    <td>Beneficiary Contact Number</td>
                    <td>Beneficiary Contact Number</td>
                    <td>Beneficiary Contact Number</td>
                    <td>Beneficiary Contact Number</td>
                    <td>Beneficiary Contact Number</td>
                    <td>Beneficiary Contact Number</td>
                    <td>Beneficiary Contact Number</td>
                  </tr>
                </tbody>
            </table>
           */}
           <section>
          <div className="transactions-title">
            <div className="trx type">Type</div>
            <div className="trx">Beneficiary Name</div>
            <div className="trx">Beneficiary Address</div>
            <div className="trx">Beneficiary Account Number</div>
            <div className="trx">Beneficiary Contact Number</div>
            <div className="trx">Rec Bank Name</div>
            <div className="trx">Rec Bank Name</div>
            <div className="trx">Swift/BIC Code</div>
            <div className="trx">
            </div>
          </div>
          
          <div className="transactions-body">

          <div className="beneficiary">
            <div className="trx type">Domestic</div>
            <div className="trx">Adeniji Bengalee</div>
            <div className="trx">No 3 wole crescent mag....</div>
            <div className="trx">Bangalee Smith</div>
            <div className="trx">09594848818</div>
            <div className="trx">09594848818</div>
            <div className="trx">Chase bank</div>
            <div className="trx">1348585828</div>
            <div className="trx">
              <Link to="/user/beneficiary/45">View</Link>
            </div>
          </div>
          <div className="beneficiary">
            <div className="trx type">Domestic</div>
            <div className="trx">Adeniji Bengalee</div>
            <div className="trx">No 3 wole crescent mag....</div>
            <div className="trx">Bangalee Smith</div>
            <div className="trx">09594848818</div>
            <div className="trx">09594848818</div>
            <div className="trx">Chase bank</div>
            <div className="trx">1348585828</div>
            <div className="trx">
              <Link to="/user/beneficiary/45">View</Link>
            </div>
          </div>
          <div className="beneficiary">
            <div className="trx type">Domestic</div>
            <div className="trx">Adeniji Bengalee</div>
            <div className="trx">No 3 wole crescent mag....</div>
            <div className="trx">Bangalee Smith</div>
            <div className="trx">09594848818</div>
            <div className="trx">09594848818</div>
            <div className="trx">Chase bank</div>
            <div className="trx">1348585828</div>
            <div className="trx">
            <Link to="/user/beneficiary/45">View</Link>
            </div>
          </div>
          
            
          </div>
           </section>
        </div>
      </Container>
    );
  }
}
