import React, { useState } from "react";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";

const PAGES = { dashboard: Dashboard, transactions: Transactions, insights: Insights };

const App = () => {
  const [page, setPage] = useState("dashboard");
  const PageComponent = PAGES[page];

  return (
    <AppProvider>
      <Layout page={page} setPage={setPage}>
        <PageComponent />
      </Layout>
    </AppProvider>
  );
};

export default App;