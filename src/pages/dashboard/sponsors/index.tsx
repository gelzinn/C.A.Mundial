/* eslint-disable jsx-a11y/alt-text */
import Head from "next/head";
import { Check, Image, Pencil, PlusCircle, Trash, X } from "phosphor-react";
import { useEffect, useState } from "react";
import Aside from "~/components/Dashboard/Aside";
import LoadingCircle from "~/components/LoadingCircle";
import Modal from "~/components/Dashboard/Modal";
import { db, storage } from "~/services/firebase";
import { GridAppContainer } from "~/styles/pages/dashboard";
import {
  AddSponsorsContainer,
  SponsorsContainer,
} from "~/styles/pages/dashboard/sponsors";

const formInitialValues = {
  name: "",
  location: {
    city: "",
    state: "",
  },
  address: "",
  logo: "",
  slug: "",
};

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [editingSponsor, setEditingSponsor] = useState("");
  const [someSponsorIsEditing, setSomeSponsorIsEditing] = useState(false);

  const [formData, setFormData] = useState(formInitialValues);
  const [modalVisible, setModalVisible] = useState(false);
  const [teamLogoSize, setTeamLogoSize] = useState(0);
  const [logoProgress, setLogoProgress] = useState(0);
  const [deleteImageExecutable, setDeleteImageExecutable] = useState(true);

  useEffect(() => {
    db.collection("sponsors")
      .get()
      .then((response) =>
        setSponsors(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  }, []);

  useEffect(() => {
    setFormData({
      ...formData,
      slug: formData.name
        .trim()
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-"),
    });

    if (formData.slug) {
      const checkExistsTeam = db.collection("teams").doc(formData.slug);

      checkExistsTeam.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          alert("Patrocinador já existente nos registros.");
          setModalVisible(false);
          setFormData({
            name: "",
            location: {
              city: "",
              state: "",
            },
            address: "",
            logo: "",
            slug: "",
          });
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.name]);

  const handleDeleteSponsor = (slug: string, name: string) => {
    if (confirm(`Você tem certeza que deseja deletar esse patrocinador?`)) {
      db.collection("sponsors")
        .doc(`${slug}`)
        .delete()
        .then((docRef) => {
          alert(`${name} foi removido com sucesso.`);
          location.reload();
        })
        .catch((error) => {
          alert("Ocorreu um erro. Tente novamente mais tarde.");
          console.error(error);
        });
    }
  };

  const handleEditSponsor = (slug: string, name: string) => {
    sponsors.some((element) => {
      if (element.slug) {
        setEditingSponsor(slug);
        setSomeSponsorIsEditing(true);
      }
    });
  };

  const handleConfirmEdit = () => {
    if (
      confirm(
        `Você tem certeza que deseja confirmar a edição de informações desse patrocinador?`
      )
    ) {
      setEditingSponsor("");
      setSomeSponsorIsEditing(false);
    }
  };

  const handleImageChange = async (e) => {
    if (formData.name.length > 0) {
      if (!formData.logo) {
        if (
          e.target.files &&
          e.target.files.length > 0 &&
          e.target.files[0].size <= 2097152
        ) {
          setTeamLogoSize(e.target.files[0].size);

          if (e.target.files[0].size <= 2097152) {
            const timeExistent = storage
              .ref(`teams-logos/logo-${formData.slug}`)
              .getDownloadURL();

            if (timeExistent) {
              uploadFiles(e.target.files[0]);

              storage
                .ref(`teams-logos/logo-${formData.slug}`)
                .getDownloadURL()
                .then((url) => {
                  setFormData({
                    ...formData,
                    logo: url,
                  });
                });
            }
          }
        } else {
          e.target.value = null;
          alert("Tente um arquivo menor. O tamanho máximo é de: 2 MB.");
        }
      }
    } else {
      setFormData({
        ...formData,
        logo: "",
      });
    }
  };

  const uploadFiles = (file) => {
    if (formData.slug) {
      const checkExistsSponsor = db.collection("sponsors").doc(formData.slug);

      checkExistsSponsor.get().then((docSnapshot) => {
        if (!docSnapshot.exists) {
          const uploadTask = storage
            .ref(`sponsors-logos/${formData.slug}`)
            .put(file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setLogoProgress(prog);
            },
            (error) => console.log(error),
            () => {
              storage
                .ref(`sponsors-logos/${formData.slug}`)
                .getDownloadURL()
                .then((url) => {
                  setFormData({
                    ...formData,
                    logo: url,
                  });
                });
            }
          );
        } else {
          alert("Patrocinador já existente nos registros.");
        }
      });
    }
  };

  const cancelUploadedFile = () => {
    if (formData.logo != "") {
      storage.ref(`sponsors-logos/${formData.slug}`).delete();
      return null;
    }
    return null;
  };

  window.onbeforeunload = () => {
    if (deleteImageExecutable) {
      cancelUploadedFile();
    }
  };

  return (
    <>
      <Head>
        <title>Patrocinadores • C.A.Mundial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {modalVisible && (
        <Modal
          title="Adicionar patrocinador"
          onClose={() => setModalVisible(false)}
        >
          <AddSponsorsContainer>
            {formData.logo ? (
              <img src={formData.logo} alt={formData.name} />
            ) : (
              <Image weight="light" />
            )}
            <label className="file">
              <Image />
              <p>Adicionar logo</p>
              <input
                type="file"
                accept=".png,.jpg"
                onChange={handleImageChange}
              />
            </label>
            <input type="text" placeholder="Nome do patrocinador" />
            <textarea placeholder="Descrição curta" />
            <button type="submit">Adicionar patrocínio</button>
            <p>
              Lembre-se que, ao adicionado aqui, o patrocínio aparecerá
              automaticamente na página inicial da{" "}
              <a href="https://camundial.com.br">camundial.com.br</a>.
            </p>
          </AddSponsorsContainer>
        </Modal>
      )}
      <GridAppContainer>
        <Aside />
        <main>
          <div className="title">
            <span>Total controle sobre os</span>
            <h1>Patrocinadores</h1>
          </div>
          {sponsors && (
            <SponsorsContainer>
              {!someSponsorIsEditing && (
                <button
                  className="create-sponsor"
                  onClick={() => {
                    setModalVisible(true);
                  }}
                >
                  <PlusCircle />
                </button>
              )}
              {sponsors.length > 0 ? (
                sponsors.map((sponsor, i: number) => {
                  return (
                    <li
                      key={i}
                      className={`${
                        editingSponsor === sponsor.slug ? "editing" : ""
                      }`}
                    >
                      <div
                        className={`info ${
                          editingSponsor != sponsor.slug ? "w-full" : ""
                        }`}
                      >
                        {sponsor.image && (
                          <img src={sponsor.image} alt={sponsor.name} />
                        )}
                        {editingSponsor === sponsor.slug ? (
                          <>
                            <input type="text" placeholder={sponsor.name} />
                            <input
                              type="text"
                              placeholder={sponsor.description}
                            />
                          </>
                        ) : (
                          <>
                            <p>
                              <span>{sponsor.name}</span> {sponsor.description}
                            </p>
                          </>
                        )}
                      </div>
                      {editingSponsor === sponsor.slug && (
                        <div className="actions">
                          <button
                            onClick={() => {
                              setEditingSponsor("");
                              setSomeSponsorIsEditing(false);
                            }}
                          >
                            <X />
                          </button>
                          <button
                            className="confirm"
                            onClick={() => {
                              handleConfirmEdit();
                            }}
                          >
                            <Check />
                          </button>
                        </div>
                      )}
                      {!someSponsorIsEditing && (
                        <div className="actions">
                          <button
                            onClick={() => {
                              handleEditSponsor(sponsor.slug, sponsor.name);
                            }}
                          >
                            <Pencil />
                          </button>
                          <button
                            onClick={() => {
                              handleDeleteSponsor(sponsor.slug, sponsor.name);
                            }}
                          >
                            <Trash />
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })
              ) : (
                <LoadingCircle />
              )}
            </SponsorsContainer>
          )}
        </main>
      </GridAppContainer>
    </>
  );
}
