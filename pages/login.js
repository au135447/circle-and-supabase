import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../lib/initSupabase";

export default function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const router = useRouter();

  function handleUsernameInput(e) {
    setUsername(e.target.value);
  }
  function handlePasswdInput(e) {
    setPassword(e.target.value);
  }
  //LOGIN START
  async function handleLogin(e) {
    e.preventDefault();
    const { user, session, error } = await supabase.auth.signIn({
      email: `${username}`,
      password: `${password}`,
    });
    if (session) {
      router.push("/");
    }
    if (error) {
      console.log(error);
    }
  }
  //LOGIN END

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
                  Don&apos;t have an account?{" "}
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
