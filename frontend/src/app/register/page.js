"use client";
import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

function SelectDropdown({ label, options, selected, setSelected }) {
  return (
    <div className="relative">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Button
              className={`peer h-10 w-full flex items-center justify-between rounded-md bg-white px-3 text-sm ring-2 ring-inset ${open ? "ring-primary" : "ring-gray-400"
                }`}
            >
              <span>{selected?.label || `Select ${label}`}</span>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""
                  }`}
              />
            </Listbox.Button>

            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
              {Array.isArray(options) &&
                options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option}
                    className={({ active }) =>
                      `cursor-pointer select-none px-4 py-2 ${active ? "bg-gray-100 text-primary" : "text-gray-900"
                      }`
                    }
                  >
                    {option.label}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </>
        )}
      </Listbox>
      <label className="pointer-events-none cursor-text absolute left-2 z-10 max-w-[calc(100%-0.75rem)] scale-100 transform overflow-hidden bg-white text-ellipsis whitespace-nowrap duration-150 select-none peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:px-1 peer-focus:text-xs peer-disabled:cursor-default -top-2 translate-y-0 px-1 text-xs">
        {label}
      </label>
    </div>
  );
}

function MultiSelectDropdown({ label, options, selected, setSelected }) {
  return (
    <div className="relative">
      <Listbox value={selected} onChange={setSelected} multiple>
        {({ open }) => (
          <>
            <Listbox.Button
              className={`peer h-12 w-full flex items-center justify-between rounded-md bg-white px-3 text-sm ring-2 ring-inset ${open ? "ring-primary" : "ring-gray-400"
                }`}
            >
              <span>
                {selected.length > 0
                  ? selected.map((item) => item.label).join(", ")
                  : `Select ${label}`}
              </span>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""
                  }`}
              />
            </Listbox.Button>

            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
              {Array.isArray(options) &&
                options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option}
                    className={({ active }) =>
                      `cursor-pointer select-none px-4 py-2 ${active ? "bg-gray-100 text-primary" : "text-gray-900"
                      }`
                    }
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selected.some(
                          (selectedItem) => selectedItem.value === option.value
                        )}
                        readOnly
                        className="h-4 w-4 rounded-sm border-gray-300 text-primary focus:ring-primary"
                      />
                      {option.label}
                    </div>
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </>
        )}
      </Listbox>
      <label className="pointer-events-none cursor-text absolute left-2 z-10 max-w-[calc(100%-0.75rem)] scale-100 transform overflow-hidden bg-white text-ellipsis whitespace-nowrap duration-150 select-none peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:px-1 peer-focus:text-xs peer-disabled:cursor-default -top-2 translate-y-0 px-1 text-xs">
        {label}
      </label>
    </div>
  );
}

export default function SignUpPage() {

  //  HereAboutUsOptions add from here
  const [hereAboutUsOptions, setHereAboutUsOptions] = useState([]);

  // HowBigYourTeam add from here
  const[bigTeamSizeOptions,setBigTeamSizeOptions] = useState([]);

  // HowBigYourTeam add from here
  const[serviceProviderOptions,setServiceProviderOptions] = useState([]);

  useEffect(() => {
  const fetchServiceProviderOptions = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/service-provide"
      );

      const data = await response.json();

      // ✅ data.data is the array from backend
      const options = data.data.map((item) => ({
        label: item.type,   // what user sees
        value: item._id,    // what backend needs
      }));
      setServiceProviderOptions(options);
    } catch (error) {
      console.error("Failed to load referral options", error);
    }
  };

  fetchServiceProviderOptions();
}, []);

  useEffect(() => {
  const fetchBigTeamSizeOptions = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/size-of-team"
      );

      const data = await response.json();

      // ✅ data.data is the array from backend
      const options = data.data.map((item) => ({
        label: item.type,   // what user sees
        value: item._id,    // what backend needs
      }));
      setBigTeamSizeOptions(options);
    } catch (error) {
      console.error("Failed to load referral options", error);
    }
  };

  fetchBigTeamSizeOptions();
}, []);


  useEffect(() => {
  const fetchHereAboutUsOptions = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/hear-about-us-list"
      );

      const data = await response.json();

      // ✅ data.data is the array from backend
      const options = data.data.map((item) => ({
        label: item.type,   // what user sees
        value: item._id,    // what backend needs
      }));
      setHereAboutUsOptions(options);
    } catch (error) {
      console.error("Failed to load referral options", error);
    }
  };

  fetchHereAboutUsOptions();
}, []);

  // State for form inputs
  const [formData, setFormData] = useState({
    businessName: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    referralSource: null,
    teamSize: null,
    services: [],
    privacyPolicy: false,
    termsConditions: false,
  });

  // State for form errors
  const [errors, setErrors] = useState({
    businessName: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    referralSource: "",
    teamSize: "",
    privacyPolicy: "",
    termsConditions: "",
  });

  const router = useRouter();

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {};

    // Basic validation
    if (!formData.businessName) {
      newErrors.businessName = "Business name is requiredgrv";
      isValid = false;
    }
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
      isValid = false;
    }
    if (!formData.referralSource) {
      newErrors.referralSource = "Please select a referral source";
      isValid = false;
    }
    if (!formData.teamSize) {
      newErrors.teamSize = "Please select a team size";
      isValid = false;
    }
    if (formData.services.length === 0) {
      newErrors.services = "Please select at least one service";
      isValid = false;
    }
    if (!formData.privacyPolicy) {
      newErrors.privacyPolicy = "You must agree to the Privacy Policy";
      isValid = false;
    }
    if (!formData.termsConditions) {
      newErrors.termsConditions = "You must agree to the Terms and Conditions";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log("Form submitted:", {
        ...formData,
        referralSource: formData.referralSource?.value,
        teamSize: formData.teamSize?.value,
      });



      // Add your form submission logic here (e.g., API call)
      const payload = {
        businessName: formData.businessName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNumber: formData.mobile,
        email: formData.email,
        password: formData.password,

        hereAboutUs: formData.referralSource?.value,
        sizeOfTeam: formData.teamSize?.value,
        serviceProvide: formData.services.map(s => s.value),

        privacyPolicyStatus: formData.privacyPolicy,
        termsAndConditionsStatus: formData.termsConditions,
      };

      try {
        const response = await fetch("http://localhost:8000/api/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });


        const data = await response.json();

        if (response.ok) {
          console.log("User created successfully:", data);
          alert("User created successfully:")
          router.push("/login");
          // reset form or redirect if needed
        } else {
          console.error("Error creating user:", data);
          alert(data.message || "Failed to create user");
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("Network error, please try again later");
      }

    }
  };

  return (
    <div className="bg-background antialiased">
      <Head>
        <title>Sign Up - Astalty</title>
      </Head>
      <div className="p-0">
        <div className="flex min-h-screen w-full grid-cols-2 flex-col-reverse md:grid">
          {/* Left Section - Promotional Content */}
          <div className="bg-navy relative isolate flex-1 overflow-hidden">
            <svg
              className="stroke-info/50 absolute inset-0 -z-10 h-full w-full"
              style={{
                maskImage:
                  "radial-gradient(100% 100% at top right, white, transparent)",
              }}
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                  width="150"
                  height="150"
                  x="50%"
                  y="-1"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M.5 200V.5H200" fill="none"></path>
                </pattern>
              </defs>
              <svg x="50%" y="-1" className="overflow-visible fill-gray-800/20">
                <path
                  d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                  strokeWidth="0"
                ></path>
              </svg>
              <rect
                width="100%"
                height="100%"
                strokeWidth="0"
                fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
              ></rect>
            </svg>
            <div
              className="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
              aria-hidden="true"
            >
              <div
                className="from-secondary to-info aspect-[1108/632] w-[69.25rem] bg-gradient-to-r opacity-20"
                style={{
                  clipPath: `
                    polygon(
                      73.6% 51.7%,
                      91.7% 11.8%,
                      100% 46.4%,
                      97.4% 82.2%,
                      92.5% 84.9%,
                      75.7% 64%,
                      55.3% 47.5%,
                      46.5% 49.4%,
                      45% 62.9%,
                      50.3% 87.2%,
                      21.3% 64.1%,
                      0.1% 100%,
                      5.4% 51.1%,
                      21.4% 63.9%,
                      58.9% 0.2%,
                      73.6% 51.7%
                    )
                  `,
                }}
              ></div>
            </div>
            <div className="mx-auto flex min-h-full flex-col items-start justify-center p-6">
              <div className="prose prose-invert mb-4 max-w-none">
                <h2 className="mb-8 text-center text-3xl">
                  Join 1,000+ NDIS Providers who&apos;ve <br /> simplified their
                  workday with Lifegroup
                </h2>
                <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-4 rounded-lg bg-white p-4">
                  <Image
                    src="/customer-logos/01JQNET6Q79JX65NW8FV8ZTD7V.png"
                    alt="Customer Logo 1"
                    width={100}
                    height={32}
                    className="my-0 max-h-8 w-full object-contain"
                  />
                  <Image
                    src="/customer-logos/01JQNEW4P5QMF9Q7MTWVN38VTJ.png"
                    alt="Customer Logo 2"
                    width={100}
                    height={32}
                    className="my-0 max-h-8 w-full object-contain"
                  />
                  <Image
                    src="/customer-logos/01JQNF0EQD9WEGGYTG1X5AX890.png"
                    alt="Customer Logo 3"
                    width={100}
                    height={32}
                    className="my-0 max-h-8 w-full object-contain"
                  />
                  <Image
                    src="/customer-logos/01JQNF1W1625CMVKR3RCF6AF2Q.png"
                    alt="Customer Logo 4"
                    width={100}
                    height={32}
                    className="my-0 max-h-8 w-full object-contain"
                  />
                </div>
                <p className="mt-8 text-center">
                  <strong className="text-white">
                    Lifegroup is the best program I have used. I tried a few
                    programs, and none match up to Lifegroup. It has halved my
                    admin time, and the support is 10/10” - Toni Channing.
                  </strong>
                </p>
                <ul
                  role="list"
                  className="my-8 grid grid-cols-1 gap-4 pl-0 text-sm leading-6 sm:grid-cols-1 sm:gap-4"
                >
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide text-white h-6 w-5 flex-none"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <div>
                      <p className="my-0">
                        <strong className="text-white">
                          Manage your Calendar
                        </strong>
                      </p>
                      <p className="my-0">
                        Get visibility over bookings and availability + Astalty
                        integrates with Google and Microsoft.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide text-white h-6 w-5 flex-none"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <div>
                      <p className="my-0">
                        <strong className="text-white">
                          Track Participant documents and expiry
                        </strong>
                      </p>
                      <p className="my-0">
                        No more “oops, we missed that” - expiry alerts keep your
                        team on top of compliance.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide text-white h-6 w-5 flex-none"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <div>
                      <p className="my-0">
                        <strong className="text-white">
                          Get documents signed electronically
                        </strong>
                      </p>
                      <p className="my-0">
                        Stop chasing signatures like it&apos;s 2009 - get
                        documents signed fast.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide text-white h-6 w-5 flex-none"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <div>
                      <p className="my-0">
                        <strong className="text-white">
                          Generate Service Agreements
                        </strong>
                      </p>
                      <p className="my-0">
                        No more formatting nightmares, create polished,
                        NDIS-ready agreements in a few clicks.
                      </p>
                    </div>
                  </li>
                </ul>
                <p className="mt-8 text-center text-lg">
                  Jono got hours back, so can you - read the{" "}
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    case study here
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Sign-Up Form */}
          <div className="bg-background relative isolate flex min-h-full flex-1 items-center justify-center">
            <svg
              className="absolute inset-0 -z-10 h-full w-full stroke-gray-300"
              style={{
                maskImage:
                  "radial-gradient(100% 100% at bottom left, white, transparent)",
              }}
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                  width="150"
                  height="150"
                  x="50%"
                  y="-1"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M.5 200V.5H200" fill="none"></path>
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                strokeWidth="0"
                fill="url(#0787a7c5-978c-4c3f-83c7-11c213f99cb7)"
              ></rect>
            </svg>
            <div className="m-4 w-full">
              <div className="rounded-card border bg-white px-4 py-4 shadow-2xl lg:p-4">
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl leading-9 font-bold tracking-tight text-gray-900 lg:text-2xl">
                        Get started in{" "}
                        <span className="font-medium line-through">hours</span>{" "}
                        minutes
                      </h2>
                    </div>
                    <Image
                      src="/assets/logo.png"
                      alt="Lifegroup Logo"
                      width={150}
                      height={50}
                    />
                  </div>
                  <div className="bg-info/10 mt-4 rounded-md p-4">
                    <div className="flex">
                      <div className="shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="text-info h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3 flex-1 md:flex md:justify-between">
                        <p className="text-primary text-sm">
                          Do you need rostering? Our rostering system is not yet
                          available.
                        </p>
                        <p className="mt-3 text-sm md:mt-0 md:ml-6">
                          <a
                            href="https://astalty.com.au/rostering-waitlist"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-medium whitespace-nowrap hover:text-blue-600"
                          >
                            Join the waitlist <span aria-hidden="true">→</span>
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-4">
                    {/* Business Name */}
                    <div>
                      <div className="relative flex rounded-md bg-white outline-hidden transition-all ring-error focus-within:ring-error hover:ring-error hover:focus-within:ring-error ring-2 ring-inset focus-within:ring-2 focus-within:ring-inset hover:ring-2 hover:ring-inset hover:focus-within:ring-2 hover:focus-within:ring-inset">
                        <input
                          id="businessName"
                          type="text"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          className={`peer h-10 block w-full bg-transparent pl-3 text-sm text-gray-900 focus:outline-none rounded-md ring-1 ${errors.businessName
                              ? "ring-red-500"
                              : "ring-gray-400"
                            } ring-inset focus:ring-primary focus:ring-2 focus:ring-inset hover:ring-primary hover:ring-1 hover:ring-inset`}
                        />
                        <label
                          htmlFor="businessName"
                          className={`pointer-events-none cursor-text absolute left-2 z-10 max-w-[calc(100%-0.75rem)] scale-100 transform overflow-hidden bg-white text-ellipsis whitespace-nowrap duration-150 select-none peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:px-1 peer-focus:text-xs peer-disabled:cursor-default -top-2 translate-y-0 px-1 text-xs ${errors.businessName
                              ? "text-red-500"
                              : "text-gray-500 peer-focus:text-primary"
                            }`}
                        >
                          Business name
                        </label>
                      </div>
                      <div
                        className={`transition-opacity ${errors.businessName ? "opacity-100" : "opacity-0"
                          }`}
                      >
                        <p className="mb-2 h-4 pl-3 text-xs tracking-tight text-red-500">
                          {errors.businessName}
                        </p>
                      </div>
                    </div>
                    {/* First Name and Last Name */}
                    <div className="grid grid-cols-2 gap-x-4">
                      <div>
                        <div className="relative flex rounded-md bg-white outline-hidden transition-all ring-error focus-within:ring-error hover:ring-error hover:focus-within:ring-error ring-2 ring-inset focus-within:ring-2 focus-within:ring-inset hover:ring-2 hover:ring-inset hover:focus-within:ring-2 hover:focus-within:ring-inset">
                          <input
                            id="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`peer h-10 block w-full bg-transparent pl-3 text-sm text-gray-900 focus:outline-none rounded-md ring-1 ${errors.firstName
                                ? "ring-red-500"
                                : "ring-gray-400"
                              } ring-inset focus:ring-primary focus:ring-2 focus:ring-inset hover:ring-primary hover:ring-1 hover:ring-inset`}
                          />
                          <label
                            htmlFor="firstName"
                            className={`pointer-events-none cursor-text absolute left-2 z-10 max-w-[calc(100%-0.75rem)] scale-100 transform overflow-hidden bg-white text-ellipsis whitespace-nowrap duration-150 select-none peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:px-1 peer-focus:text-xs peer-disabled:cursor-default -top-2 translate-y-0 px-1 text-xs ${errors.firstName
                                ? "text-red-500"
                                : "text-gray-500 peer-focus:text-primary"
                              }`}
                          >
                            First name
                          </label>
                        </div>
                        <div
                          className={`transition-opacity ${errors.firstName ? "opacity-100" : "opacity-0"
                            }`}
                        >
                          <p className="mb-2 h-4 pl-3 text-xs tracking-tight text-red-500">
                            {errors.firstName}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="relative flex rounded-md bg-white outline-hidden transition-all ring-error focus-within:ring-error hover:ring-error hover:focus-within:ring-error ring-2 ring-inset focus-within:ring-2 focus-within:ring-inset hover:ring-2 hover:ring-inset hover:focus-within:ring-2 hover:focus-within:ring-inset">
                          <input
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`peer h-10 block w-full bg-transparent pl-3 text-sm text-gray-900 focus:outline-none rounded-md ring-1 ${errors.lastName ? "ring-red-500" : "ring-gray-400"
                              } ring-inset focus:ring-primary focus:ring-2 focus:ring-inset hover:ring-primary hover:ring-1 hover:ring-inset`}
                          />
                          <label
                            htmlFor="lastName"
                            className={`pointer-events-none cursor-text absolute left-2 z-10 max-w-[calc(100%-0.75rem)] scale-100 transform overflow-hidden bg-white text-ellipsis whitespace-nowrap duration-150 select-none peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:px-1 peer-focus:text-xs peer-disabled:cursor-default -top-2 translate-y-0 px-1 text-xs ${errors.lastName
                                ? "text-red-500"
                                : "text-gray-500 peer-focus:text-primary"
                              }`}
                          >
                            Last name
                          </label>
                        </div>
                        <div
                          className={`transition-opacity ${errors.lastName ? "opacity-100" : "opacity-0"
                            }`}
                        >
                          <p className="mb-2 h-4 pl-3 text-xs tracking-tight text-red-500">
                            {errors.lastName}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Mobile and Email */}
                    <div className="grid grid-cols-2 gap-x-4">
                      <div>
                        <div className="relative flex rounded-md bg-white outline-hidden transition-all ring-error focus-within:ring-error hover:ring-error hover:focus-within:ring-error ring-2 ring-inset focus-within:ring-2 focus-within:ring-inset hover:ring-2 hover:ring-inset hover:focus-within:ring-2 hover:focus-within:ring-inset">
                          <input
                            id="mobile"
                            type="text"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            className={`peer h-10 block w-full bg-transparent pl-3 text-sm text-gray-900 focus:outline-none rounded-md ring-1 ${errors.mobile ? "ring-red-500" : "ring-gray-400"
                              } ring-inset focus:ring-primary focus:ring-2 focus:ring-inset hover:ring-primary hover:ring-1 hover:ring-inset`}
                          />
                          <label
                            htmlFor="mobile"
                            className={`pointer-events-none cursor-text absolute left-2 z-10 max-w-[calc(100%-0.75rem)] scale-100 transform overflow-hidden bg-white text-ellipsis whitespace-nowrap duration-150 select-none peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:px-1 peer-focus:text-xs peer-disabled:cursor-default -top-2 translate-y-0 px-1 text-xs ${errors.mobile
                                ? "text-red-500"
                                : "text-gray-500 peer-focus:text-primary"
                              }`}
                          >
                            Mobile
                          </label>
                        </div>
                        <div
                          className={`transition-opacity ${errors.mobile ? "opacity-100" : "opacity-0"
                            }`}
                        >
                          <p className="mb-2 h-4 pl-3 text-xs tracking-tight text-red-500">
                            {errors.mobile}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="relative flex rounded-md bg-white outline-hidden transition-all ring-error focus-within:ring-error hover:ring-error hover:focus-within:ring-error ring-2 ring-inset focus-within:ring-2 focus-within:ring-inset hover:ring-2 hover:ring-inset hover:focus-within:ring-2 hover:focus-within:ring-inset">
                          <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`peer h-10 block w-full bg-transparent pl-3 text-sm text-gray-900 focus:outline-none rounded-md ring-1 ${errors.email ? "ring-red-500" : "ring-gray-400"
                              } ring-inset focus:ring-primary focus:ring-2 focus:ring-inset hover:ring-primary hover:ring-1 hover:ring-inset`}
                          />
                          <label
                            htmlFor="email"
                            className={`pointer-events-none cursor-text absolute left-2 z-10 max-w-[calc(100%-0.75rem)] scale-100 transform overflow-hidden bg-white text-ellipsis whitespace-nowrap duration-150 select-none peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:px-1 peer-focus:text-xs peer-disabled:cursor-default -top-2 translate-y-0 px-1 text-xs ${errors.email
                                ? "text-red-500"
                                : "text-gray-500 peer-focus:text-primary"
                              }`}
                          >
                            Email
                          </label>
                        </div>
                        <div
                          className={`transition-opacity ${errors.email ? "opacity-100" : "opacity-0"
                            }`}
                        >
                          <p className="mb-2 h-4 pl-3 text-xs tracking-tight text-red-500">
                            {errors.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Password with Validation Popover */}
                    <div className="relative">
                      <div className="relative flex rounded-md bg-white outline-hidden transition-all ring-error focus-within:ring-error hover:ring-error hover:focus-within:ring-error ring-2 ring-inset focus-within:ring-2 focus-within:ring-inset hover:ring-2 hover:ring-inset hover:focus-within:ring-2 hover:focus-within:ring-inset">
                        <input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`peer h-10 block w-full bg-transparent pl-3 text-sm text-gray-900 focus:outline-none rounded-md ring-1 ${errors.password ? "ring-red-500" : "ring-gray-400"
                            } ring-inset focus:ring-primary focus:ring-2 focus:ring-inset hover:ring-primary hover:ring-1 hover:ring-inset`}
                        />
                        <label
                          htmlFor="password"
                          className={`pointer-events-none cursor-text absolute left-2 z-10 max-w-[calc(100%-0.75rem)] scale-100 transform overflow-hidden bg-white text-ellipsis whitespace-nowrap duration-150 select-none peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:px-1 peer-focus:text-xs peer-disabled:cursor-default -top-2 translate-y-0 px-1 text-xs ${errors.password
                              ? "text-red-500"
                              : "text-gray-500 peer-focus:text-primary"
                            }`}
                        >
                          Password
                        </label>
                      </div>
                      <div
                        className={`transition-opacity ${errors.password ? "opacity-100" : "opacity-0"
                          }`}
                      >
                        <p className="mb-2 h-4 pl-3 text-xs tracking-tight text-red-500">
                          {errors.password}
                        </p>
                      </div>
                      <div
                        className={`shadow-menu absolute bottom-full z-50 mb-4 w-full rounded-lg border bg-white p-2 transition-opacity ${formData.password ? "block" : "hidden"
                          }`}
                      >
                        <div className="text-sm">
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`lucide h-4 w-4 ${formData.password.length >= 8
                                  ? "text-green-500"
                                  : "text-red-500"
                                }`}
                            >
                              <path d="M18 6 6 18"></path>
                              <path d="m6 6 12 12"></path>
                            </svg>
                            <p>Must be at least 8 characters</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`lucide h-4 w-4 ${/^(?=.*[a-z])(?=.*[A-Z])/.test(
                                formData.password
                              )
                                  ? "text-green-500"
                                  : "text-red-500"
                                }`}
                            >
                              <path d="M18 6 6 18"></path>
                              <path d="m6 6 12 12"></path>
                            </svg>
                            <p>Must contain uppercase and lowercase letters</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`lucide h-4 w-4 ${/^(?=.*[\d@$!%*?&])/.test(formData.password)
                                  ? "text-green-500"
                                  : "text-red-500"
                                }`}
                            >
                              <path d="M18 6 6 18"></path>
                              <path d="m6 6 12 12"></path>
                            </svg>
                            <p>
                              Must contain at least one number or special
                              character
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reusable Dropdowns */}
                    <div className="grid grid-cols-2 gap-x-4">
                      <div>
                        <SelectDropdown
                          label="How did you hear about us?"
                          options={hereAboutUsOptions}
                          selected={formData.referralSource}
                          setSelected={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              referralSource: value,
                            }))
                          }
                        />
                        <div
                          className={`transition-opacity ${errors.referralSource ? "opacity-100" : "opacity-0"
                            }`}
                        >
                          <p className="mb-2 h-4 pl-3 text-xs tracking-tight text-red-500">
                            {errors.referralSource}
                          </p>
                        </div>
                      </div>
                      <div>
                        <SelectDropdown
                          label="How big is your team?"
                          options={bigTeamSizeOptions}
                          selected={formData.teamSize}
                          setSelected={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              teamSize: value,
                            }))
                          }
                        />
                        <div
                          className={`transition-opacity ${errors.teamSize ? "opacity-100" : "opacity-0"
                            }`}
                        >
                          <p className="mb-2 h-4 pl-3 text-xs tracking-tight text-red-500">
                            {errors.teamSize}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Services Multi-Select */}
                    <div>
                      <MultiSelectDropdown
                        label="Which services do you provide?"
                        options={serviceProviderOptions}
                        selected={formData.services}
                        setSelected={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            services: value,
                          }))
                        }
                      />
                      <div
                        className={`transition-opacity ${errors.services ? "opacity-100" : "opacity-0"
                          }`}
                      >
                        <p className="mb-2 h-4 pl-3 text-xs tracking-tight text-red-500">
                          {errors.services}
                        </p>
                      </div>
                    </div>
                    {/* Checkboxes */}
                    <div>
                      <div className="relative flex items-start gap-2 leading-6">
                        <div className="flex h-6 items-center">
                          <input
                            id="privacyPolicy"
                            type="checkbox"
                            checked={formData.privacyPolicy}
                            onChange={handleInputChange}
                            className="form-checkbox h-4 w-4 cursor-pointer rounded-sm border border-solid bg-transparent text-current focus:ring-0 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="privacyPolicy"
                            className="text-foreground cursor-pointer text-sm leading-6"
                          >
                            I have read the{" "}
                            <a
                              href="https://astalty.com.au/privacy-policy"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-info font-semibold"
                            >
                              Privacy Policy
                            </a>
                          </label>
                        </div>
                      </div>
                      <div
                        className={`transition-opacity ${errors.privacyPolicy ? "opacity-100" : "opacity-0"
                          }`}
                      >
                        <p className="mb-2 h-4 pl-3 text-xs tracking-tight text-red-500">
                          {errors.privacyPolicy}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="relative flex items-start gap-2 leading-6">
                        <div className="flex h-6 items-center">
                          <input
                            id="termsConditions"
                            type="checkbox"
                            checked={formData.termsConditions}
                            onChange={handleInputChange}
                            className="form-checkbox h-4 w-4 cursor-pointer rounded-sm border border-solid bg-transparent text-current focus:ring-0 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="termsConditions"
                            className="text-foreground cursor-pointer text-sm leading-6"
                          >
                            I have read and agree to Astalty&apos;s{" "}
                            <a
                              href="https://astalty.com.au/terms-and-conditions"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-info font-semibold"
                            >
                              Terms and Conditions
                            </a>
                          </label>
                        </div>
                      </div>
                      <div
                        className={`transition-opacity ${errors.termsConditions ? "opacity-100" : "opacity-0"
                          }`}
                      >
                        <p className="mb-2 h-4 pl-3 text-xs tracking-tight text-red-500">
                          {errors.termsConditions}
                        </p>
                      </div>
                    </div>
                    {/* Submit Button */}
                    <div className="mt-4 flex w-full lg:mt-8">
                      <button
                        type="submit"
                        className="inline-flex items-center cursor-pointer relative justify-center text-sm font-medium ring-offset-background transition-colors duration-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-navy text-primary-foreground hover:bg-navy/90 shadow-xs active:bg-navy/80 h-9 px-4 rounded-md w-full"
                      >
                        <span className="inline-flex items-center justify-center whitespace-nowrap select-none text-white">
                          Start 14-day free trial
                        </span>
                      </button>
                    </div>
                    <p className="mt-8 text-center text-sm text-gray-500">
                      Already have an account?{" "}
                      <Link href="/login" className="text-navy font-medium">
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
