import { FC, ReactElement, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Plus, Minus, Drumstick } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  collectionIdDishes,
  collectionIdUserDish,
  database,
  databaseId,
} from "@/lib/appwrite";
import { Query, ID } from "appwrite";
import { useUser } from "@/lib/context/user";

interface IDish {
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
  NumberOfServings: number;
}

interface ISelectedDish {
  [key: string]: {
    quantity: number;
    servings: number;
  };
}

interface ISelectedDishData {
  [key: string]: number;
}

const SelectDish: FC<{
  isSelectDishOpen: boolean;
  onSelectDishClose: () => void;
  selectedOptions: string[];
  numberOfMeals: string;
}> = ({
  isSelectDishOpen,
  onSelectDishClose,
  selectedOptions,
  numberOfMeals,
}): ReactElement => {
  const navigate = useNavigate();
  const [onlyVegetarian, setOnlyVegetarian] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState<ISelectedDish>({});
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false); // For controlling alert visibility
  const [alertMessage, setAlertMessage] = useState(""); // For dynamic alert messages
  const user = useUser();

  const toggleVegetarian = () => setOnlyVegetarian(!onlyVegetarian);

  const addToMealPrep = (id: string, servings: number) => {
    const totalServings = calculateTotalServings({
      ...selectedDishes,
      [id]: { quantity: 1, servings },
    });

    if (totalServings > parseInt(numberOfMeals)) {
      setAlertMessage(
        "You cannot add this dish as it exceeds the total number of meals."
      );
      setIsAlertOpen(true);
      return;
    }

    setSelectedDishes((prev) => ({
      ...prev,
      [id]: { quantity: 1, servings },
    }));
  };

  const removeFromMealPrep = (id: string) => {
    setSelectedDishes((prev) => {
      const newSelected = { ...prev };
      delete newSelected[id];
      return newSelected;
    });
  };

  const incrementQuantity = (id: string) => {
    const newQuantity = selectedDishes[id].quantity + 1;
    const totalServings = calculateTotalServings({
      ...selectedDishes,
      [id]: { ...selectedDishes[id], quantity: newQuantity },
    });

    if (totalServings > parseInt(numberOfMeals)) {
      setAlertMessage(
        "You cannot add more servings as it exceeds the total number of meals."
      );
      setIsAlertOpen(true);
      return;
    }

    setSelectedDishes((prev) => ({
      ...prev,
      [id]: { ...prev[id], quantity: newQuantity },
    }));
  };

  const decrementQuantity = (id: string) => {
    setSelectedDishes((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity: Math.max(prev[id].quantity - 1, 1),
      },
    }));
  };

  const filteredDishes = onlyVegetarian
    ? dishes.filter((dish) => dish.isVegetarian)
    : dishes;

  const userSelectedDishesDataTransform = (
    inputObject: ISelectedDish
  ): ISelectedDishData => {
    return Object.keys(inputObject).reduce(
      (result: ISelectedDishData, key: string) => {
        result[key] = inputObject[key].quantity;
        return result;
      },
      {}
    );
  };

  const handleGenerateList = (_tab: string, path: string) => {
    if (Object.keys(selectedDishes).length === 0) {
      setAlertMessage("Please select at least one dish before proceeding.");
      setIsAlertOpen(true);
      return;
    }

    database
      .createDocument(databaseId, collectionIdUserDish, ID.unique(), {
        userId: user.userId,
        selectedDishese: JSON.stringify(
          userSelectedDishesDataTransform(selectedDishes)
        ),
      })
      .then(() => {
        navigate(path);
      })
      .catch((err) => {
        console.log("SelectDish: ", err);
      });
  };

  const calculateTotalServings = (selectedDishes: {
    [id: string]: { quantity: number; servings: number };
  }): number => {
    return Object.values(selectedDishes).reduce(
      (total, { quantity, servings }) => total + quantity * servings,
      0
    );
  };

  useEffect(() => {
    // Fetch dishes based on the selected category
    const fetchDishes = async () => {
      try {
        const dishesData = await database.listDocuments(
          databaseId, // databaseId
          collectionIdDishes, // collectionId
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
              "NumberOfServings",
            ]),
            Query.equal("category", selectedOptions),
          ]
        );

        // Check if dishes data exists and has documents
        if (!dishesData.documents || dishesData.documents.length === 0) {
          setDishes([]); // Reset dishes to an empty array
          return;
        }

        // Cast and update the dishes
        const dish = dishesData.documents as unknown as IDish[];
        setDishes(dish);
      } catch (error) {
        console.error("SelectDish:", error);
      }
    };

    fetchDishes();
  }, [selectedOptions]);

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
          <p className="text-primary px-2 py-2 bg-accent rounded-md font-medium">
            {calculateTotalServings(selectedDishes)}/{numberOfMeals} Dishes
          </p>
        </div>
        <div className="flex flex-col gap-4 pb-24">
          {filteredDishes.map((dish) => (
            <Card key={dish.$id}>
              <div className="relative w-full">
                <img
                  src={dish.imageUrl}
                  className="h-[182px] w-full rounded-md bg-cover"
                  alt={dish.name}
                />
                <Badge className="w-fit absolute top-3 left-4">
                  {dish.category}
                </Badge>
                <div className="absolute bottom-0 w-full pt-6 bg-custom-gradient">
                  <p className="absolute bottom-3 left-4 text-primary-foreground font-semibold text-xs">
                    {dish.NumberOfServings} SERVINGS
                  </p>
                </div>
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
                {!selectedDishes[dish.$id] ? (
                  <Button
                    variant="outline"
                    className="font-medium text-secondary-foreground"
                    onClick={() =>
                      addToMealPrep(dish.$id, dish.NumberOfServings)
                    }
                  >
                    Add to meal prep
                  </Button>
                ) : (
                  <div className="flex justify-between gap-3">
                    <Button
                      className="flex-1 border-destructive text-destructive font-medium"
                      variant="outline"
                      onClick={() => removeFromMealPrep(dish.$id)}
                    >
                      Remove
                    </Button>
                    <div className="flex justify-between gap-2 flex-1 text-destructive items-center">
                      <Button
                        className="p-3 border-border"
                        variant="outline"
                        onClick={() => decrementQuantity(dish.$id)}
                      >
                        <Minus
                          width={16}
                          height={16}
                          className="text-foreground"
                        />
                      </Button>
                      <div className="bg-accent h-10 w-10 rounded-md flex justify-center items-center">
                        <p className="font-medium text-sm text-accent-foreground">
                          {selectedDishes[dish.$id].quantity}
                        </p>
                      </div>

                      <Button
                        className="p-3 border-border"
                        variant="outline"
                        onClick={() => incrementQuantity(dish.$id)}
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
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent className="rounded w-[90%]">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex justify-start">
                Notification
              </AlertDialogTitle>
              <AlertDialogDescription className="text-left">
                {alertMessage}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-end flex-row">
              <AlertDialogAction
                className="w-[50%]"
                onClick={() => setIsAlertOpen(false)}
              >
                Okay
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="fixed bottom-0 flex justify-between p-5 w-full bg-popover shadow-2xl">
        <Button
          className="w-[49%] bg-secondary text-secondary-foreground"
          onClick={onSelectDishClose}
        >
          Go back
        </Button>
        <Button
          onClick={() => handleGenerateList("kitchen", "/kitchen")}
          className="w-[49%]"
        >
          Add to kitchen
        </Button>
      </div>
    </>
  );
};

export default SelectDish;
