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

export default function Home() {
  const { query } = useRouter();
  const [counter, setCounter] = useState<any>([]);

  const [event, setEvent] = useState<any>([]);

  const today = new Date().toISOString().split("T")[0];
  const actualYear = new Date().getFullYear();

  useEffect(() => {
    const getEventData = async () =>
      await db
        .collection("events")
        .doc(`${query.id}`)
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
                      <span>Que tal participar?</span>
                      <p>As inscrições estão abertas!</p>
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
                        promovido pela C.AMUNDIAL - PROMOÇÃO E ORGANIZAÇÃO DE
                        EVENTOS ESPORTIVOS LTDA.
                      </li>
                      <li>
                        <b>Artigo 2º.</b> - A Copa tem a finalidade de unir
                        povos e raças em todo o território Nacional, e
                        internacional, e proporcionar o intercâmbio social,
                        cultural, esportivo e educativo, oferecendo a
                        oportunidade única para que novos talentos possam
                        surgir.
                      </li>
                      <li>
                        <b>Artigo 3º.</b> - Os clubes e entidades que
                        participarem da {event.name} -{" "}
                        {event.date.startAt.replace(/-/g, "").slice(0, -4)},
                        serão consideradas conhecedoras deste regulamento e
                        assim se submeterão sem reserva alguma, a todas as
                        conseqüências que dele possa emanar.
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
                        Parágrafo Único: O atleta só poderá participar do
                        evento, na categoria correspondente à sua faixa etária,
                        e o mesmo deve portar atestado médico original.
                      </p>
                    </ul>
                    <ul>
                      <span>III - DA PARTICIPAÇÃO</span>
                      <li>
                        <b>Artigo 5º.</b> - Poderão participar da Copa, somente
                        Clubes ou entidades convidadas.
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
                          Estar devidamente inscrito na ficha nominal cedida
                          pela organização;
                        </li>
                        <li>
                          Ter e portar os seguintes documentos originais: Cédula
                          de identidade ou Passaporte. Obs: O atleta que não
                          tiver a Cédula de Identidade Original ou Passaporte,
                          não terá sua inscrição aceita pela organização;
                        </li>
                        <li>
                          Em todas as partidas os documentos dos atletas e
                          dirigentes deveram estar em posse do observador da
                          partida e somente ao final de cada partida o mesmo
                          será entregue aos seus respectivos responsáveis, as
                          mesmas deveram ser entregues no congresso técnico.
                        </li>
                      </ul>
                      <li>
                        <b>Artigo 8º.</b> - É obrigatória a assinatura do atleta
                        na súmula do jogo, que deverá. ser semelhante a
                        constante na ficha nominal de inscrição.
                      </li>
                      <p id="pu">
                        Parágrafo único: em todas as partidas as fichas nominais
                        dos atletas e dirigentes estará de posse do observador
                        para sua conferência.
                      </p>
                    </ul>
                    <ul>
                      <span>IV - DAS INSCRIÇÕES</span>
                      <li>
                        <b>Artigo 9º.</b> - Deverão ser feitas em ofício
                        firmadas pelo dirigente responsável e encaminhadas a C.A
                        Mundial via e-mail- fax ou correio.
                      </li>
                      <li>
                        <b>Artigo 10º.</b> - Cada clube ou entidade poderá
                        inscrever uma ou mais equipe por Categoria desde que
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
                        <b>Artigo 13º.</b> - Após a realização da I - fase os
                        Clubes ou Entidades não poderão inscrever Novos
                        jogadores.
                      </li>
                      <li>
                        <b>Artigo 14º.</b> - O clube ou Entidade será
                        responsável pela idoneidade dos documentos apresentados.
                      </li>
                      <li>
                        <b>Artigo 15º.</b> - O atleta que comprovadamente for
                        inscrito por mais de um Clube ou entidade, mesmo que não
                        tenha participado terá sua inscrição cancelada.
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
                                A duração de cada jogo será de {age * 2}X
                                {age * 2} minutos e bola oficial.
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                      <p>
                        Obs: Cada equipe deverá portar no momento do início de
                        cada partida duas bolas (novas), oficiais que deverão
                        permanecer junto ao delegado da partida (4º. Árbitro), e
                        as equipes serão responsáveis pela permanência delas em
                        campo durante a partida.
                      </p>
                      <p id="pu">
                        Parágrafo Único: haverá um intervalo de 5 (cinco
                        minutos) entre os dois períodos.
                      </p>
                    </ul>
                    <ul>
                      <span>VI - DAS SUBSTITUIÇÕES</span>
                      <li>
                        <b>Artigo 17º.</b> - Em todas as categorias cada equipe
                        poderá fazer até 7 (sete) substituições.
                      </li>
                      <li>
                        <b>Artigo 18º.</b> - Poderão permanecer no banco de
                        reservas Todos os atletas devidamente uniformizados,
                        além do técnico, massagista, devidamente documentados.
                      </li>
                      <p id="pu">
                        Parágrafo único: o técnico e o massagista não poderão
                        permanecer no banco de reservas se não estiverem
                        devidamente uniformizados ou seja; calça,camisa e sapato
                        ou tênis, ou bermuda, camisa, meia e tênis, não seguindo
                        as exigências impostas os mesmo serão convidados pelo
                        observador da partida a si retirarem de campo.
                      </p>
                    </ul>
                    <ul>
                      <span>VII - DAS FORMAS DE DISPUTAS</span>
                      <li>
                        <b>Artigo 19º.</b> - A forma de disputa será em fases
                        distintas, a saber:
                      </li>
                      <ul>
                        <li>FASE CLASSIFICATÓRIA (03 jogos)</li>
                        <li>QUARTAS DE FINAIS</li>
                        <li>FASE SEMIFINAL</li>
                        <li>FASE FINAL</li>
                      </ul>
                    </ul>
                    <ul>
                      <span>VIII - DAS TABELAS E HORÁRIOS DOS JOGOS</span>
                      <li>
                        <b>Artigo 20º.</b> - Os locais e horários dos jogos
                        serão determinados pela Organização da C.A Mundial.
                      </li>
                      <li>
                        <b>Artigo 21º.</b> - Depois de elaborada as tabelas, não
                        será permitida alterações.
                      </li>
                      <li>
                        <b>Artigo 22º.</b> - Os jogos terão início de acordo com
                        a programação sendo considerada perdedora, por não
                        comparecimento, a equipe que não se apresentar no local,
                        observando 15 (quinze) minutos de tolerância somente
                        para horário previsto da primeira partida da rodada.
                      </li>
                      <li>
                        <b>Artigo 23º.</b> - As equipes que abandonarem a
                        disputa serão desclassificadas e todos os resultados
                        serão considerados nulos na fase em que configurou o
                        abandono, ficando ainda sujeitas as penalidades que
                        poderão ser aplicadas pela comissão disciplinar.
                      </li>
                      <p>
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
                        Parágrafo Segundo: Configurado o abandono à equipe
                        deverá justificar-se por ofício fundamentado, até as
                        17:00 horas do segundo dia útil, da configuração do
                        abandono.
                      </p>
                    </ul>
                    <ul>
                      <span>IX - DA PONTUAÇÃO E CLASSIFICAÇÃO</span>
                      <li>
                        <b>Artigo 24º.</b> - Em todas as fases, a pontuação para
                        efeito de classificação será:
                      </li>
                      <ul>
                        <li>Vitória.............. 3 (três) pontos</li>
                        <li>Empate............. 1 (um) pontos</li>
                        <li>Derrota............. 0 (zero) pontos</li>
                      </ul>
                      <li>
                        <b>Artigo 25º.</b> - Em caso de empate na fase de
                        classificação serão adotados os seguintes critérios para
                        desempate:
                      </li>
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
                        com cartão disciplinarmente com cartão Vermelho ficará
                        suspenso da partida seguinte, independente das demais
                        penas que poderão ser aplicadas pela comissão
                        disciplinar permanente.
                      </li>
                    </ul>
                    <ul>
                      <span>XI - DO APROVEITAMENTO ESCOLAR</span>
                      <li>
                        <b>Artigo 30º.</b> - Todo atleta inscrito na Copa dos
                        campeões 2009 deverá sido aprovado no ano de 2008 e
                        estar matriculado; e constando os dados escolares na
                        ficha nominal, e no dia do congresso técnico haverá
                        conferência dos documentos originais, juntamente com as
                        fichas nominais.
                      </li>
                    </ul>
                    <ul>
                      <span>XII - DA PREMIAÇÃO</span>
                      <li>
                        <b>Artigo 31º.</b> - A C.A Mundial - Promoção e
                        Organização de Eventos Esportivos Ltda,oferecerá troféus
                        e medalhas aos dois primeiros colocados de cada
                        categoria. medalha destaque de cada categoria e medalha
                        melhor goleiro de cada categoria.
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
                        dirigentes responsáveis junto a C.C.O/C.A. MUNDIAL e
                        posteriormente sem provas.
                      </li>
                      <li>
                        <b>Artigo 34º.</b> - Caberá exclusivamente ao impetrante
                        o fornecimento de provas das irregularidades denunciadas
                        a qualquer momento.
                      </li>
                      <li>
                        <b>Artigo 35º.</b> - As representações/recursos deverão
                        ser apresentadas, até (duas) horas depois de seu Jogo,
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
                        inteira responsabilidade de quem os inscrever.
                      </li>
                      <p id="pu">
                        Parágrafo Único: O dirigente responsável deverá
                        apresentar os documentos originais de todos os atletas e
                        dirigentes inscritos na Ficha Nominal no Congresso
                        Técnico onde terá uma equipe de organizadores que irá
                        conferir a documentação será dado o visto da
                        C.A.MUNDIAL.
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
                        não poderá ser inscrito para outra equipe Classificada
                        em nenhuma fase.
                      </li>
                      <li>
                        <b>Artigo 40º.</b> - Será considerada mandante a equipe
                        que se encontrar à esquerda na programação dos jogos;
                        caso haja coincidência na cor dos uniformes caberá a
                        esta a troca dos mesmos no prazo de 15 (quinze) minutos.
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
                        Coordenador Geral da Copa.
                      </li>
                      <li>
                        <b>Artigo 44º.</b> - O Coordenador Geral da Copa poderá
                        a qualquer momento, realizar diligências para apurar
                        irregularidade, devendo, se comprovadas, tomar medidas
                        administrativas.
                      </li>
                      <li>
                        <b>Artigo 45º.</b> - cada equipe, deverá compor no
                        momento de sua apresentação no desfile de abertura
                        somente{" "}
                        <u>
                          18 (dezoito) atletas, 1 (um) técnico, 1 (um)
                          massagista e 1 (um) dirigente
                        </u>
                        .
                      </li>
                      <li>
                        <b>Artigo 46º.</b> - Será de responsabilidade dos clubes
                        e entidades ter seu próprio transporte durante toda
                        competição não cabendo reclamações sobre este fato.
                      </li>
                      <li>
                        <b>Artigo 47º.</b> - Os casos omissos deste regulamento
                        serão resolvidos pelo Coordenador Geral da Copa e a
                        Comissão Disciplina.
                      </li>
                    </ul>
                    {event.date && (
                      <div className="dates">
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
                                  De{" "}
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
                                De{" "}
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
                        Regulamento Geral alterado pela última vez em:{" "}
                        <b>terça-feira 15 de julho de 2022</b>.
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

// export const getStaticPaths: GetStaticPaths = async () => {
//   let events = [];

//   await db
//     .collection("events")
//     .get()
//     .then((response) =>
//       events.push(response.docs.map((doc) => ({ id: doc.id })))
//     );

//   const paths = events.map((event) => ({
//     params: { id: event.id },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   let eventInfo = [];

//   try {
//     await db
//       .collection("events")
//       .doc(`${params.id}`)
//       .get()
//       .then((response) => response.data())
//       .then((data) => eventInfo.push(data));
//   } catch (e) {
//     console.log(e);
//   }

//   return {
//     props: {
//       eventInfo,
//     },
//   };
// };
