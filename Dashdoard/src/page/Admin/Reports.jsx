import AdminLayout from "../../component/Adminlayout";
import { useState } from "react";

export default function Reports() {
  const [reports] = useState([
    {
      id: 1,
      title: "Báo Cáo Doanh Thu Tháng 5",
      type: "Doanh Thu",
      date: "2024-05-08",
      status: "Hoàn thành"
    },
    {
      id: 2,
      title: "Báo Cáo Bán Hàng Hàng Tuần",
      type: "Bán Hàng",
      date: "2024-05-07",
      status: "Hoàn thành"
    },
    {
      id: 3,
      title: "Báo Cáo Khách Hàng Mới",
      type: "Khách Hàng",
      date: "2024-05-06",
      status: "Hoàn thành"
    },
    {
      id: 4,
      title: "Báo Cáo Tồn Kho",
      type: "Kho Hàng",
      date: "2024-05-05",
      status: "Đang xử lý"
    }
  ]);

  const [reportMetrics] = useState([
    { label: "Tổng Doanh Thu", value: "2.5 Tỷ", icon: "💰", color: "#10B981" },
    { label: "Tổng Đơn Hàng", value: "1,248", icon: "📊", color: "#3B82F6" },
    { label: "Tổng Khách Hàng", value: "856", icon: "👥", color: "#F59E0B" },
    { label: "Tỷ Lệ Chuyển Đổi", value: "8.5%", icon: "📈", color: "#8B5CF6" }
  ]);

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="section-header">
          <h1 className="section-title">Báo Cáo & Thống Kê</h1>
          <button type="button" className="export-btn">📥 Xuất Báo Cáo</button>
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
            <h3 className="card-title">Doanh Thu Hàng Tháng</h3>
            <div className="chart-placeholder">
              <div className="bar-chart">
                <div className="bar" style={{ height: "60%" }}></div>
                <div className="bar" style={{ height: "75%" }}></div>
                <div className="bar" style={{ height: "90%" }}></div>
                <div className="bar" style={{ height: "70%" }}></div>
                <div className="bar" style={{ height: "80%" }}></div>
                <div className="bar" style={{ height: "95%" }}></div>
              </div>
              <p className="chart-label">Tháng 1 - Tháng 6</p>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title">Phân Bố Danh Mục</h3>
            <div className="pie-chart">
              <div className="pie-sector" style={{ width: "30%", backgroundColor: "#3B82F6" }}></div>
              <div className="pie-sector" style={{ width: "25%", backgroundColor: "#10B981" }}></div>
              <div className="pie-sector" style={{ width: "20%", backgroundColor: "#F59E0B" }}></div>
              <div className="pie-sector" style={{ width: "15%", backgroundColor: "#8B5CF6" }}></div>
              <div className="pie-sector" style={{ width: "10%", backgroundColor: "#EF4444" }}></div>
            </div>
            <div className="legend-grid">
              <p className="legend"><span style={{ background: "#3B82F6" }}></span> Điện Tử: 30%</p>
              <p className="legend"><span style={{ background: "#10B981" }}></span> Điện Thoại: 25%</p>
              <p className="legend"><span style={{ background: "#F59E0B" }}></span> Áo Quần: 20%</p>
              <p className="legend"><span style={{ background: "#8B5CF6" }}></span> Phụ Kiện: 15%</p>
              <p className="legend"><span style={{ background: "#EF4444" }}></span> Khác: 10%</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Các Báo Cáo Gần Đây</h3>
          <div className="reports-list">
            {reports.map((report) => (
              <div key={report.id} className="report-item">
                <div className="report-info">
                  <h4 className="report-title">{report.title}</h4>
                  <p className="report-meta">
                    <span className="report-type">{report.type}</span>
                    <span className="report-date">{report.date}</span>
                  </p>
                </div>
                <div className="report-actions">
                  <span
                    className="report-status"
                    style={{
                      backgroundColor: report.status === "Hoàn thành" ? "#DCFCE7" : "#FEF3C7",
                      color: report.status === "Hoàn thành" ? "#15803D" : "#92400E"
                    }}
                  >
                    {report.status}
                  </span>
                  <button type="button" className="download-btn">📥 Tải</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="summary-card">
          <h3 className="card-title">Tóm Tắt Hiệu Suất</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Tăng Trưởng Doanh Thu</span>
              <span className="summary-value" style={{ color: "#10B981" }}>+24.5%</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Tăng Trưởng Khách Hàng</span>
              <span className="summary-value" style={{ color: "#3B82F6" }}>+15.2%</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Tỷ Lệ Giữ Chân Khách</span>
              <span className="summary-value" style={{ color: "#F59E0B" }}>87.3%</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Đơn Hàng Bình Quân</span>
              <span className="summary-value" style={{ color: "#8B5CF6" }}>1.95M</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

