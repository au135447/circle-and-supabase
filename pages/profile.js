import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SupabaseContext } from "./_app";

export default function Profile() {
  const supabase = useContext(SupabaseContext);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [userFirstname, setUserFirstname] = useState(null);
  const [userLastname, setUserLastname] = useState(null);
  const router = useRouter();

  function handleFirstNameInput(e) {
    setFirstname(e.target.value);
  }
  function handleLastNameInput(e) {
    setLastname(e.target.value);
  }
  function displayUserContent(info) {
    setUserFirstname(info.result.first_name);
    setUserLastname(info.result.last_name);
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
  //UPDATE START
  async function handleUpdate(e) {
    e.preventDefault();
    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      "/v1/projects/" +
      process.env.NEXT_PUBLIC_XMPIEACCESSTOKEN +
      "/adorvalues" +
      "?rid=" +
      supabase.currentUser.id +
      "&adors=last_name" +
      "&adors=first_name";
    let newAdorsValue = {};
    newAdorsValue["first_name"] = firstname;
    newAdorsValue["last_name"] = lastname;
    fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAdorsValue),
    })
      .then((res) => {
        return res.json();
      })
      .then((info) => {
        setUserFirstname(info.first_name);
        setUserLastname(info.last_name);
      })
      .catch((err) => console.log(err));
  }
  //UPDATE END

  return (
    <div>
      <main>
        <div className="grid-container main-container">
          <div className="grid-x">
            <div className="large-12 medium-12 small-12 cell align-center text-center">
              <h2>
                hello, {userFirstname} {userLastname}.
              </h2>
            </div>
            <div className="large-8 medium-8 small-12 cell align-center">
              <form>
                <input
                  type="text"
                  placeholder="first name"
                  onChange={handleFirstNameInput}
                />
                <input
                  type="text"
                  placeholder="last name"
                  onChange={handleLastNameInput}
                />
                <input
                  id="submit-btn"
                  type="submit"
                  value="update profile"
                  onClick={handleUpdate}
                />
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
