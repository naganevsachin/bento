import { FC, ReactElement } from "react";
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

const SubmitRecipe: FC = (): ReactElement => {
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
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-8">
          <Input
            id="name"
            placeholder="Name of recipe*"
            className="w-full text-muted-foreground"
          />
          <Input
            id="cuisine"
            placeholder="Cuisine*"
            className="w-full text-muted-foreground"
          />
          <Textarea
            placeholder="Ingredient list*"
            className="w-full text-muted-foreground"
          />
          <Textarea
            placeholder="Recipe*"
            className="w-full text-muted-foreground"
          />
        </div>
        <DialogFooter>
          <div className="flex justify-end">
            <Button type="submit" className="w-fit">
              Submit recipe
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitRecipe;
