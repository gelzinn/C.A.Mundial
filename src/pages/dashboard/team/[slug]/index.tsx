import Head from "next/head";
import { useRouter } from "next/router";
import { db, storage } from "~/services/firebase";
import { useEffect, useState } from "react";
import LoadingScreen from "~/components/LoadingScreen";
import {
  AboutTeamContainer,
  DangerContainer,
  PlayerInfoContainerModal,
  PlayersContainer,
  TeamInfoContainer,
} from "~/styles/pages/dashboard/team-page";
import { ArrowLeft, Pencil, Trash } from "phosphor-react";
import Link from "next/link";
import { GridAppContainer } from "~/styles/pages/dashboard";
import Aside from "~/components/Dashboard/Aside";
import Modal from "~/components/Dashboard/Modal";

export default function Teams() {
  const [teamInfo, setTeamInfo] = useState<any>();
  const [teamPlayers, setTeamPlayers] = useState<any>();
  const { query } = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [playerInfo, setPlayerInfo] = useState<any>([]);

  const slugParam = query.slug;

  useEffect(() => {
    const checkExistsTeam = db.collection("teams").doc(`${slugParam}`);
    checkExistsTeam.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        db.collection("teams")
          .doc(`${slugParam}`)
          .get()
          .then((response) => response.data())
          .then((data) => setTeamInfo(data));

        db.collection("teams")
          .doc(`${slugParam}`)
          .collection("players")
          .orderBy("number", "asc")
          .get()
          .then((response) =>
            setTeamPlayers(
              response.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
          );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.slug]);

  const handleDeleteTeam = () => {
    const checkExistsTeam = db.collection("teams").doc(teamInfo.slug);

    checkExistsTeam.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        if (
          confirm(`Você tem certeza que deseja remover ${teamInfo.teamName}?`)
        ) {
          storage.ref(`teams-logos/logo-${teamInfo.slug}`).delete();

          db.collection("teams")
            .doc(teamInfo.slug)
            .delete()
            .then((docRef) => {
              alert(`${teamInfo.teamName} foi removido com sucesso.`);
              window.location.href = "/dashboard/teams";
            })
            .catch((error) => {
              alert("Ocorreu um erro. Tente novamente mais tarde.");
              console.error(error);
            });
        }
      } else {
        alert("Não é possível remover um time inexistente.");
      }
    });
  };

  const handleDeletePlayer = (playerId: string, playerName: string) => {
    db.collection("teams")
      .doc(`${slugParam}`)
      .collection("players")
      .doc(`${playerId}`)
      .delete();

    alert(`O jogador ${playerName} foi excluido com sucesso.`);
    setModalVisible(false);
    location.reload();
  };

  return (
    <>
      {teamInfo ? (
        <>
          <Head>
            <title>{teamInfo?.teamName} • C.A.Mundial</title>
          </Head>

          {modalVisible && (
            <Modal
              title={playerInfo.name}
              onClose={() => setModalVisible(false)}
            >
              <PlayerInfoContainerModal>
                <div className="about-player">
                  <img src={playerInfo.image} alt={playerInfo.name} />
                  <div className="info">
                    <div>
                      <div>
                        <span>Nome completo</span>
                        <p>
                          {playerInfo.captain && <i>CAPITÃO</i>}{" "}
                          {playerInfo.name}
                        </p>
                      </div>
                      <div>
                        <span>Número</span>
                        <p>{playerInfo.number}</p>
                      </div>
                      <div>
                        <span>Posição</span>
                        <p>{playerInfo.position}</p>
                      </div>
                      <div>
                        <span>Predominante</span>
                        <p>{playerInfo.predominantLeg}</p>
                      </div>
                      <div>
                        <span>Joga por</span>
                        <p>{teamInfo.teamName}</p>
                      </div>
                    </div>
                    <footer>
                      <button
                        onClick={() => {
                          handleDeletePlayer(playerInfo.id, playerInfo.name);
                        }}
                      >
                        Excluir atleta
                      </button>
                    </footer>
                  </div>
                </div>
              </PlayerInfoContainerModal>
            </Modal>
          )}
          <GridAppContainer>
            <Aside />
            <main>
              <AboutTeamContainer>
                <TeamInfoContainer>
                  <header>
                    <Link href="/dashboard/teams">
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
                              {teamInfo.location.city} -{" "}
                              {teamInfo.location.state} • {teamInfo.address}
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
                              <button
                                id={player.id}
                                className="player"
                                key={player.id}
                                onClick={() => {
                                  setPlayerInfo({
                                    id: player.id,
                                    image: player.image,
                                    name: player.name,
                                    number: player.number,
                                    captain: player.captain,
                                    position: player.position,
                                    predominantLeg: player.predominantLeg,
                                  });
                                  setModalVisible(true);
                                }}
                              >
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
                              </button>
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
                <DangerContainer>
                  <div>
                    <span>Zona de Responsabilidade</span>
                    <p>
                      Tome muito cuidado com as ações que aqui forem executadas.
                    </p>
                    <ul className="actions">
                      <li>
                        <div>
                          <Pencil />
                          <div className="info">
                            <span>Editar time</span>
                            <p>
                              Qualquer informação do time poderá ser modificada.
                            </p>
                          </div>
                        </div>
                        <Link href={`dashboard/${slugParam}/edit`}>
                          <button>Editar time</button>
                        </Link>
                      </li>
                      <li>
                        <div>
                          <Trash />
                          <div className="info">
                            <span>Deletar time</span>
                            <p>Todos os dados do time serão deletados.</p>
                          </div>
                        </div>
                        <button onClick={handleDeleteTeam}>Deletar time</button>
                      </li>
                    </ul>
                  </div>
                </DangerContainer>
              </AboutTeamContainer>
            </main>
          </GridAppContainer>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export async function getStaticPaths() {
  let teams = [];

  db.collection("teams")
    .get()
    .then((response) =>
      teams.push(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );

  const paths = teams.map((team) => ({
    params: { id: team.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ slug }) {
  let teamInfo = [];
  let teamPlayers = [];

  try {
    db.collection("teams")
      .doc(`${slug}`)
      .get()
      .then((response) => response.data())
      .then((data) => teamInfo.push(data));

    db.collection("teams")
      .doc(`${slug}`)
      .collection("players")
      .get()
      .then((response) =>
        teamPlayers.push(
          response.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      );
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      info: teamInfo,
      players: teamPlayers,
    },
  };
}
