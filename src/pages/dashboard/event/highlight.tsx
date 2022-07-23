import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Aside from "~/components/Dashboard/Aside";
import LoadingCircle from "~/components/LoadingCircle";
import { db } from "~/services/firebase";
import { GridAppContainer } from "~/styles/pages/dashboard";
import { EventsContainer } from "~/styles/pages/dashboard/events";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export default function Stats() {
  const [events, setEvents] = useState([]);
  const [updatingHighlights, setUpdatingHighlights] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const actualYear = new Date().getFullYear();

  useEffect(() => {
    db.collection("events")
      .orderBy("time", "asc")
      .get()
      .then((response) =>
        setEvents(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  }, []);

  const handleHighlight = (id: string) => {
    db.collection("events")
      .get()
      .then((response) => {
        if (confirm("Você tem certeza que deseja destacar este evento?")) {
          response.docs.map((doc) => ({
            ...doc.ref.update({ isHighlighted: false }),
          }));
          db.collection("events").doc(`${id}`).update({ isHighlighted: true });
          alert("Evento destacado com sucesso!");
        }
      });
  };

  return (
    <>
      <Head>
        <title>Destacar evento • C.A.Mundial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <GridAppContainer>
        <Aside />
        <main>
          <div className="title">
            <span>Deixe um evento em</span>
            <h1>DESTAQUE</h1>
          </div>
          <EventsContainer>
            <ul>
              {events ? (
                <>
                  {events
                    .sort((a, b) => a - b)
                    .map((event) => {
                      return (
                        <li
                          key={event.id}
                          onClick={() => {
                            handleHighlight(event.id);
                          }}
                          className={!event.image && "without-image"}
                        >
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

                                  if (event.date.startAt === event.date.endAt) {
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

                                  if (event.date.startAt === event.date.endAt) {
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
                              </p>
                            </>
                          )}
                        </li>
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
