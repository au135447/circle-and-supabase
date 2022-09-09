import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ipvwqlwbmyiusmfrqllp.supabase.co";
const supabase = createClient(
  SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASEANON
);

export default function Register() {
  const [loginState, setLoginState] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  function handleUsernameInput(e) {
    setUsername(e.target.value);
  }
  function handlePasswdInput(e) {
    setPassword(e.target.value);
  }
  function handleFirstNameInput(e) {
    setFirstName(e.target.value);
  }
  function handleLastNameInput(e) {
    setLastName(e.target.value);
  }
  //REGISTERATION START
  async function handleRegister(e) {
    e.preventDefault();
    const { user, session, error } = await supabase.auth.signUp({
      email: `${username}`,
      password: `${password}`,
    });
    console.log(user.id);
    console.log(user.email);

    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      "/v1/projects/" +
      process.env.NEXT_PUBLIC_XMPIEACCESSTOKEN +
      "/adorvalues";
    let newRecipientData = {
      newRecipientValues: {
        user_uuid: user.id,
        email: user.email,
        first_name: firstName,
        last_name: lastName,
      },
      recipientID: user.id,
      newRecipientRetrieveADORs: [
        "user_uuid",
        "email",
        "first_name",
        "last_name",
      ],
      newRecipientResolvedADORs: [],
    };
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipientData),
    })
      .then((res) => {
        return res.json();
      })
      .then(circleRegister);
  }
  function circleRegister(e) {
    console.log(e);
  }
  //REGISTERATION END

  return (
    <div>
      <main>
        <div className="grid-container main-container">
          <div className="grid-x">
            <div className="large-8 medium-8 small-12 cell align-center">
              <form>
                <input
                  type="text"
                  placeholder="email*"
                  onChange={handleUsernameInput}
                />
                <input
                  type="password"
                  placeholder="password*"
                  onChange={handlePasswdInput}
                />
                <input
                  type="text"
                  placeholder="first name*"
                  onChange={handleFirstNameInput}
                />
                <input
                  type="text"
                  placeholder="last name*"
                  onChange={handleLastNameInput}
                />
                <input
                  id="submit-btn"
                  type="submit"
                  value="register now"
                  onClick={handleRegister}
                />
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
