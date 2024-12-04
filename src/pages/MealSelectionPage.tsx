import SelectCuisine from "@/components/SelectCuisine";
import SelectDish from "@/components/SelectDish";
import { FC, ReactElement, useState } from "react";

const MealSelectionPage: FC = (): ReactElement => {
  const [isSelectDishOpen, setSelectDishOpen] = useState(false);
  const openSelectDish = () => setSelectDishOpen(true);
  const closeSelectDish = () => setSelectDishOpen(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [numberOfMeals, setNumberOfMeals] = useState<string>("");

  return (
    <div>
      {isSelectDishOpen ? (
        <SelectDish
          isSelectDishOpen={isSelectDishOpen}
          onSelectDishClose={closeSelectDish}
          selectedOptions={selectedOptions}
          numberOfMeals={numberOfMeals}
        />
      ) : (
        <></>
      )}
      <SelectCuisine
        numberOfMeals={numberOfMeals}
        setNumberOfMeals={setNumberOfMeals}
        onSelectDishOpen={openSelectDish}
        isSelectDishOpen={isSelectDishOpen}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </div>
  );
};

export default MealSelectionPage;
