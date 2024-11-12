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

function App() {
  return (
    <UserProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cook" element={<MealSelectionPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/kitchen" element={<KitchenPage />} />
          <Route path="/recipe/:recipeId" element={<ViewRecipePage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
