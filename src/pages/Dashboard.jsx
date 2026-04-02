import React from "react";
import SummaryCards from "../components/dashboard/SummaryCards";
import BalanceTrend from "../components/dashboard/BalanceTrend";
import SpendingBreakdown from "../components/dashboard/SpendingBreakdown";

const Dashboard = () => (
  <>
    <SummaryCards />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <BalanceTrend />
      <SpendingBreakdown />
    </div>
  </>
);

export default Dashboard;