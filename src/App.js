import './App.css';
import { ChakraProvider } from "@chakra-ui/react";
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router } from 'react-router-dom';

import './components/components.css';
import './components/mobile.css';
import './pages/dashboard/dashboard.css';
import './pages/transaction/transaction.css';

import { Login } from './pages/onboarding/login';
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
import { VerifyEmail } from './pages/onboarding/verifyEmail';
import { UpdateCompanyInfo } from './pages/onboarding/UpdateCompanyInfo';

import Dashboard from './pages/dashboard';
import ProtectedRoute from './routes/authProtected';
import AddBeneficiary from './pages/beneficiary/addBen';
import { UpdateKeyContact } from './pages/onboarding/UpdateKeyContact';
import Logout from './pages/onboarding/logout';
import { ToastContainer, toast } from 'react-toastify';
import AllTransactions from './pages/transaction/AllTransactions';
import 'react-toastify/dist/ReactToastify.css';
import TransactionDetails from './pages/transaction/TransactionDetails';
function App(props) {
  //console.log(data);

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={CreateAccount} />
          <Route path='/confirm-email' component={ConfirmEmail} />
          <Route path='/company-info' component={CompanyInfo} />
          <Route path='/owner-info' component={OwnerInfo} />
          <Route path="/review" component={ReviewInfo} />
          <Route path="/await-verify" component={AwaitVerify} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path='/email-code' component={EmailOTP} />
          <Route path='/reset-password' component={ResetPassword} />
          <Route path='/verify-email/:token' component={VerifyEmail} />
          <Route path='/logout' component={Logout}/>
          <ProtectedRoute path="/user/dashboard" component={Dashboard}/>
          <Route path="/user/transactions" component={Transactions}/>
          <ProtectedRoute path="/user/beneficiaries" component={Beneficiaries}/>
          <ProtectedRoute path="/user/beneficiary/:id" component={Beneficiary}/>
          <ProtectedRoute path="/beneficiary/create" component={AddBeneficiary}/>
          <ProtectedRoute path="/transactions" component={AllTransactions}/>
          <ProtectedRoute path="/transaction/details" component={TransactionDetails}/>
          <Route path='/update-company-info' component={UpdateCompanyInfo} />
          <Route path='/update-key-contact' component={UpdateKeyContact} />
        </Router>
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  );
}


export default App;
