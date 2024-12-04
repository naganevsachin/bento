import { Drumstick } from "lucide-react";
import { FC, ReactElement } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { IDishCard } from "@/lib/interfaces";

const DishCard: FC<IDishCard> = ({
  $id,
  name,
  description,
  cookTime,
  category,
  imageUrl,
  NumberOfServings,
}): ReactElement => {
  const navigate = useNavigate();

  const handlePageChange = (_page: string, path: string) => {
    navigate(path);
  };

  return (
    <Card className="shrink-0 w-[90%]">
      <div className="relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="h-[182px] w-full rounded-md bg-cover"
        />
        <Badge className="w-fit absolute top-3 left-4">{category}</Badge>
        <div className="absolute bottom-0 w-full pt-6 bg-custom-gradient">
          <p className="absolute bottom-3 left-4 text-primary-foreground font-semibold text-xs">
            {NumberOfServings} SERVINGS
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg text-foreground">{name}</p>
          <div className="flex gap-1 items-center">
            <Drumstick className="h-4 w-4 text-primary" />
            <p className="text-secondary-foreground text-sm font-semibold text-center">
              {cookTime} MINUTES
            </p>
          </div>
        </div>
        <p className="text-muted-foreground">{description.slice(0, 120)}</p>
        <Button
          variant="outline"
          className="font-medium text-secondary-foreground"
          onClick={() => handlePageChange("recipe", `/recipe/${$id}`)}
        >
          View Recipe
        </Button>
      </div>
    </Card>
  );
};

export default DishCard;
