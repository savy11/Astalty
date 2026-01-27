"use client";
import Image from "next/image";

export default function LeftSection() {
  return (
    <div className="md:w-1/2 min-h-screen text-white 
    flex items-center justify-center px-4 bg-[url('/blue-pattern.png')] bg-[#000000]">
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
          Join 1,000+ NDIS Providers who&apos;ve simplified their workday with Astalty
        </h1>

        {/* logo strip */}
        <div className="bg-white rounded-lg flex items-center justify-between space-x-4">
          <Image src="/images/google-logo-photos-new.svg" alt="nib" className="h-40" />
          <Image src="/images/signupleft1.avif" alt="auscare" className="h-40" />
          <Image src="/images/google-logo-photos-new.svg" alt="empowered" className="h-40" />
        </div>

        <p className="italic font-medium mb-10 text-center">
          “Astalty is the best program I have used. I tried a few programs, and none match up to Astalty.
          It has halved my admin time, and the support is 10/10” - Toni Channing.
        </p>

        <div className="space-y-6">
          {[
            {
              title: "Manage your Calendar",
              desc: "Get visibility over bookings and availability + Astalty integrates with Google and Microsoft.",
            },
            {
              title: "Track Participant documents and expiry",
              desc: "No more “oops, we missed that” – expiry alerts keep your team on top of compliance.",
            },
            {
              title: "Get documents signed electronically",
              desc: "Stop chasing signatures like it's 2009 - get documents signed fast.",
            },
            {
              title: "Generate Service Agreements",
              desc: "No more formatting nightmares, create polished, NDIS-ready agreements in a few clicks.",
            },
          ].map((f, i) => (
            <div key={i} className="flex">
              <span className="text-blue-300 mr-3 mt-1">✔</span>
              <div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-blue-100">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center">
          Jono got hours back, so can you - read the{" "}
          <a href="#" className="underline">case study here.</a>
        </p>
      </div>
    </div>
  );
}
