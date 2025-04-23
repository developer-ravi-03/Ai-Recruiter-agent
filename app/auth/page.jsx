"use client";
import { useState } from "react";
import { Mail, Lock, LogIn, User } from "lucide-react";
import { supabase } from "@/services/supabaseClient";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // const handleLogin = () => {
  //   console.log("Logging in with:", email, password);
  // };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // ✅ Prevent form reload
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/",
      },
    });
    if (error) {
      console.error("Error logging in with email and password:", error.message);
    } else {
      console.log("Login success:", data);
      router.push("/");
    }
  };

  console.log("Logging in with:", email, password);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-6 text-center">Login</h2>

        {/* Email Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <div className="flex items-center border rounded px-3">
            <Mail className="text-gray-400 w-4 h-4" />
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-2 outline-none"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="flex items-center border rounded px-3">
            <Lock className="text-gray-400 w-4 h-4" />
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-2 outline-none"
            />
          </div>
        </div>

        {/* Sign In Button */}
        <div className="mb-4">
          <button
            onClick={handleSignUp}
            type="submit"
            className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </button>
        </div>

        {/* OR Separator */}
        <div className="text-center text-gray-500 text-sm mb-4">OR</div>

        {/* Google Login Button */}
        <div>
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
              className="w-4 h-4 mr-2 bg-white rounded-full"
            />
            Login with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
