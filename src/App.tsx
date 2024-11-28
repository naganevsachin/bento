// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "@/pages/LoginPage";
import MealSelectionPage from "@/pages/MealSelectionPage";
import { UserProvider } from "./lib/context/user";
import HomePage from "@/pages/HomePage";
import KitchenPage from "@/pages/KitchenPage";
import ViewRecipePage from "@/pages/ViewRecipePage";
import AccountPage from "@/pages/AccountPage";
import ScrollToTop from "@/lib/ScrollToTop";
import PrivateRoute from "@/components/PrivateRoute";
import ResponsiveLayout from "./components/ResponsiveLayout";

function App() {
  return (
    <Router>
      <UserProvider>
        <ResponsiveLayout />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={<PrivateRoute element={<HomePage />} />}
          />
          <Route
            path="/cook"
            element={<PrivateRoute element={<MealSelectionPage />} />}
          />
          <Route
            path="/kitchen"
            element={<PrivateRoute element={<KitchenPage />} />}
          />
          <Route
            path="/recipe/:recipeId"
            element={<PrivateRoute element={<ViewRecipePage />} />}
          />
          <Route
            path="/account"
            element={<PrivateRoute element={<AccountPage />} />}
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
