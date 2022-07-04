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
  const { query } = useRouter();

  useEffect(() => {
    db.collection("teams")
      .doc(`${query.slug}`)
      .get()
      .then((response) => response.data())
      .then((data) => setTeamInfo(data));
  }, [query.slug]);

  return (
    <>
      <Head>
        <title>{teamInfo?.teamName} • C.A.Mundial</title>
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
                          <span>Localidade</span>
                          <p>
                            {teamInfo.location.city} - {teamInfo.location.state}{" "}
                            • {teamInfo.address}
                          </p>
                        </li>
                        <li>
                          <span>CNPJ</span>
                          <p>{teamInfo.cnpj}</p>
                        </li>
                      </ul>
                    </ul>
                    <ul className="about-director">
                      <span>Informações do responsável</span>
                      <ul>
                        <li>
                          <span>Presidente ou Diretor Responsável</span>
                          <p>{teamInfo.director.name}</p>
                        </li>
                        <li>
                          <span>RG - Registro Geral</span>
                          <p>{teamInfo.director.rg}</p>
                        </li>
                        <li>
                          <span>CPF - Cadrastro de Pessoa Física</span>
                          <p>{teamInfo.director.cpf}</p>
                        </li>
                        <li>
                          <span>Localidade</span>
                          <p>
                            {teamInfo.director.location.city} -{" "}
                            {teamInfo.director.location.state} •{" "}
                            {teamInfo.director.address}
                          </p>
                        </li>
                      </ul>
                    </ul>
                  </div>
                </div>
              </TeamInfoContainer>
              <PlayersContainer>
                <span>Jogadores</span>
              </PlayersContainer>
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
