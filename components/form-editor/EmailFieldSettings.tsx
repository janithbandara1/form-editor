import { Form } from "@/types/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

type EmailFieldSettingsProps = {
  currentForm: Form
  updateForm: (form: Form) => void
  fieldId: string
  onClose: () => void
}

export default function EmailFieldSettings({ currentForm, updateForm, fieldId, onClose }: EmailFieldSettingsProps) {
  const field = currentForm.fields.find(f => f.id === fieldId)

  if (!field) return null

  const handleChange = (key: keyof typeof field, value: string | boolean) => {
    const updatedFields = currentForm.fields.map(f =>
      f.id === fieldId ? { ...f, [key]: value } : f
    )
    updateForm({ ...currentForm, fields: updatedFields })
  }

  return (
    <>
      <h2 className="font-semibold mb-2">Email Field</h2>
      <Label htmlFor="email-field-title">Title</Label>
      <Input
        id="email-field-title"
        value={field.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Title"
        className="mb-2"
      />
      <Label htmlFor="email-field-description">Description</Label>
      <Textarea
        id="email-field-description"
        value={field.description}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Description"
        className="mb-2"
      />
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="required"
          checked={field.required}
          onCheckedChange={(checked) => handleChange('required', checked)}
        />
        <Label htmlFor="required">Required</Label>
      </div>
      <div className="flex justify-between">
        <Button onClick={onClose}>Save</Button>
        <Button variant="outline" onClick={onClose}>Discard</Button>
      </div>
    </>
  )
}
