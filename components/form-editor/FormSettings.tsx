import { Form } from "@/types/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FormSettingsProps = {
  currentForm: Form
  updateForm: (form: Form) => void
  onClose: () => void
}

export default function FormSettings({ currentForm, updateForm, onClose }: FormSettingsProps) {
  const handleChange = (value: string) => {
    updateForm({ ...currentForm, name: value })
  }

  return (
    <>
      <h2 className="font-semibold mb-2">Form Settings</h2>
      <Label htmlFor="form-name">Form Name</Label>
      <Input
        id="form-name"
        value={currentForm.name}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Form Name"
        className="mb-4"
      />
      <div className="flex justify-between">
        <Button onClick={onClose}>Save</Button>
        <Button variant="outline" onClick={onClose}>Discard</Button>
      </div>
    </>
  )
}
