"use client";

import { useState } from "react";
import { Form } from "@/types/form";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import Preview from "./Preview";

export default function FormEditor() {
  const [forms, setForms] = useState<Form[]>([]);
  const [currentForm, setCurrentForm] = useState<Form | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const createForm = (newForm: Form) => {
    setForms([...forms, newForm]);
    setCurrentForm(newForm);
  };

  const updateForm = (updatedForm: Form) => {
    setForms(forms.map(form => form.id === updatedForm.id ? updatedForm : form));
    setCurrentForm(updatedForm);
  };

  const deleteForm = () => {
    if (currentForm) {
      setForms(forms.filter(form => form.id !== currentForm.id));
      setCurrentForm(null);
      setCurrentPage(0); // Reset page when deleting the form
    }
  };

  if (!currentForm) {
    return <Dashboard forms={forms} createForm={createForm} setCurrentForm={setCurrentForm} />;
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        currentForm={currentForm}
        updateForm={updateForm}
        deleteForm={deleteForm}
        setCurrentForm={setCurrentForm}
        setCurrentPage={setCurrentPage} // Pass setCurrentPage to Sidebar
      />
      <Preview
        currentForm={currentForm}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} // Pass setCurrentPage to Preview
      />
    </div>
  );
}
