import React, { useState } from 'react'
import { Form } from "@/types/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type PreviewProps = {
  currentForm: Form
  currentPage: number
  setCurrentPage: (page: number) => void
}

export default function Preview({ currentForm, currentPage, setCurrentPage }: PreviewProps) {
  const [emailError, setEmailError] = useState<string | null>(null)
  const [emailInput, setEmailInput] = useState<string>('')

  const totalPages = currentForm.fields.length + 2 // Welcome, fields, and end screen

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.")
    } else {
      setEmailError(null)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmailInput(value)
    validateEmail(value)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1 && !emailError) {
      setCurrentPage(currentPage + 1)
    }
  }

  const renderWelcomeScreen = () => {
    const { title, description, buttonText, buttonColor, imageUrl, placement } = currentForm.welcomeScreen
    const imageContent = imageUrl && (
      <div className={`w-full md:w-1/2 ${placement === 'right' ? 'md:order-2' : ''}`}>
        <img src={imageUrl} alt="Welcome" className="w-full h-auto rounded-lg" />
      </div>
    )
    const textContent = (
      <div className={`w-full ${imageUrl ? 'md:w-1/2' : ''}`}>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{description}</p>
        <Button variant={buttonColor || "default"} onClick={handleNextPage}>{buttonText}</Button>
      </div>
    )

    return (
      <div className={`flex flex-col md:flex-row ${imageUrl ? 'md:space-x-4' : ''}`}>
        {placement === 'left' && imageContent}
        {textContent}
        {placement === 'right' && imageContent}
      </div>
    )
  }

  const renderCurrentContent = () => {
    if (currentPage === 0) {
      return renderWelcomeScreen()
    } else if (currentPage === totalPages - 1) {
      return (
        <>
          <h2 className="text-2xl font-bold mb-4">{currentForm.endScreen.title}</h2>
          <p>{currentForm.endScreen.description}</p>
        </>
      )
    } else {
      const field = currentForm.fields[currentPage - 1]
      return (
        <div className="mb-4">
          <Label htmlFor={field.id}>{field.title}</Label>
          <p className="text-gray-600">{field.description}</p>
          
          <Input
            id={field.id}
            type="email"
            placeholder="Enter your email"
            required={field.required}
            value={emailInput}
            onChange={handleEmailChange}
            className={`mb-2 ${emailError ? 'border-red-500' : ''}`}
          />
          
          {emailError && <p className="text-red-500">{emailError}</p>}
          <Button onClick={handleNextPage} disabled={!!emailError}>Next</Button>
        </div>
      )
    }
  }

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col">
        <div className="flex-grow">
          {renderCurrentContent()}
        </div>
      </div>
    </div>
  )
}
