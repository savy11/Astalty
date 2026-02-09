"use client";

import Image from "next/image";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    businessName: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    hearAbout: "",
    teamSize: "",
    services: "",
    privacy: false,
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log(formData);

  const payload = {
    businessName: formData.businessName,
    firstName: formData.firstName,
    lastName: formData.lastName,
    mobileNumber: formData.mobile,
    email: formData.email,
    password: formData.password,
    hereAboutUs: formData.hearAbout,
    sizeOfTeam: formData.teamSize,
    serviceProvide: formData.services,
    privacyPolicyStatus: formData.privacy,
    termsAndConditionsStatus: formData.terms,
  };

  const baseApiUrl = process.env.BASE_API_URL

  try {
    const response = await fetch(`${baseApiUrl}/api/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("User created successfully:", data);
      // reset form or redirect if needed
    } else {
      console.error("Error creating user:", data);
      alert(data.message || "Failed to create user");
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Network error, please try again later");
  }
};

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 max-w-3xl mx-auto space-y-4">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold">Get started in <s>hours</s> minutes</h2>
        <Image src="/images/basics_of_health_insurance_blog.png" alt="logo" className="h-8" />
      </div>

      <div className="bg-blue-50 p-3 rounded flex justify-between text-sm items-center">
        <p>ℹ️ Do you need rostering? Our rostering system is not yet available.</p>
        <a href="#" className="text-blue-600 font-medium hover:underline">Join the waitlist →</a>
      </div>

      <input
        type="text"
        name="businessName"
        onChange={handleChange}
        placeholder="Business name"
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          name="firstName"
          onChange={handleChange}
          placeholder="First name"
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          placeholder="Last name"
          className="border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="tel"
          name="mobile"
          onChange={handleChange}
          placeholder="Mobile"
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className="border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Password"
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="relative">
          <select
            name="hearAbout"
            onChange={handleChange}
            className="appearance-none w-full border border-gray-300 rounded px-3 py-2 pr-8"
          >
            <option value="">How did you hear about us?</option>
            <option>Google</option>
            <option>Friend</option>
            <option>Other</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
              <path d="M6 9l4 4 4-4"></path>
            </svg>
          </div>
        </div>

        <div className="relative">
          <select
            name="teamSize"
            onChange={handleChange}
            className="appearance-none w-full border border-gray-300 rounded px-3 py-2 pr-8"
          >
            <option value="">How big is your team?</option>
            <option>1-10</option>
            <option>10-50</option>
            <option>50+</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
              <path d="M6 9l4 4 4-4"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="relative">
        <select
          name="services"
          onChange={handleChange}
          className="appearance-none w-full border border-gray-300 rounded px-3 py-2 pr-8">
          <option value="">Which services do you provide?</option>
          <option>Service A</option>
          <option>Service B</option>
          <option>Service C</option>
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
            <path d="M6 9l4 4 4-4"></path>
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            name="privacy"
            checked={formData.privacy}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span>I have read the <a href="#" className="text-blue-600 underline">Privacy Policy</a></span>
        </label>

        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span>I have read and agree to Astalty&apos;s <a href="#" className="text-blue-600 underline">Terms and Conditions</a></span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-[#000000] hover:bg-[#001930] text-white py-3 rounded-md"
      >
        Start 14-day free trialls
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account? <a href="#" className="text-blue-600 font-medium">Sign in here</a>
      </p>
    </form>
  );
}
