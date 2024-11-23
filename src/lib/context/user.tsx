import { ID, Models } from "appwrite";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { account } from "../appwrite";
import { useNavigate } from "react-router-dom";

// Define the type for user context
interface UserContextType {
  current: Models.User<{}> | null;
  userId: string;
  isAuthenticated: boolean;
  sendOTP: (email: string) => Promise<void>;
  loginWithOTP: (userId: string, secret: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Initialize the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the UserContext
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

// UserProvider component
interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<Models.User<{}> | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const handlePageChange = (_page: string, path: string) => {
    navigate(path);
  };

  // Send OTP to user's email
  async function sendOTP(email: string): Promise<void> {
    try {
      const response = await account.createEmailToken(ID.unique(), email);
      setUserId(response.userId);
    } catch (err) {
      alert(`FAILED: ${err}`);
      console.error("Failed to send OTP:", err);
    }
  }

  // Login using OTP with userId and secret
  async function loginWithOTP(userId: string, secret: string): Promise<void> {
    try {
      await account.createSession(userId, secret);

      // After session is created, fetch user details
      const loggedInUser = await account.get();
      setUser(loggedInUser);
      setUserId(loggedInUser.$id);
      setIsAuthenticated(true);

      // Redirect to the home page
      window.location.replace("/cook");
    } catch (err) {
      console.error("Login with OTP failed:", err);
    }
  }

  // Logout user
  async function logout() {
    try {
      await account.deleteSession("current");
      setUser(null);
      setUserId("");
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  // Initialize user session on component mount
  async function init() {
    try {
      const loggedIn = await account.get();
      if (!loggedIn) {
        handlePageChange("login_page", "/");
      }
      setUser(loggedIn);
      setIsAuthenticated(true);
      setUserId(loggedIn.$id);
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false); // Set loading to false when initialization is complete
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{
        current: user,
        sendOTP,
        loginWithOTP,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      {!isLoading && children}{" "}
      {/* Only render children when loading is complete */}
    </UserContext.Provider>
  );
}
