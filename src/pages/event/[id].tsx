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
import { GetStaticPaths, GetStaticProps } from "next";
import { EventContainer } from "~/styles/pages/event-page";
import LoadingCircle from "~/components/LoadingCircle";

export default function Home({ aboutEvent }) {
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
            <title>{event.name} • C.A.Mundial</title>
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
                      <span>Categorias disponíveis</span>
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
                      <span>Descrição do evento</span>
                      <p>{event.description}</p>
                    </div>
                  )}
                </div>
                {event.date.startAt != today && counter && (
                  <div className="countdown">
                    <div className="title">
                      <span>Tempo restante</span>
                      <p>até o início do evento.</p>
                    </div>
                    <ul className="time-to-wait">
                      {counter.months ? (
                        <li>
                          <span>
                            {counter.months.toString().padStart(2, "0")}
                          </span>
                          <p>{counter.months > 1 ? "Meses" : "Mês"}</p>
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
                  <div className="subscribe">
                    <div className="invite">
                      <span>Inscrições abertas</span>
                      <p>
                        Aproveite e traga sua equipe ou organização para
                        brilhar.
                      </p>
                    </div>
                    <button>Inscrever minha equipe</button>
                    <p>Informações legais e sobre a participação abaixo.</p>
                  </div>
                )}
                <div className="event-rules">
                  <span>Regulamento Geral</span>
                  <div className="rules">
                    <ul>
                      <span>I - DAS DISPOSIÇÕES PRELIMINARES</span>
                      <li>
                        <b>Artigo 1º.</b> - Este regulamento é o conjunto das
                        disposições que regem a {event.name} -{" "}
                        {event.date.startAt.replace(/-/g, "").slice(0, -4)},
                        promovido pela C.A.Mundial - Promoção e organização de
                        eventos esportivos LTDA.
                      </li>
                      <li>
                        <b>Artigo 2º.</b> - A Copa tem a finalidade de unir
                        povos e raças em todo o território nacional e
                        internacional, além de proporcionar o intercâmbio
                        social, cultural, esportivo, educativo e turístico,
                        oferecendo a oportunidade única para que novos talentos
                        possam surgir.
                      </li>
                      <li>
                        <b>Artigo 3º.</b> - Os clubes e entidades que
                        participarem da {event.name} -{" "}
                        {event.date.startAt.replace(/-/g, "").slice(0, -4)},
                        serão consideradas conhecedoras deste regulamento e
                        assim se submeterão sem reserva alguma, a todas as
                        consequências que dele possa emanar.
                      </li>
                    </ul>
                    <ul>
                      <span>II - DAS CATEGORIAS</span>
                      <li>
                        <b>Artigo 4º.</b> - Será disputada nas seguintes
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
                        Parágrafo Único: O atleta apenas poderá participar do
                        evento, na categoria correspondente à sua faixa etária.
                        O mesmo deve portar atestado médico original e termo de
                        responsabilidade datado e assinado pelo responsável.
                      </p>
                    </ul>
                    <ul>
                      <span>III - DA PARTICIPAÇÃO</span>
                      <li>
                        <b>Artigo 5º.</b> - Poderão participar da Copa, somente
                        clubes ou entidades que se inscreverem na sistema da
                        C.A.Mundial.
                      </li>
                      <li>
                        <b>Artigo 6º.</b> - Para participação na Copa, é
                        indispensável que os atletas estejam estudando.
                      </li>
                      <li>
                        <b>Artigo 7º.</b> - São condições fundamentais para que
                        um atleta participe:
                      </li>
                      <ul>
                        <li>
                          Satisfazer todas as exigências impostas neste
                          regulamento;
                        </li>
                        <li>
                          Estar devidamente inscrito na ficha nominal cedida no
                          site pela organização;
                        </li>
                        <li>
                          Para a categoria Sub 10 e 12 - serãp aceitos: Cédula
                          de identidade ou Passaporte ou RA - Registro do Aluno
                          - escolar assinado pela direção da escola onde estuda.
                          Os documentos serão analisados no congresso técnico
                          pela organização.
                        </li>
                        <li>
                          Ter e portar os seguintes documentos originais: Cédula
                          de identidade ou Passaporte. Obs: O atleta que não
                          tiver a Cédula de Identidade Original ou Passaporte,
                          não terá sua inscrição aceita pela organização;
                        </li>
                        <li>
                          Em todas as partidas os documentos dos atletas e
                          dirigentes deveram estar em posse do quarto árbitro e
                          somente ao final de cada partida o mesmo será entregue
                          aos seus respectivos responsáveis.
                        </li>
                      </ul>
                      <li>
                        <b>Artigo 8º.</b> - É obrigatória a assinatura do atleta
                        na súmula do jogo, que deverá ser semelhante a constante
                        na ficha nominal de inscrição.
                      </li>
                      <p id="pu">
                        Parágrafo único: em todas as partidas as fichas nominais
                        dos atletas e dirigentes estará de posse do quarto
                        árbitro para a conferência.
                      </p>
                    </ul>
                    <ul>
                      <span>IV - DAS INSCRIÇÕES</span>
                      <li>
                        <b>Artigo 9º.</b> - Deverão ser feitas no site da
                        C.A.Mundial.
                      </li>
                      <li>
                        <b>Artigo 10º.</b> - Cada clube ou entidade poderá
                        inscrever uma ou mais equipe por categoria desde que
                        figure equipe (A) e equipe (B), etc.
                      </li>
                      <li>
                        <b>Artigo 11º.</b> - As inscrições dos atletas serão
                        feitas em formulário cedido pela organização.
                      </li>
                      <li>
                        <b>Artigo 12º.</b> - Não serão permitidas inclusões e
                        substituições nos formulários, depois de entregue a
                        coordenação da C.A Mundial.
                      </li>
                      <li>
                        <b>Artigo 13º.</b> - Após a realização da primera fase
                        os Clubes ou Entidades não poderão inscrever novos
                        jogadores.
                      </li>
                      <li>
                        <b>Artigo 14º.</b> - O clube ou entidade será
                        responsável pela idoneidade dos documentos apresentados.
                      </li>
                      <li>
                        <b>Artigo 15º.</b> - O atleta que comprovadamente for
                        inscrito por mais de um clube ou entidade, terá sua
                        inscrição cancelada.
                      </li>
                    </ul>
                    <ul>
                      <span>V - DA DURAÇÃO DO JOGO E BOLA</span>
                      <li>
                        <b>Artigo 16º.</b> - A duração de cada jogo e a bola a
                        ser utilizada atenderá ao que segue:
                      </li>
                      <ul>
                        {event.ages.map((age: number) => {
                          return (
                            <li key={age}>
                              <p>Categoria SUB {age}</p>
                              <p>
                                A duração de cada jogo será de{" "}
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
                        Obs: Cada equipe deverá portar no momento do início de
                        cada partida duas bolas - em perfeitas condições de jogo
                        - oficiais que deverão permanecer junto ao quarto
                        árbitro. As equipes serão responsáveis pela permanência
                        delas em campo durante a partida.
                      </p>
                      <p id="pu">
                        Parágrafo Único: haverá um intervalo de cinco minutos
                        entre os dois períodos.
                      </p>
                    </ul>
                    <ul>
                      <span>VI - DAS SUBSTITUIÇÕES</span>
                      <li>
                        <b>Artigo 17º.</b> - Para as categorias acima de 16
                        anos, as substituições terão o limite máximo relacionado
                        a quantidade de atletas que estão no banco de reservas.
                        Já para as anteriores, as substituições serão volantes.
                      </li>
                      <li>
                        <b>Artigo 18º.</b> - Poderão permanecer no banco de
                        reservas todos os atletas devidamente uniformizados,
                        além do técnico, massagista, preparador físico e
                        diretor, devidamente uniformizados e documentados.
                      </li>
                      <p id="pu">
                        Parágrafo único: não seguindo as exigências impostas, os
                        mesmo serão convidados pelo quarto árbitro a se
                        retirarem de campo.
                      </p>
                    </ul>
                    <ul>
                      <span>VII - DAS FORMAS DE DISPUTAS</span>
                      <li>
                        <b>Artigo 19º.</b> - A forma de disputa será em fases
                        distintas, a saber:
                      </li>
                      <ul>
                        <li>Fase classificatória;</li>
                        <li>Quartas de finais;</li>
                        <li>Fase Semifinal;</li>
                        <li>Fase Final.</li>
                      </ul>
                    </ul>
                    <ul>
                      <span>VIII - DAS TABELAS E HORÁRIOS DOS JOGOS</span>
                      <li>
                        <b>Artigo 20º.</b> - Os locais e horários dos jogos
                        serão determinados pela organização da C.A Mundial.
                      </li>
                      <li>
                        <b>Artigo 21º.</b> - Depois de elaborada as tabelas, não
                        serão permitida alterações.
                      </li>
                      <li>
                        <b>Artigo 22º.</b> - Os jogos terão início de acordo com
                        a programação. A equipe que não se apresentar no local
                        em até quinze minutos de tolerância, será considerada
                        perdedora do confronto.
                      </li>
                      <li>
                        <b>Artigo 23º.</b> - As equipes que abandonarem a
                        disputa serão desclassificadas e todos os resultados
                        serão considerados nulos na fase em que se configurou o
                        abandono, ficando ainda sujeitas as penalidades que
                        poderão ser aplicadas pela comissão disciplinar.
                      </li>
                      <p id="pu">
                        Parágrafo Primeiro: Configurarão o abandono as seguintes
                        situações:
                      </p>
                      <ul>
                        <li>
                          Deixar de comparecer à última partida dentro de uma
                          fase quando não houver possibilidade de classificação;
                        </li>
                        <li>Duas ausências nos jogos programados na fase;</li>
                        <li>
                          Deixar de comparecer na partida que define sua
                          classificação em qualquer fase;
                        </li>
                        <li>Desistir oficialmente da competição.</li>
                      </ul>
                      <p id="pu">
                        Parágrafo Segundo: Configurado o abandono, a equipe
                        deverá justificar-se por ofício fundamentado até as
                        17:00 horas mesmo dia.
                      </p>
                    </ul>
                    <ul>
                      <span>IX - DA PONTUAÇÃO E CLASSIFICAÇÃO</span>
                      <li>
                        <b>Artigo 24º.</b> - Em todas as fases, a pontuação para
                        efeito de classificação será:
                      </li>
                      <ul>
                        <li>Vitória: 3 (três) pontos;</li>
                        <li>Empate: 1 (um) pontos;</li>
                        <li>Derrota: 0 (zero) pontos.</li>
                      </ul>
                      <li>
                        <b>Artigo 25º.</b> - Em caso de empate na fase de
                        classificação, será imposta uma cobrança alternada de
                        pênaltis para definição do ponto extra.
                      </li>
                      <p>
                        Ainda assim empatadas na pontuação, serão adotados os
                        seguintes critérios para desempate:
                      </p>
                      <ul>
                        <li>ENTRE DUAS EQUIPES:</li>
                        <ul>
                          <li>Confronto direto;</li>
                          <li>Maior número de vitórias na fase;</li>
                          <li>Maior saldo de gols na fase;</li>
                          <li>Maior número de gols marcados na fase;</li>
                          <li>Sorteio.</li>
                        </ul>
                        <li>ENTRE TRÊS OU MAIS EQUIPES:</li>
                        <ul>
                          <li>Confronto direto;</li>
                          <li>
                            Maior saldo de gols nas partidas realizadas entre as
                            empatadas na fase;
                          </li>
                          <li>
                            Maior número de gols marcados nas partidas
                            realizadas entre as empatadas na fase;
                          </li>
                          <li>Maior saldo de gols na fase;</li>
                          <li>Maior número de gols marcados na fase;</li>
                          <li>Sorteio.</li>
                        </ul>
                      </ul>
                    </ul>
                    <ul>
                      <span>X - DA JUSTIÇA DESPORTIVA</span>
                      <li>
                        <b>Artigo 26º.</b> - A justiça desportiva da Copa dos
                        Campeões de Futebol Infantil- 2.009 será aplicada pelas
                        comissões disciplinares permanentes e pela Comissão
                        Disciplinar Especial.
                      </li>
                      <li>
                        <b>Artigo 27º.</b> - As penalidades serão aplicadas de
                        acordo com o código de Justiça Desportiva Brasileira e
                        da FIFA, e as decisões proferidas produzirão efeitos
                        imediatos.
                      </li>
                      <li>
                        <b>Artigo 28º.</b> - A Comissão Disciplinar tem por
                        incumbência apreciar e julgar todas as infrações
                        cometidas pelos clubes e entidades, atletas, dirigentes
                        e por pessoa física ou jurídica, direta Ou indiretamente
                        vinculadas aos clubes e entidades ou a serviço de
                        qualquer uma delas.
                      </li>
                      <li>
                        <b>Artigo 29º.</b> - Os atletas punidos disciplinarmente
                        com cartão vermelho ficarão suspenso da partida
                        seguinte. Independente das demais penas que poderão ser
                        aplicadas pela comissão disciplinar permanente.
                      </li>
                    </ul>
                    <ul>
                      <span>XI - DO APROVEITAMENTO ESCOLAR</span>
                      <li>
                        <b>Artigo 30º.</b> - Todo atleta inscrito no evento{" "}
                        {event.name} deverá sido aprovado no ano de{" "}
                        {event.date.startAt.replace(/-/g, "").slice(0, -4) - 1}{" "}
                        e estar matriculado e constando os dados escolares na
                        ficha nominal. No dia do congresso técnico haverá
                        conferência dos documentos originais, juntamente com as
                        fichas nominais.
                      </li>
                    </ul>
                    <ul>
                      <span>XII - DA PREMIAÇÃO</span>
                      <li>
                        <b>Artigo 31º.</b> - A C.A Mundial Promoção e
                        Organização de eventos esportivos LTDA oferecerá troféus
                        e medalhas aos dois primeiros colocados de cada
                        categoria, além das medalhas: jogador destaque e melhor
                        goleiro, ambas de cada categoria.
                      </li>
                    </ul>
                    <ul>
                      <span>XIII - DAS DISPOSIÇÕES GERAIS</span>
                      <li>
                        <b>Artigo 32º.</b> - Toda e qualquer
                        representação/recurso, devidamente fundamentado, deverá
                        ser dirigido ao C.C.O. - Comitê Central de Organização,
                        mediante documentação em papel timbrado, assinado pelo
                        dirigente responsável pela equipe, mediante a
                        confirmação de provas.
                      </li>
                      <li>
                        <b>Artigo 33º.</b> - Não serão apreciadas
                        representações/recursos que não forem firmados pelos
                        dirigentes responsáveis junto a C.C.O/C.A.MUNDIAL e
                        posteriormente sem provas.
                      </li>
                      <li>
                        <b>Artigo 34º.</b> - Caberá exclusivamente ao impetrante
                        o fornecimento de provas das irregularidades denunciadas
                        a qualquer momento.
                      </li>
                      <li>
                        <b>Artigo 35º.</b> - As representações/recursos deverão
                        ser apresentadas, até duas horas depois de seu Jogo,
                        após este prazo o resultado estará automaticamente
                        homologado, não cabendo mais representações.
                      </li>
                      <li>
                        <b>Artigo 36º.</b> - A C.A Mundial, não responsabilizará
                        por acidentes ocorridos com os atletas ou dirigentes,
                        antes, durante ou depois de qualquer jogo
                      </li>
                      <li>
                        <b>Artigo 37º.</b> - A participação dos atletas será de
                        inteira responsabilidade do responsável do clube ou
                        entidade.
                      </li>
                      <p id="pu">
                        Parágrafo Único: O dirigente responsável deverá
                        apresentar os documentos originais de todos os atletas e
                        dirigentes inscritos na ficha nominal no congresso
                        técnico onde terá uma equipe de organizadores que irá
                        conferir a documentação será dado o visto da
                        C.A.Mundial. Juntamente com o atestado médico único
                        original assinado por um profissional na área.
                      </p>
                      <li>
                        <b>Artigo 38º.</b> - A equipe em que o atleta participar
                        irregularmente, será considerada. perdedora e estará
                        impedida de participar das demais partidas ,
                        independente das penalidades que poderão ser aplicadas
                        pela comissão disciplinar.
                      </li>
                      <li>
                        <b>Artigo 39º.</b> - O atleta da equipe desclassificada
                        não poderá ser inscrito para outra equipe classificada
                        em nenhuma fase.
                      </li>
                      <li>
                        <b>Artigo 40º.</b> - Será considerada mandante a equipe
                        que se encontrar à esquerda na programação dos jogos.
                        Caso haja coincidência na cor dos uniformes caberá a
                        esta a troca dos mesmos no prazo de quinze minutos.
                      </li>
                      <li>
                        <b>Artigo 41º.</b> - A caneleira faz parte do uniforme,
                        e o seu uso será obrigatório em todos os jogos.
                      </li>
                      <li>
                        <b>Artigo 42º.</b> - Na fase Semifinal e final o
                        critério para desempate, será através de cobranças de
                        penalidades máxima, quando as equipes não tiverem a
                        vantagem empate.
                      </li>
                      <li>
                        <b>Artigo 43º.</b> - Os árbitros serão designados pelo
                        coordenador geral da copa.
                      </li>
                      <li>
                        <b>Artigo 44º.</b> - O coordenador geral da copa poderá
                        a qualquer momento, realizar diligências para apurar
                        irregularidade, devendo, se comprovadas, tomar medidas
                        administrativas.
                      </li>
                      <li>
                        <b>Artigo 45º.</b> - cada equipe, deverá compor no
                        momento de sua apresentação no desfile de abertura
                        somente{" "}
                        <u>
                          10 (dezoito) atletas, 1 (um) técnico, 1 (um)
                          massagista e 1 (um) dirigente
                        </u>
                        .
                      </li>
                      <li>
                        <b>Artigo 46º.</b> - Será de responsabilidade dos clubes
                        ou entidades ter seu próprio transporte durante toda
                        competição não cabendo reclamações sobre este fato.
                      </li>
                      <li>
                        <b>Artigo 47º.</b> - Os casos omissos deste regulamento
                        serão resolvidos pelo coordenador geral da copa e a
                        comissão disciplina.
                      </li>
                      <li>
                        <b>Artigo 48º.</b> - Os locais fornecidos para
                        alojamento deverão ser entregues da mesma maneira que
                        foram recebidos pelas equipes ou entidades.
                      </li>
                    </ul>
                    {event.date && (
                      <div className="dates">
                        {event.name}
                        {(() => {
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
                                  de{" "}
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
                              <>
                                de{" "}
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
                                  .
                                </p>
                              </>
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
                        Regulamento Geral alterado pela última vez em{" "}
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
    .orderBy("time", "asc")
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
