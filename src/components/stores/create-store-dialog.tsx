import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateStoreForm } from "./create-store-form";

import { VisuallyHidden } from "@/components/ui/visually-hidden";
export function CreateStoreDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-600">
          <PlusCircle className="h-4 w-4" />
          Create Store
        </Button>
      </DialogTrigger>
      <DialogContent className=" max-h-[90vh] overflow-y-auto ">
        <VisuallyHidden>
          <DialogTitle>Create a New Store</DialogTitle>
        </VisuallyHidden>
        <CreateStoreForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}