"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { loginUser as realLoginUser, registerUser } from "@/services/authService";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import PhoneInput from 'react-phone-number-input';
import countryList from 'react-select-country-list';

export default function AuthModal({ initialMode = "signin", onClose, onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const countries = countryList().getData(); 
  const [country, setCountry] = useState("IN");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const [errors, setErrors] = useState({});

  // --- Handle login ---
  const handleLogin = async () => {
    if (!email) return alert("Please enter your email");
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

      if (onLoginSuccess) onLoginSuccess(data.user);
      window.location.href = "/user/profile";
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const validateSignup = () => {
  const newErrors = {};

  // Name (2–100 chars)
  if (!name || name.length < 2 || name.length > 100) {
    newErrors.name = "Name must be between 2 and 100 characters";
  }

  // Email (basic check)
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Enter a valid email";
  }

  // Password (your UI rule)
  if (!password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,25}$/.test(password)) {
    newErrors.password =
      "Password must be 8–25 chars, include uppercase, lowercase & number";
  }

  // DOB (YYYY-MM-DD and must be past)
  if (!dob || isNaN(new Date(dob))) {
    newErrors.dob = "Enter a valid date";
  } else if (new Date(dob) >= new Date()) {
    newErrors.dob = "DOB must be in the past";
  }
// Phone (E.164 format)
if (!phoneNumber || !/^\+[1-9]\d{7,14}$/.test(phoneNumber)) {
  newErrors.phoneNumber =
    "Enter a valid international phone number (e.g. +2348012345678)";
}
  // Country
 
  if (!country) {
    newErrors.country = "Select a country";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  // --- Handle signup ---
  const handleSignup = async () => {
  if (!validateSignup()) return;
  setLoading(true);
  try {
   const data = await registerUser({
  email,
  password,
  displayName: name,
  dob,
  country,
  phoneNumber: phoneNumber  
});
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (onLoginSuccess) onLoginSuccess(data.user);
      window.location.href = "/user/profile";
    } catch (error) {
      console.error("Signup failed:", error);
      alert(error.response?.data?.message || error.message || "Signup failed");
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

      if (onLoginSuccess) onLoginSuccess(data.user);
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

        {/* SIGN IN */}
        {mode === "signin" && (
          <>
            <h2 className="mb-2 text-sm font-semibold uppercase">Sign in</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
            
            <label className="mb-2 block text-sm font-medium">Email *</label>
            <Input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              type="email"
            />
            
            <label className="mt-4 mb-2 block text-sm font-medium">Password *</label>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button
              className="mt-6 w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
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

            <Button
              variant="ghost"
              className="mt-4 w-full text-sm"
              onClick={() => setMode("signup")}
            >
              Don't have an account? Sign up
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
<Input
  value={name}
  onChange={(e) => {
    setName(e.target.value);
    setErrors((prev) => ({ ...prev, name: "" }));
  }}
  placeholder="Full Name"
/>
{errors.name && (
  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
)}

{/* Email */}
<label className="mt-4 mb-2 block text-sm font-medium">Email *</label>
<Input
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: "" }));
  }}
  placeholder="Email"
  type="email"
/>
{errors.email && (
  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
)}

{/* Password */}
<label className="mt-4 mb-2 block text-sm font-medium">
  Create a password *
</label>
<Input
  type="password"
  placeholder="Create password"
  value={password}
  onChange={(e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: "" }));
  }}
/>
<p className="mt-1 text-xs text-muted-foreground">
  8–25 characters, 1 number, 1 uppercase, 1 lowercase
</p>
{errors.password && (
  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
)}

{/* Date of birth */}
<label className="mt-4 mb-2 block text-sm font-medium">
  Date of birth *
</label>
<Input
  type="date"
  value={dob}
  onChange={(e) => {
    setDob(e.target.value);
    setErrors((prev) => ({ ...prev, dob: "" }));
  }}
/>
{errors.dob && (
  <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
)}

{/* Country */}
<label className="mt-4 mb-2 block text-sm font-medium">
  Country *
</label>
<select
  value={country}
  onChange={(e) => {
    setCountry(e.target.value);
    setErrors((prev) => ({ ...prev, country: "" }));
  }}
  className="w-full border rounded-md px-3 py-2"
>
  {countries.map((c) => (
    <option key={c.value} value={c.value}>
      {c.label}
    </option>
  ))}
</select>
{errors.country && (
  <p className="text-red-500 text-xs mt-1">{errors.country}</p>
)}

{/* Phone Number */}
<label className="mt-4 mb-2 block text-sm font-medium">
  Phone Number *
</label>
<PhoneInput
  international
  defaultCountry="IN"
  value={phoneNumber}
  onChange={(value) => {
    setPhoneNumber(value);
    setErrors((prev) => ({ ...prev, phoneNumber: "" }));
  }}
  className="border rounded-md px-3 py-2"
/>
{errors.phoneNumber && (
  <p className="text-red-500 text-xs mt-1">
    {errors.phoneNumber}
  </p>
)}
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