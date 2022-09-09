import { useState, useEffect, useContext, useInsertionEffect } from "react";
import { UserContext, LoadContext } from "./_app";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ipvwqlwbmyiusmfrqllp.supabase.co";
const supabase = createClient(
  SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASEANON
);

export default function Home() {
  const { userInfo, sessionInfo } = useContext(UserContext);
  const { loadState, setLoadState } = useContext(LoadContext);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  console.log(userInfo);
  console.log(sessionInfo);

  function displayUserContent(info) {
    setUserFirstName(info.result.first_name);
    setUserLastName(info.result.last_name);
    setLoadState("OFF");
  }

  console.log("call");
  console.log(sessionInfo);
  console.log(userInfo);
  useEffect(
    function () {
      if (userInfo !== null && userInfo.aud === "authenticated") {
        console.log("call1");
        const endpoint =
          process.env.NEXT_PUBLIC_URL +
          "/v1/projects/" +
          process.env.NEXT_PUBLIC_XMPIEACCESSTOKEN +
          "/adorvalues/context" +
          "?rid=" +
          userInfo.id +
          "&adors=last_name" +
          "&adors=first_name";
        fetch(endpoint, {
          method: "GET",
        })
          .then((res) => {
            return res.json();
          })
          .then(displayUserContent)
          .catch((err) => console.log(err));
      }
    },
    [userInfo]
  );

  return (
    <div>
      <main>
        <div className="grid-container">
          <div className="grid-x">
            <div className="large-12 medium-12 small-12 cell align-center text-center">
              <h2>
                hello, {userFirstName} {userLastName}.
              </h2>
            </div>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
