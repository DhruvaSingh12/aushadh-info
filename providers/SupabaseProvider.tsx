"use client";


import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useState} from "react"
import {SessionContextProvider} from "@supabase/auth-helpers-react"

interface SupabaseProviderProps {
    children: React.ReactNode;
};

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
    children
}) => {
    const [supabaseClient] = useState(() => createClientComponentClient()
  );
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
        {children}
    </SessionContextProvider>
  )
}

export default SupabaseProvider;