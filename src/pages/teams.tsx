import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { db } from "~/services/firebase";
import { useEffect, useState } from "react";
import { TeamsContainer } from "~/styles/pages/teams";
import LoadingCircle from "~/components/LoadingCircle";

export default function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    db.collection("teams")
      .get()
      .then((response) =>
        setTeams(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  }, []);

  function convertToSlug(teamName: string) {
    var teamName = teamName
      .trim()
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");

    return teamName;
  }

  return (
    <>
      <Head>
        <title>Times que passaram pelos nossos eventos • C.A.Mundial</title>
        <meta
          name="description"
          content="Organização de eventos esportivos - especializada em futebol - e captação e formação de atletas pelo território brasileiro."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>

      <Header />
      <main>
        {teams ? (
          <TeamsContainer>
            <span>Times registrados</span>
            <>
              {teams.map((team) => {
                return (
                  <a
                    key={team.id}
                    href={`team/${convertToSlug(team.teamName)}`}
                    id={convertToSlug(team.teamName)}
                  >
                    <div>
                      {team.logo ? (
                        <div className="logo">
                          <img
                            src={team.logo}
                            alt={team.teamName}
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <LoadingCircle />
                      )}
                      <div className="info">
                        <b>{team.teamName}</b>
                        <p>{team.director.name}</p>
                      </div>
                    </div>

                    {team.location &&
                      team.location.city &&
                      team.location.state && (
                        <div className="location">
                          <span>Localidade</span>
                          <p>
                            {team.location.city} - {team.location.state}
                          </p>
                        </div>
                      )}
                  </a>
                );
              })}
            </>
          </TeamsContainer>
        ) : (
          <LoadingCircle />
        )}
      </main>
      <Footer />
    </>
  );
}
