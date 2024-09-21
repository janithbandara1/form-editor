import { Form } from "@/types/form"
import { Button } from "@/components/ui/button"
import CreateFormDialog from "./CreateFormDialog"

type DashboardProps = {
  forms: Form[]
  createForm: (newForm: Form) => void
  setCurrentForm: (form: Form) => void
}

export default function Dashboard({ forms, createForm, setCurrentForm }: DashboardProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Form Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CreateFormDialog createForm={createForm} />
        {forms.map(form => (
          <Button
            key={form.id}
            variant="outline"
            className="h-40 w-full"
            onClick={() => setCurrentForm(form)}
          >
            {form.name}
          </Button>
        ))}
      </div>
    </div>
  )
}