import { FC, ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { collectionIdSubmitRecipe, database, databaseId } from "@/lib/appwrite";
import { ID } from "appwrite";

const SubmitRecipe: FC = (): ReactElement => {
  const [recipeData, setRecipeData] = useState({
    name: "",
    cuisine: "",
    ingredients: "",
    recipe: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setRecipeData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !recipeData.name ||
      !recipeData.cuisine ||
      !recipeData.ingredients ||
      !recipeData.recipe
    ) {
      alert("Please fill out all fields.");
      return;
    }

    // Submit the data (e.g., via an API)
    database
      .createDocument(
        databaseId,
        collectionIdSubmitRecipe,
        ID.unique(),
        recipeData
      )
      .then(() => {
        alert("Recipe has been submitted successfully.");
      })
      .catch((err) => {
        console.log("SubmitRecipe: ", err);
      });

    // Reset the form after submission
    setRecipeData({ name: "", cuisine: "", ingredients: "", recipe: "" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-primary font-medium text-sm underline px-0 py-[6px]"
        >
          Submit recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded">
        <DialogHeader>
          <DialogTitle className="text-left">Submit a recipe</DialogTitle>
          <DialogDescription className="text-left">
            Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-8">
          <Input
            id="name"
            value={recipeData.name}
            onChange={handleChange}
            placeholder="Name of recipe*"
            className="w-full text-muted-foreground"
          />
          <Input
            id="cuisine"
            value={recipeData.cuisine}
            onChange={handleChange}
            placeholder="Cuisine*"
            className="w-full text-muted-foreground"
          />
          <Textarea
            id="ingredients"
            value={recipeData.ingredients}
            onChange={handleChange}
            placeholder="Ingredient list*"
            className="w-full text-muted-foreground"
          />
          <Textarea
            id="recipe"
            value={recipeData.recipe}
            onChange={handleChange}
            placeholder="Recipe*"
            className="w-full text-muted-foreground"
          />
        </div>
        <DialogFooter>
          <div className="flex justify-end">
            <Button type="button" onClick={handleSubmit} className="w-fit">
              Submit recipe
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitRecipe;
