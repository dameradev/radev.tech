import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// COMPONENTS
import Page from "@/components/Page";

// LIBS
import { ThemeProvider } from "@/lib/themeContext";
import { User, UserContext } from '@/lib/userContext';
import { NEXT_PUBLIC_SUPABASE_CLIENT_KEY } from '@/lib/constants';

import "../styles/index.css";

const MyApp = ({ Component, pageProps }) =>{
  const router = useRouter();
  const [isTokenSet, setIsTokenSet] = useState(false);
  const [userData, setUserData] = useState({} as User);
  useEffect(() => {
    const token =
      router.asPath.split("#access_token=")[1]?.split("&")[0] ||
      localStorage.getItem("access_token")?.split("&")[0];

    if (token) {
      localStorage.setItem("access_token", token);
      setIsTokenSet(true);
    }
  }, []);

  useEffect(() => {
    if (isTokenSet) {
      fetch("https://cytpssgpodczcaxfmgoc.supabase.co/auth/v1/user", {
        headers: {
          apikey: NEXT_PUBLIC_SUPABASE_CLIENT_KEY,
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.code === 401) {
            localStorage.removeItem("access_token");
          }
          if (data) {
            // setUserData(data.identeties[0].identity_data);
            setUserData(data.identities?.[0].identity_data);
          }
        })
        .catch((err) => {
          localStorage.removeItem("access_token");
          console.log(err, "err");
        });
    }
  }, [isTokenSet]);

  return (
    <ThemeProvider>
      <UserContext.Provider value={userData}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
