"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { loginUser as realLoginUser } from "@/api/auth";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";

export default function AuthModal({ initialMode = "email", onClose }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // profile fields (NO ADDRESS NOW)
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");

  const googleProvider = new GoogleAuthProvider();

  // --- Email continue ---
  const handleEmailContinue = async () => {
    if (!email) return alert("Please enter an email");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/check-email?email=${email}`
      );

      const data = await res.json();
      setMode(data.isExistingUser ? "signin" : "signup");
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // --- LOGIN ---
  const handleLogin = async () => {
    if (!password) return alert("Enter password");
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await cred.user.getIdToken();

      const data = await realLoginUser(idToken);

      // ⭐ store ONLY what backend returns
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/user/profile";
    } catch (err) {
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // --- SIGNUP ---
  const handleSignup = async () => {
    if (!password) return alert("Enter password");
    setLoading(true);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // set display name in firebase
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }

      const idToken = await cred.user.getIdToken(true);

      const data = await realLoginUser(idToken);

      // ⭐ store ONLY backend user
      localStorage.setItem("token", data.token);

      const userObj = {
        ...data.user,
        // temporary fallback until backend saves these fields
        dob,
        phoneNumber: phone,
      };

      localStorage.setItem("user", JSON.stringify(userObj));

      window.location.href = "/user/profile";
    } catch (err) {
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // --- GOOGLE LOGIN ---
  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const data = await realLoginUser(idToken);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/user/profile";
    } catch (err) {
      alert("Google login failed");
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

        {mode === "email" && (
          <>
            <h2 className="mb-2 text-sm font-semibold uppercase">
              Sign in / Create an account
            </h2>

            <Input value={email} onChange={(e) => setEmail(e.target.value)} />

            <Button
              className="mt-6 w-full"
              onClick={handleEmailContinue}
              disabled={loading}
            >
              {loading ? "Checking..." : "Continue"}
            </Button>

            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>
          </>
        )}

        {mode === "signin" && (
          <>
            <h2 className="mb-2 text-sm font-semibold uppercase">Sign in</h2>

            <Input value={email} disabled />

            <Input
              type="password"
              className="mt-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button className="mt-6 w-full" onClick={handleLogin}>
              Continue
            </Button>
          </>
        )}

        {mode === "signup" && (
          <>
            <h2 className="mb-2 text-sm font-semibold uppercase">
              Create an account
            </h2>

            <Input value={email} disabled />

            <Input
              type="password"
              className="mt-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              className="mt-3"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type="date"
              className="mt-3"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />

            <Input
              className="mt-3"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="mt-4 flex items-center gap-2">
              <Checkbox />
              <span className="text-xs">Email updates</span>
            </div>

            <Button className="mt-6 w-full" onClick={handleSignup}>
              Create account
            </Button>
          </>
        )}
      </div>
    </div>
  );
}