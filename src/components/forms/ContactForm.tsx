"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { EnquiryFormSchema, type EnquiryFormData } from "@/lib/validations";

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(EnquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "" as any,
      location: "",
      projectStage: "" as any,
      businessStatus: "" as any,
      message: "",
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setSubmitStatus("loading");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    }
  };

  const handleRetry = () => {
    setSubmitStatus("idle");
  };

  if (submitStatus === "success") {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-8 animate-fade-in">
        <span className="text-xs uppercase tracking-[0.35em] text-primary block font-semibold">
          THANK YOU
        </span>
        <h2 className="text-4xl sm:text-5xl font-serif uppercase tracking-tight text-white leading-tight">
          Your Enquiry Has Been Received.
        </h2>
        <p className="text-sm md:text-base text-white/60 font-sans max-w-lg mx-auto leading-relaxed">
          Our advisory team will review your requirements and get in touch to discuss how THE DCO can assist with your hospitality project.
        </p>
        <div className="pt-6">
          <Link
            href="/"
            className="inline-block text-xs uppercase tracking-[0.25em] bg-transparent text-white border border-white hover:border-primary hover:bg-primary hover:text-black px-10 py-4.5 transition-all duration-300 font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="contact-form" className="max-w-7xl mx-auto px-6 md:px-12 py-24 scroll-mt-24">
      {submitStatus === "error" && (
        <div className="mb-12 p-6 border border-red-500/20 bg-red-950/20 text-white max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in">
          <div className="space-y-1">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-red-400">Submission Failed</h4>
            <p className="text-xs text-white/70">Something went wrong. Please try again or contact us directly.</p>
          </div>
          <button
            onClick={handleRetry}
            className="text-xs uppercase tracking-[0.25em] border border-white/20 text-white hover:border-white hover:bg-white hover:text-black px-6 py-2.5 transition-all duration-300 font-semibold cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-16">
        {/* Honeypot hidden input */}
        <div className="hidden aria-hidden:true">
          <label htmlFor="website">Leave this field blank if you are a human</label>
          <input
            id="website"
            type="text"
            autoComplete="off"
            {...register("website")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* Left Column: Primary Contact details */}
          <div className="space-y-12">
            <h3 className="text-xs uppercase tracking-[0.3em] text-primary/80 font-bold border-b border-primary/20 pb-2">
              01 — Primary Details
            </h3>

            {/* Full Name */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-white/50">
                Full Name <span className="text-primary">*</span>
              </label>
              <input
                id="name"
                type="text"
                className={`bg-black text-white border-b py-3 font-sans outline-none transition-colors duration-300 w-full ${
                  errors.name ? "border-red-500/55 focus:border-red-500" : "border-white/20 focus:border-primary"
                }`}
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-[10px] uppercase tracking-[0.15em] text-red-400 mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email Address */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-white/50">
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                id="email"
                type="email"
                className={`bg-black text-white border-b py-3 font-sans outline-none transition-colors duration-300 w-full ${
                  errors.email ? "border-red-500/55 focus:border-red-500" : "border-white/20 focus:border-primary"
                }`}
                placeholder="email@example.com"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-[10px] uppercase tracking-[0.15em] text-red-400 mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="phone" className="text-xs uppercase tracking-[0.2em] text-white/50">
                Phone Number <span className="text-primary">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                className={`bg-black text-white border-b py-3 font-sans outline-none transition-colors duration-300 w-full ${
                  errors.phone ? "border-red-500/55 focus:border-red-500" : "border-white/20 focus:border-primary"
                }`}
                placeholder="+91 00000 00000"
                {...register("phone")}
              />
              {errors.phone && (
                <span className="text-[10px] uppercase tracking-[0.15em] text-red-400 mt-1">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Business / Company Name */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="company" className="text-xs uppercase tracking-[0.2em] text-white/50">
                Business / Company Name
              </label>
              <input
                id="company"
                type="text"
                className="bg-black text-white border-b border-white/20 focus:border-primary py-3 font-sans outline-none transition-colors duration-300 w-full"
                placeholder="Your company name"
                {...register("company")}
              />
            </div>
          </div>

          {/* Right Column: Project details */}
          <div className="space-y-12">
            <h3 className="text-xs uppercase tracking-[0.3em] text-primary/80 font-bold border-b border-primary/20 pb-2">
              02 — Project Profile
            </h3>

            {/* Project Type */}
            <div className="flex flex-col space-y-2 relative">
              <label htmlFor="projectType" className="text-xs uppercase tracking-[0.2em] text-white/50">
                Project Type <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <select
                  id="projectType"
                  className={`bg-black text-white border-b py-3 font-sans outline-none transition-colors duration-300 w-full appearance-none cursor-pointer pr-10 ${
                    errors.projectType ? "border-red-500/55 focus:border-red-500" : "border-white/20 focus:border-primary"
                  }`}
                  {...register("projectType")}
                >
                  <option value="" disabled className="text-white/30 bg-black">
                    Select project type
                  </option>
                  <option value="Hotel" className="bg-black text-white">Hotel</option>
                  <option value="Restaurant" className="bg-black text-white">Restaurant</option>
                  <option value="Resort" className="bg-black text-white">Resort</option>
                  <option value="Café" className="bg-black text-white">Café</option>
                  <option value="QSR" className="bg-black text-white">QSR</option>
                  <option value="Banquet / Events" className="bg-black text-white">Banquet / Events</option>
                  <option value="Cloud Kitchen" className="bg-black text-white">Cloud Kitchen</option>
                  <option value="Hospitality Investment" className="bg-black text-white">Hospitality Investment</option>
                  <option value="Existing Business Improvement" className="bg-black text-white">Existing Business Improvement</option>
                  <option value="Other" className="bg-black text-white">Other</option>
                </select>
                {/* Custom drop-down chevron */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.576 0 0.436 0.445 0.408 1.197 0 1.615l-4.695 4.502c-0.218 0.209-0.509 0.314-0.789 0.314s-0.571-0.105-0.789-0.314l-4.695-4.502c-0.408-0.418-0.436-1.17 0-1.615z" />
                  </svg>
                </div>
              </div>
              {errors.projectType && (
                <span className="text-[10px] uppercase tracking-[0.15em] text-red-400 mt-1">
                  {errors.projectType.message}
                </span>
              )}
            </div>

            {/* Location */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="location" className="text-xs uppercase tracking-[0.2em] text-white/50">
                Location
              </label>
              <input
                id="location"
                type="text"
                className="bg-black text-white border-b border-white/20 focus:border-primary py-3 font-sans outline-none transition-colors duration-300 w-full"
                placeholder="e.g. Mumbai, Maharashtra"
                {...register("location")}
              />
            </div>

            {/* Current Business Status */}
            <div className="flex flex-col space-y-2 relative">
              <label htmlFor="businessStatus" className="text-xs uppercase tracking-[0.2em] text-white/50">
                Current Business Status
              </label>
              <div className="relative">
                <select
                  id="businessStatus"
                  className="bg-black text-white border-b border-white/20 focus:border-primary py-3 font-sans outline-none transition-colors duration-300 w-full appearance-none cursor-pointer pr-10"
                  {...register("businessStatus")}
                >
                  <option value="" className="text-white/30 bg-black">
                    Select status
                  </option>
                  <option value="Planning a New Project" className="bg-black text-white">Planning a New Project</option>
                  <option value="Currently Operating" className="bg-black text-white">Currently Operating</option>
                  <option value="Renovation / Expansion" className="bg-black text-white">Renovation / Expansion</option>
                  <option value="Looking for Improvement" className="bg-black text-white">Looking for Improvement</option>
                  <option value="Investment Planning" className="bg-black text-white">Investment Planning</option>
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.576 0 0.436 0.445 0.408 1.197 0 1.615l-4.695 4.502c-0.218 0.209-0.509 0.314-0.789 0.314s-0.571-0.105-0.789-0.314l-4.695-4.502c-0.408-0.418-0.436-1.17 0-1.615z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Approximate Project Stage */}
            <div className="flex flex-col space-y-2 relative">
              <label htmlFor="projectStage" className="text-xs uppercase tracking-[0.2em] text-white/50">
                Approximate Project Stage
              </label>
              <div className="relative">
                <select
                  id="projectStage"
                  className="bg-black text-white border-b border-white/20 focus:border-primary py-3 font-sans outline-none transition-colors duration-300 w-full appearance-none cursor-pointer pr-10"
                  {...register("projectStage")}
                >
                  <option value="" className="text-white/30 bg-black">
                    Select stage
                  </option>
                  <option value="Concept" className="bg-black text-white">Concept</option>
                  <option value="Planning" className="bg-black text-white">Planning</option>
                  <option value="Pre-Opening" className="bg-black text-white">Pre-Opening</option>
                  <option value="Operating" className="bg-black text-white">Operating</option>
                  <option value="Expansion" className="bg-black text-white">Expansion</option>
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.576 0 0.436 0.445 0.408 1.197 0 1.615l-4.695 4.502c-0.218 0.209-0.509 0.314-0.789 0.314s-0.571-0.105-0.789-0.314l-4.695-4.502c-0.408-0.418-0.436-1.17 0-1.615z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message / Project Details */}
        <div className="flex flex-col space-y-2 pt-6">
          <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-white/50">
            Tell us about your project <span className="text-primary">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            className={`bg-black text-white border-b py-3 font-sans outline-none resize-none transition-colors duration-300 w-full ${
              errors.message ? "border-red-500/55 focus:border-red-500" : "border-white/20 focus:border-primary"
            }`}
            placeholder="Tell us briefly about your business, project, current challenge or what you would like help with."
            {...register("message")}
          />
          {errors.message && (
            <span className="text-[10px] uppercase tracking-[0.15em] text-red-400 mt-1">
              {errors.message.message}
            </span>
          )}
        </div>

        {/* Submit Container */}
        <div className="pt-6 flex flex-col items-center">
          <button
            type="submit"
            disabled={submitStatus === "loading"}
            className="inline-block text-xs uppercase tracking-[0.25em] bg-transparent text-white border border-white hover:border-primary hover:bg-primary hover:text-black px-12 py-5 transition-all duration-300 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
          >
            {submitStatus === "loading" ? "Sending..." : "Send Enquiry"}
          </button>
        </div>
      </form>
    </div>
  );
}
