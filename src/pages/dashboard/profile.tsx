import Head from "next/head";
import router from "next/router";
import { useContext, useEffect, useState } from "react";
import useImageColor from "use-image-color";
import Aside from "~/components/Dashboard/Aside";
import LoadingCircle from "~/components/LoadingCircle";
import AuthContext from "~/contexts/AuthContext";
import { UserInfo } from "~/models/importUserInfo";
import { auth, db } from "~/services/firebase";
import { GridAppContainer } from "~/styles/pages/dashboard";
import { ProfileContainer, ProfileImage } from "~/styles/pages/profile";

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

  const { colors } = useImageColor(userInfo.image, { cors: true, colors: 5 });

  return (
    <>
      {user && (
        <>
          <Head>
            <title>Seu perfil • C.A.Mundial</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>

          <GridAppContainer>
            <Aside />
            <main>
              {userInfo ? (
                <ProfileContainer>
                  {userInfo.image && (
                    <ProfileImage color={colors && colors[0]}>
                      <span>{userInfo.name}</span>
                      <img src={userInfo.image} alt={userInfo.name} />
                    </ProfileImage>
                  )}
                  <section>
                    {userInfo.admin && <h1>Admininstrador</h1>}
                    <div>
                      <span>Nome</span>
                      <p>{userInfo.name}</p>
                    </div>
                    <div>
                      <span>E-Mail</span>
                      <p>{userInfo.email}</p>
                    </div>
                    <div>
                      <span>RG</span>
                      <p>{userInfo.rg}</p>
                    </div>
                    <div>
                      <span>CPF</span>
                      <p>{userInfo.cpf}</p>
                    </div>
                    <div>
                      <span>Telefone</span>
                      <p>{userInfo.phone}</p>
                    </div>
                    <div>
                      <span>Endereço</span>
                      <p>{userInfo.address}</p>
                    </div>
                  </section>
                </ProfileContainer>
              ) : (
                <LoadingCircle />
              )}
            </main>
          </GridAppContainer>
        </>
      )}
    </>
  );
}
