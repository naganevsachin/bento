import { FC, ReactElement } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

const ShoppingList: FC<{
  isShoppingListOpen: boolean;
  onShoppingListClose: () => void;
}> = ({ isShoppingListOpen, onShoppingListClose }): ReactElement => {
  if (!isShoppingListOpen) return <></>;

  const shoppingList = [
    "800g chicken",
    "1 spoon coriander leaves",
    "Lemon juice",
    "Turmeric powder",
  ];

  return (
    <div className="px-5 bg-background relative mt-6">
      <div className="animate-slide-up">
        <p className="text-3xl font-semibold py-1">Shopping list</p>
        <>
          {shoppingList.map((item, key) => {
            return (
              <div className="flex gap-3 mt-6 items-center">
                <Checkbox
                  className="border-muted-foreground rounded h-6 w-6"
                  id={key.toString()}
                />
                <label
                  htmlFor={key.toString()}
                  className="text-base text-foreground"
                >
                  {item}
                </label>
              </div>
            );
          })}
        </>
      </div>
      <div className="fixed bottom-0 left-0 w-full py-6 px-5 bg-background">
        <Button
          onClick={onShoppingListClose}
          className="w-full font-medium text-sm"
        >
          Go back
        </Button>
      </div>
    </div>
  );
};

export default ShoppingList;
