// app/contacts/new/page.js
// or app/contacts/[id]/edit/page.js (same code works for both)

"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, X } from "lucide-react";
import Header from "../../components/header";

const contactTypes = {
  1: "Doctor",
  2: "Standard",
  3: "3rd Party Payer",
  4: "Plan Manager",
  5: "Mother",
  6: "Father",
  7: "Teacher",
  8: "Other",
};
const titleOptions = {
  1: "Dr",
  2: "Mr",
  3: "Ms",
  4: "Mrs",
  5: "Miss",
  6: "Mx",
  7: "Master",
};

// Zod schema
const phoneSchema = z.object({
  type: z.enum(["Mobile", "Work", "Home", "Other"]),
  number: z
    .string()
    .min(8, "Phone number too short")
    .max(15, "Phone number too long"),
});

const formSchema = z.object({
  type: z.string().min(1, "Contact type is required"),
  name: z.string().min(2, "Name is required").max(100),
  personTitle: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  occupation: z.string().optional(),
  companyName: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phones: z.array(phoneSchema).min(0),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().default("Australia"),
  notes: z.string().optional(),
});

export default function ContactFormPage({ params }) {
  const router = useRouter();
  const isEdit = !!params?.id;
  const contactId = params?.id;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      name: "",
      personTitle: "",
      firstName: "",
      lastName: "",
      occupation: "",
      companyName: "",
      email: "",
      phones: [{ type: "Mobile", number: "" }],
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Australia",
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones",
  });

 /* const addressInputRef = useRef(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  // Load Google Maps Places API
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    )
      return;

    const loader = document.createElement("script");
    loader.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    loader.async = true;
    loader.onload = () => setApiLoaded(true);
    loader.onerror = () => console.error("Google Maps script failed to load");
    document.head.appendChild(loader);

    return () => {
      document.head.removeChild(loader);
    };
  }, []);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (!apiLoaded || !addressInputRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(
      addressInputRef.current,
      {
        componentRestrictions: { country: "au" }, // Restrict to Australia
        fields: ["address_components", "formatted_address", "geometry"],
        types: ["address"],
      },
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.address_components) return;

      const components = place.address_components;

      const get = (type, short = false) =>
        components.find((c) => c.types.includes(type))?.[
          short ? "short_name" : "long_name"
        ] || "";

      const street = [get("street_number"), get("route")]
        .filter(Boolean)
        .join(" ");
      const suburb = get("locality");
      const state = get("administrative_area_level_1", true);
      const postcode = get("postal_code");
      const country = get("country");

      // Update form fields
      setValue("addressLine1", street);
      setValue("city", suburb);
      setValue("state", state);
      setValue("postalCode", postcode);
      setValue("country", country);
    });
  }, [apiLoaded, setValue]);*/

  // Load existing data if editing
  useEffect(() => {
    if (isEdit && contactId) {
      // Simulate API fetch
      const mockData = {
        type: "Mother",
        name: "Paula Bianca Lu",
        personTitle: "Ms",
        firstName: "Paula",
        lastName: "Lu",
        occupation: "Parent",
        companyName: "",
        email: "paulabiancalu@gmail.com",
        phones: [{ type: "Mobile", number: "+61 0416091953" }],
        addressLine1: "79 Hummingbird Dr",
        addressLine2: "Botanic Ridge",
        addressLine3: "",
        city: "Botanic Ridge",
        state: "VIC",
        postalCode: "3977",
        country: "Australia",
        notes: "Primary emergency contact",
      };
      reset(mockData);
    }
  }, [isEdit, contactId, reset]);

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);
      alert(isEdit ? "Contact updated!" : "Contact created!");
      router.push("/contacts");
    } catch (err) {
      alert("Error saving contact");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeKey="Contacts" />

      <main className="px-6">
        <div className="z-10 bg-gray-50 border-b shadow-sm">
          <div className="py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">
              {isEdit ? "Edit Contact" : "Create Contact"}
            </h1>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-gray-700"
              >
                <X size={16} /> Cancel
              </button>
              <button
                type="submit"
                form="contact-form"
                disabled={isSubmitting}
                className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={16} />
                {isSubmitting ? "Saving..." : isEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
        <form
          id="contact-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-10"
        >
          {/* General details */}
          <section className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">General details</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                {...register("type")}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select type</option>
                {Object.entries(contactTypes).map(([value, label]) => (
                  <option key={value} value={label}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name")}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <select
                  {...register("personTitle")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                >
                  <option value="">Title</option>
                  {Object.entries(titleOptions).map(([value, label]) => (
                    <option key={value} value={label}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <input
                  {...register("firstName")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last name
                </label>
                <input
                  {...register("lastName")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occupation
                </label>
                <input
                  {...register("occupation")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  {...register("companyName")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                />
              </div>
            </div>
          </section>

          {/* Contact details */}
          <section className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Contact details</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone numbers
              </label>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col sm:flex-row gap-4 mb-4"
                >
                  <select
                    {...register(`phones.${index}.type`)}
                    className="w-full sm:w-1/3 border border-gray-300 rounded-lg px-4 py-2.5"
                  >
                    <option value="Mobile">Mobile</option>
                    <option value="Work">Work</option>
                    <option value="Home">Home</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    {...register(`phones.${index}.number`)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5"
                    placeholder="+61 412 345 678"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ type: "Mobile", number: "" })}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
              >
                <Plus size={16} /> Add phone number
              </button>
            </div>
          </section>

          {/* Address with Google Places Autocomplete */}
          <section className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Address</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search address
              </label>
              <input
                // ref={addressInputRef}
                type="text"
                placeholder="Start typing your address..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-4">
              <input
                {...register("addressLine1")}
                placeholder="Address line 1"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
              />
              <input
                {...register("addressLine2")}
                placeholder="Address line 2 (optional)"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
              />
              <input
                {...register("addressLine3")}
                placeholder="Address line 3 (optional)"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  {...register("city")}
                  placeholder="City / Suburb"
                  className="border border-gray-300 rounded-lg px-4 py-2.5"
                />
                <input
                  {...register("state")}
                  placeholder="State / Region"
                  className="border border-gray-300 rounded-lg px-4 py-2.5"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  {...register("postalCode")}
                  placeholder="Postal / Zip code"
                  className="border border-gray-300 rounded-lg px-4 py-2.5"
                />
                <select
                  {...register("country")}
                  className="border border-gray-300 rounded-lg px-4 py-2.5"
                >
                  <option value="Australia">Australia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="United States">United States</option>
                </select>
              </div>
            </div>
          </section>

          {/* Notes */}
          <section className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Notes</h2>
            <textarea
              {...register("notes")}
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-y min-h-[120px]"
              placeholder="Additional notes..."
            />
          </section>
        </form>
      </main>
    </div>
  );
}
