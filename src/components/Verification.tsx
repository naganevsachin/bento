import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FC, ReactElement } from "react";
import Bento from "@/assets/bento.png";
import Google from "@/assets/google.png";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useUser } from "@/lib/context/user";

const Verification: FC = (): ReactElement => {
  const otpInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const user = useUser();

  // OTP validation function
  const validateOTP = () => {
    if (otpInputRef.current) {
      const otpValue = otpInputRef.current.value.trim();

      // Check if OTP has exactly 6 digits and is numeric
      if (!/^\d{6}$/.test(otpValue)) {
        setError("Please enter a valid 6-digit OTP.");
      } else {
        setError(null); // Clear error if valid
        user.loginWithOTP(user.userId, otpValue);
        // Continue with verification logic
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <img src={Bento} width={166} height={147} alt="" />
      <p className="text-center text-sm font-normal text-muted-foreground w-11/12 mt-6 mb-6">
        A verification code has been sent to your email. <br /> Please check all
        inboxes including spam.
      </p>
      <InputOTP maxLength={6} ref={otpInputRef}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      <Button
        className="w-full mt-6 font-semibold text-sm"
        onClick={validateOTP}
      >
        Verify & Login
      </Button>
      <Button
        className="w-full mt-3 font-semibold text-sm leading-5 flex gap-2 mb-6"
        variant="outline"
      >
        Resend OTP
      </Button>
      {/* <div className="inline-flex items-center justify-center w-full my-4">
        <hr className="w-full h-0.5 bg-slate-200 border-0" />
        <span className="absolute px-3 text-xs font-normal text-slate-500 -translate-x-1/2 bg-white left-1/2 ">
          OR CONTINUE WITH
        </span>
      </div>
      <Button
        className="w-full mt-6 font-semibold text-sm leading-5 flex gap-2"
        variant="outline"
      >
        <img src={Google} width={16} height={16} alt="" />
        <p>Google</p>
      </Button> */}
    </div>
  );
};

export default Verification;
