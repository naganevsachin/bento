import Navigation from "@/components/Navigation";
import SubmitRecipe from "@/components/SubmitRecipe";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Croissant } from "lucide-react";
import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";

const HomePage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const handlePageChange = (_page: string, path: string) => {
    navigate(path);
  };

  return (
    <div className="relative mt-10">
      <div className="px-5 pb-24">
        <p className="text-4xl font-semibold">
          Knowing <br /> what you eat!
        </p>
        <p className="text-sm font-medium text-muted-foreground mt-3">
          Based on the last meal you cooked the <br /> nutritional information
          is displayed here
        </p>
        <div className="grid grid-cols-2 mt-6 gap-4">
          <Card className="flex flex-col gap-4">
            <p className="text-primary font-medium text-sm">Avg calories</p>
            <div className="flex gap-1 items-baseline">
              <p className="text-2xl font-bold text-popover-foreground">300</p>
              <p className="text-secondary-foreground text-base">kcal</p>
            </div>
          </Card>
          <Card className="flex flex-col gap-4">
            <p className="text-primary font-medium text-sm">Avg fats</p>
            <div className="flex gap-1 items-baseline">
              <p className="text-2xl font-bold text-popover-foreground">5</p>
              <p className="text-secondary-foreground text-base">grams</p>
            </div>
          </Card>
          <Card className="flex flex-col gap-4">
            <p className="text-primary font-medium text-sm">Avg protein</p>
            <div className="flex gap-1 items-baseline">
              <p className="text-2xl font-bold text-popover-foreground">35</p>
              <p className="text-secondary-foreground text-base">grams</p>
            </div>
          </Card>
          <Card className="flex flex-col gap-4">
            <p className="text-primary font-medium text-sm">Avg carbs</p>
            <div className="flex gap-1 items-baseline">
              <p className="text-2xl font-bold text-popover-foreground">55</p>
              <p className="text-secondary-foreground text-base">grams</p>
            </div>
          </Card>
        </div>
        <Alert className="mt-6 flex gap-6 bg-secondary border-none">
          <div className="mt-1">
            <Croissant className="text-primary h-6 w-6" />
          </div>
          <div>
            <AlertTitle className="text-lg font-semibold text-card-foreground">
              Have a new recipe in mind?
            </AlertTitle>
            <AlertDescription className="mt-1 text-secondary-foreground text-sm mb-2">
              Submit your recipe. They would be added to the list after review.
            </AlertDescription>
            <SubmitRecipe />
          </div>
        </Alert>
        <Button
          className="text-sm font-medium mt-6 w-full"
          onClick={() => handlePageChange("cook", "/cook")}
        >
          Cook your next batch
        </Button>
      </div>
      <Navigation />
    </div>
  );
};

export default HomePage;
