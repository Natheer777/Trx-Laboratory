import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      }
    },
  });

  return (
    <div className="login-bg flex items-center justify-center min-h-screen">
      <form
        className="login-form w-full max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        <h2 className="login-title mb-6">Login</h2>
        <input
          type="email"
          className="login-input w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="login-input w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {error && (
          <div className="text-red-500 mt-4 text-center">
            Login failed. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}
