import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContainer,
  GridAppContainer,
} from "~/styles/pages/dashboard/";
import { Shield, SoccerBall } from "phosphor-react";
import Link from "next/link";
import Aside from "~/components/Dashboard/Aside";

import { auth, db } from "~/services/firebase";
import AuthContext from "~/contexts/AuthContext";
import router from "next/router";
import { UserInfo } from "~/models/importUserInfo";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<UserInfo | any>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid, email } = user;
      } else {
        router.push("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.id)
        .get()
        .then((response) => {
          setUserInfo(response.data());
        });
    }
  }, [user]);

  return (
    <>
      {user && (
        <>
          <Head>
            <title>Painel de Controle • C.A.Mundial</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>

          <GridAppContainer>
            <Aside />
            <main>
              <div className="title">
                <span>Olá {userInfo.name && userInfo.name.split(" ")[0]}!</span>
                <h1>Painel de controle</h1>
              </div>
              <CardContainer>
                <Link href="/dashboard/teams">
                  <Card>
                    <span>todos os times</span>
                    <Shield />
                    <p>
                      Veja todos os times cadastrados que já passaram pelos ou
                      vão passar pelos nossos eventos esportivos.
                    </p>
                  </Card>
                </Link>
                <Link href="/dashboard/events">
                  <Card>
                    <span>todos os eventos</span>
                    <SoccerBall />
                    <p>
                      Veja todos os eventos esportivos registrados até o
                      momento. Modifique-os, delete ou crie novos.
                    </p>
                  </Card>
                </Link>
              </CardContainer>
            </main>
          </GridAppContainer>
        </>
      )}
    </>
  );
}
