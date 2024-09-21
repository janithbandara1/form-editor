export type Form = {
  id: string
  name: string
  welcomeScreen: {
    title: string
    description: string
    buttonText: string
    buttonColor: "default" | "destructive" | "outline" | "secondary" | "ghost" | null // Constrain to valid variants
    imageUrl: string
    placement: "left" | "right"
  }
  endScreen: {
    title: string
    description: string
  }
  fields: {
    id: string
    type: "email"
    title: string
    description: string
    required: boolean
  }[]
}
