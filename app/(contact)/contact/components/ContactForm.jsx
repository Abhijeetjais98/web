"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

const ContactForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const formRef = useRef();

  const onSubmitHandler = async (data) => {
    // If a parent provided an onSubmit prop, call it (optional)
    if (typeof onSubmit === "function") {
      try {
        await onSubmit(data);
      } catch (err) {
        // parent handler failed — continue to attempt sending via Web3Forms
        console.warn("parent onSubmit threw:", err);
      }
    }

    const formElement = formRef.current;
    if (!formElement) return;

    const formData = new FormData(formElement);

    // NOTE: this access_key you provided earlier — keep it here or replace with an env var if you prefer
    formData.append("access_key", "d23dfcfa-f678-4535-8c7a-ec3f25dd219e");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
       console.log("Message sent successfully");
        reset();
      } else {
        // web3forms returns a `message` key on error
        alert("Error: " + (result?.message || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
      <div className="space-y-4">
        {/* Name and Email in a 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-muted-foreground block">
              Your Name
            </label>
            <Input
              {...register("name", { required: "Name is required" })}
              id="name"
              type="text"
              name="name"
              placeholder="Abhijeet"
              className="rounded-lg border-primary/20 w-full"
            />
            {errors.name && (
              <span className="text-xs text-red-500 block mt-1">{errors.name.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-muted-foreground block">
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
              id="email"
              type="email"
              name="email"
              placeholder="xyz@gmail.com"
              className="rounded-lg border-primary/20 w-full"
            />
            {errors.email && (
              <span className="text-xs text-red-500 block mt-1">{errors.email.message}</span>
            )}
          </div>
        </div>

        {/* Message field - full width */}
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-muted-foreground block">
            Message
          </label>
          <Textarea
            {...register("message", { required: "Message is required" })}
            id="message"
            name="message"
            placeholder="Write your message here..."
            className="rounded-lg border-primary/20 min-h-[150px] w-full resize-y"
          />
          {errors.message && (
            <span className="text-xs text-red-500 block mt-1">{errors.message.message}</span>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full rounded-xl py-6 text-base font-semibold mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;
