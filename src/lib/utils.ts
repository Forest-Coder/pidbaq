import { Feedback } from "@/types/feedback"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const addFeedbackURL = import.meta.env.VITE_ADD_FEEDBACK_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function addFeedback(feedback: Feedback){
  return await fetch(addFeedbackURL, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(feedback)
  })
}
