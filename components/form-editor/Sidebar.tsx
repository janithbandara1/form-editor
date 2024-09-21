import { useState } from "react"
import { Form } from "@/types/form"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, SettingsIcon, XIcon } from "lucide-react"
import AddFieldDialog from "./AddFieldDialog"
import WelcomeScreenSettings from "./WelcomeScreenSettings"
import EndScreenSettings from "./EndScreenSettings"
import EmailFieldSettings from "./EmailFieldSettings"
import FormSettings from "./FormSettings"

type SidebarProps = {
  currentForm: Form
  updateForm: (form: Form) => void
  deleteForm: () => void
  setCurrentForm: (form: Form | null) => void
  setCurrentPage: (page: number) => void
}

export default function Sidebar({ currentForm, updateForm, deleteForm, setCurrentForm, setCurrentPage }: SidebarProps) {
  const [sidebarContent, setSidebarContent] = useState<"default" | "settings" | "welcome" | "end" | "field">("default")
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null)

  const addField = (fieldType: "email") => {
    const newField = {
      id: Date.now().toString(),
      type: fieldType,
      title: "Email",
      description: "Please enter your email",
      required: false
    }
    updateForm({
      ...currentForm,
      fields: [...currentForm.fields, newField]
    })
    setSelectedFieldId(newField.id)
    setSidebarContent("field")
  }

  const removeField = (fieldId: string) => {
    updateForm({
      ...currentForm,
      fields: currentForm.fields.filter(field => field.id !== fieldId)
    })
    setSidebarContent("default")
  }

  return (
    <div className="w-64 bg-white border-r relative">
      <div className="p-4 h-full overflow-y-auto">
        {sidebarContent === "default" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={() => setCurrentForm(null)}>
                <ChevronLeftIcon className="mr-2 h-4 w-4" />
                dashboard &gt; {currentForm.name}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setSidebarContent("settings")}>
                <SettingsIcon className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="font-semibold mb-2">Steps</h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => {
                setSidebarContent("welcome")
                setCurrentPage(0) // Navigate to Welcome Screen
              }}>
                Welcome Screen
              </Button>
              {currentForm.fields.map((field, index) => (
                <div key={field.id} className="flex items-center">
                  <Button variant="outline" className="w-full justify-start" onClick={() => {
                    setSelectedFieldId(field.id)
                    setSidebarContent("field")
                    setCurrentPage(index + 1) // Navigate to the specific field page
                  }}>
                    {field.title}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => removeField(field.id)}>
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <AddFieldDialog addField={addField} />
              <Button variant="outline" className="w-full justify-start" onClick={() => {
                setSidebarContent("end")
                setCurrentPage(currentForm.fields.length + 1) // Navigate to End Screen
              }}>
                End Screen
              </Button>
            </div>
          </>
        )}
        {sidebarContent === "settings" && (
          <div className="mt-4">
            <FormSettings
              currentForm={currentForm}
              updateForm={updateForm}
              onClose={() => setSidebarContent("default")}
            />
          </div>
        )}
        {sidebarContent === "welcome" && (
          <div className="mt-4">
            <WelcomeScreenSettings
              currentForm={currentForm}
              updateForm={updateForm}
              onClose={() => setSidebarContent("default")}
            />
          </div>
        )}
        {sidebarContent === "end" && (
          <div className="mt-4">
            <EndScreenSettings
              currentForm={currentForm}
              updateForm={updateForm}
              onClose={() => setSidebarContent("default")}
            />
          </div>
        )}
        {sidebarContent === "field" && selectedFieldId && (
          <div className="mt-4">
            <EmailFieldSettings
              currentForm={currentForm}
              updateForm={updateForm}
              fieldId={selectedFieldId}
              onClose={() => setSidebarContent("default")}
            />
          </div>
        )}
        {sidebarContent !== "default" && (
          <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={() => setSidebarContent("default")}>
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      {sidebarContent === "default" && (
        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
          <Button onClick={() => updateForm(currentForm)}>Save</Button>
          <Button variant="destructive" onClick={deleteForm}>Delete</Button>
        </div>
      )}
    </div>
  )
}
