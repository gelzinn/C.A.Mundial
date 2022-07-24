import Head from "next/head";
import Link from "next/link";
import { PlusCircle } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import Aside from "~/components/Dashboard/Aside";
import LoadingCircle from "~/components/LoadingCircle";
import { auth, db } from "~/services/firebase";
import { GridAppContainer } from "~/styles/pages/dashboard";
import { EventsContainer } from "~/styles/pages/dashboard/events";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import AuthContext from "~/contexts/AuthContext";
import { UserInfo } from "~/models/importUserInfo";
import router from "next/router";

export default function Home() {
  const [events, setEvents] = useState([]);

  const today = new Date().toISOString().split("T")[0];
  const actualYear = new Date().getFullYear();

  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<UserInfo | any>([]);

  useEffect(() => {
    db.collection("events")
      .orderBy("time", "asc")
      .get()
      .then((response) =>
        setEvents(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  }, []);

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
        <title>Todos os eventos • C.A.Mundial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <GridAppContainer>
        <Aside />
        <main>
          <div className="title">
            {userInfo.admin ? (
              <span>Controle todos os</span>
            ) : (
              <span>Veja todos os</span>
            )}
            <h1>Eventos existentes</h1>
          </div>
          <EventsContainer>
            <ul>
              {userInfo.admin && (
                <Link href="/dashboard/event/create">
                  <button>
                    <PlusCircle />
                  </button>
                </Link>
              )}
              {events ? (
                <>
                  {events
                    .sort((a, b) => a - b)
                    .map((event) => {
                      return (
                        <Link
                          key={event.id}
                          href={`/dashboard/event/${event.id}`}
                        >
                          <li className={!event.image && "without-image"}>
                            {event.image ? (
                              <>
                                <div className="info">
                                  <span>{event.name}</span>
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
                                                event.date.endAt.replace(
                                                  /-/g,
                                                  "/"
                                                )
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

                                    if (
                                      event.date.startAt === event.date.endAt
                                    ) {
                                      return (
                                        <p>
                                          {format(
                                            new Date(
                                              event.date.startAt.replace(
                                                /-/g,
                                                "/"
                                              )
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
                                                event.date.startAt.replace(
                                                  /-/g,
                                                  "/"
                                                )
                                              ),
                                              "d' de 'MMMM'",
                                              {
                                                locale: ptBR,
                                              }
                                            )}{" "}
                                            a{" "}
                                            {format(
                                              new Date(
                                                event.date.endAt.replace(
                                                  /-/g,
                                                  "/"
                                                )
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
                                </div>
                                <img src={event.image} alt={event.name} />
                              </>
                            ) : (
                              <>
                                <span>{event.name}</span>
                                <p>
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
                                                event.date.endAt.replace(
                                                  /-/g,
                                                  "/"
                                                )
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

                                    if (
                                      event.date.startAt === event.date.endAt
                                    ) {
                                      return (
                                        <p>
                                          {format(
                                            new Date(
                                              event.date.startAt.replace(
                                                /-/g,
                                                "/"
                                              )
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
                                                event.date.startAt.replace(
                                                  /-/g,
                                                  "/"
                                                )
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
                                                event.date.endAt.replace(
                                                  /-/g,
                                                  "/"
                                                )
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
                              </>
                            )}
                          </li>
                        </Link>
                      );
                    })}
                </>
              ) : (
                <li>
                  <LoadingCircle />
                </li>
              )}
            </ul>
          </EventsContainer>
        </main>
      </GridAppContainer>
    </>
  );
}
