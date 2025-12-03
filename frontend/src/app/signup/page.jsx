"use client";
import { useForm } from "react-hook-form";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/signup", data);
      alert("Signup successful!");
      router.push("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg p-8 rounded-lg w-[350px] space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        <input
          {...register("name")}
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          required
        />

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
          Signup
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline">Login</a>
        </p>
      </form>
    </div>
  );
}
