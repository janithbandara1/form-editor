import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusIcon } from "lucide-react"

type AddFieldDialogProps = {
  addField: (fieldType: "email") => void
}

export default function AddFieldDialog({ addField }: AddFieldDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleAddField = (fieldType: "email") => {
    addField(fieldType)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <PlusIcon className="mr-2 h-4 w-4" /> Add Field
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Field</DialogTitle>
        </DialogHeader>
        <Button onClick={() => handleAddField("email")} className="w-full justify-start">
          Email
        </Button>
      </DialogContent>
    </Dialog>
  )
}
