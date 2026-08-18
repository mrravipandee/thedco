"use client";

import React from "react";

export interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function MagneticButton({ children, ...props }: MagneticButtonProps) {
  return <button {...props}>{children}</button>;
}
