import DishCard from "@/components/DishCard";
import Navigation from "@/components/Navigation";
import ShoppingList from "@/components/ShoppingList";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Check, Grape } from "lucide-react";
import { FC, ReactElement, useState } from "react";
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

const KitchenPage: FC = (): ReactElement => {
  const [isShoppingListOpen, setShoppingListOpen] = useState(false);
  const openshoppingList = () => setShoppingListOpen(true);
  const closeshoppingList = () => setShoppingListOpen(false);

  return (
    <>
      <ShoppingList
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
                      <AlertDialogAction>Delete</AlertDialogAction>
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
                      <AlertDialogAction>Complete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <Card className="flex flex-col gap-4 flex-1">
                <p className="text-primary font-medium text-sm">Cook time</p>
                <div className="flex gap-1 items-baseline">
                  <p className="text-2xl font-bold text-popover-foreground">
                    180
                  </p>
                  <p className="text-secondary-foreground text-base">min</p>
                </div>
              </Card>
              <Card className="flex flex-col gap-4 flex-1">
                <p className="text-primary font-medium text-sm">No of meals</p>
                <div className="flex gap-1 items-baseline">
                  <p className="text-2xl font-bold text-popover-foreground">
                    8
                  </p>
                  <p className="text-secondary-foreground text-base">meals</p>
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
              <DishCard />
              <DishCard />
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

export default KitchenPage;
