import AdminLayout from "../../component/Adminlayout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Reports() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu đơn hàng", err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const completedOrders = orders.filter(o => o.status === "Hoàn thành");
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.amount, 0);

  const getMonthlyRevenue = () => {
    const revenueByMonth = new Array(6).fill(0);
    const now = new Date();
    completedOrders.forEach(o => {
      const date = new Date(o.createdAt);
      const monthDiff = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
      if (monthDiff >= 0 && monthDiff < 6) {
        revenueByMonth[5 - monthDiff] += o.amount;
      }
    });
    return revenueByMonth;
  };

  const monthlyRevenue = getMonthlyRevenue();
  const maxRevenue = Math.max(...monthlyRevenue, 1);

  const reportMetrics = [
    { label: "Tổng Doanh Thu", value: `${(totalRevenue / 1000000).toFixed(1)}M đ`, icon: "💰", color: "#10B981" },
    { label: "Tổng Đơn Hàng", value: completedOrders.length, icon: "📊", color: "#3B82F6" },
    { label: "Đơn Đang Xử Lý", value: orders.filter(o => o.status === "Đang xử lý").length, icon: "📦", color: "#F59E0B" },
    { label: "Đơn Chờ", value: orders.filter(o => o.status === "Chờ xác nhận").length, icon: "🕒", color: "#8B5CF6" }
  ];

  if (loading) return <AdminLayout><div className="page-container">Đang tải báo cáo...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="section-header">
          <h1 className="section-title">Báo Cáo & Thống Kê</h1>
        </div>

        <div className="metrics-grid">
          {reportMetrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <div className="metric-icon" style={{ color: metric.color }}>
                {metric.icon}
              </div>
              <p className="metric-label">{metric.label}</p>
              <h2 className="metric-value">{metric.value}</h2>
            </div>
          ))}
        </div>

        <div className="charts-grid">
          <div className="card">
            <h3 className="card-title">Doanh Thu 6 Tháng Gần Đây</h3>
            <div className="chart-placeholder">
              <div className="bar-chart">
                {monthlyRevenue.map((rev, i) => (
                  <div key={i} className="bar" style={{ height: `${(rev / maxRevenue) * 100}%` }} title={`${rev.toLocaleString()} đ`}></div>
                ))}
              </div>
              <p className="chart-label">6 tháng gần nhất</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

