"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function AuthModal({ initialMode, onClose }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-md bg-white p-6">
        <button  onClick={onClose} className="absolute right-4 top-4">
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
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button className="mt-6 w-full" onClick={() => setMode("signup")}>
              Continue
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

        {/* SIGN UP */}
        {mode === "signup" && (
          <>
            <h2 className="mb-2 text-sm font-semibold uppercase">
              Create an account
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Create your account to save posters, track orders, and manage your
              profile
            </p>

            <label className="mb-2 block text-sm font-medium">Email *</label>
            <Input value={email} disabled />

            <label className="mt-4 mb-2 block text-sm font-medium">
              Create a password *
            </label>
            <Input type="password" />

            <p className="mt-1 text-xs text-muted-foreground">
              8–25 characters, 1 number, 1 uppercase, 1 lowercase
            </p>

            <label className="mt-4 mb-2 block text-sm font-medium">
              Date of birth *
            </label>
            <Input placeholder="MM / DD / YYYY" />

            <div className="mt-4 flex items-center gap-2">
              <Checkbox />
              <span className="text-xs">
                Sign up for email updates and offers
              </span>
            </div>

           <Button
  className="mt-6 w-full"
  onClick={() => setMode("success")}
>
  Create account
</Button>
          <Button
              variant="outline"
              className="mt-3 w-full"
              onClick={() => setMode("signin")}
            >
              Already have an account? Sign in
            </Button>
          </>
        )}

             {/* SIGN IN */}
        {mode === "signin" && (
          <>
            <h2 className="mb-2 text-sm font-semibold uppercase">Sign in</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Please sign in with your email and password.
            </p>

            <label className="mb-2 block text-sm font-medium">Email *</label>
            <Input value={email} disabled />

            <label className="mt-4 mb-2 block text-sm font-medium">
              Password *
            </label>
            <Input type="password" />

            <div className="mt-4 flex items-center gap-2">
              <Checkbox />
              <span className="text-xs">Remember me</span>
            </div>

            <Button className="mt-6 w-full">Continue</Button>

            <div className="mt-4 flex flex-col gap-2 text-center text-xs">
              <button
                className="underline"
                onClick={() => setMode("email")}
              >
                Use a different email
              </button>
              <button className="underline">Forgot password?</button>
            </div>
          </>
        )}

        {/* ✅ SUCCESS MODAL — MOVED OUT */}
        {mode === "success" && (
          <>
            <h2 className="mb-2 text-sm font-semibold uppercase">
              Account created
            </h2>

            <p className="mb-6 text-sm text-muted-foreground">
              Your account has been created successfully.
            </p>

            <Button
              className="w-full"
              onClick={() => setMode("signin")}
            >
              Sign in
            </Button>
          </>
        )}

      </div>
    </div>
  );
}
