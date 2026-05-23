"use client"

import { useState} from "react"
import { Field } from "./Field"
import { Spinner } from "./Spinner"
import { useAuth } from "../hooks/useAuth"

const Signin = ({ toggle } : { toggle : () => void }) => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { signinMutation } =  useAuth()

  const handleSignIn = async() => {
    signinMutation.mutateAsync({ email, password})
  }

  return (
    <div className="w-[360px] bg-[rgba(18,18,18,0.92)] border border-white/8 rounded-2xl px-8 pt-8 pb-7 backdrop-blur-xl shadow-[0_8px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] font-[Space_Grotesk,sans-serif]">

      <div className="mb-7">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#1e90ff] shadow-[0_0_8px_#1e90ff]" />
          <span className="text-[#1e90ff] text-[10px] tracking-[0.15em] font-semibold uppercase">
            Welcome back
          </span>
        </div>

        <h1 className="text-white text-[1.65rem] font-bold m-0 tracking-tight">
          Sign In
        </h1>
        <p className="text-white/35 text-sm mt-1.5 mb-0">
          Enter your credentials to continue
        </p>
      </div>

      <div className="h-px bg-white/7 mb-6" />

      <div className="flex flex-col gap-4">
        <Field
          label="Email"
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onEnter = {handleSignIn}
        />

        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onEnter={handleSignIn}
        />
      </div>
 
      <button
        onClick={handleSignIn}
        disabled={signinMutation.isPending}
        className={`mt-6 w-full py-[13px] rounded-[10px] border-none text-white font-semibold text-[0.95rem] tracking-[0.01em] transition-all duration-200 flex items-center justify-center gap-2
          ${signinMutation.isPending
            ? "bg-[rgba(30,144,255,0.4)] cursor-not-allowed shadow-none"
            : "bg-linear-to-br from-[#1e90ff] to-[#0070e0] cursor-pointer shadow-[0_4px_20px_rgba(30,144,255,0.35)] hover:shadow-[0_6px_28px_rgba(30,144,255,0.55)]"
          }`}
      >
        {signinMutation.isPending ? (
          <>
            <Spinner />
            Signing in…
          </>
        ) : (
          "Sign In →"
        )}
      </button>

      <p className="text-center mt-5 text-white/30 text-[0.82rem]">
        Don't have an account?{" "}
        <button
          onClick={toggle}
          className="bg-transparent border-none text-[#1e90ff] cursor-pointer text-[0.82rem] font-semibold p-0 underline underline-offset-[3px]"
        >
          Sign Up
        </button>
      </p>
    </div>
  )
}

export default Signin