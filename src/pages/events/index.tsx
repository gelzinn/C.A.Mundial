import Head from "next/head";
import Image from "next/image";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { CompetitionsContainer } from "~/styles/pages/events";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "~/services/firebase";
import LoadingCircle from "~/components/LoadingCircle";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetStaticProps } from "next";

export default function Competitions() {
  const [events, setEvents] = useState([]);
  const [highlightedEvent, setHighlightedEvent] = useState<any | undefined>([]);
  const [eventWithoutHighlighted, setEventWithoutHighlighted] = useState();

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    db.collection("events")
      .orderBy("time", "asc")
      .get()
      .then((response) => {
        setEvents(
          response.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            ...doc.ref.get().then((response) => {
              if (response.data().isHighlighted)
                setHighlightedEvent({ info: response.data(), id: doc.id });
            }),
          }))
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    events.map((singleEvent) => {
      if (singleEvent.id === highlightedEvent.id)
        setEventWithoutHighlighted(singleEvent.id);
      return;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightedEvent.id]);

  return (
    <>
      <Head>
        <title>Avaliações e Competições • C.A.Mundial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />
      <main>
        <CompetitionsContainer>
          {events ? (
            <ul className="competitions">
              {highlightedEvent && highlightedEvent.info ? (
                <Link
                  key={highlightedEvent.id}
                  href={`/event/${highlightedEvent.id}`}
                >
                  <div className="highlighted">
                    {highlightedEvent.info.image ? (
                      <>
                        <div className="info">
                          <span>{highlightedEvent.info.name}</span>
                          {highlightedEvent.info.date.startAt
                            .replace(/-/g, "")
                            .slice(4)
                            .slice(0, -2) ===
                          highlightedEvent.info.date.endAt
                            .replace(/-/g, "")
                            .slice(4)
                            .slice(0, -2) ? (
                            <p>
                              {highlightedEvent.info.date.startAt
                                .replace(/-/g, "")
                                .slice(6)}{" "}
                              a{" "}
                              {format(
                                new Date(
                                  highlightedEvent.info.date.endAt.replace(
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
                          ) : (
                            <p>
                              {format(
                                new Date(
                                  highlightedEvent.info.date.startAt.replace(
                                    /-/g,
                                    "/"
                                  )
                                ),
                                "d' de 'MMMM",
                                {
                                  locale: ptBR,
                                }
                              )}{" "}
                              a{" "}
                              {format(
                                new Date(
                                  highlightedEvent.info.date.endAt.replace(
                                    /-/g,
                                    "/"
                                  )
                                ),
                                "d' de 'MMMM",
                                {
                                  locale: ptBR,
                                }
                              )}
                            </p>
                          )}
                          <button>Ver mais</button>
                          <p>Clique para saber mais sobre o evento.</p>
                        </div>
                        <img
                          src={highlightedEvent.info.image}
                          alt={highlightedEvent.info.name}
                        />
                      </>
                    ) : (
                      <div className="info without-image">
                        <span>{highlightedEvent.info.name}</span>
                        <p>
                          {highlightedEvent.info.date.startAt ===
                          highlightedEvent.info.date.endAt
                            ? `${format(
                                new Date(
                                  highlightedEvent.info.date.startAt.replace(
                                    /-/g,
                                    "/"
                                  )
                                ),
                                "d' de 'MMMM",
                                {
                                  locale: ptBR,
                                }
                              )}`
                            : `${format(
                                new Date(
                                  highlightedEvent.info.date.startAt.replace(
                                    /-/g,
                                    "/"
                                  )
                                ),
                                "d' de 'MMMM",
                                {
                                  locale: ptBR,
                                }
                              )} a ${format(
                                new Date(
                                  highlightedEvent.info.date.endAt.replace(
                                    /-/g,
                                    "/"
                                  )
                                ),
                                "d' de 'MMMM",
                                {
                                  locale: ptBR,
                                }
                              )}`}
                        </p>
                        <button>Ver mais</button>
                        <p>Clique para saber mais sobre o evento.</p>
                      </div>
                    )}
                  </div>
                </Link>
              ) : (
                <LoadingCircle />
              )}
              {events.length > 0 ? (
                <>
                  {events.length === 1 && highlightedEvent && (
                    <div className="events-warning">
                      <h1>Aproveite o único</h1>
                      <p>evento que está disponível.</p>
                    </div>
                  )}
                  {events.length > 1 && (
                    <div className="events-warning">
                      {events.length === 2 && <h1>Outro evento</h1>}
                      {events.length > 2 && (
                        <h1>Outros {events.length - 1} eventos</h1>
                      )}
                      <p>pra você acompanhar ou participar.</p>
                    </div>
                  )}
                  {events.length > 1 && highlightedEvent && (
                    <ul className="all-events">
                      {events.map((event) => {
                        if (event.id === eventWithoutHighlighted) return;

                        return (
                          <Link key={event.id} href={`/event/${event.id}`}>
                            <li
                              className={`${
                                !event.image ? "without-image" : ""
                              } ${event.date.startAt === today ? "today" : ""}`}
                            >
                              {event.image ? (
                                <>
                                  <div className="info">
                                    <span>{event.name}</span>
                                    {event.date.startAt
                                      .replace(/-/g, "")
                                      .slice(4)
                                      .slice(0, -2) ===
                                    event.date.endAt
                                      .replace(/-/g, "")
                                      .slice(4)
                                      .slice(0, -2) ? (
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
                                    ) : (
                                      <p>
                                        {format(
                                          new Date(
                                            event.date.startAt.replace(
                                              /-/g,
                                              "/"
                                            )
                                          ),
                                          "d' de 'MMMM",
                                          {
                                            locale: ptBR,
                                          }
                                        )}{" "}
                                        a $
                                        {format(
                                          new Date(
                                            event.date.endAt.replace(/-/g, "/")
                                          ),
                                          "d' de 'MMMM",
                                          {
                                            locale: ptBR,
                                          }
                                        )}
                                      </p>
                                    )}
                                  </div>
                                  <img src={event.image} alt={event.name} />
                                </>
                              ) : (
                                <>
                                  <div className="info">
                                    <span>{event.name}</span>
                                    {event.date.startAt
                                      .replace(/-/g, "")
                                      .slice(4)
                                      .slice(0, -2) ===
                                    event.date.endAt
                                      .replace(/-/g, "")
                                      .slice(4)
                                      .slice(0, -2) ? (
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
                                    ) : (
                                      <p>
                                        {format(
                                          new Date(
                                            event.date.startAt.replace(
                                              /-/g,
                                              "/"
                                            )
                                          ),
                                          "d' de 'MMMM",
                                          {
                                            locale: ptBR,
                                          }
                                        )}{" "}
                                        a{" "}
                                        {format(
                                          new Date(
                                            event.date.endAt.replace(/-/g, "/")
                                          ),
                                          "d' de 'MMMM",
                                          {
                                            locale: ptBR,
                                          }
                                        )}
                                      </p>
                                    )}
                                  </div>
                                </>
                              )}
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  )}
                </>
              ) : (
                <>
                  <div className="events-warning">
                    <h1>Os eventos existentes</h1>
                    <p>chegaram ao fim.</p>
                  </div>
                </>
              )}
            </ul>
          ) : (
            <li>
              <LoadingCircle />
            </li>
          )}
        </CompetitionsContainer>
      </main>
      <Footer />
    </>
  );
}
