import React from "react";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionList from "../components/transactions/TransactionList";

const Transactions = () => (
  <>
    <TransactionFilters />
    <TransactionList />
  </>
);

export default Transactions;