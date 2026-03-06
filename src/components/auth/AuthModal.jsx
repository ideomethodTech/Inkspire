"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { loginUser as realLoginUser } from "@/api/auth"; // keep this import

export default function AuthModal({ initialMode = "email", onClose }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // --- TEMPORARY override for testing login redirect ---
  const loginUser = async (_idToken, email) => {
    return {
      token: "fake-jwt-token",
      user: { email, userId: "123", role: "user" },
    };
  };

  // --- Simulate API check for existing user ---
  const checkEmail = async (email) => {
    // Replace this with real API later: /auth/check-email
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ isExistingUser: email === "test@test.com" });
      }, 500);
    });
  };

  // --- Handle "Continue" from email step ---
  const handleEmailContinue = async () => {
    if (!email) return alert("Please enter an email");
    setLoading(true);

    try {
      const response = await checkEmail(email);
      setMode(response.isExistingUser ? "signin" : "signup");
    } catch (err) {
      console.error("Error checking email:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Handle actual login ---
  const handleLogin = async () => {
    if (!password) return alert("Please enter your password");

    setLoading(true);
    try {
      // Use temporary loginUser for now
      const data = await loginUser("dummy-token", email);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to user profile
      window.location.href = "/user/profile";
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // --- Handle signup ---
  const handleSignup = async () => {
    if (!password) return alert("Please enter a password");

    setLoading(true);
    try {
      // Here you can call your real signup API later
      const data = await loginUser("dummy-token", email);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect after signup
      window.location.href = "/user/profile";
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Check console for details.");
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

       {/* EMAIL STEP*/}
{mode === "email" && (
  <>
    <h2 className="mb-2 text-sm font-semibold uppercase">
      Sign in / Create an account
    </h2>
    <p className="mb-6 text-sm text-muted-foreground">
      Enter your email to sign in or create a new account.
    </p>

    <label className="mb-2 block text-sm font-medium">Email *</label>
    <Input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <Button
      className="mt-6 w-full"
      onClick={handleEmailContinue} // <--- use the real function with API/email check
      disabled={loading}
    >
      {loading ? "Checking..." : "Continue"}
    </Button>

    <div className="my-6 flex items-center gap-2 text-xs text-muted-foreground">
      <div className="h-px flex-1 bg-border" />
      OR
      <div className="h-px flex-1 bg-border" />
    </div>

    <Button variant="outline" className="w-full">
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
            <Button className="mt-6 w-full" onClick={handleLogin} disabled={loading}>
              {loading ? "Signing in..." : "Continue"}
            </Button>
          </>
        )}

        {/* SIGN UP */}
{mode === "signup" && (
  <>
    <h2 className="mb-2 text-sm font-semibold uppercase">Create an account</h2>
    <p className="mb-6 text-sm text-muted-foreground">
      Create your account to save posters, track orders, and manage your profile
    </p>

    {/* Email */}
    <label className="mb-2 block text-sm font-medium">Email *</label>
    <Input value={email} disabled />

    {/* Password */}
    <label className="mt-4 mb-2 block text-sm font-medium">Create a password *</label>
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
    <label className="mt-4 mb-2 block text-sm font-medium">Date of birth *</label>
    <Input
      placeholder="MM / DD / YYYY"
    />

    {/* Newsletter checkbox */}
    <div className="mt-4 flex items-center gap-2">
      <Checkbox />
      <span className="text-xs">Sign up for email updates and offers</span>
    </div>

    {/* Signup button */}
    <Button
      className="mt-6 w-full"
      onClick={handleSignup}
      disabled={loading}
    >
      {loading ? "Creating..." : "Create account"}
    </Button>

    {/* Sign in link */}
    <Button
      variant="outline"
      className="mt-3 w-full"
      onClick={() => setMode("signin")}
    >
      Already have an account? Sign in
    </Button>
  </>
)}
      </div>
    </div>
  );
}