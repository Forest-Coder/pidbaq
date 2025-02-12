import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import tailwindStyles from "../index.css?inline";
import { addFeedback } from "@/lib/utils";
import { Feedback } from "@/types/feedback";
import { Flame, MailIcon } from "lucide-react";


const DEFAULT_RATING = 3;

interface FormData {
  name: HTMLInputElement;
  email: HTMLInputElement;
  feedback: HTMLTextAreaElement;
}

export const Widget = ({ projectId }: {projectId: string}) => {
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [submitted, setSubmitted] = useState(false);

  console.log(projectId);
  const onSelectRate = (index: number) => {
    setRating(index + 1);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData: FormData = {
      name: form.elements.namedItem('name') as HTMLInputElement,
      email: form.elements.namedItem('email') as HTMLInputElement,
      feedback: form.elements.namedItem('feedback') as HTMLTextAreaElement,
    };
    const data: Feedback = {
      projectId: projectId,
      userName: formData.name.value,
      userEmail: formData.email.value,
      message: formData.feedback.value,
      rating: rating,
    };

    console.log(data)
    const response = await addFeedback(data)
    //TODO Error handling for this one.
    // const { data: returnedData, error }

    setSubmitted(true);
    console.log(response.json())
  };

  return (
    <>
      <style>{tailwindStyles}</style>
      <div className="app widget fixed bottom-4 right-4 z-50 tailwind">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="rounded-full shadow-lg hover:scale-105">
              <MailIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="app widget rounded-lg bg-card p-4 shadpw-lg w-full max-w-md tailwind"  style={{marginRight: "2rem"}}>
            <style>{tailwindStyles}</style>
            <div className="tailwind">
              {submitted ? (
                <div>
                  <h3 className="text-lg font-bold">Thank you for your feedback!</h3>
                  <p className="mt-4">
                    We appreciate your feedback. It helps us improve our product and provide better
                    service to our customers.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold">Send us your feedback</h3>
                  <form
                    className="space-y-2"
                    onSubmit={submit}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="feedback">Feedback</Label>
                      <Textarea
                        id="feedback"
                        placeholder="Tell us what you think"
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, index) => (
                          <Flame
                            key={index}
                            className={` cursor-pointer ${rating > index ? "fill-primary" : "fill-muted stroke-muted-foreground"
                              }`}
                            onClick={() => onSelectRate(index)}
                          />
                        ))}
                      </div>
                      <Button type="submit">Submit</Button>
                    </div>
                  </form>
                </div>
              )}
              <Separator className="my-2" />
              <span className="text-gray-600 flex flex-row">
                Powered by&nbsp;
                <a
                  href={import.meta.env.VITE_FEEDBACK_SAAS_URL || "https://www.google.com"}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  <span className="flex">PIDBAQ <Flame /></span>

                </a>
              </span>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};