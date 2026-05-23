"use client"

import { useState } from "react"
import { Spinner } from "./Spinner"
import { Field } from "./Field"
import { useAuth } from "../hooks/useAuth"

const SignUp = ({ toggle } : { toggle : ()=> void }) => {
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { signupMutation } = useAuth()
  

  const handleSignUp = async() => {
    signupMutation.mutateAsync({ username, email, password })
  }

  return (
    <div className="w-[360px] bg-[rgba(18,18,18,0.92)] border border-white/8 rounded-2xl px-8 pt-9 pb-7 backdrop-blur-xl shadow-[0_8px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] font-[Space_Grotesk,sans-serif]">

      <div className="mb-7">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff]" />
          <span className="text-[#1e90ff] text-[11px] tracking-[0.15em] font-semibold uppercase">
            Join the community
          </span>
        </div>
        <h1 className="text-white text-[1.65rem] font-bold m-0 tracking-tight">
          Create Account
        </h1>
        <p className="text-white/35 text-sm mt-1.5 mb-0">
          Enter your details to get started
        </p>
      </div>

      <div className="h-px bg-white/[0.07] mb-6" />

      <div className="flex flex-col gap-4">
        <Field
          label="Username"
          type="text"
          placeholder="LeoJoseph21"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onEnter={handleSignUp}
        />
        <Field
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onEnter={handleSignUp}
        />
        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onEnter={handleSignUp}
        />
      </div>

      <button
        onClick={handleSignUp}
        disabled={signupMutation.isPending}
        className={`mt-6 w-full py-[13px] rounded-[10px] border-none text-white font-semibold text-[0.95rem] tracking-[0.01em] transition-all duration-200 flex items-center justify-center gap-2
          ${signupMutation.isPending
            ? "bg-[rgba(30,144,255,0.4)] cursor-not-allowed shadow-none"
            : "bg-linear-to-br from-[#1e90ff] to-[#0070e0] cursor-pointer shadow-[0_4px_20px_rgba(30,144,255,0.35)] hover:shadow-[0_6px_28px_rgba(30,144,255,0.55)]"
          }`}
      >
        {signupMutation.isPending ? (
          <>
            <Spinner />
            Creating account…
          </>
        ) : (
          "Create Account →"
        )}
      </button>

      <p className="text-center mt-5 text-white/30 text-[0.82rem]">
        Already have an account?{" "}
        <button
          onClick={toggle}
          className="bg-transparent border-none text-[#1e90ff] cursor-pointer text-[0.82rem] font-semibold p-0 underline underline-offset-[3px]"
        >
          Sign In
        </button>
      </p>
    </div>
  )
}

export default SignUp