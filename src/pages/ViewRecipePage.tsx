import { Drumstick } from "lucide-react";
import { FC, ReactElement, useEffect, useState } from "react";
import Meal from "@/assets/meal.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { collectionIdDishes, database, databaseId } from "@/lib/appwrite";
import { Query } from "appwrite";
import Loader from "@/components/Loader";

type RecipeProcedure = {
  prep: string;
  steps: string[];
};

interface IRecipe {
  $id: string;
  name: string;
  description: string;
  cookTime: string;
  category: string;
  imageUrl: string;
  recipe: RecipeProcedure[];
  ingredients: string[];
  NumberOfServings: number;
}

const ViewRecipePage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recipe, setRecipe] = useState<IRecipe>();

  useEffect(() => {
    try {
      database
        .listDocuments(
          databaseId, // databaseId
          collectionIdDishes, // collectionId
          [
            Query.select([
              "name",
              "description",
              "cookTime",
              "category",
              "imageUrl",
              "$id",
              "recipe",
              "ingredients",
              "NumberOfServings",
            ]),
            Query.equal("$id", recipeId as string),
          ] // queries (optional)
        )
        .then((dishesData) => {
          const recipeData = dishesData.documents[0] as unknown as IRecipe;

          // Ensure recipe.recipe is a string before parsing
          if (typeof recipeData.recipe[0] === "string") {
            recipeData.recipe = JSON.parse(recipeData.recipe[0]);
          }
          setRecipe(recipeData);
        })
        .then(() => {
          setIsLoading(false);
        });
    } finally {
      // setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="px-5 mt-6">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-2xl text-foreground">
              {recipe?.name}
            </p>
            <div className="flex gap-1 items-center">
              <Drumstick className="h-4 w-4 text-primary" />
              <p className="text-secondary-foreground text-sm font-semibold text-center">
                {recipe?.cookTime} MINUTES
              </p>
            </div>
          </div>
          <div className="relative w-full mt-5">
            <img src={Meal} className="h-[182px] w-full rounded-lg bg-cover" />
            <Badge className="w-fit absolute top-3 left-4">
              {recipe?.category}
            </Badge>
            <div className="absolute bottom-0 w-full pt-6 bg-custom-gradient">
              <p className="absolute bottom-3 left-4 text-primary-foreground font-semibold text-xs">
                {recipe?.NumberOfServings} SERVINGS
              </p>
            </div>
          </div>
          <p className="text-muted-foreground mt-2 text-sm">
            {recipe?.description}
          </p>
          <div className="mt-4">
            <p className="text-foreground text-lg font-semibold mb-2">
              Ingredients
            </p>
            <ul className="list-disc ml-6 text-muted-foreground">
              {recipe?.ingredients.map((ingredient, key) => {
                return <li key={key}>{ingredient}</li>;
              })}
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-foreground text-lg font-semibold mb-2">
              How to prepare
            </p>
            <ol className="ml-6 list-decimal text-muted-foreground text-sm">
              {recipe?.recipe.map((steps, key) => {
                return (
                  <li key={key}>
                    {steps.prep}
                    <ul className="list-disc">
                      {steps.steps.map((step, index) => {
                        return <li key={index}>{step}</li>;
                      })}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="mx-1">
            <Button
              variant="default"
              className="font-medium text-primary-foreground w-full mt-10 mb-5"
              onClick={() => navigate(-1)}
            >
              Go back
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewRecipePage;
