import StatCard from "../components/dashboard/StatCard";
import ChartSection from "../components/dashboard/ChartSection";
import MarketTable from "../components/dashboard/MarketTable";
import OrdersTable from "../components/dashboard/OrdersTable";

export default function Dashboard() {
  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Crypto Dashboard</h1>
      <div className="grid grid-cols-5 gap-4 mb-6">
        <StatCard title="Total Balance" value="$53,252" change="+6.15%" />
        <StatCard title="USD/BTC" value="$23,077" change="+2.1%" />
        <StatCard title="LTC/BTC" value="0.00256" change="+1.2%" />
        <StatCard title="ETH/BTC" value="0.07334" change="+0.8%" />
        <StatCard title="XMR/BTC" value="0.00685" change="-1.3%" />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-2">
          <ChartSection />
        </div>
        <MarketTable />
      </div>
      <OrdersTable />
    </div>
  );
}