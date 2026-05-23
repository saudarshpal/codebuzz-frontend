"use client"
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Signin from "./components/Signin";
import SignUp from "./components/Signup";

export default function Home() {
  const [ isSignIn, setIsSignIn] = useState(true);
  const toggle = () => setIsSignIn(prev => !prev);

  const codeRef = useRef(null);
  const buzzRef = useRef(null);
  const taglineRef = useRef(null);
  const containerRef = useRef(null);
  const authRef = useRef(null);

  useEffect(() => {
    const ctx =  gsap.context(() => {
      const tl = gsap.timeline({ defaults : { ease: "power4.out" }})

      //code drops from above
      tl.fromTo(
        codeRef.current,
        { y: -180, opacity: 0, skewY: -5},
        { y: 0, opacity: 1, skewY: 0, duration: 1 }
      )

      //buzz rise from down
      .fromTo(
        buzzRef.current,
        { y: 180, opacity: 0, skewY: 5},
        { y: 0, opacity: 1, skewY: 0, duration: 1 },
        "<0.1"
      )

      //tagline comes form left
      .fromTo(
        taglineRef.current,
        { x: -120, opacity: 0},
        { x : 0, opacity: 1, duration: 0.9},
        "-=0.5"
      )

      .fromTo(
        authRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85},
        "-=0.5"
      )

    }, containerRef)

    return () => ctx.revert();
  },[])

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0d0d0d] flex flex-row overflow-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 2px)",
          backgroundSize: "60px 60px",
        }}
      />  

      {/* Left: Branding */}
      <div className="relative w-8/12 flex flex-col items-start justify-center pl-28 pb-10 z-10">
        {/* Glow blob */}
        <div
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(30,144,255,0.12) 0%, transparent 10%)",
            filter: "blur(40px)",
          }}
        />

        {/* Title: "Code" and "Buzz" animate independently */}
        <div className="overflow-hidden">
          <div className="flex items-baseline leading-none">
            <span
              ref={codeRef}
              className="inline-block text-white font-extrabold"
              style={{ fontSize: "clamp(4rem, 8vw, 7rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
            >
              Code
            </span>
            <span
              ref={buzzRef}
              className="inline-block font-extrabold"
              style={{ fontSize: "clamp(4rem, 8vw, 7rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "#1e90ff" }}
            >
              Buzz
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-neutral-400 mt-3 pl-1"
          style={{ fontSize: "1.05rem", letterSpacing: "0.01em", maxWidth: "420px" }}
        >
          A community-driven space for coding discussions and discoveries
        </p>

        {/* Decorative accent line */}
        <div
          className="mt-8 ml-1 h-px"
          style={{
            width: "120px",
            background: "linear-gradient(90deg, #1e90ff, transparent)",
          }}
        /> 
      </div>

      {/* Right: Auth Card */}
      <div ref={authRef} className="w-5/12 flex items-center justify-center h-screen pr-10 z-10">
       { isSignIn ? <Signin toggle={toggle} /> : <SignUp toggle={toggle} /> }
      </div>
    </div>
  )
}
