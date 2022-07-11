import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useRouter } from "next/router";
import { db } from "~/services/firebase";
import { useEffect, useState } from "react";
import LoadingScreen from "~/components/LoadingScreen";
import {
  AboutTeamContainer,
  PlayersContainer,
  TeamInfoContainer,
} from "~/styles/pages/team-page";
import { ArrowLeft } from "phosphor-react";
import Link from "next/link";

export default function Teams() {
  const [teamInfo, setTeamInfo] = useState<any>();
  const [teamPlayers, setTeamPlayers] = useState<any>();
  const { query } = useRouter();

  useEffect(() => {
    db.collection("teams")
      .doc(`${query.slug}`)
      .get()
      .then((response) => response.data())
      .then((data) => setTeamInfo(data));

    db.collection("teams")
      .doc(`${query.slug}`)
      .collection("players")
      .get()
      .then((response) =>
        setTeamPlayers(
          response.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      );
  }, [query.slug]);

  return (
    <>
      <Head>
        <title>{teamInfo?.teamName} • C.A.Mundial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />
      {teamInfo ? (
        <>
          <main>
            <AboutTeamContainer>
              <TeamInfoContainer>
                <header>
                  <Link href="/teams">
                    <ArrowLeft weight="bold" />
                  </Link>
                  <h1>{teamInfo.teamName}</h1>
                </header>
                <div className="about-team">
                  <div className="logo">
                    <span>Logo ou Escudo</span>
                    <div className="source">
                      <img
                        src={teamInfo.logo}
                        alt={teamInfo.teamName}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="team-info">
                    <ul className="info">
                      <span>Informações legais</span>
                      <ul>
                        <li>
                          <span>Nome</span>
                          <p>{teamInfo.teamName}</p>
                        </li>
                        <li>
                          <span>Presidente ou Diretor Responsável</span>
                          <p>{teamInfo.director.name}</p>
                        </li>
                        <li>
                          <span>Localidade</span>
                          <p>
                            {teamInfo.location.city} - {teamInfo.location.state}{" "}
                            • {teamInfo.address}
                          </p>
                        </li>
                      </ul>
                    </ul>
                  </div>
                </div>
              </TeamInfoContainer>
              {teamPlayers && (
                <PlayersContainer>
                  <div>
                    <span>Jogadores</span>
                    {teamPlayers.length > 0 ? (
                      <div className="players">
                        <div className="table">
                          <p id="number">n°</p>
                          <p id="left">Identificação</p>
                          <p>Posição</p>
                          <p>Predominante</p>
                        </div>
                        {teamPlayers.map((player: any) => {
                          return (
                            <div className="player" key={player.number}>
                              <p id="number">{player.number}</p>
                              <div className="info">
                                {player.image && (
                                  <img src={player.image} alt={player.name} />
                                )}
                                <span>{player.name}</span>
                                {player.captain && <p>Capitão</p>}
                              </div>
                              <p>{player.position}</p>
                              <p>
                                {player.predominantLeg === "Esquerda" &&
                                  "Canhoto"}
                                {player.predominantLeg === "Direita" &&
                                  "Destro"}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="warn">
                        <span>Nenhum jogador encontrado</span>
                        <p>
                          {teamInfo.director.name} ainda não adicionou nenhum
                          jogador.
                        </p>
                      </div>
                    )}
                  </div>
                </PlayersContainer>
              )}
            </AboutTeamContainer>
          </main>
        </>
      ) : (
        <LoadingScreen />
      )}
      <Footer />
    </>
  );
}
