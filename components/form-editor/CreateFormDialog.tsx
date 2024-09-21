import { useState } from "react"
import { Form } from "@/types/form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PlusIcon } from "lucide-react"

type CreateFormDialogProps = {
  createForm: (newForm: Form) => void
}

export default function CreateFormDialog({ createForm }: CreateFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newFormName, setNewFormName] = useState("")

  const handleCreateForm = () => {
    const newForm: Form = {
      id: Date.now().toString(),
      name: newFormName,
      welcomeScreen: {
        title: "Welcome",
        description: "Please fill out this form",
        buttonText: "Start",
        image: "",
        placement: "right"
      },
      endScreen: {
        title: "Thank you",
        description: "Your response has been recorded"
      },
      fields: []
    }
    createForm(newForm)
    setIsOpen(false)
    setNewFormName("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-40 w-full">
          <PlusIcon className="mr-2 h-4 w-4" /> Create Form
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
        </DialogHeader>
        <Input
          value={newFormName}
          onChange={(e) => setNewFormName(e.target.value)}
          placeholder="Form Name"
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateForm}>Create Form</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}