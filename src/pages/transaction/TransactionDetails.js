import React, { Component } from "react";
import { getUser } from "../../components/api/dashboard/api";
import { Loader } from "../../components/loader";
import { Container } from "../../components/container";
import "../beneficiary/beneficiary.css";
import { Badge } from "@chakra-ui/layout";
import moment from "moment";
export default class TransactionDetails extends Component {
  constructor(props) {
    //   console.log();
    super();
    this.state = {
      loggedin: false,
      data: {},
      loaderText: "",
      showloader: false,
      transaction: JSON.parse(props.location.state.transaction),
      showPay: false,
    };
    this.goBack = this.goBack.bind(this);
  }
  componentDidMount() {
    console.log(this.state.transaction);
  }
  goBack() {
    this.props.history.goBack();
  }
  viewBeneficiary = (e) => {
    const ben = e.target.getAttribute("beneficiary");
    this.props.history.push("/user/beneficiary/45", { beneficiary: ben });
  };
  render() {
    return (
      <Container page="transaction">
        <Loader show={this.state.showloader} text={this.state.loaderText} />

        <div className="col-md-12 ben">
          <button className="back-btn" onClick={this.goBack}>
            <i>&larr;</i>
            Back
          </button>
        </div>
        <h4 className="ben-name">Transaction Details</h4>
        <div className="col-md-12">
          <div className="box-col">
            <div className="ben-box">
              <h4>Transaction Details</h4>
              <div className="details">
                <div className="detail">
                  <h1>${this.state.transaction.amount}</h1>
                </div>
                <div className="detail">
                  <Badge
                    colorScheme={
                      this.state.transaction.status === "success"
                        ? "green"
                        : "purple"
                    }
                  >
                    {this.state.transaction.status}
                  </Badge>
                </div>
              </div>
              <div className="details">
                <div className="detail">
                  <h5>Paid To</h5>
                  <p>{this.state.transaction.Beneficiary.contact_name}</p>
                </div>
                <div className="detail">
                  <h5>Transaction ID</h5>
                  <p>{this.state.transactionId}</p>
                </div>
              </div>
              <div className="details">
                <div className="detail">
                  <h5>Beneficiary Account Number</h5>
                  <p>{this.state.transaction.Beneficiary.account_number}</p>
                </div>
                <div className="detail">
                  <h5>Currency</h5>
                  <p>{this.state.transaction.currency}</p>
                </div>
              </div>
              <div className="details">
                <div className="detail">
                  <h5>Date</h5>
                  <p>
                    {moment(this.state.transaction.createdAt).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </p>
                </div>
              </div>
              <div className="details">
                <a
                  href=""
                  onClick={this.viewBeneficiary}
                  beneficiary={JSON.stringify(
                    this.state.transaction.Beneficiary
                  )}
                >
                  View Beneficiary Full Details <i className='fa fa-angle-right'></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
