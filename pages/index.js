import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { SupabaseContext } from "./_app";

export default function Home() {
  const supabase = useContext(SupabaseContext);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);

  function displayUserContent(info) {
    setUserFirstName(info.result.first_name);
    setUserLastName(info.result.last_name);
  }
  if (supabase.currentUser) {
    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      "/v1/projects/" +
      process.env.NEXT_PUBLIC_XMPIEACCESSTOKEN +
      "/adorvalues/context" +
      "?rid=" +
      supabase.currentUser.id +
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
