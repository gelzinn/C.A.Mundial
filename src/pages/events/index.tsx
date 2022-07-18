import Head from "next/head";
import Image from "next/image";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { CompetitionsContainer, EventsHistory } from "~/styles/pages/events";
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
              {highlightedEvent && highlightedEvent.info && (
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
                                      .slice(6) ===
                                    event.date.endAt
                                      .replace(/-/g, "")
                                      .slice(6) ? (
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
                                  <img src={event.image} alt={event.name} />
                                </>
                              ) : (
                                <>
                                  <div className="info">
                                    <span>{event.name}</span>
                                    {event.date.startAt
                                      .replace(/-/g, "")
                                      .slice(6) ===
                                    event.date.endAt
                                      .replace(/-/g, "")
                                      .slice(6) ? (
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
        <EventsHistory>
          <div className="title">
            <h1>Eventos realizados</h1>
            <p>Confira os eventos passados.</p>
          </div>
          <ul className="container">
            <li>
              <img
                src="https://scontent.fbau3-2.fna.fbcdn.net/v/t39.30808-6/258148177_270359125106781_1071932251158902448_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGhqbMf1qg1zGGOj2VQMCgfLHxK1nTrUhgsfErWdOtSGGmsklh44yUHkZKvpS0Bon99RK6qAPGwxNNhNPhCaltt&_nc_ohc=vDZiUI_30eMAX-Vsz8n&_nc_ht=scontent.fbau3-2.fna&oh=00_AT_QtiGCMyzJ_TBo3oXIp9IEfwHHPb97nLT7xXT558QDGA&oe=62DA1014"
                alt="Mineiros do Tietê"
              />
              <div className="info">
                <span>Mineiros do Tietê - SP</span>
                <ul>
                  <li>Julho, 2003</li>
                  <li>Outubro, 2006</li>
                  <li>Janeiro, 2007</li>
                  <li>Janeiro, 2009</li>
                  <li>Janeiro, 2010</li>
                  <li>Julho, 2010</li>
                  <li>Janeiro, 2011</li>
                  <li>De 14 a 21 de julho, 2012</li>
                  <li>De 19 a 26 de janeiro, 2013</li>
                </ul>
              </div>
            </li>
            <li>
              <img
                src="https://static.consolidesuamarca.com.br/data/images/bernardino-de-campos-sp.jpg?23032018"
                alt="Bernardino de Campos"
              />
              <div className="info">
                <span>Bernardino de Campos - SP</span>
                <p>de 13 a 20 de julho de 2013</p>
              </div>
            </li>
            <li>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Igreja_em_Areiópolis_160208_1.JPG"
                alt="Areiópolis"
              />
              <div className="info">
                <span>Areiópolis - SP</span>
                <p>de 23 a 30 de julho de 2011</p>
              </div>
            </li>
            <li>
              <img
                src="https://www.jau.sp.gov.br/images/matriz_03.png"
                alt="Jaú - SP"
              />
              <div className="info">
                <span>Jaú - SP</span>
                <p>Julho de 2009</p>
              </div>
            </li>
            <li>
              <img
                src="https://www.brotasonline.com.br/wp-content/uploads/2022/03/hora-azul-entardecer-brotas-sp.jpg"
                alt="Brotas - SP"
              />
              <div className="info">
                <span>Brotas - SP</span>
                <p>Julho de 2008</p>
              </div>
            </li>
            <li>
              <img
                src="https://alfred.alboompro.com/resize/width/1200/scale/2/url/storage.alboom.ninja/sites/54/albuns/877632/batismo-igreja-matriz-so-jos-barra-bonita-pe-daniel-diacono-peroto_x__1_.jpg?t=1629489312"
                alt="Barra Bonita - SP"
              />
              <div className="info">
                <span>Barra Bonita - SP</span>
                <p>Janeiro de 2008</p>
              </div>
            </li>
            <li>
              <img
                src="https://catracalivre.com.br/wp-content/uploads/2021/03/istock-610986866.jpg"
                alt="Córdoba (Argentina)"
              />
              <div className="info">
                <span>Córdoba (Argentina)</span>
                <ul>
                  <li>Dezembro, 2005</li>
                  <li>Dezembro, 2006</li>
                  <li>Setembro, 2007</li>
                </ul>
              </div>
            </li>
            <li>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/90/Igreja_Matriz_S_Maria_Serra_061208_REFON_2.JPG"
                alt="Santa Maria da Serra - SP"
              />
              <div className="info">
                <span>Santa Maria da Serra - SP</span>
                <ul>
                  <li>Julho, 2007</li>
                  <li>Setembro, 2007</li>
                </ul>
              </div>
            </li>
            <li>
              <img
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/a8/4d/c7/img-20160321-124321-largejpg.jpg?w=1200&h=-1&s=1"
                alt="Águas de Santa Bárbara - SP"
              />
              <div className="info">
                <span>Águas de Santa Bárbara - SP</span>
                <p>Julho, 2006</p>
              </div>
            </li>
            <li>
              <img
                src="https://mapio.net/images-p/77365093.jpg"
                alt="Dois Córregos - SP"
              />
              <div className="info">
                <span>Dois Córregos - SP</span>
                <p>Janeiro, 2006</p>
              </div>
            </li>
            <li>
              <img
                src="https://aestancia.com.br/images/noticias/1740/422739.jpg"
                alt="Iaras - SP"
              />
              <div className="info">
                <span>Iaras - SP</span>
                <ul>
                  <li>Julho, 2004</li>
                  <li>Julho, 2005</li>
                </ul>
              </div>
            </li>
            <li>
              <img
                src="https://mapio.net/images-p/27436624.jpg"
                alt="Echaporã - SP"
              />
              <div className="info">
                <span>Echaporã - SP</span>
                <p>Janeiro, 2005</p>
              </div>
            </li>
            <li>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Coreto_Bariri_200310_REFON_2.JPG/405px-Coreto_Bariri_200310_REFON_2.JPG"
                alt="Bariri - SP"
              />
              <div className="info">
                <span>Bariri - SP</span>
                <p>Janeiro, 2004</p>
              </div>
            </li>
          </ul>
        </EventsHistory>
      </main>
      <Footer />
    </>
  );
}
