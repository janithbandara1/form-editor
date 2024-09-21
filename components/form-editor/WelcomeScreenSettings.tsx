import React, { useState } from 'react';
import { Form } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from 'lucide-react';

type WelcomeScreenSettingsProps = {
  currentForm: Form;
  updateForm: (form: Form) => void;
  onClose: () => void;
};

export default function WelcomeScreenSettings({ currentForm, updateForm, onClose }: WelcomeScreenSettingsProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(currentForm.welcomeScreen.imageUrl || null);

  const handleChange = (field: keyof Form['welcomeScreen'], value: string | boolean) => {
    updateForm({
      ...currentForm,
      welcomeScreen: { ...currentForm.welcomeScreen, [field]: value }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setImagePreview(imageDataUrl);
        handleChange('imageUrl', imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    handleChange('imageUrl', '');
  };

  return (
    <>
      <h2 className="font-semibold mb-2">Welcome Screen</h2>
      <Label htmlFor="welcome-title">Title</Label>
      <Input
        id="welcome-title"
        value={currentForm.welcomeScreen.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Title"
        className="mb-2"
      />
      <Label htmlFor="welcome-description">Description</Label>
      <Textarea
        id="welcome-description"
        value={currentForm.welcomeScreen.description}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Description"
        className="mb-2"
      />
      <Label htmlFor="welcome-button-text">Button Text</Label>
      <Input
        id="welcome-button-text"
        value={currentForm.welcomeScreen.buttonText}
        onChange={(e) => handleChange('buttonText', e.target.value)}
        placeholder="Button Text"
        className="mb-2"
      />

      <div className="mb-4">
        <Label>Image</Label>
        <div className="mt-2 flex items-center space-x-2">
          <Button variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Upload Image
          </Button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>

      {imagePreview && (
        <div className="mb-4">
          <Label>Image Preview</Label>
          <div className="mt-2 border rounded-md overflow-hidden">
            <img src={imagePreview} alt="Welcome screen" className="w-full h-auto" />
          </div>
          <Button variant="outline" onClick={removeImage} className="mt-2">
            <X className="mr-2 h-4 w-4" /> Remove Image
          </Button>
        </div>
      )}

      {imagePreview && (
        <div className="mb-4">
          <Label>Image Placement</Label>
          <div className="flex items-center space-x-2">
            <Button 
              variant={currentForm.welcomeScreen.placement === 'left' ? 'default' : 'outline'}
              onClick={() => handleChange('placement', 'left')}
            >
              Left
            </Button>
            <Button 
              variant={currentForm.welcomeScreen.placement === 'right' ? 'default' : 'outline'}
              onClick={() => handleChange('placement', 'right')}
            >
              Right
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <Button onClick={onClose}>Save</Button>
        <Button variant="outline" onClick={onClose}>Discard</Button>
      </div>
    </>
  );
}
