import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { auth, db, storage } from "~/services/firebase";
import { SubscribeContainer } from "~/styles/pages/subscribe";
import filesize from "filesize";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AuthContext from "~/contexts/AuthContext";
import router from "next/router";

const formInitialValues = {
  teamName: "",
  bornAt: "",
  cnpj: "",
  location: {
    city: "",
    state: "",
  },
  address: "",
  logo: "",
  director: {
    name: "",
    rg: "",
    cpf: "",
    location: {
      city: "",
      state: "",
    },
    address: "",
    email: "",
    phone: "",
  },
  slug: "",
};

export default function Subscribe() {
  const { user } = useContext(AuthContext);

  const [formPage, setFormPage] = useState(1);
  const [formData, setFormData] = useState(formInitialValues);
  const [teamLogoSize, setTeamLogoSize] = useState(0);
  const [logoProgress, setLogoProgress] = useState(0);
  const [deleteImageExecutable, setDeleteImageExecutable] = useState(true);

  const [teamLocation, setTeamLocation] = useState({
    city: "",
    state: "",
  });
  const [teamCNPJ, setTeamCNPJ] = useState("");

  const [directorLocation, setDirectorLocation] = useState({
    city: "",
    state: "",
  });
  const [directorInfo, setDirectorInfo] = useState({
    name: "",
    rg: "",
    cpf: "",
    address: "",
    location: { city: directorLocation.city, state: directorLocation.state },
    email: "",
    phone: "",
  });

  useEffect(() => {
    setFormData({
      ...formData,
      slug: formData.teamName
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
          alert("Time j?? existente nos registros.");
          window.location.href = `/teams#:~:text=${formData.teamName}`;
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.teamName]);

  useEffect(() => {
    setFormData({
      ...formData,
      director: {
        ...directorInfo,
        location: {
          city: directorLocation.city,
          state: directorLocation.state,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directorLocation.city, directorLocation.state]);

  useEffect(() => {
    setFormData({
      ...formData,
      cnpj: teamCNPJ,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamCNPJ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const convertCNPJ = (cnpj: string) => {
    const cnpjFormatted = cnpj
      .trim()
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    return cnpjFormatted;
  };

  const convertCPF = (cpf: string) => {
    const cpfFormatted = cpf
      .trim()
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    return cpfFormatted;
  };

  const convertRG = (rg: string) => {
    const rgFormatted = rg.replace(
      /(\d{2})(\d{3})(\d{3})(\d{1})$/,
      "$1.$2.$3-$4"
    );
    return rgFormatted;
  };

  const convertPhone = (phoneNumber: string) => {
    const phoneFormatted = phoneNumber.replace(
      /(\d{2})(\d{1})(\d{4})(\d{4})$/,
      "($1) $2 $3-$4"
    );
    return phoneFormatted;
  };

  const handleImageChange = async (e) => {
    if (formData.teamName.length > 0) {
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
          alert("Tente um arquivo menor. O tamanho m??ximo ?? de: 2 MB.");
        }
      } else {
        alert(
          "O nome do Clube ou da Associa????o deve ser preenchido anteriormente."
        );
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
      const checkExistsTeam = db.collection("teams").doc(formData.slug);

      checkExistsTeam.get().then((docSnapshot) => {
        if (!docSnapshot.exists) {
          const uploadTask = storage
            .ref(`teams-logos/logo-${formData.slug}`)
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
                .ref(`teams-logos/logo-${formData.slug}`)
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
          alert("Time j?? existente nos registros.");
          window.location.href = `/teams#:~:text=${formData.teamName}`;
        }
      });
    }
  };

  const cancelUploadedFile = () => {
    if (formData.logo != "") {
      storage.ref(`teams-logos/logo-${formData.slug}`).delete();
      return null;
    }
    return null;
  };

  async function createUserFirebase(email: string, password: string) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        if (error.code == "auth/email-already-in-use") {
          alert("Este e-mail j?? est?? registrado.");
        } else if (error.code == "auth/invalid-email") {
          alert("O e-mail ?? invalido.");
        } else if (error.code == "auth/operation-not-allowed") {
          alert("Opera????o n??o permitida.");
        } else if (error.code == "auth/weak-password") {
          alert("A senha ?? muito fraca. Preencha novamente.");
        }
      })
      .then(async () => {
        await auth
          .signInWithEmailAndPassword(email, password)
          .catch(function (error) {
            if (error.code == "auth/wrong-password") {
              alert("E-mail ou senha incorretos.");
            }
          });
      });
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    if (
      formData.teamName != "" &&
      formData.bornAt != "" &&
      formData.location.city != "" &&
      formData.location.state != "" &&
      formData.address != "" &&
      formData.logo != "" &&
      formData.director.name != "" &&
      formData.director.rg != "" &&
      formData.director.cpf != "" &&
      formData.director.location.city != "" &&
      formData.director.location.state != "" &&
      formData.director.address != "" &&
      formData.director.email != "" &&
      formData.director.phone != ""
    ) {
      const checkExistsTeam = db.collection("teams").doc(formData.slug);

      checkExistsTeam.get().then(async (docSnapshot) => {
        if (!docSnapshot.exists) {
          await createUserFirebase(
            formData.director.email,
            formData.director.cpf
          );

          auth.onAuthStateChanged((user) => {
            if (user) {
              const { displayName, photoURL, uid, email } = user;
              console.log(displayName, photoURL, uid, email);

              db.collection("users")
                .doc(user.uid)
                .set({
                  name: formData.director.name,
                  rg: formData.director.rg,
                  cpf: formData.director.cpf,
                  location: {
                    city: formData.director.location.city,
                    state: formData.director.location.state,
                  },
                  address: formData.director.address,
                  phone: formData.director.phone,
                  email: formData.director.email,
                  directorOf: formData.slug,
                  id: user.uid,
                  admin: false,
                })
                .then((userRef) => {
                  setDeleteImageExecutable(false);

                  db.collection("teams")
                    .doc(formData.slug)
                    .set(formData)
                    .then((docRef) => {
                      alert("Time adicionado com sucesso.");
                    })
                    .catch((error) => {
                      alert("Erro. Tente novamente mais tarde.");
                      console.error(error);
                    });

                  router.push("/dashboard");
                });
            }
          });
        } else {
          alert("Time j?? existente nos registros.");
          window.location.href = `/teams#:~:text=${formData.teamName}`;
        }
      });
    } else {
      alert("Preencha corretamente o formul??rio de inscri????o.");
      setFormPage(2);
    }
  }

  function handleCancelForm() {
    if (formPage > 1) {
      if (
        confirm(
          "Voc?? tem certeza que deseja sair? As informa????es preenchidas ser??o perdidas e sua inscri????o descontinuada."
        )
      ) {
        cancelUploadedFile();
        window.location.href = "/";
      } else {
        return;
      }
    } else {
      window.location.href = "/";
    }
  }

  const logoFileSize = filesize.partial({ base: 2, standard: "jedec" });

  window.onbeforeunload = () => {
    if (deleteImageExecutable) {
      cancelUploadedFile();
    }
  };

  return (
    <>
      <Head>
        <title>Cadastrar uma equipe ou organiza????o ??? C.A.Mundial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <SubscribeContainer>
          <div className="illustration">
            {(() => {
              switch (formPage) {
                case 1:
                  return (
                    <img
                      src="https://storyset.com/images/attribution/3.svg"
                      alt=""
                    />
                  );
                case 2:
                  return (
                    <img
                      src="https://storyset.com/images/attribution/3.svg"
                      alt=""
                    />
                  );
                case 3:
                  return (
                    <img
                      src="https://storyset.com/images/attribution/3.svg"
                      alt=""
                    />
                  );
                case 4:
                  return (
                    <>
                      {formData.logo ? (
                        <img src={formData.logo} alt={formData.teamName} />
                      ) : (
                        <img
                          src="https://storyset.com/images/attribution/3.svg"
                          alt=""
                        />
                      )}
                    </>
                  );
              }
            })()}
          </div>
          <form id="subscription-form" onSubmit={handleSubmitForm}>
            <div className={formPage == 1 ? "info starter" : "info"}>
              {(() => {
                if (formPage === 1) {
                  return <span className="title">Aviso</span>;
                }
                if (formPage > 1 && formPage < 4) {
                  return <span className="title">Enviar</span>;
                }
                if (formPage == 4) {
                  return <span className="title">Revisar</span>;
                }
              })()}
              {(() => {
                switch (formPage) {
                  case 1:
                    return (
                      <>
                        <div className="form-group starter">
                          <p>
                            Este cadastro tem a finalidade de apenas inserir um
                            time ou organiza????o no sistema da C.A.Mundial. Ap??s
                            o cadastro, voc?? estar?? liberado e apto para
                            inscrever o seu time ou o qual voc?? representa em
                            alguma competi????o.
                          </p>
                          <p>
                            Com o time ou organiza????o cadastrado, o mesmo poder??
                            se inscrever em outras competi????es sem passar pelo
                            mesmo processo burocr??tico de colocar todas as
                            informa????es da equipe.
                          </p>
                          <p>
                            As informa????es <u>&quot;n??o obrigat??rias&quot;</u>{" "}
                            s??o importantes e apenas devem ser deixadas em
                            branco caso n??o h?? possibilidade.
                          </p>
                          <p>
                            A C.A.Mundial preza pelo compromisso e a lealdade.
                            Por favor, preencha esse formul??rio corretamente.
                          </p>
                          <div className="actions">
                            <button
                              onClick={() => {
                                setFormPage(formPage + 1);
                              }}
                            >
                              Prosseguir
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  case 2:
                    return (
                      <>
                        <span>Informa????es da Associa????o ou Clube</span>
                        <div className="form-group">
                          <label htmlFor="teamName">
                            <b>Nome do Clube ou Associa????o</b>
                          </label>
                          <input
                            type="text"
                            placeholder="Nome do Clube ou Associa????o"
                            name="teamName"
                            id="teamName"
                            required
                            value={formData.teamName}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="born-at">
                            <b>Data de Funda????o</b>
                          </label>
                          <input
                            type="date"
                            name="bornAt"
                            id="bornAt"
                            required
                            value={formData.bornAt}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="cnpj">
                            <b>CNPJ</b>
                            {/* <p id="not-required">n??o obrigat??rio</p> */}
                          </label>
                          <input
                            type="text"
                            placeholder="CNPJ"
                            name="cnpj"
                            id="cnpj"
                            minLength={14}
                            maxLength={18}
                            value={teamCNPJ}
                            onChange={(e) => {
                              setTeamCNPJ(`${convertCNPJ(e.target.value)}`);
                              setFormData({
                                ...formData,
                                cnpj: teamCNPJ,
                              });
                            }}
                          />
                          <label htmlFor="location">
                            <b>Cidade e Estado</b>
                            <p>ex.: Ja?? - SP</p>
                          </label>
                          <div>
                            <input
                              type="text"
                              placeholder="Cidade e Estado"
                              name="location"
                              id="location"
                              required
                              value={teamLocation.city}
                              onChange={(e) => {
                                setTeamLocation({
                                  ...teamLocation,
                                  city: e.target.value,
                                });
                                setFormData({
                                  ...formData,
                                  location: {
                                    ...teamLocation,
                                    city: e.target.value,
                                  },
                                });
                              }}
                            />
                            <select
                              name="state"
                              id="stateOptions"
                              required
                              value={teamLocation.state}
                              onChange={(e) => {
                                setTeamLocation({
                                  ...teamLocation,
                                  state: e.target.value,
                                });
                                setFormData({
                                  ...formData,
                                  location: {
                                    ...teamLocation,
                                    state: e.target.value,
                                  },
                                });
                              }}
                            >
                              <option value="AC">AC</option>
                              <option value="AL">AL</option>
                              <option value="AP">AP</option>
                              <option value="AM">AM</option>
                              <option value="BA">BA</option>
                              <option value="CE">CE</option>
                              <option value="DF">DF</option>
                              <option value="ES">ES</option>
                              <option value="GO">GO</option>
                              <option value="MA">MA</option>
                              <option value="MT">MT</option>
                              <option value="MS">MS</option>
                              <option value="MG">MG</option>
                              <option value="PA">PA</option>
                              <option value="PB">PB</option>
                              <option value="PR">PR</option>
                              <option value="PE">PE</option>
                              <option value="PI">PI</option>
                              <option value="RJ">RJ</option>
                              <option value="RN">RN</option>
                              <option value="RS">RS</option>
                              <option value="RO">RO</option>
                              <option value="RR">RR</option>
                              <option value="SC">SC</option>
                              <option value="SP">SP</option>
                              <option value="SE">SE</option>
                              <option value="TO">TO</option>
                            </select>
                          </div>
                          <label htmlFor="address">
                            <b>Endere??o</b>
                            <p>ex.: Rua Marechal Deodoro, 235</p>
                          </label>
                          <input
                            type="text"
                            placeholder="Endere??o, com n??"
                            name="address"
                            id="address"
                            required
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="logo">
                            <b>Logo ou Escudo</b>
                          </label>
                          {formData.teamName ? (
                            <>
                              {formData.logo ? (
                                <div className="logo-preview">
                                  {(() => {
                                    if (teamLogoSize > 2097152) {
                                      setTimeout(() => {
                                        setFormData({
                                          ...formData,
                                          logo: "",
                                        });
                                      }, 3000);

                                      return (
                                        <>
                                          <p>
                                            Tente um arquivo menor. O tamanho
                                            m??ximo ?? de: <b>2 MB</b>.
                                          </p>
                                          <p>
                                            O arquivo atual cont??m:{" "}
                                            <b>{logoFileSize(teamLogoSize)}</b>.
                                          </p>
                                        </>
                                      );
                                    } else {
                                      if (
                                        logoProgress > 0 &&
                                        logoProgress < 100
                                      ) {
                                        return (
                                          <CircularProgressbar
                                            value={logoProgress}
                                            text={`${logoProgress}%`}
                                          />
                                        );
                                      }

                                      return (
                                        <>
                                          {formData.logo && (
                                            <img
                                              src={formData.logo}
                                              alt={formData.teamName}
                                            />
                                          )}

                                          <p>{logoFileSize(teamLogoSize)}</p>
                                          <button
                                            onClick={() => {
                                              setFormData({
                                                ...formData,
                                                logo: "",
                                              });
                                              cancelUploadedFile();
                                            }}
                                          >
                                            Limpar Logo
                                          </button>
                                        </>
                                      );
                                    }
                                  })()}
                                </div>
                              ) : (
                                <>
                                  <input
                                    type="file"
                                    accept=".png,.jpg"
                                    name="logo"
                                    required
                                    onChange={handleImageChange}
                                  />
                                </>
                              )}
                            </>
                          ) : (
                            <p style={{ textAlign: "left" }}>
                              Preencha o nome do Clube ou da Associa????o para
                              inserir um Logo ou Escudo.
                            </p>
                          )}
                          <div className="actions">
                            <button
                              onClick={() => {
                                setFormPage(formPage - 1);
                              }}
                            >
                              Retornar
                            </button>
                            <button
                              onClick={() => {
                                setFormPage(formPage + 1);
                              }}
                            >
                              Prosseguir
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  case 3:
                    return (
                      <>
                        <span>Informa????es do Respons??vel ou Diretor</span>
                        <div className="form-group">
                          <label htmlFor="director">
                            <b>Presidente ou Diretor Respons??vel</b>
                          </label>
                          <input
                            type="text"
                            placeholder="Presidente ou diretor respons??vel"
                            name="directorName"
                            id="directorName"
                            required
                            value={directorInfo.name}
                            onChange={(e) => {
                              setDirectorInfo({
                                ...directorInfo,
                                name: e.target.value,
                              });
                              setFormData({
                                ...formData,
                                director: {
                                  ...directorInfo,
                                  name: directorInfo.name,
                                },
                              });
                            }}
                          />
                          <label htmlFor="directorRG">
                            <b>RG</b>
                          </label>
                          <input
                            type="text"
                            placeholder="Registro Geral"
                            name="directorRG"
                            id="directorRG"
                            required
                            maxLength={12}
                            minLength={9}
                            value={directorInfo.rg}
                            onChange={(e) => {
                              setDirectorInfo({
                                ...directorInfo,
                                rg: convertRG(e.target.value),
                              });
                              setFormData({
                                ...formData,
                                director: {
                                  ...directorInfo,
                                  rg: convertRG(e.target.value),
                                },
                              });
                            }}
                          />
                          <label htmlFor="directorcpf">
                            <b>CPF</b>
                          </label>
                          <input
                            type="text"
                            placeholder="Cadastro de Pessoa F??sica"
                            name="directorCPF"
                            id="directorCPF"
                            required
                            maxLength={12}
                            minLength={12}
                            value={directorInfo.cpf}
                            onChange={(e) => {
                              setDirectorInfo({
                                ...directorInfo,
                                cpf: convertCPF(e.target.value),
                              });
                              setFormData({
                                ...formData,
                                director: {
                                  ...directorInfo,
                                  cpf: convertCPF(e.target.value),
                                },
                              });
                            }}
                          />
                          <label htmlFor="location">
                            <b>Cidade e Estado</b>
                            <p>ex.: Ja?? - SP</p>
                          </label>
                          <div>
                            <input
                              type="text"
                              placeholder="Cidade e Estado"
                              name="location"
                              id="location"
                              required
                              value={directorLocation.city}
                              onChange={(e) => {
                                setDirectorLocation({
                                  ...directorLocation,
                                  city: e.target.value,
                                });
                                setFormData({
                                  ...formData,
                                  director: {
                                    ...directorInfo,
                                    location: {
                                      ...directorLocation,
                                      city: directorLocation.city,
                                    },
                                  },
                                });
                              }}
                            />
                            <select
                              name="directorState"
                              id="directorStateOptions"
                              required
                              value={directorLocation.state}
                              onChange={(e) => {
                                setDirectorLocation({
                                  ...directorLocation,
                                  state: e.target.value,
                                });
                                setFormData({
                                  ...formData,
                                  director: {
                                    ...directorInfo,
                                    location: {
                                      ...directorLocation,
                                      state: e.target.value,
                                    },
                                  },
                                });
                              }}
                            >
                              <option value="AC">AC</option>
                              <option value="AL">AL</option>
                              <option value="AP">AP</option>
                              <option value="AM">AM</option>
                              <option value="BA">BA</option>
                              <option value="CE">CE</option>
                              <option value="DF">DF</option>
                              <option value="ES">ES</option>
                              <option value="GO">GO</option>
                              <option value="MA">MA</option>
                              <option value="MT">MT</option>
                              <option value="MS">MS</option>
                              <option value="MG">MG</option>
                              <option value="PA">PA</option>
                              <option value="PB">PB</option>
                              <option value="PR">PR</option>
                              <option value="PE">PE</option>
                              <option value="PI">PI</option>
                              <option value="RJ">RJ</option>
                              <option value="RN">RN</option>
                              <option value="RS">RS</option>
                              <option value="RO">RO</option>
                              <option value="RR">RR</option>
                              <option value="SC">SC</option>
                              <option value="SP">SP</option>
                              <option value="SE">SE</option>
                              <option value="TO">TO</option>
                            </select>
                          </div>
                          <label htmlFor="address">
                            <b>Endere??o</b>
                            <p>ex.: Rua Marechal Deodoro, 235</p>
                          </label>
                          <input
                            type="text"
                            placeholder="Endere??o, com n??"
                            name="directorAddress"
                            id="directorAddress"
                            required
                            value={directorInfo.address}
                            onChange={(e) => {
                              setDirectorInfo({
                                ...directorInfo,
                                address: e.target.value,
                              });
                              setFormData({
                                ...formData,
                                director: {
                                  ...directorInfo,
                                  address: directorInfo.address,
                                },
                              });
                            }}
                          />
                          <label htmlFor="email">
                            <b>Email</b>
                          </label>
                          <input
                            type="text"
                            placeholder="Email"
                            name="directorEmail"
                            id="directorEmail"
                            required
                            value={directorInfo.email}
                            onChange={(e) => {
                              setDirectorInfo({
                                ...directorInfo,
                                email: e.target.value,
                              });
                              setFormData({
                                ...formData,
                                director: {
                                  ...directorInfo,
                                  email: e.target.value,
                                },
                              });
                            }}
                          />
                          <label htmlFor="phone">
                            <b>N??mero de Telefone</b>
                          </label>
                          <input
                            type="text"
                            placeholder="(DDD) N??mero de telefone"
                            name="directorPhone"
                            id="directorPhone"
                            required
                            minLength={11}
                            maxLength={14}
                            value={directorInfo.phone}
                            onChange={(e) => {
                              setDirectorInfo({
                                ...directorInfo,
                                phone: convertPhone(e.target.value),
                              });
                              setFormData({
                                ...formData,
                                director: {
                                  ...directorInfo,
                                  phone: convertPhone(e.target.value),
                                },
                              });
                            }}
                          />
                          <div className="actions">
                            <button
                              onClick={() => {
                                setFormPage(formPage - 1);
                              }}
                            >
                              Retornar
                            </button>
                            <button
                              onClick={() => {
                                setFormPage(formPage + 1);
                              }}
                            >
                              Prosseguir
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  case 4:
                    return (
                      <>
                        <span>Informa????es da Associa????o ou Clube</span>
                        <div className="form-group">
                          <b>Logo ou Escudo</b>
                          {formData.logo && (
                            <div className="logo-preview">
                              <img
                                src={formData.logo}
                                alt={formData.teamName}
                              />
                            </div>
                          )}
                          <b>Nome do Clube ou Associa????o</b>
                          {formData.teamName && <p>{formData.teamName}</p>}
                          <b>Data de Funda????o</b>
                          {formData.bornAt && <p>{formData.bornAt}</p>}
                          <b>CNPJ</b>
                          {formData.cnpj && <p>{formData.cnpj}</p>}
                          <b>Cidade e Estado</b>
                          {formData.location &&
                            formData.location.city &&
                            formData.location.state && (
                              <p>
                                {formData.location.city} -{" "}
                                {formData.location.state}
                              </p>
                            )}
                          <b>Endere??o</b>
                          {formData.address && <p>{formData.address}</p>}
                        </div>
                        <span>Informa????es do Respons??vel ou Diretor</span>
                        <div className="form-group">
                          <b>Presidente ou Diretor Respons??vel</b>
                          {formData.director.name && (
                            <p>{formData.director.name}</p>
                          )}
                          <b>RG</b>
                          {formData.director.rg && (
                            <p>{formData.director.rg}</p>
                          )}
                          <b>CPF</b>
                          {formData.director.cpf && (
                            <p>{formData.director.cpf}</p>
                          )}
                          <b>Cidade e Estado</b>
                          {formData.director.location.city &&
                            formData.director.location.state && (
                              <p>
                                {formData.director.location.city} -{" "}
                                {formData.director.location.state}
                              </p>
                            )}
                          <b>Endere??o</b>
                          {formData.director.address && (
                            <p>{formData.director.address}</p>
                          )}
                          <b>Email</b>
                          {formData.director.email && (
                            <p>{formData.director.email}</p>
                          )}
                          <b>N??mero de Telefone</b>
                          {formData.director.phone && (
                            <p>{formData.director.phone}</p>
                          )}
                        </div>
                        <div className="actions">
                          <button
                            onClick={() => {
                              setFormPage(formPage - 1);
                            }}
                          >
                            Modificar
                          </button>
                          <button type="submit">Concluir</button>
                        </div>
                      </>
                    );
                }
              })()}
            </div>
            <div className="pages-count">
              <p>
                P??gina <span>{formPage}</span> de 4.
              </p>
            </div>
          </form>
          <button onClick={handleCancelForm} className="return">
            <div />
          </button>
        </SubscribeContainer>
      </main>
    </>
  );
}
