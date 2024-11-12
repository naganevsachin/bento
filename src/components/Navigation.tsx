import { Cookie, House, Smile } from "lucide-react";
import { FC, ReactElement } from "react";
import { Button } from "./ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation: FC = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveTab = () => {
    switch (location.pathname) {
      case "/home":
        return "home";
      case "/kitchen":
        return "kitchen";
      case "/account":
        return "account";
      default:
        return "";
    }
  };

  const handleTabChange = (_tab: string, path: string) => {
    navigate(path);
  };

  const activeTab = getActiveTab();

  const iconStyle = (tab: string) =>
    tab === activeTab
      ? "text-primary bg-accent"
      : "text-foreground bg-background";

  return (
    <div className="fixed bottom-0 left-0 w-full py-4 px-6 flex justify-around shadow-[0_-3px_11.7px_0_rgba(0,0,0,0.07)] bg-background">
      <Button
        onClick={() => handleTabChange("home", "/home")}
        className={`${iconStyle("home")} p-3`}
      >
        <House />
      </Button>
      <Button
        onClick={() => handleTabChange("kitchen", "/kitchen")}
        className={`${iconStyle("kitchen")} p-3`}
      >
        <Cookie />
      </Button>
      <Button
        onClick={() => handleTabChange("account", "/account")}
        className={`${iconStyle("account")} p-3`}
      >
        <Smile />
      </Button>
    </div>
  );
};

export default Navigation;
