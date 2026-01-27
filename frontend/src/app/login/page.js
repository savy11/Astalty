"use client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character",
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      // console.log("Login submitted:", { email, password });
      // // Add your login logic here
      // router.push("/dashboard");

      try {
        const response = await fetch("http://localhost:8000/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // ✅ Save token
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          // ✅ Redirect
          router.push("/dashboard");
        } else {
          alert(data.message || "Invalid email or password");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="bg-background antialiased min-h-screen flex">
      <Head>
        <title>Login - Astalty</title>
      </Head>

      {/* Left Section - Promotional Content */}
      <div className="bg-navy relative isolate hidden flex-1 overflow-hidden lg:block">
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
        <div className="flex min-h-full flex-col items-start justify-center p-24">
          <div className="mb-8 text-6xl font-bold tracking-tight text-white">
            Good evening
          </div>
          <div className="h-[500px] w-full max-w-none">
            <div className="prose prose-invert">
              <h2>
                Leave a review and save your organisation $25 off their next
                invoice!
              </h2>
              <h3>Anyone from your organisation can leave a review.</h3>
              <p>
                At Astalty, we value your experience and rely on word of mouth
                to reach more amazing users like you.
              </p>
              <p>
                If you love what we do, we&apos;d appreciate your feedback.
                Leave us a Google review and we&apos;ll credit $25 to your
                organisation&apos;s account.
              </p>
              <p>
                To claim the credit, please click the button below, leave a
                review on Google and send a screenshot of your review to{" "}
                <strong className="text-white">hello@astalty.com.au</strong> so
                we can add the credit to your account.
              </p>
            </div>
            <a
              className="inline-flex items-center cursor-pointer relative justify-center text-sm font-medium ring-offset-background transition-colors duration-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white text-foreground shadow-xs active:bg-gray-200 h-9 px-4 rounded-md mt-4"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="inline-flex items-center justify-center whitespace-nowrap">
                Leave a review
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
                  className="ml-2 h-4 w-4"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
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
            fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
          ></rect>
        </svg>
        <div className="mx-4 w-full max-w-md">
          <div className="rounded-card border bg-white p-8 shadow-2xl">
            <Image
              src="/assets/logo.png"
              alt="Lifegroup Logo"
              width={150}
              height={50}
              className="mt-2 mb-8"
            />
            <h2 className="text-2xl leading-9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-navy font-medium">
                Start your free trial
              </Link>
            </p>
            <form onSubmit={handleSubmit} className="mt-12 space-y-4">
              <div>
                <div className="relative flex rounded-md bg-white outline-hidden transition-all ring-error focus-within:ring-error hover:ring-error hover:focus-within:ring-error ring-2 ring-inset focus-within:ring-2 focus-within:ring-inset hover:ring-2 hover:ring-inset hover:focus-within:ring-2 hover:focus-within:ring-inset">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    className={`peer h-10 block w-full bg-transparent pl-3 text-sm text-gray-900 focus:outline-none rounded-md ring-1 ${
                      emailError ? "ring-red-500" : "ring-gray-400"
                    } ring-inset focus:ring-primary focus:ring-2 focus:ring-inset hover:ring-primary hover:ring-1 hover:ring-inset`}
                  />
                  <label
                    htmlFor="email"
                    className={`pointer-events-none cursor-text absolute left-2 z-10 max-w-[calc(100%-0.75rem)] scale-100 transform overflow-hidden bg-white text-ellipsis whitespace-nowrap duration-150 select-none peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:px-1 peer-focus:text-xs peer-disabled:cursor-default -top-2 translate-y-0 px-1 text-xs ${
                      emailError
                        ? "text-error peer-focus:text-error"
                        : "text-gray-500 peer-focus:text-primary"
                    }`}
                  >
                    Email
                  </label>
                </div>
                <div
                  className={`transition-opacity ${
                    emailError ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="mb-2 h-4 pl-3 text-xs tracking-tight text-red-500">
                    {emailError}
                  </p>
                </div>
              </div>
              <div>
                <div className="relative flex rounded-md bg-white outline-hidden transition-all ring-error focus-within:ring-error hover:ring-error hover:focus-within:ring-error ring-2 ring-inset focus-within:ring-2 focus-within:ring-inset hover:ring-2 hover:ring-inset hover:focus-within:ring-2 hover:focus-within:ring-inset">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    className={`peer h-10 block w-full bg-transparent pl-3 text-sm text-gray-900 focus:outline-none rounded-md ring-1 ${
                      passwordError ? "ring-red-500" : "ring-gray-400"
                    } ring-inset focus:ring-primary focus:ring-2 focus:ring-inset hover:ring-primary hover:ring-1 hover:ring-inset`}
                  />
                  <label
                    htmlFor="password"
                    className={`pointer-events-none cursor-text absolute left-2 z-10 max-w-[calc(100%-0.75rem)] scale-100 transform overflow-hidden bg-white text-ellipsis whitespace-nowrap duration-150 select-none peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:px-1 peer-focus:text-xs peer-disabled:cursor-default -top-2 translate-y-0 px-1 text-xs ${
                      passwordError
                        ? "text-error peer-focus:text-erro"
                        : "text-gray-500 peer-focus:text-primary"
                    }`}
                  >
                    Password
                  </label>
                </div>
                <div
                  className={`transition-opacity ${
                    passwordError ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="mb-2 h-4 pl-3 text-xs tracking-tight text-red-500">
                    {passwordError}
                  </p>
                </div>
              </div>
              <div className="mb-6 text-right">
                <Link
                  href="/forgot-password"
                  className="text-navy text-sm font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="inline-flex items-center cursor-pointer relative justify-center text-sm font-medium ring-offset-background transition-colors duration-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-navy text-primary-foreground hover:bg-navy/90 shadow-xs active:bg-navy/80 h-9 px-4 rounded-md w-full"
              >
                <span className="inline-flex items-center justify-center whitespace-nowrap text-white">
                  Login
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
