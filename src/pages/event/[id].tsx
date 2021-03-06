import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, MapPin } from "phosphor-react";
import React, { useContext, useEffect, useState } from "react";
import LoadingScreen from "~/components/LoadingScreen";
import { db } from "~/services/firebase";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Header from "~/components/Header";
import { GetStaticPaths, GetStaticProps } from "next";
import { EventContainer } from "~/styles/pages/event-page";
import LoadingCircle from "~/components/LoadingCircle";
import AuthContext from "~/contexts/AuthContext";

export default function Home({ aboutEvent }) {
  const { user } = useContext(AuthContext);

  const { query } = useRouter();
  const [counter, setCounter] = useState<any>([]);

  const [event, setEvent] = useState<any>([]);

  const today = new Date().toISOString().split("T")[0];
  const actualYear = new Date().getFullYear();

  useEffect(() => {
    const getEventData = async () =>
      await db
        .collection("events")
        .doc(`${aboutEvent}`)
        .get()
        .then((response) => response.data())
        .then((data) => setEvent(data));
    getEventData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id]);

  useEffect(() => {
    if (event.date) {
      const countDownDate: any = new Date(event.date.startAt).getTime();

      const handleCounterDays = setInterval(function () {
        var now = new Date().getTime();
        var timeToWait = countDownDate - now;

        var months = Math.floor(timeToWait / (1000 * 60 * 60 * 24) / 30);
        var days = Math.floor(
          timeToWait /
            (1000 * 60 * 60 * 24) /
            Math.ceil(timeToWait / (1000 * 60 * 60 * 24) / 30)
        );
        var hours = Math.floor(
          (timeToWait % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((timeToWait % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeToWait % (1000 * 60)) / 1000);

        if (timeToWait < 0) {
          clearInterval(handleCounterDays);
          setCounter("loading");
        } else {
          setCounter({ months, days, hours, minutes, seconds });
        }
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return (
    <>
      {event && event.date ? (
        <>
          <Head>
            <title>{event.name} ??? C.A.Mundial</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>

          <Header />
          <main>
            <EventContainer>
              <Link href="/events">
                <div className="back-arrow">
                  <ArrowLeft weight="bold" />
                </div>
              </Link>
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.name}
                  className={event.date.startAt === today ? "today" : ""}
                />
              ) : (
                <img
                  src="https://raw.githubusercontent.com/gelzinn/C.A.Mundial/main/src/assets/images/banners/New%202022%20site.png"
                  alt={event.name}
                  className={event.date.startAt === today ? "today" : ""}
                />
              )}
              <div className="info">
                <header>
                  <div className="basic-info">
                    <h1>{event.name}</h1>
                    <div className="date-and-location">
                      {event.date && (
                        <div
                          className={
                            event.date.startAt === today
                              ? "dates today"
                              : "dates"
                          }
                        >
                          {(() => {
                            if (event.date.startAt === today) {
                              return <p>Evento prestes a come??ar</p>;
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
                                    )}{" "}
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
                          })()}
                        </div>
                      )}
                      <div className="location">
                        <MapPin />
                        <p>{event.location}</p>
                      </div>
                    </div>
                  </div>
                  {event.ages && (
                    <div className="ages">
                      <span>Categorias dispon??veis</span>
                      <ul>
                        {event.ages.map((age: number) => {
                          return (
                            <li
                              key={age}
                              title={`Nascidos em - ${actualYear - age}`}
                            >
                              <p>
                                SUB <b>{age}</b>
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </header>
                <div className="about-event">
                  {event.description && (
                    <div className="description">
                      <span>Descri????o do evento</span>
                      <p>{event.description}</p>
                    </div>
                  )}
                </div>
                {event.date.startAt != today && counter && (
                  <div className="countdown">
                    <div className="title">
                      <span>Tempo restante</span>
                      <p>at?? o in??cio do evento.</p>
                    </div>
                    <ul className="time-to-wait">
                      {counter.months ? (
                        <li>
                          <span>
                            {counter.months.toString().padStart(2, "0")}
                          </span>
                          <p>{counter.months > 1 ? "Meses" : "M??s"}</p>
                        </li>
                      ) : null}
                      {counter.days ? (
                        <li>
                          <span>
                            {counter.days.toString().padStart(2, "0")}
                          </span>
                          <p>Dias</p>
                        </li>
                      ) : null}
                      <li>
                        {counter.hours ? (
                          <span>
                            {counter.hours.toString().padStart(2, "0")}
                          </span>
                        ) : (
                          <span>00</span>
                        )}
                        <p>Horas</p>
                      </li>
                      <li>
                        {counter.minutes ? (
                          <span>
                            {counter.minutes.toString().padStart(2, "0")}
                          </span>
                        ) : (
                          <span>00</span>
                        )}
                        <p>Minutos</p>
                      </li>
                      <li>
                        {counter.seconds ? (
                          <span>
                            {counter.seconds.toString().padStart(2, "0")}
                          </span>
                        ) : (
                          <span>00</span>
                        )}
                        <p>Segundos</p>
                      </li>
                    </ul>
                  </div>
                )}
                {event.date.startAt != today && (
                  <>
                    {user && (
                      <div className="subscribe">
                        <div className="invite">
                          <span>Inscri????es abertas</span>
                          <p>
                            Aproveite e traga sua equipe ou organiza????o para
                            brilhar.
                          </p>
                        </div>
                        <button>Inscrever minha equipe</button>
                        <p>Informa????es legais e sobre a participa????o abaixo.</p>
                      </div>
                    )}
                  </>
                )}
                <div className="event-rules">
                  <span>Regulamento Geral</span>
                  <div className="rules">
                    <ul>
                      <span>I - DAS DISPOSI????ES PRELIMINARES</span>
                      <li>
                        <b>Artigo 1??.</b> - Este regulamento ?? o conjunto das
                        disposi????es que regem a {event.name} -{" "}
                        {event.date.startAt.replace(/-/g, "").slice(0, -4)},
                        promovido pela C.A.Mundial - Promo????o e organiza????o de
                        eventos esportivos LTDA.
                      </li>
                      <li>
                        <b>Artigo 2??.</b> - A Copa tem a finalidade de unir
                        povos e ra??as em todo o territ??rio nacional e
                        internacional, al??m de proporcionar o interc??mbio
                        social, cultural, esportivo, educativo e tur??stico,
                        oferecendo a oportunidade ??nica para que novos talentos
                        possam surgir.
                      </li>
                      <li>
                        <b>Artigo 3??.</b> - Os clubes e entidades que
                        participarem da {event.name} -{" "}
                        {event.date.startAt.replace(/-/g, "").slice(0, -4)},
                        ser??o consideradas conhecedoras deste regulamento e
                        assim se submeter??o sem reserva alguma, a todas as
                        consequ??ncias que dele possa emanar.
                      </li>
                    </ul>
                    <ul>
                      <span>II - DAS CATEGORIAS</span>
                      <li>
                        <b>Artigo 4??.</b> - Ser?? disputada nas seguintes
                        categorias:
                      </li>
                      <ul>
                        {event.ages.map((age: number) => {
                          return (
                            <li key={age}>
                              <p>
                                Sub {age} &#45; para atletas nascidos no ano de{" "}
                                {actualYear - age}.
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                      <p id="pu">
                        Par??grafo ??nico: O atleta apenas poder?? participar do
                        evento, na categoria correspondente ?? sua faixa et??ria.
                        O mesmo deve portar atestado m??dico original e termo de
                        responsabilidade datado e assinado pelo respons??vel.
                      </p>
                    </ul>
                    <ul>
                      <span>III - DA PARTICIPA????O</span>
                      <li>
                        <b>Artigo 5??.</b> - Poder??o participar da Copa, somente
                        clubes ou entidades que se inscreverem na sistema da
                        C.A.Mundial.
                      </li>
                      <li>
                        <b>Artigo 6??.</b> - Para participa????o na Copa, ??
                        indispens??vel que os atletas estejam estudando.
                      </li>
                      <li>
                        <b>Artigo 7??.</b> - S??o condi????es fundamentais para que
                        um atleta participe:
                      </li>
                      <ul>
                        <li>
                          Satisfazer todas as exig??ncias impostas neste
                          regulamento;
                        </li>
                        <li>
                          Estar devidamente inscrito na ficha nominal cedida no
                          site pela organiza????o;
                        </li>
                        <li>
                          Para a categoria Sub 10 e 12 - ser??p aceitos: C??dula
                          de identidade ou Passaporte ou RA - Registro do Aluno
                          - escolar assinado pela dire????o da escola onde estuda.
                          Os documentos ser??o analisados no congresso t??cnico
                          pela organiza????o.
                        </li>
                        <li>
                          Ter e portar os seguintes documentos originais: C??dula
                          de identidade ou Passaporte. Obs: O atleta que n??o
                          tiver a C??dula de Identidade Original ou Passaporte,
                          n??o ter?? sua inscri????o aceita pela organiza????o;
                        </li>
                        <li>
                          Em todas as partidas os documentos dos atletas e
                          dirigentes deveram estar em posse do quarto ??rbitro e
                          somente ao final de cada partida o mesmo ser?? entregue
                          aos seus respectivos respons??veis.
                        </li>
                      </ul>
                      <li>
                        <b>Artigo 8??.</b> - ?? obrigat??ria a assinatura do atleta
                        na s??mula do jogo, que dever?? ser semelhante a constante
                        na ficha nominal de inscri????o.
                      </li>
                      <p id="pu">
                        Par??grafo ??nico: em todas as partidas as fichas nominais
                        dos atletas e dirigentes estar?? de posse do quarto
                        ??rbitro para a confer??ncia.
                      </p>
                    </ul>
                    <ul>
                      <span>IV - DAS INSCRI????ES</span>
                      <li>
                        <b>Artigo 9??.</b> - Dever??o ser feitas no site da
                        C.A.Mundial.
                      </li>
                      <li>
                        <b>Artigo 10??.</b> - Cada clube ou entidade poder??
                        inscrever uma ou mais equipe por categoria desde que
                        figure equipe (A) e equipe (B), etc.
                      </li>
                      <li>
                        <b>Artigo 11??.</b> - As inscri????es dos atletas ser??o
                        feitas em formul??rio cedido pela organiza????o.
                      </li>
                      <li>
                        <b>Artigo 12??.</b> - N??o ser??o permitidas inclus??es e
                        substitui????es nos formul??rios, depois de entregue a
                        coordena????o da C.A Mundial.
                      </li>
                      <li>
                        <b>Artigo 13??.</b> - Ap??s a realiza????o da primera fase
                        os Clubes ou Entidades n??o poder??o inscrever novos
                        jogadores.
                      </li>
                      <li>
                        <b>Artigo 14??.</b> - O clube ou entidade ser??
                        respons??vel pela idoneidade dos documentos apresentados.
                      </li>
                      <li>
                        <b>Artigo 15??.</b> - O atleta que comprovadamente for
                        inscrito por mais de um clube ou entidade, ter?? sua
                        inscri????o cancelada.
                      </li>
                    </ul>
                    <ul>
                      <span>V - DA DURA????O DO JOGO E BOLA</span>
                      <li>
                        <b>Artigo 16??.</b> - A dura????o de cada jogo e a bola a
                        ser utilizada atender?? ao que segue:
                      </li>
                      <ul>
                        {event.ages.map((age: number) => {
                          return (
                            <li key={age}>
                              <p>Categoria SUB {age}</p>
                              <p>
                                A dura????o de cada jogo ser?? de{" "}
                                {(() => {
                                  if (age >= 17) {
                                    return <u>45x45</u>;
                                  }
                                  if (age > 15 && age < 17) {
                                    return <u>30x30</u>;
                                  }
                                  if (age > 13 && age <= 15) {
                                    return <u>25x25</u>;
                                  }
                                  if (age <= 13) {
                                    return <u>20x20</u>;
                                  }
                                })()}{" "}
                                minutos e bola oficial.
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                      <p>
                        Obs: Cada equipe dever?? portar no momento do in??cio de
                        cada partida duas bolas - em perfeitas condi????es de jogo
                        - oficiais que dever??o permanecer junto ao quarto
                        ??rbitro. As equipes ser??o respons??veis pela perman??ncia
                        delas em campo durante a partida.
                      </p>
                      <p id="pu">
                        Par??grafo ??nico: haver?? um intervalo de cinco minutos
                        entre os dois per??odos.
                      </p>
                    </ul>
                    <ul>
                      <span>VI - DAS SUBSTITUI????ES</span>
                      <li>
                        <b>Artigo 17??.</b> - Para as categorias acima de 16
                        anos, as substitui????es ter??o o limite m??ximo relacionado
                        a quantidade de atletas que est??o no banco de reservas.
                        J?? para as anteriores, as substitui????es ser??o volantes.
                      </li>
                      <li>
                        <b>Artigo 18??.</b> - Poder??o permanecer no banco de
                        reservas todos os atletas devidamente uniformizados,
                        al??m do t??cnico, massagista, preparador f??sico e
                        diretor, devidamente uniformizados e documentados.
                      </li>
                      <p id="pu">
                        Par??grafo ??nico: n??o seguindo as exig??ncias impostas, os
                        mesmo ser??o convidados pelo quarto ??rbitro a se
                        retirarem de campo.
                      </p>
                    </ul>
                    <ul>
                      <span>VII - DAS FORMAS DE DISPUTAS</span>
                      <li>
                        <b>Artigo 19??.</b> - A forma de disputa ser?? em fases
                        distintas, a saber:
                      </li>
                      <ul>
                        <li>Fase classificat??ria;</li>
                        <li>Quartas de finais;</li>
                        <li>Fase Semifinal;</li>
                        <li>Fase Final.</li>
                      </ul>
                    </ul>
                    <ul>
                      <span>VIII - DAS TABELAS E HOR??RIOS DOS JOGOS</span>
                      <li>
                        <b>Artigo 20??.</b> - Os locais e hor??rios dos jogos
                        ser??o determinados pela organiza????o da C.A Mundial.
                      </li>
                      <li>
                        <b>Artigo 21??.</b> - Depois de elaborada as tabelas, n??o
                        ser??o permitida altera????es.
                      </li>
                      <li>
                        <b>Artigo 22??.</b> - Os jogos ter??o in??cio de acordo com
                        a programa????o. A equipe que n??o se apresentar no local
                        em at?? quinze minutos de toler??ncia, ser?? considerada
                        perdedora do confronto.
                      </li>
                      <li>
                        <b>Artigo 23??.</b> - As equipes que abandonarem a
                        disputa ser??o desclassificadas e todos os resultados
                        ser??o considerados nulos na fase em que se configurou o
                        abandono, ficando ainda sujeitas as penalidades que
                        poder??o ser aplicadas pela comiss??o disciplinar.
                      </li>
                      <p id="pu">
                        Par??grafo Primeiro: Configurar??o o abandono as seguintes
                        situa????es:
                      </p>
                      <ul>
                        <li>
                          Deixar de comparecer ?? ??ltima partida dentro de uma
                          fase quando n??o houver possibilidade de classifica????o;
                        </li>
                        <li>Duas aus??ncias nos jogos programados na fase;</li>
                        <li>
                          Deixar de comparecer na partida que define sua
                          classifica????o em qualquer fase;
                        </li>
                        <li>Desistir oficialmente da competi????o.</li>
                      </ul>
                      <p id="pu">
                        Par??grafo Segundo: Configurado o abandono, a equipe
                        dever?? justificar-se por of??cio fundamentado at?? as
                        17:00 horas mesmo dia.
                      </p>
                    </ul>
                    <ul>
                      <span>IX - DA PONTUA????O E CLASSIFICA????O</span>
                      <li>
                        <b>Artigo 24??.</b> - Em todas as fases, a pontua????o para
                        efeito de classifica????o ser??:
                      </li>
                      <ul>
                        <li>Vit??ria: 3 (tr??s) pontos;</li>
                        <li>Empate: 1 (um) pontos;</li>
                        <li>Derrota: 0 (zero) pontos.</li>
                      </ul>
                      <li>
                        <b>Artigo 25??.</b> - Em caso de empate na fase de
                        classifica????o, ser?? imposta uma cobran??a alternada de
                        p??naltis para defini????o do ponto extra.
                      </li>
                      <p>
                        Ainda assim empatadas na pontua????o, ser??o adotados os
                        seguintes crit??rios para desempate:
                      </p>
                      <ul>
                        <li>ENTRE DUAS EQUIPES:</li>
                        <ul>
                          <li>Confronto direto;</li>
                          <li>Maior n??mero de vit??rias na fase;</li>
                          <li>Maior saldo de gols na fase;</li>
                          <li>Maior n??mero de gols marcados na fase;</li>
                          <li>Sorteio.</li>
                        </ul>
                        <li>ENTRE TR??S OU MAIS EQUIPES:</li>
                        <ul>
                          <li>Confronto direto;</li>
                          <li>
                            Maior saldo de gols nas partidas realizadas entre as
                            empatadas na fase;
                          </li>
                          <li>
                            Maior n??mero de gols marcados nas partidas
                            realizadas entre as empatadas na fase;
                          </li>
                          <li>Maior saldo de gols na fase;</li>
                          <li>Maior n??mero de gols marcados na fase;</li>
                          <li>Sorteio.</li>
                        </ul>
                      </ul>
                    </ul>
                    <ul>
                      <span>X - DA JUSTI??A DESPORTIVA</span>
                      <li>
                        <b>Artigo 26??.</b> - A justi??a desportiva da Copa dos
                        Campe??es de Futebol Infantil- 2.009 ser?? aplicada pelas
                        comiss??es disciplinares permanentes e pela Comiss??o
                        Disciplinar Especial.
                      </li>
                      <li>
                        <b>Artigo 27??.</b> - As penalidades ser??o aplicadas de
                        acordo com o c??digo de Justi??a Desportiva Brasileira e
                        da FIFA, e as decis??es proferidas produzir??o efeitos
                        imediatos.
                      </li>
                      <li>
                        <b>Artigo 28??.</b> - A Comiss??o Disciplinar tem por
                        incumb??ncia apreciar e julgar todas as infra????es
                        cometidas pelos clubes e entidades, atletas, dirigentes
                        e por pessoa f??sica ou jur??dica, direta Ou indiretamente
                        vinculadas aos clubes e entidades ou a servi??o de
                        qualquer uma delas.
                      </li>
                      <li>
                        <b>Artigo 29??.</b> - Os atletas punidos disciplinarmente
                        com cart??o vermelho ficar??o suspenso da partida
                        seguinte. Independente das demais penas que poder??o ser
                        aplicadas pela comiss??o disciplinar permanente.
                      </li>
                    </ul>
                    <ul>
                      <span>XI - DO APROVEITAMENTO ESCOLAR</span>
                      <li>
                        <b>Artigo 30??.</b> - Todo atleta inscrito no evento{" "}
                        {event.name} dever?? sido aprovado no ano de{" "}
                        {event.date.startAt.replace(/-/g, "").slice(0, -4) - 1}{" "}
                        e estar matriculado e constando os dados escolares na
                        ficha nominal. No dia do congresso t??cnico haver??
                        confer??ncia dos documentos originais, juntamente com as
                        fichas nominais.
                      </li>
                    </ul>
                    <ul>
                      <span>XII - DA PREMIA????O</span>
                      <li>
                        <b>Artigo 31??.</b> - A C.A Mundial Promo????o e
                        Organiza????o de eventos esportivos LTDA oferecer?? trof??us
                        e medalhas aos dois primeiros colocados de cada
                        categoria, al??m das medalhas: jogador destaque e melhor
                        goleiro, ambas de cada categoria.
                      </li>
                    </ul>
                    <ul>
                      <span>XIII - DAS DISPOSI????ES GERAIS</span>
                      <li>
                        <b>Artigo 32??.</b> - Toda e qualquer
                        representa????o/recurso, devidamente fundamentado, dever??
                        ser dirigido ao C.C.O. - Comit?? Central de Organiza????o,
                        mediante documenta????o em papel timbrado, assinado pelo
                        dirigente respons??vel pela equipe, mediante a
                        confirma????o de provas.
                      </li>
                      <li>
                        <b>Artigo 33??.</b> - N??o ser??o apreciadas
                        representa????es/recursos que n??o forem firmados pelos
                        dirigentes respons??veis junto a C.C.O/C.A.MUNDIAL e
                        posteriormente sem provas.
                      </li>
                      <li>
                        <b>Artigo 34??.</b> - Caber?? exclusivamente ao impetrante
                        o fornecimento de provas das irregularidades denunciadas
                        a qualquer momento.
                      </li>
                      <li>
                        <b>Artigo 35??.</b> - As representa????es/recursos dever??o
                        ser apresentadas, at?? duas horas depois de seu Jogo,
                        ap??s este prazo o resultado estar?? automaticamente
                        homologado, n??o cabendo mais representa????es.
                      </li>
                      <li>
                        <b>Artigo 36??.</b> - A C.A Mundial, n??o responsabilizar??
                        por acidentes ocorridos com os atletas ou dirigentes,
                        antes, durante ou depois de qualquer jogo
                      </li>
                      <li>
                        <b>Artigo 37??.</b> - A participa????o dos atletas ser?? de
                        inteira responsabilidade do respons??vel do clube ou
                        entidade.
                      </li>
                      <p id="pu">
                        Par??grafo ??nico: O dirigente respons??vel dever??
                        apresentar os documentos originais de todos os atletas e
                        dirigentes inscritos na ficha nominal no congresso
                        t??cnico onde ter?? uma equipe de organizadores que ir??
                        conferir a documenta????o ser?? dado o visto da
                        C.A.Mundial. Juntamente com o atestado m??dico ??nico
                        original assinado por um profissional na ??rea.
                      </p>
                      <li>
                        <b>Artigo 38??.</b> - A equipe em que o atleta participar
                        irregularmente, ser?? considerada. perdedora e estar??
                        impedida de participar das demais partidas ,
                        independente das penalidades que poder??o ser aplicadas
                        pela comiss??o disciplinar.
                      </li>
                      <li>
                        <b>Artigo 39??.</b> - O atleta da equipe desclassificada
                        n??o poder?? ser inscrito para outra equipe classificada
                        em nenhuma fase.
                      </li>
                      <li>
                        <b>Artigo 40??.</b> - Ser?? considerada mandante a equipe
                        que se encontrar ?? esquerda na programa????o dos jogos.
                        Caso haja coincid??ncia na cor dos uniformes caber?? a
                        esta a troca dos mesmos no prazo de quinze minutos.
                      </li>
                      <li>
                        <b>Artigo 41??.</b> - A caneleira faz parte do uniforme,
                        e o seu uso ser?? obrigat??rio em todos os jogos.
                      </li>
                      <li>
                        <b>Artigo 42??.</b> - Na fase Semifinal e final o
                        crit??rio para desempate, ser?? atrav??s de cobran??as de
                        penalidades m??xima, quando as equipes n??o tiverem a
                        vantagem empate.
                      </li>
                      <li>
                        <b>Artigo 43??.</b> - Os ??rbitros ser??o designados pelo
                        coordenador geral da copa.
                      </li>
                      <li>
                        <b>Artigo 44??.</b> - O coordenador geral da copa poder??
                        a qualquer momento, realizar dilig??ncias para apurar
                        irregularidade, devendo, se comprovadas, tomar medidas
                        administrativas.
                      </li>
                      <li>
                        <b>Artigo 45??.</b> - cada equipe, dever?? compor no
                        momento de sua apresenta????o no desfile de abertura
                        somente{" "}
                        <u>
                          10 (dezoito) atletas, 1 (um) t??cnico, 1 (um)
                          massagista e 1 (um) dirigente
                        </u>
                        .
                      </li>
                      <li>
                        <b>Artigo 46??.</b> - Ser?? de responsabilidade dos clubes
                        ou entidades ter seu pr??prio transporte durante toda
                        competi????o n??o cabendo reclama????es sobre este fato.
                      </li>
                      <li>
                        <b>Artigo 47??.</b> - Os casos omissos deste regulamento
                        ser??o resolvidos pelo coordenador geral da copa e a
                        comiss??o disciplina.
                      </li>
                      <li>
                        <b>Artigo 48??.</b> - Os locais fornecidos para
                        alojamento dever??o ser entregues da mesma maneira que
                        foram recebidos pelas equipes ou entidades.
                      </li>
                    </ul>
                    {event.date && (
                      <div className="dates">
                        {event.name}
                        {(() => {
                          if (
                            event.date.startAt.replace(/-/g, "").slice(6) ===
                            event.date.endAt.replace(/-/g, "").slice(6)
                          ) {
                            return (
                              <>
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
                                  .
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
                                .
                              </p>
                            );
                          } else {
                            return (
                              <p>
                                de{" "}
                                {format(
                                  new Date(
                                    event.date.startAt.replace(/-/g, "/")
                                  ),
                                  "d",
                                  {
                                    locale: ptBR,
                                  }
                                )}{" "}
                                a{" "}
                                {format(
                                  new Date(event.date.endAt.replace(/-/g, "/")),
                                  "d' de 'MMMM'",
                                  {
                                    locale: ptBR,
                                  }
                                )}
                                .
                              </p>
                            );
                          }
                        })()}
                      </div>
                    )}
                    <div className="about-coordinator">
                      <p>
                        <b>Marcelo Domingos</b> &#45; Coordenador Geral.
                      </p>
                      <p>CREF SP-039986-P</p>
                    </div>
                    <footer>
                      <p>
                        Regulamento Geral alterado pela ??ltima vez em{" "}
                        <b>domingo 17 de julho de 2022</b>.
                      </p>
                    </footer>
                  </div>
                </div>
              </div>
            </EventContainer>
          </main>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let events = [];

  await db
    .collection("events")
    .get()
    .then((response) => {
      response.docs.map((doc) => events.push(doc.id));
    });

  return {
    paths: events.map((event) => ({
      params: { id: event },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  let aboutEvent = [];

  await db
    .collection("events")
    .doc(`${id}`)
    .get()
    .then((response) => {
      aboutEvent.push(response.data());
    });

  return {
    props: {
      aboutEvent: id,
    },
    revalidate: 600,
  };
};
