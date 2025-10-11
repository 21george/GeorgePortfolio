"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Time from "./Time";

export default function Contacts() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("sayHello");

    // Data arrays for select options
    const companyStageOptions = [
        { value: "", label: "Select your company stage" },
        { value: "startup", label: "Startup" },
        { value: "growth", label: "Growth" },
        { value: "established", label: "Established" },
    ];

    const deadlineOptions = [
        { value: "", label: "Please select" },
        { value: "no_rush", label: "No, no rush" },
        { value: "within_month", label: "Yes, within a month" },
        { value: "1_3_months", label: "1-3 months" },
        { value: "3_6_months", label: "3-6 months" },
        { value: "not_applicable", label: "Not applicable" },
    ];

    const budgetOptions = [
        { value: "", label: "Please select" },
        { value: "under_1000", label: "Under $1,000" },
        { value: "1000_5000", label: "$1,000 - $5,000" },
        { value: "5000_10000", label: "$5,000 - $10,000" },
        { value: "over_10000", label: "Over $10,000" },
        { value: "not_applicable", label: "Not applicable" },
        { value: "not_sure", label: "I am not sure" },
        { value: "subscription", label: "85 Euro per month" },
    ];

    const referralSources = ['Friend', 'Social Media', 'Search Engine', 'Other'];

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        website: "",
        nachricht: "",
        companyStage: "",
        deadline: "",
        budget: "",
        referralSource: [],
        formType: "", // ✅ This should be set dynamically
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    const validatePhone = (phone) => {
        // Basic phone validation - adjust regex as needed
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Required field validation
        if (!formData.fullname.trim()) {
            newErrors.fullname = "Name is required";
        }
        
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Phone validation (if provided)
        if (formData.phone && !validatePhone(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        // Website validation (if provided)
        if (formData.website && formData.website.trim()) {
            try {
                // Add protocol if missing
                const url = formData.website.startsWith('http') 
                    ? formData.website 
                    : `https://${formData.website}`;
                new URL(url);
            } catch {
                newErrors.website = "Please enter a valid website URL";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleReferralToggle = (source) => {
        const currentSources = formData.referralSource || [];
        const updatedSources = currentSources.includes(source)
            ? currentSources.filter(s => s !== source)
            : [...currentSources, source];
        
        setFormData({ ...formData, referralSource: updatedSources });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setMessage({ type: "error", text: "Please correct the errors in the form." });
            return;
        }

        setIsSubmitting(true);
        setMessage({ type: "", text: "" });

        try {
            const response = await fetch("/api/ContactForm", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    ...formData,
                    formType: activeTab 
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Server error: ${response.status}`);
            }

            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || "Error submitting form");
            }

            setMessage({
                type: "success",
                text: "Your message has been sent successfully! You will receive a confirmation email shortly.",
            });

            // Reset form
            setFormData({ 
                fullname: "", 
                email: "", 
                phone: "",
                website: "", 
                nachricht: "", 
                companyStage: "",
                deadline: "", 
                budget: "", 
                referralSource: [],
                formType: "",
            });

            // Optional: redirect after success
            setTimeout(() => {
                router.back();
            }, 2000);

        } catch (error) {
            console.error("Submission error:", error);
            setMessage({
                type: "error",
                text: error.message || "There was an error sending your message. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full bg-neutral-800 pt-12 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Message Display */}
                {message.text && (
                    <div
                        className={`mb-8 p-4 rounded-sm border ${
                            message.type === "success"
                                ? "bg-green-900/50 text-green-200 border-green-700"
                                : "bg-red-900/50 text-red-200 border-red-700"
                        }`}
                    >
                        {message.text}
                    </div>
                )}
                
                <div className="tr__tabs flex justify-between items-center mb-12">
                    <button
                        onClick={() => setActiveTab("sayHello")}
                        className={`px-4 py-2 text-2xl sm:text-xl font-medium ${
                            activeTab === "sayHello" ? "text-white border-b-2 border-blue-500" : "text-gray-400"
                        }`}
                    >
                        SAY HELLO!
                    </button>
                    <button onClick={() => setActiveTab("getQuote")}
                        className={`px-4 py-2 text-2xl sm:text-xl font-medium ${ activeTab === "getQuote" ? "text-white border-b-2 border-blue-500" : "text-gray-400"}`}>
                        GET A QUOTE
                    </button>
                    <Time />
                </div>

                {/* SAY HELLO Form */}
                {activeTab === "sayHello" && (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-3 font-medium text-white">
                                    What's your name? *
                                </label>
                                <input
                                    type="text"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    placeholder="Your Full Name"
                                    required
                                    className={`w-full h-[4em] px-4 py-3 rounded-sm bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                                        errors.fullname ? "border-red-500" : "border-gray-600"
                                    }`}
                                />
                                {errors.fullname && <p className="text-red-400 text-sm mt-2">{errors.fullname}</p>}
                            </div>

                            <div>
                                <label className="block mb-3 font-medium text-white">
                                    What's your email? *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    required
                                    className={`w-full h-[4em] px-4 py-3 rounded-sm bg-gray-800 border text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                                        errors.email ? "border-red-500" : "border-gray-600"
                                    }`}
                                />
                                {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
                            </div>
                        </div>

                        {/* Phone & Company */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-3 font-medium text-white">
                                    What is your Phone Number?
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="123-456-7890"
                                    className={`w-full h-[4em] px-4 py-3 rounded-sm bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                                        errors.phone ? "border-red-500" : "border-gray-600"
                                    }`}
                                />
                                {errors.phone && <p className="text-red-400 text-sm mt-2">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="block mb-3 font-medium text-white">
                                    Company/Organisation
                                </label>
                                <input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    placeholder="Ex. Trionn"
                                    className={`w-full h-[4em] px-4 py-3 rounded-sm bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                                        errors.website ? "border-red-500" : "border-gray-600"
                                    }`}
                                />
                                {errors.website && <p className="text-red-400 text-sm mt-2">{errors.website}</p>}
                            </div>
                        </div>

                        {/* Project Brief */}
                        <div>
                            <label className="block mb-3 font-medium text-white">
                                What's your brief?
                            </label>
                            <textarea
                                name="nachricht"
                                value={formData.nachricht}
                                onChange={handleChange}
                                placeholder="Write your brief here: I need ___ with this scope, pages, specific needs..."
                                rows="6"
                                className="w-full px-4 py-3 rounded-sm bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-vertical"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full md:w-auto px-8 py-4 rounded-sm font-semibold text-lg transition-all duration-300 ${
                                    isSubmitting
                                        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                                }`}
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </div>
                    </form>
                )}

                {/* GET QUOTE Form */}
                {activeTab === "getQuote" && (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Info - Same as above */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-3 font-medium text-white">
                                    What's your name? *
                                </label>
                                <input
                                    type="text"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    placeholder="Your Full Name"
                                    required
                                    className={`w-full h-[4em] px-4 py-3 rounded-sm bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                                        errors.fullname ? "border-red-500" : "border-gray-600"
                                    }`}
                                />
                                {errors.fullname && <p className="text-red-400 text-sm mt-2">{errors.fullname}</p>}
                            </div>

                            <div>
                                <label className="block mb-3 font-medium text-white">
                                    What's your email? *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    required
                                    className={`w-full h-[4em] px-4 py-3 rounded-sm bg-gray-800 border text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                                        errors.email ? "border-red-500" : "border-gray-600"
                                    }`}
                                />
                                {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
                            </div>
                        </div>

                        {/* Phone & Website */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-3 font-medium text-white">
                                    What is your Phone Number?
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="123-456-7890"
                                    className={`w-full h-[4em] px-4 py-3 rounded-sm bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                                        errors.phone ? "border-red-500" : "border-gray-600"
                                    }`}
                                />
                                {errors.phone && <p className="text-red-400 text-sm mt-2">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="block mb-3 font-medium text-white">
                                    Current website URL
                                </label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    placeholder="www.example.com"
                                    className={`w-full h-[4em] px-4 py-3 rounded-sm bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                                        errors.website ? "border-red-500" : "border-gray-600"
                                    }`}
                                />
                                {errors.website && <p className="text-red-400 text-sm mt-2">{errors.website}</p>}
                            </div>
                        </div>

                        {/* Company Stage & Deadline */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-3 font-medium text-white">
                                    Company Stage
                                </label>
                                <select
                                    name="companyStage"
                                    value={formData.companyStage}
                                    onChange={handleChange}
                                    className="w-full h-[4em] px-4 py-3 rounded-sm bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                >
                                    {companyStageOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-3 font-medium text-white">
                                    Do you have a deadline?
                                </label>
                                <select
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="w-full h-[4em] px-4 py-3 rounded-sm bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                >
                                    {deadlineOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Budget */}
                        <div>
                            <label className="block mb-3 font-medium text-white">
                                What is your estimated budget?
                            </label>
                            <select
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full h-[4em] px-4 py-3 rounded-sm bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            >
                                {budgetOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Referral Source */}
                        <div>
                            <label className="block mb-4 font-medium text-white">
                                Where did you hear about me?
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {referralSources.map((source) => (
                                    <button
                                        key={source}
                                        type="button"
                                        onClick={() => handleReferralToggle(source)}
                                        className={`px-4 py-2 rounded-sm border transition-all ${
                                            formData.referralSource?.includes(source)
                                                ? 'bg-blue-600 border-blue-600 text-white'
                                                : 'bg-transparent border-gray-600 text-gray-300 hover:border-gray-400'
                                        }`}
                                    >
                                        {source}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Project Brief */}
                        <div>
                            <label className="block mb-3 font-medium text-white">
                                What's your brief?
                            </label>
                            <textarea
                                name="nachricht"
                                value={formData.nachricht}
                                onChange={handleChange}
                                placeholder="Write your brief here: I need ___ with this scope, pages, specific needs..."
                                rows="6"
                                className="w-full px-4 py-3 rounded-sm bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-vertical"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full md:w-auto px-8 py-4 rounded-sm font-semibold text-lg transition-all duration-300 ${
                                    isSubmitting
                                        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                                }`}
                            >
                                {isSubmitting ? "Sending..." : "Get Quote"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
