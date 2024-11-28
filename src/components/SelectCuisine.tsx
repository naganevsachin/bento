import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC, ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Define options as an array of objects for labels and values
const options = [
  { label: "Indian", value: "Indian" },
  { label: "Japanese", value: "Japanese" },
  { label: "Thai", value: "Thai" },
  { label: "Mediterranean", value: "Mediterranean" },
  { label: "Mexican", value: "Mexican" },
  { label: "Greek", value: "Greek" },
  { label: "Ethiopian", value: "Ethiopian" },

  // Add more options as needed
];

const SelectCuisine: FC<{
  onSelectDishOpen: () => void;
  isSelectDishOpen: boolean;
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  setNumberOfMeals: React.Dispatch<React.SetStateAction<string>>;
  selectedOptions: string[];
  numberOfMeals: string;
}> = ({
  onSelectDishOpen,
  isSelectDishOpen,
  setSelectedOptions,
  setNumberOfMeals,
  selectedOptions,
  numberOfMeals,
}): ReactElement => {
  const navigate = useNavigate();
  const handlePageChange = (_page: string, path: string) => {
    navigate(path);
  };

  // Toggle option in the selectedOptions state
  const handleOptionChange = (value: string) => {
    setSelectedOptions((prev: string[]) =>
      prev.includes(value)
        ? prev.filter((option: string) => option !== value)
        : [...prev, value]
    );
  };

  if (isSelectDishOpen) {
    return <></>;
  }
  return (
    <>
      <div className="px-5 flex flex-col relative mb-10">
        <p className="text-3xl pt-8 pb-3 font-semibold leading-9 ">
          Lets get your <br /> meal prep going
        </p>
        <p className="text-sm font-normal leading-5 text-muted-foreground">
          Select the number of meals you wish to <br /> make and the type of
          cuisine you prefer
        </p>
        <Select onValueChange={(value) => setNumberOfMeals(value)}>
          <SelectTrigger className="my-6">
            <SelectValue
              className=""
              placeholder={
                numberOfMeals ? `${numberOfMeals}` : "Number of meals*"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-base font-semibold">Select cuisines</p>
        <div className="flex flex-col gap-4 mt-4 mb-20">
          {options.map(({ label, value }) => (
            <Button
              key={value}
              className={`flex p-3 rounded-md w-full justify-start
            ${
              selectedOptions.includes(value)
                ? "border-accent-foreground bg-accent text-accent-foreground"
                : "text-foreground border bg-background"
            }`}
              onClick={() => handleOptionChange(value)}
              variant="outline"
            >
              <label htmlFor={value} className="text-sm font-medium">
                {label}
              </label>
            </Button>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 flex justify-between p-5 w-full bg-popover shadow-2xl">
        <Button
          className="w-[49%] bg-secondary text-secondary-foreground"
          onClick={() => handlePageChange("home", "/home")}
        >
          Go back
        </Button>
        <Button className="w-[49%]" onClick={onSelectDishOpen}>
          Generate list
        </Button>
      </div>
    </>
  );
};

export default SelectCuisine;
