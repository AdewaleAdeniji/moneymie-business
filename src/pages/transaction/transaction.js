import { Badge } from "@chakra-ui/layout";

const getStatus = (status) => {
  switch (status) {
    case "fund":
      return <div className="transaction-status in-flow">&#43;</div>;
    case "inflow":
      return <div className="transaction-status in-flow">&rarr;</div>;
    case "outflow":
      return <div className="transaction-status out-flow">&larr;</div>;
    default:
      return <div className="transaction-status out-flow">&larr;</div>;
  }
};
export const Transaction = ({
  description,
  status,
  transactionDate,
  amount,
  onClick,
  transaction
}) => {
  return (
    <div className="transaction" onClick={onClick} transaction={transaction}>
      <div className="transaction-details">
        {getStatus(status)}
        <div className="transaction-detail">
          <h6 className="transaction-desc">{description}</h6>
          <div className="transaction-date">{transactionDate}</div>
        </div>
      </div>
      <div className="transaction-amount">${amount}<br /><Badge colorScheme={status === 'SUCCESS' ? 'green' : 'purple'}>{status}</Badge></div>
    </div>
  );
};
