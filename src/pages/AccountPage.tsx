import Navigation from "@/components/Navigation";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import SubmitRecipe from "@/components/SubmitRecipe";
import TermsCondition from "@/components/TermsCondition";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Coins,
  Croissant,
  LogOut,
  MonitorSmartphone,
  Scale,
  Users,
} from "lucide-react";
import { FC, ReactElement, useState } from "react";

const AccountPage: FC = (): ReactElement => {
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const openPrivacyModal = () => setPrivacyModalOpen(true);
  const closePrivacyModal = () => setPrivacyModalOpen(false);
  const [isTermsConditionModalOpen, setTermsConditionModalOpen] =
    useState(false);
  const openTermsConditionModal = () => setTermsConditionModalOpen(true);
  const closeTermsConditionModal = () => setTermsConditionModalOpen(false);

  return (
    <>
      <PrivacyPolicy
        isPrivacyModalOpen={isPrivacyModalOpen}
        onPrivacyModalClose={closePrivacyModal}
      />

      <TermsCondition
        isTermsConditionModalOpen={isTermsConditionModalOpen}
        onTermsConditionModalClose={closeTermsConditionModal}
      />

      {!isPrivacyModalOpen && !isTermsConditionModalOpen ? (
        <div className="relative mt-6">
          <div className="px-5 pb-24">
            <p className="text-3xl font-semibold">My account</p>
            <Alert className="mt-6 flex gap-6 bg-secondary border-none">
              <div className="mt-1">
                <Croissant className="text-primary h-6 w-6" />
              </div>
              <div>
                <AlertTitle className="text-lg font-semibold text-card-foreground">
                  Have a new recipe in mind?
                </AlertTitle>
                <AlertDescription className="mt-1 text-secondary-foreground text-sm mb-2">
                  Submit your recipe. They would be added to the list after
                  review.
                </AlertDescription>
                <SubmitRecipe />
              </div>
            </Alert>
            <Alert className="mt-4 flex gap-6 bg-secondary border-none">
              <div className="mt-1">
                <Coins className="text-primary h-6 w-6" />
              </div>
              <div>
                <AlertTitle className="text-lg font-semibold text-card-foreground">
                  Fuel our progress
                </AlertTitle>
                <AlertDescription className="mt-1 text-secondary-foreground text-sm mb-2">
                  If you enjoyed using the app, consider making a donation to
                  help us continue improving and offering more great features.
                </AlertDescription>
                <Button
                  variant="link"
                  className="text-primary font-medium text-sm underline px-0 py-[6px]"
                >
                  Buy me a coffee
                </Button>
              </div>
            </Alert>
            <div className="mt-4 divide-y border rounded-md">
              <div>
                <Button
                  variant="outline"
                  className="flex gap-2 w-full justify-start py-4 border-none"
                  disabled={true}
                >
                  <MonitorSmartphone className="h-4 w-4 text-secondary-foreground" />
                  <Label className="text-sm font-medium text-foreground">
                    Other Apps
                  </Label>
                </Button>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="flex gap-2 w-full justify-start py-4 border-none"
                  onClick={openTermsConditionModal}
                >
                  <Users className="h-4 w-4 text-secondary-foreground" />
                  <Label className="text-sm font-medium text-foreground">
                    Terms and conditions
                  </Label>
                </Button>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="flex gap-2 w-full justify-start py-4 border-none"
                  onClick={openPrivacyModal}
                >
                  <Scale className="h-4 w-4 text-secondary-foreground" />
                  <Label className="text-sm font-medium text-foreground">
                    Privacy policy
                  </Label>
                </Button>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="flex gap-2 w-full justify-start py-4 border-none"
                >
                  <LogOut className="h-4 w-4 text-destructive" />
                  <Label className="text-sm font-medium text-destructive">
                    Logout
                  </Label>
                </Button>
              </div>
            </div>
          </div>
          <Navigation />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AccountPage;
