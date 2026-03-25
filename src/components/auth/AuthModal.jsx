"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { loginUser as realLoginUser, registerUser } from "@/api/auth";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export default function AuthModal({ initialMode = "email", onClose }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();

  // --- Handle "Continue" from email step ---
  const handleEmailContinue = async () => {
    if (!email) return alert("Please enter an email");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/auth/check-email?email=${email}`
      );
      const data = await response.json();
      setMode(data.isExistingUser ? "signin" : "signup");
    } catch (err) {
      console.error("Error checking email:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Handle login ---
  const handleLogin = async () => {
    if (!password) return alert("Please enter your password");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await userCredential.user.getIdToken();
      const data = await realLoginUser(idToken);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/user/profile";
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // --- Handle signup ---
  const handleSignup = async () => {
    if (!password) return alert("Please enter a password");
    if (!name) return alert("Please enter your name");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await userCredential.user.getIdToken();
      const data = await registerUser({
        idToken,
        email,
        password, // Some backends might want this if not purely firebase
        name,
        dob,
        phone_number: phoneNumber
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/user/profile";
    } catch (error) {
      console.error("Signup failed:", error);
      alert(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const data = await realLoginUser(idToken);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/user/profile";
    } catch (error) {
      console.error("Google login failed:", error);
      alert(error.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X className="h-5 w-5" />
        </button>

        {/* EMAIL STEP */}
        {mode === "email" && (
          <>
            <h2 className="mb-2 text-sm font-semibold uppercase">
              Sign in / Create an account
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Enter your email to sign in or create a new account.
            </p>

            <label className="mb-2 block text-sm font-medium">Email *</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />

            <Button
              className="mt-6 w-full"
              onClick={handleEmailContinue}
              disabled={loading}
            >
              {loading ? "Checking..." : "Continue"}
            </Button>

            <div className="my-6 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              OR
              <div className="h-px flex-1 bg-border" />
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              Continue with Google
            </Button>
          </>
        )}

        {/* SIGN IN */}
        {mode === "signin" && (
          <>
            <h2 className="mb-2 text-sm font-semibold uppercase">Sign in</h2>
            <Input value={email} disabled />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2"
            />
            <Button
              className="mt-6 w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Continue"}
            </Button>
          </>
        )}

        {/* SIGN UP */}
        {mode === "signup" && (
          <div className="max-h-[80vh] overflow-y-auto pr-2">
            <h2 className="mb-2 text-sm font-semibold uppercase">
              Create an account
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Create your account to save posters, track orders, and manage your
              profile
            </p>

            {/* Name */}
            <label className="mb-2 block text-sm font-medium">Full Name *</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />

            {/* Email */}
            <label className="mt-4 mb-2 block text-sm font-medium">Email *</label>
            <Input value={email} disabled />

            {/* Password */}
            <label className="mt-4 mb-2 block text-sm font-medium">
              Create a password *
            </label>
            <Input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              8–25 characters, 1 number, 1 uppercase, 1 lowercase
            </p>

            {/* Date of birth */}
            <label className="mt-4 mb-2 block text-sm font-medium">
              Date of birth *
            </label>
            <Input 
              placeholder="MM / DD / YYYY" 
              value={dob} 
              onChange={(e) => setDob(e.target.value)} 
            />

            {/* Phone Number */}
            <label className="mt-4 mb-2 block text-sm font-medium">
              Phone Number *
            </label>
            <Input 
              placeholder="Phone Number" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
            />

            {/* Newsletter checkbox */}
            <div className="mt-4 flex items-center gap-2">
              <Checkbox id="newsletter" />
              <label htmlFor="newsletter" className="text-xs">
                Sign up for email updates and offers
              </label>
            </div>

            <Button
              className="mt-6 w-full"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create account"}
            </Button>

            <Button
              variant="outline"
              className="mt-3 w-full"
              onClick={() => setMode("signin")}
            >
              Already have an account? Sign in
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}