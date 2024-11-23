import { Drumstick } from "lucide-react";
import { FC, ReactElement, useEffect, useState } from "react";
import Meal from "@/assets/meal.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { database } from "@/lib/appwrite";
import { Query } from "appwrite";

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
}

const ViewRecipePage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recipe, setRecipe] = useState<IRecipe>();
  const ingredients = [
    "800g chicken",
    "1 spoon coriander",
    "1 spoon lemon juice",
    "1 spoon turmeric powder",
  ];
  const procedure = [
    {
      prep: "Blanch the Spinach",
      steps: [
        "Bring a pot of water to a boil.",
        "Add the cleaned and chopped spinach to the boiling water and blanch for 2-3 minutes until wilted.",
        "Immediately transfer the spinach to a bowl of ice water to stop the cooking process and retain the green color.",
        "Drain and set aside.",
      ],
    },
    {
      prep: "Make the Spinach Purée",
      steps: [
        "In a blender, add the blanched spinach along with 1-2 green chilies.",
        "Blend until you get a smooth purée.",
        "Set aside.",
      ],
    },
    {
      prep: "Prepare the Paneer",
      steps: [
        "Heat 1 tablespoon of oil in a pan.",
        "Add the cubed paneer and lightly fry until they turn golden brown.",
        "Remove and place the paneer cubes in warm water to keep them soft.",
      ],
    },
    {
      prep: "Cook the Base Masala",
      steps: [
        "In the same pan, add 2 tablespoons of butter or ghee and let it melt.",
        "Add 1 teaspoon of cumin seeds and sauté until they start to crackle.",
        "Add the finely chopped onions and sauté until they turn golden brown.",
        "Add the ginger-garlic paste and sauté for another minute until the raw smell disappears.",
        "Add the chopped tomatoes and cook until they soften and the oil starts to separate from the mixture.",
      ],
    },
    {
      prep: "Add Spices",
      steps: [
        "Add the turmeric powder, cumin powder, coriander powder, garam masala, and red chili powder (if using).",
        "Cook the spices with the onion-tomato mixture for 2-3 minutes.",
      ],
    },
    {
      prep: "Combine Spinach Purée",
      steps: [
        "Add the spinach purée to the pan and mix well with the cooked masala.",
        "Simmer the mixture for 5-7 minutes on low heat, stirring occasionally.",
      ],
    },
    {
      prep: "Add Paneer",
      steps: [
        "Gently squeeze the water out of the paneer cubes and add them to the spinach mixture.",
        "Mix well and let it cook for another 2-3 minutes so the paneer absorbs the flavors.",
      ],
    },
    {
      prep: "Finish the Dish",
      steps: [
        "Crush and add the kasuri methi (if using) for extra flavor.",
        "Stir in 2 tablespoons of cream for richness (optional).",
        "Adjust salt to taste.",
      ],
    },
    {
      prep: "Serve",
      steps: [
        "Turn off the heat and let the dish rest for a few minutes before serving.",
        "Garnish with a drizzle of cream or a small dollop of butter if desired.",
      ],
    },
  ];

  useEffect(() => {
    try {
      console.log(recipeId);
      database
        .listDocuments(
          "6738339600159d9fe30e", // databaseId
          "673834330017bb7e7928", // collectionId
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
          console.log(recipeData);
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
        <>Loading</>
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
            <p className="absolute bottom-3 left-4 text-primary-foreground font-semibold text-xs">
              4 MEALS
            </p>
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
