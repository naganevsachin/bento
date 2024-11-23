import { FC, ReactElement, useEffect, useState } from "react";
import Login from "@/components/Login";
import Verification from "@/components/Verification";
import { useUser } from "@/lib/context/user";
import { useNavigate } from "react-router-dom";

const LoginPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const handlePageChange = (_page: string, path: string) => {
    navigate(path);
  };
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useUser();

  useEffect(() => {
    try {
      if (user.isAuthenticated) {
        handlePageChange("home", "/home");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <div className="px-5 h-dvh flex  items-center flex-col relative justify-around overscroll-y-none">
          {user.userId ? <Verification /> : <Login />}
          <p className=" my-8 text-center text-xs font-normal text-muted-foreground w-4/5">
            By clicking continue, you agree to our terms of <br />
            service and Privacy policy
          </p>
        </div>
      )}
    </>
  );
};

export default LoginPage;
