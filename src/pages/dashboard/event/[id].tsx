import Head from "next/head";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { ArrowLeft, MapPin } from "phosphor-react";
import React, { useContext, useEffect, useState } from "react";
import Aside from "~/components/Dashboard/Aside";
import LoadingScreen from "~/components/LoadingScreen";
import { auth, db } from "~/services/firebase";
import { GridAppContainer } from "~/styles/pages/dashboard";
import { EventContainer } from "~/styles/pages/dashboard/event-page";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import AuthContext from "~/contexts/AuthContext";
import { UserInfo } from "~/models/importUserInfo";

export default function Home() {
  const { query } = useRouter();
  const [event, setEvent] = useState<any>([]);

  const today = new Date().toISOString().split("T")[0];
  const actualYear = new Date().getFullYear();

  const idParam = query.id;
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<UserInfo | any>([]);

  useEffect(() => {
    const checkExistsEvent = db.collection("events").doc(`${idParam}`);

    checkExistsEvent.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        db.collection("events")
          .doc(`${idParam}`)
          .get()
          .then((response) => response.data())
          .then((data) => setEvent(data));
      }
    });
  }, [idParam]);

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

  const handleDeleteEvent = () => {
    if (confirm("Você tem certeza que deseja excluir este evento?")) {
      db.collection("events")
        .doc(`${idParam}`)
        .delete()
        .then((docRef) => {
          alert(`${event.name} foi removido com sucesso.`);
          window.location.href = "/dashboard/events";
        })
        .catch((error) => {
          alert("Ocorreu um erro. Tente novamente mais tarde.");
          console.error(error);
        });
    }
  };

  return (
    <>
      {event ? (
        <>
          <Head>
            <title>{event.name} • C.A.Mundial</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>

          <GridAppContainer>
            <Aside />
            <main>
              <EventContainer>
                <Link href="/dashboard/events">
                  <div
                    className={
                      event.image ? "back-arrow" : "back-arrow without-image"
                    }
                  >
                    <ArrowLeft weight="bold" />
                  </div>
                </Link>
                {event.image && <img src={event.image} alt={event.name} />}
                <div className={event.image ? "info" : "info without-image"}>
                  <h1>{event.name}</h1>
                  <div>
                    <MapPin />
                    <p>{event.location}</p>
                  </div>
                  <div className="about-event">
                    {event.date && (
                      <p className="dates">
                        {(() => {
                          if (event.date.startAt === today) {
                            return <p>Evento prestes a começar</p>;
                          }

                          if (
                            event.date.startAt
                              .replace(/-/g, "")
                              .slice(4)
                              .slice(0, -2) ===
                            event.date.endAt
                              .replace(/-/g, "")
                              .slice(4)
                              .slice(0, -2)
                          ) {
                            return (
                              <>
                                <p>
                                  {event.date.startAt
                                    .replace(/-/g, "")
                                    .slice(6)}{" "}
                                  a{" "}
                                  {format(
                                    new Date(
                                      event.date.endAt.replace(/-/g, "/")
                                    ),
                                    "d' de 'MMMM'",
                                    {
                                      locale: ptBR,
                                    }
                                  )}
                                </p>
                              </>
                            );
                          }

                          if (event.date.startAt === event.date.endAt) {
                            return (
                              <p>
                                {format(
                                  new Date(
                                    event.date.startAt.replace(/-/g, "/")
                                  ),
                                  "EEEE', 'd' de 'MMMM'",
                                  {
                                    locale: ptBR,
                                  }
                                )}
                              </p>
                            );
                          } else {
                            return (
                              <>
                                <p>
                                  {format(
                                    new Date(
                                      event.date.startAt.replace(/-/g, "/")
                                    ),
                                    "d' de 'MMMM'",
                                    {
                                      locale: ptBR,
                                    }
                                  )}
                                </p>
                                a
                                <p>
                                  {format(
                                    new Date(
                                      event.date.endAt.replace(/-/g, "/")
                                    ),
                                    "d' de 'MMMM'",
                                    {
                                      locale: ptBR,
                                    }
                                  )}
                                </p>
                              </>
                            );
                          }
                        })()}
                      </p>
                    )}
                    {event.ages && (
                      <>
                        <span>Categorias disponíveis</span>
                        <ul>
                          {event.ages.map((age: number) => {
                            return <li key={age}>{age}</li>;
                          })}
                        </ul>
                      </>
                    )}
                    {userInfo.admin && (
                      <button onClick={handleDeleteEvent}>
                        Remover evento
                      </button>
                    )}
                  </div>
                </div>
              </EventContainer>
            </main>
          </GridAppContainer>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
