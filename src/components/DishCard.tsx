import { Drumstick } from "lucide-react";
import { FC, ReactElement } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Meal from "@/assets/meal.png";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const DishCard: FC = (): ReactElement => {
  const navigate = useNavigate();
  const handlePageChange = (_page: string, path: string) => {
    navigate(path);
  };

  return (
    <Card className="shrink-0 w-[90%]">
      <div className="relative w-full">
        <img src={Meal} className="h-[182px] w-full rounded-md bg-cover" />
        <Badge className="w-fit absolute top-3 left-4">Indian</Badge>
        <p className="absolute bottom-3 left-4 text-primary-foreground font-semibold text-xs">
          4 MEALS
        </p>
      </div>
      <div className="mt-3 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg text-foreground">Palak Paneer</p>
          <div className="flex gap-1 items-center">
            <Drumstick className="h-4 w-4 text-primary" />
            <p className="text-secondary-foreground text-sm font-semibold text-center">
              60 MINUTES
            </p>
          </div>
        </div>
        <p className="text-muted-foreground">
          A flavourful, marinated cottage cheese cooked with spinach, known for
          its vibrant colour and leafy, spiced taste.
        </p>
        <Button
          variant="outline"
          className="font-medium text-secondary-foreground"
          onClick={() =>
            handlePageChange("recipe", `/recipe/673ad33f00276ea1bcbd`)
          }
        >
          View Recipe
        </Button>
      </div>
    </Card>
  );
};

export default DishCard;
