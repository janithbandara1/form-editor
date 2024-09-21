import { Form } from "@/types/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type EndScreenSettingsProps = {
  currentForm: Form
  updateForm: (form: Form) => void
  onClose: () => void
}

export default function EndScreenSettings({ currentForm, updateForm, onClose }: EndScreenSettingsProps) {
  const handleChange = (field: keyof Form['endScreen'], value: string) => {
    updateForm({
      ...currentForm,
      endScreen: { ...currentForm.endScreen, [field]: value }
    })
  }

  return (
    <>
      <h2 className="font-semibold mb-2">End Screen</h2>
      <Label htmlFor="end-screen-title">Title</Label>
      <Input
        id="end-screen-title"
        value={currentForm.endScreen.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Title"
        className="mb-2"
      />
      <Label htmlFor="end-screen-description">Description</Label>
      <Textarea
        id="end-screen-description"
        value={currentForm.endScreen.description}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Description"
        className="mb-2"
      />
      <div className="flex justify-between mt-4">
        <Button onClick={onClose}>Save</Button>
        <Button variant="outline" onClick={onClose}>Discard</Button>
      </div>
    </>
  )
}
