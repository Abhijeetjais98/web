"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const ContactForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const formRef = useRef();
//   console.log(`env : ${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`)

  const onSubmitHandler = async (data) => {
    await onSubmit(data);
    await emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      formRef.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    reset();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Your Name
            </label>
            <Input
              {...register("name", { required: "Name is required" })}
              type="text"
              name="name"
              placeholder="Huzaif"
              className="rounded-lg border-primary/20"
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
       
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Email
          </label>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            name="email"
            placeholder="huzaif@example.com"
            className="rounded-lg border-primary/20"
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Message
          </label>
          <Textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Write your message here..."
            className="rounded-lg border-primary/20 min-h-[150px]"
          />
          {errors.message && (
            <span className="text-xs text-red-500">
              {errors.message.message}
            </span>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full rounded-xl py-6 text-base font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;
