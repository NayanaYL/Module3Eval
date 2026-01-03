import{BrowserRouter,Routes,Route} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import UpdateRestaurant from "./pages/UpdateRestaurant";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
        />
        <Route
          path="/admin/restaturants/update/:id"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
        />
        <Route
        path="/customers/dashboard"
        element={
          <ProtectedRoute allowedRole="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
        />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
