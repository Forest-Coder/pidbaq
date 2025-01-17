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
import { Flame, MessageSquareText } from "lucide-react";


const DEFAULT_RATING = 3;

export const Widget = ({ projectId }: any) => {
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [submitted, setSubmitted] = useState(false);

  const onSelectRate = (index: number) => {
    setRating(index + 1);
  };

  const submit = async (e: { preventDefault: () => void; target: any; }) => {
    e.preventDefault();
    const form = e.target;
    const data: Feedback = {
      projectId: projectId,
      userName: form.name.value,
      userEmail: form.email.value,
      message: form.feedback.value,
      rating: rating,
    };

    //@ts-ignore
    const request = await addFeedback(data)
    //TODO Error handling for this one.
    // const { data: returnedData, error }

    setSubmitted(true);
    // console.log(request)
  };

  return (
    <>
      <style>{tailwindStyles}</style>
      <div className="widget fixed bottom-4 right-4 z-50">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="rounded-full shadow-lg hover:scale-105">
              <MessageSquareText />
              Feedback
            </Button>
          </PopoverTrigger>
          <PopoverContent className="widget rounded-lg bg-card p-4 shadpw-lg w-full max-w-md">
            <style>{tailwindStyles}</style>
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
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};