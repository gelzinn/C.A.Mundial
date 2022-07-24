import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useContext, useEffect, useState } from "react";
import { auth } from "~/services/firebase";
import router from "next/router";
import AuthContext from "~/contexts/AuthContext";
import { LoginPage } from "~/styles/pages/login";
import Link from "next/link";

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

          <LoginPage>
            <div className="illustration">
              <img
                id="side"
                src="../../assets/images/logo-camundial.png"
                alt="C. A. Mundial"
              />
              {/* <img
                src="../../illustrations/password-pana.svg"
                alt="C. A. Mundial"
              /> */}
              <div className="bg left" />
            </div>
            <div className="form">
              <form onSubmit={(e) => e.preventDefault()}>
                <h3>Bem-vindo de volta!</h3>
                <h1>Entre na sua conta</h1>
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
                <div className="actions">
                  <label className="checkbox-container">
                    Lembrar de mim
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                  <Link href="/">
                    <p>Esqueceu a senha?</p>
                  </Link>
                </div>
                <button onClick={() => loginWithEmail()}>Entrar</button>
                <p>
                  Novo aqui?
                  <Link href="/subscribe">
                    <b>Crie uma conta.</b>
                  </Link>
                </p>
              </form>
            </div>
          </LoginPage>
        </>
      )}
    </>
  );
}
