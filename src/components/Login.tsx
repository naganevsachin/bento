import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC, ReactElement, useRef, useState } from "react";
import Bento from "@/assets/bento.png";
import Google from "@/assets/google.png";
import { useUser } from "@/lib/context/user";

const Login: FC = (): ReactElement => {
  const userEmailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const user = useUser();

  // Email validation function
  const validateEmail = (email: string): boolean => {
    // Basic email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const focusInput = () => {
    if (userEmailRef.current) {
      const email = userEmailRef.current.value.trim();

      if (!email) {
        setError("Email cannot be empty.");
      } else if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
      } else {
        setError(null); // Clear error if validation passes
        user.sendOTP(email);
      }
    } else {
      console.log("Input is not yet assigned");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <img src={Bento} width={166} height={147} alt="" />
      <Input
        className={`mt-12 font-normal text-xs leading-5 border ${
          error ? "border-red-500" : "border-slate-300"
        }`}
        type="email"
        placeholder="name@example.com"
        ref={userEmailRef}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      <Button
        className="w-full mt-3 font-semibold text-sm mb-6"
        onClick={() => focusInput()}
      >
        Sign In with Email
      </Button>
      {/* <div className="inline-flex items-center justify-center w-full my-4">
        <hr className="w-full h-0.5 bg-slate-200 border-0" />
        <span className="absolute px-3 text-xs font-normal text-slate-500 -translate-x-1/2 bg-white left-1/2 ">
          OR CONTINUE WITH
        </span>
      </div>
      <Button
        className="w-full mt-6 border-slate-300 font-semibold text-sm leading-5 flex gap-2"
        variant="outline"
      >
        <img src={Google} width={16} height={16} alt="" />
        <p>Google</p>
      </Button> */}
    </div>
  );
};

export default Login;
