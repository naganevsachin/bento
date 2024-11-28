import DishCard from "@/components/DishCard";
import Navigation from "@/components/Navigation";
import ShoppingList from "@/components/ShoppingList";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Check, Grape } from "lucide-react";
import { FC, ReactElement, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  collectionIdDishes,
  collectionIdUserDish,
  database,
  databaseId,
} from "@/lib/appwrite";
import { Query } from "appwrite";
import { useUser } from "@/lib/context/user";
import { IDishCard } from "@/lib/interfaces";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router-dom";

const KitchenPage: FC = (): ReactElement => {
  const [isShoppingListOpen, setShoppingListOpen] = useState(false);
  const openshoppingList = () => setShoppingListOpen(true);
  const closeshoppingList = () => setShoppingListOpen(false);
  const [userSelectedDishes, setUserSelectedDishes] = useState<IDishCard[]>([]);
  const [cookTime, setCookTime] = useState<number>(0);
  const [numberOfServings, setNumberOfServings] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [batchCookId, setBatchCookId] = useState<string>("");
  const [ingredient, setIngredient] = useState<string[]>([]);
  const user = useUser();
  const navigate = useNavigate();

  const handlePageChange = (_page: string, path: string) => {
    navigate(path);
  };

  const handleOnCompleteMealPrep = () => {
    if (numberOfServings === 0) {
      return;
    } else {
      database
        .deleteDocument(
          databaseId, // databaseId
          collectionIdUserDish, // collectionId
          batchCookId
        )
        .then(() => {
          handlePageChange("home", "/home");
        });
    }
  };

  const getIngredientNames = (dishes: IDishCard[]): string[] => {
    return dishes.reduce<string[]>((ingredientList, dish) => {
      const ingredients = dish.ingredients.map((ingredient) => {
        const parts = ingredient.split(":");
        const trimmed = parts.length > 1 ? parts[1].trim() : ingredient.trim();
        // Capitalize the first letter
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
      });

      // Add unique ingredients
      ingredients.forEach((ingredient: string) => {
        if (!ingredientList.includes(ingredient)) {
          ingredientList.push(ingredient);
        }
      });

      return ingredientList;
    }, []); // Specify the initial type of the accumulator here
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user-selected dishes data
        const dishesData = await database.listDocuments(
          databaseId, // databaseId
          collectionIdUserDish, // collectionId
          [
            Query.select(["userId", "selectedDishese", "$id"]),
            Query.equal("userId", user.userId),
          ]
        );

        // Check if documents exist and are not empty
        if (!dishesData.documents || dishesData.documents.length === 0) {
          return;
        }

        // set batch cooking id
        setBatchCookId(dishesData.documents[0].$id);

        // Parse selected dishes
        const dishQuantities = JSON.parse(
          dishesData.documents[0]?.selectedDishese || "{}"
        ) as Record<string, number>;

        // Fetch details of selected dishes
        const selectedDishesData = await database.listDocuments(
          databaseId, // databaseId
          collectionIdDishes, // collectionId
          [
            Query.select([
              "name",
              "cookTime",
              "description",
              "category",
              "imageUrl",
              "$id",
              "NumberOfServings",
              "ingredients",
            ]),
            Query.equal("$id", Object.keys(dishQuantities)),
          ]
        );

        // Check if selected dishes documents exist
        if (
          !selectedDishesData.documents ||
          selectedDishesData.documents.length === 0
        ) {
          return;
        }

        const dishes = selectedDishesData.documents as unknown as IDishCard[];
        setUserSelectedDishes(dishes);
        setIngredient(getIngredientNames(dishes));

        // Calculate total number of servings
        const totalServings = Object.entries(dishQuantities).reduce(
          (total, [dishId, quantity]) => {
            const dish = dishes.find((d) => d.$id === dishId);
            return dish ? total + dish.NumberOfServings * quantity : total;
          },
          0
        );
        setNumberOfServings(totalServings);

        // Calculate total cook time
        const totalCookTime = dishes.reduce(
          (total, dish) => total + dish.cookTime,
          0
        );
        setCookTime(totalCookTime);
      } catch (error) {
        console.error("KitchenPage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ShoppingList
            shoppingList={ingredient}
            isShoppingListOpen={isShoppingListOpen}
            onShoppingListClose={closeshoppingList}
          />
          {!isShoppingListOpen ? (
            <div className="relative mt-6">
              <div className="px-5 pb-24">
                <div className="flex justify-between items-center">
                  <p className="text-3xl font-semibold">Kitchen</p>
                  <div className="flex gap-4">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="border-none">
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded w-[90%]">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex justify-start">
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-left">
                            Are you sure you want to delete the meal prep, this
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex flex-row items-baseline justify-end gap-2">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleOnCompleteMealPrep}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="border-none">
                          <Check />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded w-[90%]">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex justify-start">
                            Mark meal prep as complete?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-left">
                            Are you sure you want to delete the meal prep, this
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex flex-row items-baseline justify-end gap-2">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleOnCompleteMealPrep}>
                            Complete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <Card className="flex flex-col gap-4 flex-1">
                    <p className="text-primary font-medium text-sm">
                      Cook time
                    </p>
                    <div className="flex gap-1 items-baseline">
                      <p className="text-2xl font-bold text-popover-foreground">
                        {cookTime}
                      </p>
                      <p className="text-secondary-foreground text-base">min</p>
                    </div>
                  </Card>
                  <Card className="flex flex-col gap-4 flex-1">
                    <p className="text-primary font-medium text-sm">
                      No of Servings
                    </p>
                    <div className="flex gap-1 items-baseline">
                      <p className="text-2xl font-bold text-popover-foreground">
                        {numberOfServings}
                      </p>
                      <p className="text-secondary-foreground text-base">
                        servings
                      </p>
                    </div>
                  </Card>
                </div>
                <Alert className="mt-4 flex gap-6 bg-secondary border-none">
                  <div className="mt-1">
                    <Grape className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <AlertTitle className="text-lg font-semibold text-card-foreground">
                      Dont forget the ingredients
                    </AlertTitle>
                    <Button
                      variant="link"
                      className="text-primary font-medium text-sm underline px-0 py-[6px]"
                      onClick={openshoppingList}
                    >
                      View shopping list
                    </Button>
                  </div>
                </Alert>
                <p className="text-lg font-semibold my-4">Todays menu</p>
                <div className="flex overflow-x-auto flex-nowrap gap-3">
                  {userSelectedDishes.map((dish) => {
                    return <DishCard key={dish.$id} {...dish} />;
                  })}
                </div>
              </div>
              <Navigation />
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default KitchenPage;
