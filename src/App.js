
import './App.css';
import { ChakraProvider } from "@chakra-ui/react";
import { store } from './redux/store'
import { Provider} from 'react-redux'
import { Route, BrowserRouter as Router } from 'react-router-dom';

import './components/components.css';
import './components/mobile.css';
import './pages/dashboard/dashboard.css';
import './pages/transaction/transaction.css';

import {Login} from './pages/onboarding/login';
import { CreateAccount } from './pages/onboarding/Register';
import { ConfirmEmail } from './pages/onboarding/confirmEmail';
import { CompanyInfo } from './pages/onboarding/companyInfo';
import { OwnerInfo } from './pages/onboarding/ownerInfo';
import { ReviewInfo } from './pages/onboarding/review';
import { AwaitVerify } from './pages/onboarding/awaitVerification';
import { ForgotPassword } from './pages/onboarding/forgotPassword';
import { EmailOTP } from './pages/onboarding/emailOtp';
import { ResetPassword } from './pages/onboarding/newPassword';
import Transactions from './pages/transaction/transactions';
import Beneficiaries from './pages/beneficiary';
import Beneficiary from './pages/beneficiary/beneficiary';
//user dashboard

import Dashboard from './pages/dashboard';
function App(props) {
  //console.log(data);
  
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Route exact path='/' component={Login}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={CreateAccount}/>
          <Route path='/confirm-email' component={ConfirmEmail}/>
          <Route path='/company-info' component={CompanyInfo}/>
          <Route path='/owner-info' component={OwnerInfo}/>
          <Route path="/review" component={ReviewInfo}/>
          <Route path="/await-verify" component={AwaitVerify}/>
          <Route path="/forgot-password" component={ForgotPassword}/>
          <Route path='/email-code' component={EmailOTP}/>
          <Route path='/reset-password' component={ResetPassword}/>
          <Route path="/user/dashboard" component={Dashboard}/>
          <Route path="/user/transactions" component={Transactions}/>
          <Route path="/user/beneficiaries" component={Beneficiaries}/>
          <Route path="/user/beneficiary" component={Beneficiary}/>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}


export default App;
