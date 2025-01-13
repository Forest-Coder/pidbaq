import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const addFeedbackURL = import.meta.env.VITE_ADD_FEEDBACK_URL;
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export async function addFeedback(data){
  console.log(addFeedbackURL)
  return await fetch(addFeedbackURL, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).catch(err => {
    console.error(err)
  })
}
