import { FC, ReactElement } from "react";
import { Button } from "./ui/button";
import AlertImg from "@/assets/alert.png";

const PrivacyPolicy: FC<{
  isTermsConditionModalOpen: boolean;
  onTermsConditionModalClose: () => void;
}> = ({
  isTermsConditionModalOpen,
  onTermsConditionModalClose,
}): ReactElement => {
  if (!isTermsConditionModalOpen) return <></>;

  return (
    <div className="px-5 bg-background mt-6">
      <div className="animate-slide-up">
        <p className="text-3xl font-semibold py-1">Terms and conditions</p>
        <img
          src={AlertImg}
          className="h-[148px] w-full rounded-md bg-cover mt-6"
          alt=""
        />
        <p className="mt-4 text-sm">
          Lorem ipsum dolor sit amet consectetur. Mauris eu arcu et amet cum
          nulla. Faucibus felis odio id sagittis nunc proin ac quis condimentum.
          Ullamcorper proin aliquam venenatis sit amet quam. Aliquet tellus vel
          pharetra tellus in a mattis est.
        </p>
      </div>
      <div className="fixed bottom-0 left-0 w-full py-6 px-5 bg-background">
        <Button
          onClick={onTermsConditionModalClose}
          className="w-full font-medium text-sm"
        >
          Go back
        </Button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
