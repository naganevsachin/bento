import Navigation from "@/components/Navigation";
import SubmitRecipe from "@/components/SubmitRecipe";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  collectionIdDishes,
  collectionIdUserDish,
  database,
  databaseId,
} from "@/lib/appwrite";
import { useUser } from "@/lib/context/user";
import { INutritionalNumbers } from "@/lib/interfaces";
import { Query } from "appwrite";
import { Croissant } from "lucide-react";
import { FC, ReactElement, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";

const HomePage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const handlePageChange = (_page: string, path: string) => {
    navigate(path);
  };
  const [nutritions, setNutritions] = useState({
    protein: 0,
    carbs: 0,
    calories: 0,
    fats: 0,
  });
  const [numberOfDishesUserSelected, setNumberOfDishesUserSelected] =
    useState(0.1);
  const user = useUser();
  const [isAlertOpen, setIsAlertOpen] = useState(false); // For controlling alert visibility
  const [alertMessage, setAlertMessage] = useState(""); // For dynamic alert messages
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleCookNextBatch = () => {
    if (numberOfDishesUserSelected >= 1) {
      setAlertMessage(
        "Please finish the current cooking batch before starting a new one."
      );
      setIsAlertOpen(true);
    } else {
      handlePageChange("cook", "/cook");
    }
  };

  useEffect(() => {
    database
      .listDocuments(
        databaseId, // databaseId
        collectionIdUserDish, // collectionId
        [
          Query.select(["userId", "selectedDishese"]),
          Query.equal("userId", user.userId),
        ]
      )
      .then((dishesData) => {
        // Check if documents array is empty
        if (!dishesData.documents || dishesData.documents.length === 0) {
          return;
        }

        // Parse selected dishes if documents exist
        return JSON.parse(dishesData.documents[0].selectedDishese);
      })
      .then((dishQuantities: Record<string, number> | undefined) => {
        if (!dishQuantities) return; // Exit if no dish quantities

        database
          .listDocuments(
            databaseId, // databaseId
            collectionIdDishes, // collectionId
            [
              Query.select(["protein", "carbs", "calories", "fats", "$id"]),
              Query.equal("$id", Object.keys(dishQuantities)),
            ]
          )
          .then((selectedDishes) => {
            if (
              !selectedDishes.documents ||
              selectedDishes.documents.length === 0
            ) {
              return;
            }

            const nutritionalNumbers =
              selectedDishes.documents as unknown as INutritionalNumbers[];

            // Reducer function to calculate total nutrients
            const totalNutrients = nutritionalNumbers.reduce(
              (totals, item) => {
                totals.protein += item.protein;
                totals.carbs += item.carbs;
                totals.calories += item.calories;
                totals.fats += item.fats;
                return totals;
              },
              { protein: 0, carbs: 0, calories: 0, fats: 0 } // Initial totals object
            );

            setNutritions(totalNutrients);
            setNumberOfDishesUserSelected(nutritionalNumbers.length);
          });
      })
      .catch((error) => {
        console.error("HomePage:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative mt-10">
          <div className="px-5 pb-24">
            <p className="text-4xl font-semibold">
              Knowing <br /> what you eat!
            </p>
            <p className="text-sm font-medium text-muted-foreground mt-3">
              Based on the last batch cooked the nutritional <br /> information
              is displayed here per serving
            </p>
            <div className="grid grid-cols-2 mt-6 gap-4">
              <Card className="flex flex-col gap-4">
                <p className="text-primary font-medium text-sm">Avg calories</p>
                <div className="flex gap-1 items-baseline">
                  <p className="text-2xl font-bold text-popover-foreground">
                    {Math.round(
                      nutritions.calories / numberOfDishesUserSelected
                    )}
                  </p>
                  <p className="text-secondary-foreground text-base">kcal</p>
                </div>
              </Card>
              <Card className="flex flex-col gap-4">
                <p className="text-primary font-medium text-sm">Avg fats</p>
                <div className="flex gap-1 items-baseline">
                  <p className="text-2xl font-bold text-popover-foreground">
                    {Math.round(nutritions.fats / numberOfDishesUserSelected)}
                  </p>
                  <p className="text-secondary-foreground text-base">grams</p>
                </div>
              </Card>
              <Card className="flex flex-col gap-4">
                <p className="text-primary font-medium text-sm">Avg protein</p>
                <div className="flex gap-1 items-baseline">
                  <p className="text-2xl font-bold text-popover-foreground">
                    {Math.round(
                      nutritions.protein / numberOfDishesUserSelected
                    )}
                  </p>
                  <p className="text-secondary-foreground text-base">grams</p>
                </div>
              </Card>
              <Card className="flex flex-col gap-4">
                <p className="text-primary font-medium text-sm">Avg carbs</p>
                <div className="flex gap-1 items-baseline">
                  <p className="text-2xl font-bold text-popover-foreground">
                    {Math.round(nutritions.carbs / numberOfDishesUserSelected)}
                  </p>
                  <p className="text-secondary-foreground text-base">grams</p>
                </div>
              </Card>
            </div>
            <Button
              className="text-sm font-medium mt-6 w-full"
              onClick={handleCookNextBatch}
            >
              Cook your next batch
            </Button>
            <Alert className="mt-6 flex gap-6 bg-secondary border-none">
              <div className="mt-1">
                <Croissant className="text-primary h-6 w-6" />
              </div>
              <div>
                <AlertTitle className="text-lg font-semibold text-card-foreground">
                  Have a new recipe in mind?
                </AlertTitle>
                <AlertDescription className="mt-1 text-secondary-foreground text-sm mb-2">
                  Submit your recipe. They would be <br /> added to the list
                  after review.
                </AlertDescription>
                <SubmitRecipe />
              </div>
            </Alert>
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
          <Navigation />
        </div>
      )}
    </>
  );
};

export default HomePage;
