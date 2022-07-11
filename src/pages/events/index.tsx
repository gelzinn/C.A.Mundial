import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { CompetitionsContainer } from "~/styles/pages/events";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "~/services/firebase";
import LoadingCircle from "~/components/LoadingCircle";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export default function Competitions() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    db.collection("events")
      .orderBy("time", "asc")
      .get()
      .then((response) =>
        setEvents(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  }, []);

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
              {events.length > 0 ? (
                events.map((event) => {
                  return (
                    <Link key={event.id} href={`/event/${event.id}`}>
                      <li className={!event.image && "without-image"}>
                        {event.image ? (
                          <>
                            <div className="info">
                              <span>{event.name}</span>
                              {event.date.startAt === event.date.endAt
                                ? `${format(
                                    new Date(event.date.startAt),
                                    "d' de 'MMMM",
                                    {
                                      locale: ptBR,
                                    }
                                  )}`
                                : `${format(
                                    new Date(event.date.startAt),
                                    "d' de 'MMMM",
                                    {
                                      locale: ptBR,
                                    }
                                  )} a ${format(
                                    new Date(event.date.endAt),
                                    "d' de 'MMMM",
                                    {
                                      locale: ptBR,
                                    }
                                  )}`}
                              <button>Inscrever-se</button>
                            </div>
                            <img src={event.image} alt={event.name} />
                          </>
                        ) : (
                          <>
                            <span>{event.name}</span>
                            <p>
                              {event.date.startAt === event.date.endAt
                                ? `${format(
                                    new Date(event.date.startAt),
                                    "d' de 'MMMM",
                                    {
                                      locale: ptBR,
                                    }
                                  )}`
                                : `${format(
                                    new Date(event.date.startAt),
                                    "d' de 'MMMM",
                                    {
                                      locale: ptBR,
                                    }
                                  )} a ${format(
                                    new Date(event.date.endAt),
                                    "d' de 'MMMM",
                                    {
                                      locale: ptBR,
                                    }
                                  )}`}
                            </p>
                          </>
                        )}
                      </li>
                    </Link>
                  );
                })
              ) : (
                <LoadingCircle />
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
