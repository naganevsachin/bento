import { ID, Models } from "appwrite";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { account } from "../appwrite";

// Define the type for user context
interface UserContextType {
  current: Models.User<{}> | null;
  userId: string;
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

  // Send OTP to user's email
  async function sendOTP(email: string): Promise<void> {
    try {
      const response = await account.createEmailToken(ID.unique(), email);
      console.log("OTP sent to email", response);
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
      console.log(loggedInUser);

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
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  // Initialize user session on component mount
  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
      console.log("USER:", loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{ current: user, sendOTP, loginWithOTP, logout, userId }}
    >
      {children}
    </UserContext.Provider>
  );
}
