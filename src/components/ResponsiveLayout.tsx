import React, { useState, useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"; // Update with your shadcn Alert path
import { MessageCircleWarning } from "lucide-react";

const ResponsiveLayout: React.FC = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 450); // Adjust the threshold as needed
    };

    checkScreenSize(); // Check on component mount
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize); // Cleanup on unmount
    };
  }, []);

  return (
    <>
      {isLargeScreen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <Alert className="mt-6 flex max-w-md mx-auto gap-6 bg-secondary border-none">
            <div className="mt-1">
              <MessageCircleWarning className="text-primary h-6 w-6" />
            </div>
            <div>
              <AlertTitle className="text-lg font-semibold text-card-foreground">
                Mobile-Optimized
              </AlertTitle>
              <AlertDescription className="mt-1 text-secondary-foreground text-sm mb-2">
                For the best experience, please switch to a mobile device or
                portrait mode.
              </AlertDescription>
            </div>
          </Alert>
        </div>
      )}
    </>
  );
};

export default ResponsiveLayout;
