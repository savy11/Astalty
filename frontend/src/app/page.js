import Link from "next/link";
import Image from "next/image";

const NavItem = ({ href, children, isButton = false }) => (
  <li>
    {isButton ? (
      <button className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white hover:bg-gray-100/10 hover:text-white focus:bg-gray-100/10 focus:text-white data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/10 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800 dark:data-[state=open]:bg-gray-800">
        {children}
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
          className="lucide lucide-chevron-down-icon relative top-px ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    ) : (
      <Link
        href={href}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white hover:bg-gray-100/10 hover:text-white focus:bg-gray-100/10 focus:text-white data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/10   dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800 dark:data-[state=open]:bg-gray-800"
      >
        {children}
      </Link>
    )}
  </li>
);

const Navbar = () => (
  <div className="bg-white">
    <div className="hidden md:block">
      <div className="absolute inset-x-0 top-0 z-50 mx-auto flex h-[70px] w-full max-w-7xl items-center justify-between px-4 lg:px-8">
        <div>
          <Link href="/">
            <Image
              alt="Lifegroup Logo"
              className="mr-12 w-[150px]"
              src="/assets/logo.png"
              width={150}
              height={50}
            />
          </Link>
        </div>
        <nav
          aria-label="Main"
          data-orientation="horizontal"
          dir="ltr"
          className="relative z-10 flex max-w-max flex-1 items-center justify-center"
        >
          <div style={{ position: "relative" }}>
            <ul
              className="group flex flex-1 list-none items-center justify-center gap-x-1"
              data-orientation="horizontal"
            >
              <NavItem href="/reviews">Reviews</NavItem>
              <NavItem href="/">Solutions</NavItem>
              <NavItem href="/">Resources</NavItem>
              <NavItem href="/">Company</NavItem>
              <NavItem href="/pricing">Pricing</NavItem>
            </ul>
          </div>
        </nav>
        <div className="space-x-2">
          <Link
            href="/login"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold ring-offset-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-50 text-white hover:bg-gray-100/10 px-4 py-2"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold ring-offset-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-50 bg-white text-gray-900 shadow hover:bg-gray-200 px-4 py-2"
          >
            Free trial <span aria-hidden="true">&nbsp; →</span>
          </Link>
        </div>
      </div>
    </div>
    <div className="md:hidden">
      <div className="absolute inset-x-0 top-0 z-50 flex h-[70px] items-center justify-between px-4">
        <div>
          <Link href="/">
            <Image
              alt="Lifegroup Logo"
              className="mr-12 w-[150px]"
              src="/assets/logo.png"
              width={150}
              height={50}
            />
          </Link>
        </div>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          data-state="closed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-6 text-white"
          >
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

const HeroSection = () => (
  <div className="relative isolate overflow-hidden bg-navy">
    <div className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="pb-24 pt-10 sm:pb-12 lg:flex lg:pt-40">
        <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <Link
              href="/changelog"
              target="_blank"
              className="inline-flex space-x-6"
            >
              <span className="rounded-full bg-light-blue/10 px-3 py-1 text-sm/6 font-semibold text-light-blue ring-1 ring-inset ring-indigo-500/20">
                What&apos;s new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-300">
                <span>Forms, Incidents &amp; Referrals</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-5 text-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>
          </div>
          <h1 className="mt-10 text-4xl font-semibold leading-loose text-white sm:text-6xl/tight">
            Simplify your NDIS business operations
          </h1>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-200 sm:text-lg">
            Ready to take your NDIS business to the next level? Try Lifegroup, the
            most straightforward NDIS software with the most advanced features.
          </p>
          <div className="mb-10 mt-4">
            {[
              "Developed by NDIS experts",
              "Free onboarding and training",
              "Data import to get started quickly",
            ].map((item) => (
              <div key={item} className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="inline-flex h-5 w-5 text-light-blue"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 text-sm text-white">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/register"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold ring-offset-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-50 bg-white text-gray-900 shadow hover:bg-gray-200 px-4 py-2"
            >
              Start free trial
            </Link>
            <Link
              href="/book-a-demo"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold ring-offset-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-50 text-white hover:bg-gray-100/10 px-4 py-2"
            >
              Book a demo <span aria-hidden="true">&nbsp; →</span>
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-300">
            14-day free trial. No credit card required.
          </p>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <Image
              alt="App screenshot"
              className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
              src="/assets/astalty-dashboard-C0C45lnL.png"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialVideo = ({ src, title }) => (
  <div
    className="overflow-hidden rounded-lg shadow transition-shadow hover:shadow-lg"
    style={{ padding: "56.25% 0 0 0", position: "relative" }}
  >
    <iframe
      src={src}
      title={title}
      allow="autoplay; fullscreen; picture-in-picture"
      frameBorder="0"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      data-ready="true"
    />
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 transition-colors hover:bg-transparent">
      <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="ml-1 h-8 w-8 text-light-blue"
        >
          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
        </svg>
      </div>
    </div>
  </div>
);

const TestimonialQuote = ({ quote, link }) => (
  <li>
    <figure className="group relative rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-300/5 lg:p-6">
      <blockquote className="relative">
        <p className="text-gray-900">{quote}</p>
      </blockquote>
      <figcaption className="mt-2 flex justify-end opacity-20 transition-opacity duration-500 group-hover:opacity-100">
        <Link href={link} target="_blank">
          <svg
            height="720"
            viewBox="0 0 186.69 190.5"
            width="705.6"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
          >
            <g transform="translate(1184.583 765.171)">
              <path
                clipPath="none"
                d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                fill="#4285f4"
                mask="none"
              />
              <path
                clipPath="none"
                d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                fill="#34a853"
                mask="none"
              />
              <path
                clipPath="none"
                d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                fill="#fbbc05"
                mask="none"
              />
              <path
                clipPath="none"
                d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                fill="#ea4335"
                mask="none"
              />
            </g>
          </svg>
        </Link>
      </figcaption>
    </figure>
  </li>
);

const Footer = () => (
  <footer className="border-t bg-gray-100">
    <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
      <div className="xl:grid xl:grid-cols-3 xl:gap-8">
        <div className="space-y-8">
          <Image
            alt="Company name"
            className=""
            src="/assets/logo.png"
            width={150}
            height={50}
          />
        </div>
        <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-sm/6 font-semibold">Solutions</h3>
              <ul className="mt-6 space-y-4" role="list">
                {[
                  { href: "/support-coordination-software", text: "Lifegroup" },
                  { href: "/astalty-lite", text: "Lifegroup Lite" },
                  { href: "/astalty-for-chrome", text: "Lifegroup for Chrome" },
                ].map((item) => (
                  <li key={item.text}>
                    <Link href={item.href} className="text-sm/6">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm/6 font-semibold">Company</h3>
              <ul className="mt-6 space-y-4" role="list">
                {[
                  { href: "/about-us", text: "About Us" },
                  { href: "/affiliate-program", text: "Affiliate Program" },
                  { href: "/partners", text: "Partners" },
                  { href: "/contact", text: "Contact Us" },
                ].map((item) => (
                  <li key={item.text}>
                    <Link href={item.href} className="text-sm/6">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-sm/6 font-semibold">Resources</h3>
              <ul className="mt-6 space-y-4" role="list">
                {[
                  { href: "/", text: "User Guide" },
                  { href: "/articles", text: "Blog" },
                  { href: "/online-ndis-price-guide", text: "Price Guide" },
                ].map((item) => (
                  <li key={item.text}>
                    <Link href={item.href} className="text-sm/6">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm/6 font-semibold">Pricing</h3>
              <ul className="mt-6 space-y-4" role="list">
                {[
                  { href: "/pricing", text: "Lifegroup" },
                  { href: "/ndis-documents", text: "Document Packs" },
                ].map((item) => (
                  <li key={item.text}>
                    <Link href={item.href} className="text-sm/6">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-between border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
        <p className="text-sm/6 text-gray-400">
          © 2025 Lifegroup Pty Ltd. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="text-sm/6 text-gray-400">
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="text-sm/6 text-gray-400"
          >
            Terms and Conditions
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="">
        <div className="bg-navy">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-gray-100 md:text-4xl">
                Trusted and loved by hundreds of <br /> NDIS Providers
              </h2>
              <p className="mt-4 text-lg text-gray-200">
                Join over 2,700 NDIS professionals saving hours each week.
              </p>
            </div>
          </div>
        </div>
        <div className="pt-10 bg-navy"></div>
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-navy" />
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="relative mx-auto">
                <div className="mx-auto max-w-4xl">
                  <dl className="overflow-hidden rounded-lg bg-white/90 shadow-lg ring-1 ring-gray-300/5 backdrop-blur-sm sm:grid sm:grid-cols-3">
                    {[
                      { title: "Weekly invoices", value: "$5,100,000" },
                      { title: "Support hours", value: "3,200,000" },
                      { title: "Participants supported", value: "84,000" },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex flex-col border-b border-gray-50 p-4 text-center sm:border-0 sm:border-r md:p-6"
                      >
                        <dt className="order-2 mb-2 font-medium text-gray-500">
                          {item.title}
                        </dt>
                        <dd className="order-1 text-3xl font-bold tracking-tight text-primary md:text-4xl">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div>
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="py-24 sm:py-32">
            <h2 className="text-center text-lg/8 font-semibold text-gray-900">
              Trusted by over 1,000 businesses
            </h2>
            <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                {[
                  {
                    src: "/customer-logos/01JQNET6Q79JX65NW8FV8ZTD7V.png",
                    alt: "NIB",
                  },
                  {
                    src: "/customer-logos/01JQNETV8YGVRR32ZYXAXPFH2T.png",
                    alt: "Healthy Emporium",
                  },
                  {
                    src: "/customer-logos/01JQNEW4P5QMF9Q7MTWVN38VTJ.png",
                    alt: "Auscare",
                  },
                  {
                    src: "/customer-logos/01JQNF0EQD9WEGGYTG1X5AX890.png",
                    alt: "Empowered Community Services",
                  },
                  {
                    src: "/customer-logos/01JQNF1W1625CMVKR3RCF6AF2Q.png",
                    alt: "Sunflower Services",
                  },
                  {
                    src: "/customer-logos/01JQNF3276KDZDP3KESW4XTR3R.png",
                    alt: "Candeece Coordination",
                  },
                  {
                    src: "/customer-logos/01JQNF4E7CKDT8QXJQ5F4FSGM7.png",
                    alt: "Autism NT",
                  },
                  {
                    src: "/customer-logos/01JQNF5Q6W7M90XWJZ78KS75E8.png",
                    alt: "Kimberley Therapy Services",
                  },
                ].map((logo) => (
                  <Image
                    key={logo.alt}
                    className="col-span-2 max-h-16 w-full object-contain lg:col-span-1"
                    src={logo.src}
                    alt={logo.alt}
                    width={158}
                    height={48}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-12 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-light-blue">
              Over 230 5-star reviews from our customers
            </h2>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">
              Hear directly from NDIS business owners
            </h3>
          </div>
          <div className="grid gap-4 pb-4 pt-12 md:grid-cols-4">
            {[
              {
                src: "https://player.vimeo.com/video/892059593",
                title: "Lifegroup Testimonial: Coordinating Independence",
              },
              {
                src: "https://player.vimeo.com/video/898933533",
                title: "Lifegroup Testimonial: Sakura Connect",
              },
              {
                src: "https://player.vimeo.com/video/900636487",
                title: "Lifegroup Testimonial: AFA Coordination",
              },
              {
                src: "https://player.vimeo.com/video/919414287",
                title: "Lifegroup Testimonial: Positive Empowerment",
              },
              {
                src: "https://player.vimeo.com/video/983350860",
                title: "Lifegroup Testimonial: Newcastle Social Workers",
              },
              {
                src: "https://player.vimeo.com/video/1005380962",
                title: "Lifegroup Testimonial: Healthy Emporium",
              },
              {
                src: "https://player.vimeo.com/video/1006134997",
                title: "Lifegroup Testimonial: Breaking Down Barriers",
              },
              {
                src: "https://player.vimeo.com/video/1007529413",
                title:
                  "Lifegroup Testimonial: Better Connections Support Coordination",
              },
              {
                src: "https://player.vimeo.com/video/1039563327",
                title: "Lifegroup Testimonial: Illume Coordination",
              },
              {
                src: "https://player.vimeo.com/video/1047028390",
                title: "Lifegroup Testimonial: Rhino Support Coordination",
              },
              {
                src: "https://player.vimeo.com/video/1047353612",
                title: "Lifegroup Testimonial: Rebecca Wood",
              },
              {
                src: "https://player.vimeo.com/video/1087308096",
                title: "Lifegroup Testimonial: AUSCARE",
              },
              {
                src: "https://player.vimeo.com/video/1109159494",
                title: "Lifegroup Testimonial: High Voltage",
              },
              {
                src: "https://player.vimeo.com/video/1109179916",
                title: "Lifegroup Testimonial: Conservation Heart Films",
              },
            ].map((video) => (
              <TestimonialVideo
                key={video.title}
                src={video.src}
                title={video.title}
              />
            ))}
          </div>
          <ul
            className="mx-auto mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3"
            role="list"
          >
            <li>
              <ul className="flex flex-col gap-4" role="list">
                <TestimonialQuote
                  quote="Lifegroup professional app and customer service deliver personalised problem solving, no business is too small or complex for this responsive team."
                  link="https://g.co/kgs/k57Cq6"
                />
                <TestimonialQuote
                  quote="I have trialled this, and I can say I am very very happy with this product and services it provides! It is straightforward, simple to use and not over complicated- it took me no more than a day to learn how to use it and be able to confidently navigate my way around it! Highly recommend."
                  link="https://g.co/kgs/JWjzbA"
                />
              </ul>
            </li>
            <li>
              <ul className="flex flex-col gap-4" role="list">
                <TestimonialQuote
                  quote="I am an independent Support Coordinator operating as a sole trader and Lifegroup has made case noting, invoicing & reconciling payments so fast and easy leaving me more time to connect with my Participants and offer a more personalised support."
                  link="https://g.co/kgs/d5mdRt"
                />
                <TestimonialQuote
                  quote="This system is amazing - it is a great price - based on the user rather than client number, has so many features (with more coming), the developers are open and willing to chat and provide assistance, and it was so easy to set up and learn."
                  link="https://g.co/kgs/yEie54"
                />
              </ul>
            </li>
            <li>
              <ul className="flex flex-col gap-4" role="list">
                <TestimonialQuote
                  quote="Lifegroup is incredibly easy to use and probably the best platform for Support Coordinators as everything is built around tasks."
                  link="https://g.co/kgs/BrkK6N"
                />
                <TestimonialQuote
                  quote="A fabulous, no nonsense, easy to use CRM for all of our Support Coordination and recovery coaching needs."
                  link="https://g.co/kgs/9TdzqH"
                />
              </ul>
              <div className="mt-8 text-right">
                <Link
                  href="https://www.google.com/search?q=astalty&lrd=0x4bd81181fc2044b9:0xa050cab8b8611616,1,,,,1"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold ring-offset-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-50 text-light-blue hover:bg-light-blue/10 px-4 py-2"
                >
                  Hear from more happy customers{" "}
                  <span aria-hidden="true">&nbsp; →</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-lg font-semibold text-light-blue">
              Spend less time invoicing
            </h2>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">
              More time for your Participants
            </h3>
            <p className="mt-6 text-lg text-gray-600">
              Using our purpose-built Task board and invoicing engine, get your
              invoices done in minutes - not hours.
            </p>
          </div>
          <div className="relative my-8 md:my-12">
            <div className="order-first overflow-hidden rounded-xl border border-gray-50 shadow-xl md:order-last">
              <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/785638599?h=3f7c883aaa&badge=0&autopause=0&player_id=0&app_id=58479"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  title="Lifegroup Support Coordination Software"
                  data-ready="true"
                />
              </div>
            </div>
          </div>
          <div className="my-6 md:my-24">
            <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-4 gap-y-8 text-base text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
              {[
                {
                  title: "On-the-go billing",
                  desc: "Bill for your time from anywhere within the platform, perfect for when things just 'pop up'.",
                  icon: "M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
                },
                {
                  title: "Direct invoicing",
                  desc: "Send invoices direct from Lifegroup, no more double handling.",
                  icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
                },
                {
                  title: "Data security",
                  desc: "All data is stored securely with ISO27001 certified providers within Australia.",
                  icon: "M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33",
                },
                {
                  title: "Budget management",
                  desc: "Ensure budgets are used correctly with our real-time budget notifications.",
                  icon: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5",
                },
                {
                  title: "Time management",
                  desc: "Need to track your billable and unbillable time? Done and done.",
                  icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                },
                {
                  title: "Support and training",
                  desc: "Unmatched customer support, we are with you each step of the way.",
                  icon: "M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z",
                },
                {
                  title: "Advanced notifications",
                  desc: "Never miss an eight-week implementation report, with customisable notifications to keep you on track.",
                  icon: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5",
                },
                {
                  title: "Birthday notifications",
                  desc: "Say what? Yes, we're serious about giving you the tools to provide amazing service to your Participants.",
                  icon: "M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z",
                },
                {
                  title: "Frequent updates",
                  desc: "New features and improvements shipped weekly - we move quickly.",
                  icon: "M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3",
                },
              ].map((item) => (
                <div key={item.title} className="relative flex flex-col pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="absolute left-1 top-1 h-5 w-5 text-light-blue"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={item.icon}
                      />
                    </svg>
                    {item.title}
                  </dt>
                  <dd className="inline">{item.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <div className="to-gray-50 overflow-hidden bg-gradient-to-b from-white pb-24 pt-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div>
            <h2 className="text-lg font-semibold text-light-blue">
              Specific solutions for specific problems
            </h2>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">
              Designed by NDIS experts
            </h3>
          </div>
          <div className="prose relative z-10 mr-auto max-w-prose text-lg text-gray-800">
            <p>
              Operating a business in the NDIS space can be a thrilling but
              challenging journey. Lifegroup&apos;s got your back with the perfect
              software solution to streamline your day-to-day operations,
              whether you&apos;re a small enterprise or a large organisation.
            </p>
            <p>
              We&apos;re not just any software provider. Lifegroup has been designed in
              collaboration with NDIS professionals, who have invested hundreds
              of hours consulting with industry experts to understand the
              problems our software needs to solve.
            </p>
            <p>
              Our approach is unique; we look from the outside in, ensuring that
              our software delivers the perfect solution for all your NDIS
              needs.
            </p>
            <p>Lifegroup - an opportunity to transform your business.</p>
            <div className="not-prose mt-12">
              <Link
                href="/about-us"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold ring-offset-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-50 bg-light-blue text-gray-50 shadow hover:bg-light-blue/90 px-4 py-2"
              >
                Meet the team <span aria-hidden="true">&nbsp; →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-primary" />
        </div>
        <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:px-8">
          <div className="bg-white px-6 py-16 sm:py-24 lg:px-0 lg:pr-8">
            <div className="mx-auto max-w-lg lg:mx-0">
              <h2 className="text-lg font-semibold text-light-blue">
                Simple pricing
              </h2>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">
                14-day free trial
              </h3>
              <dl className="mt-12 space-y-10">
                {[
                  {
                    title: "Unlimited Participants",
                    desc: "We won't charge you based on the number of Participants.",
                    icon: "M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z",
                  },
                  {
                    title: "14-day free trial",
                    desc: "Give Lifegroup a go for 2 weeks - no credit card required.",
                    icon: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z",
                  },
                  {
                    title: "Import data",
                    desc: "Get started in minutes using our data import function.",
                    icon: "M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75",
                  },
                  {
                    title: "Priority support",
                    desc: "Support is available to all Lifegroup Professional users via phone and email.",
                    icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z",
                  },
                ].map((item) => (
                  <div key={item.title} className="relative">
                    <dt>
                      <div className="absolute flex h-12 w-12 items-center justify-center rounded-lg bg-light-blue">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          className="h-6 w-6 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={item.icon}
                          />
                        </svg>
                      </div>
                      <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                        {item.title}
                      </p>
                    </dt>
                    <dd className="ml-16 mt-2 text-base text-gray-500">
                      {item.desc}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="relative bg-primary px-6 py-16 sm:py-24 lg:flex lg:items-center lg:justify-end lg:bg-none lg:px-0 lg:pl-8">
            <div className="relative z-10 mx-auto w-full max-w-lg space-y-8 lg:mx-0">
              <div>
                <h2 className="sr-only">Price</h2>
                <p className="relative grid grid-cols-2">
                  <span className="flex flex-col text-center">
                    <span className="text-5xl font-bold tracking-tight text-white">
                      $0
                    </span>
                    <span className="mt-2 text-base font-medium text-gray-50">
                      setup fee
                    </span>
                    <span className="sr-only">plus</span>
                  </span>
                  <span
                    className="pointer-events-none absolute flex h-12 w-full items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-6 w-6 text-primary-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </span>
                  <span>
                    <span className="flex flex-col text-center">
                      <span className="text-5xl font-bold tracking-tight text-white">
                        $64
                      </span>
                      <span className="mt-2 text-base font-medium text-gray-50">
                        per user, per month
                      </span>
                    </span>
                  </span>
                </p>
              </div>
              <ul
                role="list"
                className="grid gap-px overflow-hidden rounded sm:grid-cols-2"
              >
                {[
                  "Invoice generation",
                  "2-way Xero Integration",
                  "eSignatures",
                  "Document Generation",
                  "Notifications",
                  "Phone & Email Support",
                  "Import your data",
                  "Service Agreements",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center space-x-3 bg-primary bg-opacity-50 px-4 py-4 text-base text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-6 w-6 text-primary-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div>
                <Link
                  href="/register"
                  className="inline-flex items-center whitespace-nowrap rounded-md text-base font-semibold ring-offset-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-50 bg-white text-gray-900 shadow hover:bg-gray-200 px-4 py-2 w-full justify-center"
                  target="_blank"
                >
                  Get started today
                </Link>
                <div className="mt-4 text-center">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold ring-offset-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-50 text-white hover:bg-gray-100/10 px-4 py-2"
                  >
                    compare plans <span aria-hidden="true">&nbsp; →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
