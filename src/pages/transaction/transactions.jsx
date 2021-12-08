import React,{Component} from 'react';
import { loggedIn } from '../../components/auth';
import { getUser } from '../../components/api/dashboard/api';
import { Loader } from '../../components/loader';
import { Container } from '../../components/container';
import { BalanceCard } from '../../components/card/card';
import { Link } from 'react-router-dom';
import { Transaction } from '../transaction/transaction';

export default class Transactions extends Component{
    constructor(props){
        super();
        this.state = {
            loggedin: false,
            data:{},
            loaderText:'',
            showloader:true
        }
    }
    componentDidMount(){
        // if(!loggedIn()){
        //     this.props.history.push('/login');   
        // }
        // get user balances
        this.getUserBalance();        
    }
    getUserBalance(){
        this.setState({loaderText:'Fetching transactions'})
        getUser()
        .then(response=>response.json())
        .then((data)=>{
            this.setState({loggedin:true,data:data,showloader:false});
        })
        .catch((err)=>{

        })
    }
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
                            
                        </div>
                    </div>
                    <div className="transactions-body">
                        <Transaction 
                            status='inflow' 
                            transactionDate='March 22' 
                            description='You received money from Cecelia Awogbu' 
                            amount='$5000'
                        />
                        <Transaction 
                            status='outflow' 
                            transactionDate='March 22' 
                            description='You sent money to Bangalee' 
                            amount='$5000'
                        />
                        <Transaction 
                            status='failed' 
                            transactionDate='March 22' 
                            description='You sent money to Bangalee' 
                            amount='$5000'
                        />
                        <Transaction 
                            status='fund' 
                            transactionDate='March 22' 
                            description='You funded via card' 
                            amount='$5000'
                        />
                        <Transaction 
                            status='inflow' 
                            transactionDate='March 22' 
                            description='You received money from Cecelia Awogbu' 
                            amount='$5000'
                        />
                        <Transaction 
                            status='outflow' 
                            transactionDate='March 22' 
                            description='You sent money to Bangalee' 
                            amount='$5000'
                        />
                        <Transaction 
                            status='failed' 
                            transactionDate='March 22' 
                            description='You sent money to Bangalee' 
                            amount='$5000'
                        />
                        <Transaction 
                            status='fund' 
                            transactionDate='March 22' 
                            description='You funded via card' 
                            amount='$5000'
                        />
                        
                    </div>
                </div>
            </Container>
        )
    }
}