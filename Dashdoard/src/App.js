import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./page/Admin/Dashbroad";
import Products from "./page/Admin/Products";
import Orders from "./page/Admin/Orders";
import Users from "./page/Admin/Users";
import Reports from "./page/Admin/Reports";
import Settings from "./page/Admin/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
