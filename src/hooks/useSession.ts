"use client";

import { useEffect, useState } from "react";

export function useSession() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        setUser(data.user || null);
      } catch (error) {
        console.error("Erro ao buscar sessão:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { user, loading };
}