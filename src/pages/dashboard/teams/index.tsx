import LoadingCircle from "~/components/LoadingCircle";
import Head from "next/head";
import { useEffect, useState } from "react";
import { db } from "~/services/firebase";
import { TeamsContainer } from "~/styles/pages/teams";
import { GridAppContainer } from "~/styles/pages/dashboard";
import Aside from "~/components/Dashboard/Aside";
import { GetStaticProps } from "next";

export default function Home(teamsList) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setTeams(teamsList.teams[0]);
  }, [teamsList]);

  return (
    <>
      <Head>
        <title>Todos os times registrados • C.A.Mundial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <GridAppContainer>
        <Aside />
        <main>
          <div className="title">
            <span>Veja todos os</span>
            <h1>Times registrados</h1>
          </div>
          {teams ? (
            <TeamsContainer>
              <>
                {teams.map((team) => {
                  return (
                    <a
                      key={team.id}
                      href={`dashboard/team/${team.slug}`}
                      id={team.slug}
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
      </GridAppContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let teams = [];

  try {
    await db
      .collection("teams")
      .get()
      .then((response) => {
        teams.push(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      teams,
    },
    revalidate: 10,
  };
};
