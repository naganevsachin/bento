import SelectCuisine from "@/components/SelectCuisine";
import SelectDish from "@/components/SelectDish";
import { database } from "@/lib/appwrite";
import { FC, ReactElement, useEffect, useState } from "react";

const MealSelectionPage: FC = (): ReactElement => {
  const [isSelectDishOpen, setSelectDishOpen] = useState(false);
  const openSelectDish = () => setSelectDishOpen(true);
  const closeSelectDish = () => setSelectDishOpen(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  // useEffect(() => {
  //   database
  //     .listDocuments(
  //       "6738339600159d9fe30e", // databaseId
  //       "673834330017bb7e7928", // collectionId
  //       [] // queries (optional)
  //     )
  //     .then((dishes) => {
  //       console.log(JSON.parse(dishes.documents[0].recipe));
  //     });
  // }, []);

  return (
    <div>
      {isSelectDishOpen ? (
        <SelectDish
          isSelectDishOpen={isSelectDishOpen}
          onSelectDishClose={closeSelectDish}
          selectedOptions={selectedOptions}
        />
      ) : (
        <></>
      )}
      <SelectCuisine
        onSelectDishOpen={openSelectDish}
        isSelectDishOpen={isSelectDishOpen}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </div>
  );
};

export default MealSelectionPage;
