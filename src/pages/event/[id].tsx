import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, MapPin } from "phosphor-react";
import React, { useEffect, useState } from "react";
import LoadingScreen from "~/components/LoadingScreen";
import { db } from "~/services/firebase";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Header from "~/components/Header";

export default function Home() {
  const { query } = useRouter();
  const [event, setEvent] = useState<any>([]);

  const idParam = query.id;

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

          <Header />
          <main>
            {/* <EventContainer> */}
            <Link href="/events">
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
                    {event.date.startAt === event.date.endAt ? (
                      <p>
                        {format(
                          new Date(event.date.startAt),
                          "EEEE', 'd' de 'MMMM'",
                          {
                            locale: ptBR,
                          }
                        )}
                      </p>
                    ) : (
                      <>
                        <p>
                          {format(
                            new Date(event.date.startAt),
                            "d' de 'MMMM'",
                            {
                              locale: ptBR,
                            }
                          )}
                        </p>
                        a
                        <p>
                          {format(new Date(event.date.endAt), "d' de 'MMMM'", {
                            locale: ptBR,
                          })}
                        </p>
                      </>
                    )}
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
              </div>
            </div>
            {/* </EventContainer> */}
          </main>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
