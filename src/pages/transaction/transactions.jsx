import React, { Component } from 'react';
// import { loggedIn } from '../../components/auth';
// import { getUser } from '../../components/api/dashboard/api';
import { Loader } from '../../components/loader';
import { Container } from '../../components/container';
// import { BalanceCard } from '../../components/card/card';
// import { Link } from 'react-router-dom';
import { Tag, TagLabel } from '@chakra-ui/react';
// import { Transaction } from '../transaction/transaction';
// import axios from 'axios';
import { getUserTransactions } from './data';
import { toast } from 'react-toastify';
import moment from 'moment';
import { formatCurrency } from '../../utils/formatCurrency';
export default class Transactions extends Component {
    constructor(props) {
        super();
        this.state = {
            loggedin: false,
            data: {},
            loaderText: '',
            showloader: true,
            transactions: []
        }
    }
    componentDidMount() {
        document.title = "Transactions";
        this.getTransactions();
    }
    async getTransactions() {
        this.setState({ loaderText: 'Fetching transactions' })

        try {
            const transactions = await getUserTransactions();
            this.setState({ transactions: transactions.data.data });
        }
        catch (e) {
            if (e?.response?.status === 401) {
                this.props.history.push("/login");
            }
            toast.error('Request Failed');
        }
        finally {
            this.setState({ showloader: false });
        }

        //setTransactions(transactions.res)
    }
    viewReceipt = (transaction) => {
        this.props.history.push("/transaction/details", { transaction });
    };

    renderStatus = (status) => {
        switch (status) {
            case "PENDING":
                return <Tag
                    size="sm"
                    borderRadius='full'
                    variant='solid'
                    colorScheme='orange'
                >
                    <TagLabel>{status}</TagLabel>
                </Tag>
            case "SUCCESS":
                return <Tag
                    size="sm"
                    borderRadius='full'
                    variant='solid'
                    colorScheme='green'
                >
                    <TagLabel>{status}</TagLabel>
                </Tag>
            case "FAILED":
                return <Tag
                    size="sm"
                    borderRadius='full'
                    variant='solid'
                    colorScheme='red'
                >
                    <TagLabel>{status}</TagLabel>
                </Tag>
            default:
                return <div>{status}</div>
        }
    }
    render() {
        return (
            // <Container page='transactions'>
            //     <Loader show={this.state.showloader} text={this.state.loaderText} />

            //     <div>
            //         <div className="col-title">Beneficiaries list</div>
            //         <div className="transactions-body">
            //             {
            //                 this.state.transactions.map((transaction) => {
            //                     console.log(transaction)
            //                     return (
            //                         // <Transaction
            //                         //     transaction={JSON.stringify(transaction)}
            //                         //     onClick={this.viewReceipt}
            //                         //     status={transaction.status}
            //                         //     transactionDate={moment(transaction.createdAt).format("MMM Do YY")}
            //                         //     description={transaction.Beneficiary.contact_name + ' - ' + transaction.Beneficiary.bank_name}
            //                         //     amount={transaction.amount}
            //                         // />
            //                         <div className="beneficiary">
            //                             {/* <div className="trx type">{beneficiary.payment_type}</div>
            //                             <div className="trx">{beneficiary.contact_name}</div>
            //                             <div className="trx">{beneficiary.contact_name}</div>
            //                             <div className="trx">{beneficiary.contact_name}</div>
            //                             <div className="trx">{beneficiary.contact_name}</div>
            //                             <div className="trx">{beneficiary.phone_number}</div>
            //                             <div className="trx action">
            //                                 Pay Beneficiary
            //                                 <Menu>
            //                                     <MenuButton className="btn-more">
            //                                         <i className="fa fa-ellipsis-v"></i>
            //                                     </MenuButton>
            //                                     <MenuList>
            //                                         <MenuItem
            //                                             onClick={() =>
            //                                                 viewBeneficiary(JSON.stringify(beneficiary))
            //                                             }
            //                                             beneficiary={JSON.stringify(beneficiary)}
            //                                         >
            //                                             <i className="fa fa-eye"></i> &nbsp; View
            //                                         </MenuItem>
            //                                         <MenuItem
            //                                             onClick={() => deleteBeneficiary(beneficiary.id)}
            //                                         >
            //                                             <i className="fa fa-trash"></i> &nbsp; Delete
            //                                         </MenuItem>
            //                                     </MenuList>
            //                                 </Menu>
            //                             </div> */}
            //                         </div>
            //                     )
            //                 })
            //             }
            //         </div>
            //     </div>
            // </Container>
            <Container page="beneficiaries">
                <Loader show={this.state.showloader} text={this.state.loaderText} />


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
                    <div className="col-title">All Transactions</div>
                </div>

                <div className="beneficiary-list">
                    <section>
                        <div className="transactions-title">
                            {/* <div className="trx type">Type</div> */}
                            <div className="trx">Date</div>
                            <div className="trx">Transaction ID</div>
                            <div className="trx">Amount</div>
                            <div className="trx">Beneficiary Name</div>
                            <div className="trx">Account Number</div>
                            <div className="trx">Status</div>
                            <div className="trx">Actions</div>
                        </div>

                        <div className="transactions-body">
                            {this.state.transactions.map((transaction) => {
                                return (
                                    <>
                                        <div className="beneficiary">
                                            <div className="trx">{moment(transaction.createdAt).format('Do MMM YYYY')}</div>
                                            <div className="trx">{transaction.transactionId}</div>
                                            <div className="trx amount">{formatCurrency(transaction.amount)}</div>
                                            <div className="trx">{transaction.Beneficiary?.contact_name}</div>
                                            <div className="trx">{transaction.Beneficiary?.account_number}</div>

                                            <div className="trx">
                                                {this.renderStatus(transaction.status)}
                                            </div>
                                            <div className="trx action" onClick={() => this.viewReceipt(transaction)}>
                                                View Receipt
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </Container>
        )
    }
}