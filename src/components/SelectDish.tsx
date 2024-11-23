import { FC, ReactElement, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Drumstick } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { database } from "@/lib/appwrite";
import { Query } from "appwrite";

interface Dish {
  $id: string;
  name: string;
  description: string;
  cookTime: string;
  category: string;
  protein: number;
  carbs: number;
  calories: number;
  fats: number;
  isVegetarian: boolean;
  imageUrl: string;
}

const SelectDish: FC<{
  isSelectDishOpen: boolean;
  onSelectDishClose: () => void;
  selectedOptions: string[];
}> = ({
  isSelectDishOpen,
  onSelectDishClose,
  selectedOptions,
}): ReactElement => {
  console.log(selectedOptions);
  const navigate = useNavigate();
  const [onlyVegetarian, setOnlyVegetarian] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState<{
    [id: string]: number;
  }>({});
  const [dishes, setDishes] = useState<Dish[]>([]);

  const toggleVegetarian = () => setOnlyVegetarian(!onlyVegetarian);

  const addToMealPrep = (id: string) => {
    setSelectedDishes((prev) => ({ ...prev, [id]: 1 }));
  };

  const removeFromMealPrep = (id: string) => {
    setSelectedDishes((prev) => {
      const newSelected = { ...prev };
      delete newSelected[id];
      return newSelected;
    });
  };

  const incrementQuantity = (id: string) => {
    setSelectedDishes((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrementQuantity = (id: string) => {
    setSelectedDishes((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const filteredDishes = onlyVegetarian
    ? dishes.filter((dish) => dish.isVegetarian)
    : dishes;

  const handleGenerateList = (_tab: string, path: string) => {
    navigate(path);
  };

  useEffect(() => {
    database
      .listDocuments(
        "6738339600159d9fe30e", // databaseId
        "673834330017bb7e7928", // collectionId
        [
          Query.select([
            "name",
            "description",
            "cookTime",
            "category",
            "protein",
            "carbs",
            "calories",
            "fats",
            "isVegetarian",
            "imageUrl",
            "$id",
          ]),
          Query.equal("category", selectedOptions),
        ] // queries (optional)
      )
      .then((dishesData) => {
        console.log(dishesData.documents);
        const dish = dishesData.documents as unknown as Dish[];
        setDishes(dish);
      });
  }, []);

  if (!isSelectDishOpen) {
    return <></>;
  }

  return (
    <>
      <div className="px-5 flex flex-col relative mb-10">
        <p className="text-3xl pt-8 pb-4 font-semibold leading-9">
          Select dishes
        </p>
        <div className="flex justify-between pb-4">
          <div className="flex items-center space-x-2">
            <Switch id="vegetarian-mode" onCheckedChange={toggleVegetarian} />
            <Label
              htmlFor="vegetarian-mode"
              className="leading-5 text-secondary-foreground"
            >
              Only vegetarian
            </Label>
          </div>
          <p className="text-primary">
            {Object.keys(selectedDishes).length}/8 Meals
          </p>
        </div>
        <div className="flex flex-col gap-4 pb-24">
          {filteredDishes.map((dish) => (
            <Card key={dish["$id"]}>
              <div className="relative w-full">
                <img
                  src={dish.imageUrl}
                  className="h-[182px] w-full rounded-md bg-cover"
                  alt={dish.name}
                />
                <Badge className="w-fit absolute top-3 left-4">
                  {dish.category}
                </Badge>
                <p className="absolute bottom-3 left-4 text-primary-foreground font-semibold text-xs">
                  4 MEALS
                </p>
              </div>
              <div className="mt-3 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg text-foreground">
                    {dish.name}
                  </p>
                  <div className="flex gap-1 items-center">
                    <Drumstick className="h-4 w-4 text-primary" />
                    <p className="text-secondary-foreground text-sm font-semibold">
                      {dish.cookTime} MINUTES
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">{dish.description}</p>
                <div className="flex gap-2">
                  <div className="p-2 flex flex-col gap-1 bg-secondary rounded-sm flex-1">
                    <p className="text-accent-foreground font-semibold text-xs">
                      Protein
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {dish.protein} g
                    </p>
                  </div>
                  <div className="p-2 flex flex-col gap-1 bg-secondary rounded-sm flex-1">
                    <p className="text-accent-foreground font-semibold text-xs">
                      Carbs
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {dish.carbs} g
                    </p>
                  </div>
                  <div className="p-2 flex flex-col gap-1 bg-secondary rounded-sm flex-1">
                    <p className="text-accent-foreground font-semibold text-xs">
                      Calories
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {dish.calories} g
                    </p>
                  </div>
                  <div className="p-2 flex flex-col gap-1 bg-secondary rounded-sm flex-1">
                    <p className="text-accent-foreground font-semibold text-xs">
                      Fats
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {dish.fats} g
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs">
                  *All nutritional information per 1 serving.
                </p>
                {!selectedDishes[dish["$id"]] ? (
                  <Button
                    variant="outline"
                    className="font-medium text-secondary-foreground"
                    onClick={() => addToMealPrep(dish["$id"])}
                  >
                    Add to meal prep
                  </Button>
                ) : (
                  <div className="flex justify-between gap-3">
                    <Button
                      className="flex-1 border-destructive text-destructive font-medium"
                      variant="outline"
                      onClick={() => removeFromMealPrep(dish["$id"])}
                    >
                      Remove
                    </Button>
                    <div className="flex justify-between gap-2 flex-1 text-destructive items-center">
                      <Button
                        className="p-3 border-border"
                        variant="outline"
                        onClick={() => decrementQuantity(dish["$id"])}
                      >
                        <Minus
                          width={16}
                          height={16}
                          className="text-foreground"
                        />
                      </Button>
                      <p className="p-2 font-medium text-sm">
                        {selectedDishes[dish["$id"]]}
                      </p>
                      <Button
                        className="p-3 border-border"
                        variant="outline"
                        onClick={() => incrementQuantity(dish["$id"])}
                      >
                        <Plus
                          width={16}
                          height={16}
                          className="text-foreground"
                        />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 flex justify-between p-5 w-full bg-popover shadow-2xl">
        <Button
          className="w-[49%] bg-secondary text-secondary-foreground"
          onClick={onSelectDishClose}
        >
          Go back
        </Button>
        <Button
          onClick={() => handleGenerateList("home", "/home")}
          className="w-[49%]"
        >
          View Recipes
        </Button>
      </div>
    </>
  );
};

export default SelectDish;
