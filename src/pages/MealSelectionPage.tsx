import SelectCuisine from "@/components/SelectCuisine";
import SelectDish from "@/components/SelectDish";
import { FC, ReactElement, useState } from "react";

const MealSelectionPage: FC = (): ReactElement => {
  const [isSelectDishOpen, setSelectDishOpen] = useState(false);
  const openSelectDish = () => setSelectDishOpen(true);
  const closeSelectDish = () => setSelectDishOpen(false);

  return (
    <div>
      <SelectDish
        isSelectDishOpen={isSelectDishOpen}
        onSelectDishClose={closeSelectDish}
      />
      <SelectCuisine
        onSelectDishOpen={openSelectDish}
        isSelectDishOpen={isSelectDishOpen}
      />
    </div>
  );
};

export default MealSelectionPage;
