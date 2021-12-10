import React, { useEffect, useState } from "react";
import { Loader } from "../../components/loader";
import { Container } from "../../components/container";
import "../beneficiary/beneficiary.css";
import { GetLoggedInUser } from "../../utils/user";

const AllTransactions  = (props) => {
  const [showloader, setShowLoader] = useState(false);
  const [loaderText, setLoaderText] = useState("");
  const [user, setUser] = useState(GetLoggedInUser());
  const [firstRun, setFirstRun] = useState(true);
  const [beneficiarieslist, setBeneficiaries] = useState([]);
  useEffect(() => {
    if (firstRun) {
      getUser();
      setFirstRun(false);
    }
    document.title = "Beneficiaries";
  });
  const getUser = async () => {

  };
  const viewReceipt = (e) => {
    const transaction = e.target.getAttribute("transaction");
    props.history.push("/transaction/details", { transaction });
  };
  return (
    <Container page="dashboard">
      <Loader show={showloader} text={loaderText} />

      <div className="welcome-message">All Transactions</div>

      <div className="beneficiary-list">
        <section>
          <div className="transactions-title">
            <div className="trx type">Type</div>
            <div className="trx">Beneficiary Name</div>
            <div className="trx">Beneficiary Address</div>
            <div className="trx">Beneficiary Contact Number</div>
            <div className="trx"></div>
          </div>

          <div className="transactions-body">
                <div className="beneficiary">
                  <div className="trx type">Domestic</div>
                  <div className="trx">Hello</div>
                  
                </div>
          </div>
        </section>
      </div>
    </Container>
  );
};
export default AllTransactions;
