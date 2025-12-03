"use client";
import { useForm } from "react-hook-form";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);

      // Save token to localStorage
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg p-8 rounded-lg w-[350px] space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 underline">
            Signup
          </a>
        </p>
      </form>
    </div>
  );
}
