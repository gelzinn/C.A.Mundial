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
            <p>Times que já passaram pelos nossos eventos.</p>
            <>
              {teams.map((team) => {
                return (
                  <li key={team.id}>
                    <div>
                      {team.logo ? (
                        <img src={team.logo} alt={team.teamName} />
                      ) : (
                        <LoadingCircle />
                      )}
                      <div className="info">
                        <b>{team.teamName}</b>
                        <p>{team.directorName}</p>
                      </div>
                    </div>
                    <p>{team.location}</p>
                  </li>
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
