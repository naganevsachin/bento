import { FC, ReactElement } from "react";

const Loader: FC = (): ReactElement => {
  let circleCommonClasses = "h-4 w-4 bg-primary rounded-full";

  return (
    <div className="flex justify-center items-center h-dvh gap-2">
      <div className={`${circleCommonClasses} animate-bounce`}></div>
      <div className={`${circleCommonClasses} animate-bounce delay-100`}></div>
      <div className={`${circleCommonClasses} animate-bounce delay-200`}></div>
    </div>
  );
};

export default Loader;
