import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useContext, useEffect, useState } from "react";
import { auth } from "~/services/firebase";
import router from "next/router";
import AuthContext from "~/contexts/AuthContext";

export default function SignIn() {
  const { user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid, email } = user;
        router.push("/dashboard");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function loginWithEmail() {
    await auth
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        if (error.code == "auth/wrong-password") {
          alert("E-mail ou senha incorretos.");
        }
      });
    router.push("/dashboard");
  }

  return (
    <>
      {!user && (
        <>
          <Head>
            <title>Entre na sua conta • C.A.Mundial</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>

          <main>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button onClick={() => loginWithEmail()}>Entrar</button>
            </form>
          </main>
        </>
      )}
    </>
  );
}
