"use client";

import { useState } from "react";

export function useProfile() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return {
    showUserMenu,
    setShowUserMenu,
  };
}
