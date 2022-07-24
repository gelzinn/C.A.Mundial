import Head from "next/head";
import router from "next/router";
import { useContext, useEffect, useState } from "react";
import Aside from "~/components/Dashboard/Aside";
import LoadingCircle from "~/components/LoadingCircle";
import AuthContext from "~/contexts/AuthContext";
import { UserInfo } from "~/models/importUserInfo";
import { auth, db } from "~/services/firebase";
import { GridAppContainer } from "~/styles/pages/dashboard";
import { ProfileContainer } from "~/styles/pages/profile";

export default function Profile() {
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
      <Head>
        <title>Seu perfil • C.A.Mundial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <GridAppContainer>
        <Aside />
        <main>
          <div className="title">
            <span>Gerencie seu</span>
            <h1>PERFIL</h1>
          </div>
          {userInfo ? (
            <ProfileContainer>
              <span>Nome</span>
              <p>{userInfo.name}</p>
              <span>E-Mail</span>
              <p>{userInfo.email}</p>
              <span>RG</span>
              <p>{userInfo.rg}</p>
              <span>CPF</span>
              <p>{userInfo.cpf}</p>
              <p>{userInfo.admin && "Admin"}</p>
              <span>Telefone</span>
              <p>{userInfo.phone}</p>
              <span>Endereço</span>
              <p>{userInfo.address}</p>
            </ProfileContainer>
          ) : (
            <LoadingCircle />
          )}
        </main>
      </GridAppContainer>
    </>
  );
}
