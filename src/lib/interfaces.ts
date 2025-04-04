// Kitchen Dish Card Interface
export interface IDishCard {
  $id: string;
  name: string;
  description: string;
  cookTime: number;
  category: string;
  imageUrl: string;
  NumberOfServings: number;
  ingredients: string[];
}

export interface INutritionalNumbers {
  $id: string;
  protein: number;
  carbs: number;
  calories: number;
  fats: number;
}
