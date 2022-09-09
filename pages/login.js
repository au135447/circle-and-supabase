import { useState, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext, LoadContext } from "./_app";

const SUPABASE_URL = "https://ipvwqlwbmyiusmfrqllp.supabase.co";
const supabase = createClient(
  SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASEANON
);

export default function Login() {
  const { userInfo, sessionInfo } = useContext(UserContext);
  const { loadState, setLoadState } = useContext(LoadContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const router = useRouter();

  function handleUsernameInput(e) {
    setUsername(e.target.value);
  }
  function handlePasswdInput(e) {
    setPassword(e.target.value);
  }
  //REGISTERATION START
  async function handleLogin(e) {
    e.preventDefault();
    const { user, session, error } = await supabase.auth.signIn({
      email: `${username}`,
      password: `${password}`,
    });
    if (session) {
      console.log(user);
      console.log(session);
      setLoadState("ON");
      router.push("/");
    }
    if (error) {
      console.log(error);
    }
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
                  id="submit-btn"
                  type="submit"
                  value="login"
                  onClick={handleLogin}
                />
                <p>
                  Don't have an account?{" "}
                  <Link href="/register">
                    <a>Sing up now</a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
