"use client";
import { FiArrowRight } from "react-icons/fi";

export default function LeftSection() {
  return (
    <section className="min-h-screen flex items-center bg-[#000000] text-white px-6 max-w-5xl py-12">
      <div className="max-w-2xl space-y-6" >
        <h1 className="text-5xl font-bold">Good morning</h1>
        <h2 className="text-2xl font-semibold">
          Leave a review and save your organisation $25 off their next invoice!
        </h2>
        <h3 className="text-lg font-medium">
          Anyone from your organisation can leave a review.
        </h3>
        <p>
          At Astalty, we value your experience and rely on word of mouth to
          reach more amazing users like you.
        </p>
        <p>
          If you love what we do, we&apos;d appreciate your feedback. Leave us a
          Google review and we&apos;ll credit $25 to your organisation&apos;s account.
        </p>
        <p>
          To claim the credit, please click the button below, leave a review on
          Google and send a screenshot of your review to{" "}
          <a href="mailto:hello@astalty.com.au" className="underline font-semibold">
            hello@astalty.com.au
          </a>{" "}
          so we can add the credit to your account.
        </p>

        <button className="mt-4 inline-flex items-center bg-white text-[#002c59] font-medium px-5 py-3 rounded-md hover:bg-gray-100 transition">
          Leave a review <FiArrowRight className="ml-2" />
        </button>
      </div>
    </section>
  );
}
