import React, { Component } from "react";
import { loggedIn } from "../../components/auth";
import { getUser } from "../../components/api/dashboard/api";
import { Loader } from "../../components/loader";
import { Container } from "../../components/container";

import { BalanceCard } from "../../components/card/card";
import { Link } from "react-router-dom";
import { Transaction } from "../transaction/transaction";

export default class Dashboard extends Component {
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
    // if (!loggedIn()) {
    //   this.props.history.push("/login");
    // }
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
        <div className="welcome-message">Hi Oluwaferanmi</div>
       
        <div className="user-balances">
          <BalanceCard classNames="blue-bg wallet-balance">
            <div className="balance-title">Wallet Balance</div>
            <div className="balance">
              $4,500<span>.00</span>
            </div>
          </BalanceCard>
          <BalanceCard classNames="action-card">
            <div className="action-title">ACTIONS</div>
            <div className="action-body">
              <div className="action">
                <button className="add-fund">&#43;</button>
                Fund Wallet
              </div>
              <div className="action">
                <button className="send-money">&rarr;</button>
                Send Money
              </div>
            </div>
          </BalanceCard>
        </div>
        <div className="transactions-box">
          <div className="transactions-title">
            <div className="trx">LATEST TRANSACTIONS</div>
            <div className="trx">
              <Link to="/user/transaction">View all</Link>
            </div>
          </div>
          <div className="transactions-body">
            <Transaction
              status="inflow"
              transactionDate="March 22"
              description="You received money from Cecelia Awogbu"
              amount="$5000"
            />
            
          </div>
        </div>
      </Container>
    );
  }
}
