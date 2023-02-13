import "../styles/index.css";
// import "react-comments-section/dist/index.css";
import Prism from "prismjs";
import React, { useEffect, useState } from "react";
import { ThemeContext, ThemeProvider } from "../lib/themeContext";
import Page from "../components/Page";
import { useRouter } from "next/router";

// const ThemeContext = React.createContext('light');
export const UserContext = React.createContext(
  {} as {
    avatar_url: string;
    email: string;
    email_verified: boolean;
    full_name: string;
    iss: string;
    name: string;
    picture: string;
    provider_id: string;
    sub: string;
  }
);

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   Prism.highlightAll()
  // }, [])

  // const { toggle } = useContext(ThemeContext);
  // console.log(toggle)

  const router = useRouter();
  const [isTokenSet, setIsTokenSet] = useState(false);
  const [userData, setUserData] = useState();
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
          apikey: process.env.NEXT_PUBLIC_SUPABASE_CLIENT_KEY,
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
