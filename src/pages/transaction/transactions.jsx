import React,{Component} from 'react';
import { loggedIn } from '../../components/auth';
import { getUser } from '../../components/api/dashboard/api';
import { Loader } from '../../components/loader';
import { Container } from '../../components/container';
import { BalanceCard } from '../../components/card/card';
import { Link } from 'react-router-dom';
import { Transaction } from '../transaction/transaction';
import axios from 'axios';
import { getUserTransactions } from './data';
import { toast } from 'react-toastify';
import moment from 'moment';
export default class Transactions extends Component{
    constructor(props){
        super();
        this.state = {
            loggedin: false,
            data:{},
            loaderText:'',
            showloader:true,
            transactions:[]
        }
    }
    componentDidMount(){
        this.getTransactions();
    }
    async getTransactions(){
        this.setState({loaderText:'Fetching transactions'})
        
        try {
            const transactions = await getUserTransactions();  
            this.setState({transactions:transactions.data.data});
        }
        catch(e){
            if (e?.response?.status === 401) {
                this.props.history.push("/login");
            }
            toast.error('Request Failed');
        }
        finally {
            this.setState({showloader:false});
        }

        //setTransactions(transactions.res)
    }
    viewReceipt = (e) => {
        if(e.target===e.currentTarget){
        const transaction = e.target.getAttribute("transaction");
        this.props.history.push("/transaction/details", { transaction });
        }
    };
    render(){
        return (
            <Container page='transactions'>  
                <Loader show={this.state.showloader} text={this.state.loaderText}/>
               <div className="transactions-box">
                    <div className="transactions-title">
                        <div className="trx">
                            Your Transactions
                        </div>
                        <div className="trx">
                            {/* <button className="btn btn-primary">Export CSV</button> */}
                        </div>
                    </div>
                    <div className="transactions-body">
                        {
                            this.state.transactions.map((transaction)=>{
                                return (
                                    <Transaction 
                                    transaction={JSON.stringify(transaction)}
                                        onClick={this.viewReceipt}
                                        status={transaction.status} 
                                        transactionDate={moment(transaction.createdAt).format("MMM Do YY")}
                                        description={transaction.Beneficiary.contact_name + ' - '  + transaction.Beneficiary.bank_name} 
                                        amount={transaction.amount}
                                    />
                                )
                            })
                        }
                        
                        
                    </div>
                </div>
            </Container>
        )
    }
}