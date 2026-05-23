"use client"
import { ChangeEvent, KeyboardEvent, useState } from "react"

interface FieldProps {
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onEnter : () => void
}

export const Field = ({ label, type, placeholder, value, onChange, onEnter}: FieldProps) => {
  const [focused, setFocused] = useState<boolean>(false)

  return (
    <div>
      <label className="block text-white/50 text-[0.78rem] font-medium tracking-[0.06em] uppercase mb-1.5">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onEnter()}
        className={`w-full px-3.5 py-[11px] rounded-[9px] bg-white/4 text-white text-[0.9rem] outline-none transition-all duration-200 box-border
          ${focused
            ? "border border-[rgba(30,144,255,0.6)] shadow-[0_0_0_3px_rgba(30,144,255,0.12)]"
            : "border border-white/8 shadow-none"
          }`}
      />
    </div>
  )
}
