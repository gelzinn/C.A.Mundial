import Head from "next/head";
import { useEffect, useState } from "react";
import { db, storage } from "~/services/firebase";
import { SubscribeContainer } from "~/styles/pages/subscribe";
import filesize from "filesize";

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
          alert("Time já existente nos registros.");
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
        } else {
          e.target.value = null;
          alert("Tente um arquivo menor. O tamanho máximo é de: 2 MB.");
        }
      } else {
        alert(
          "O nome do Clube ou da Associação deve ser preenchido anteriormente."
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
    const timeExistent = storage
      .ref(`teams-logos/logo-${formData.slug}`)
      .getDownloadURL();

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
  };

  const cancelUploadedFile = () => {
    if (formData.logo != "") {
      storage.ref(`teams-logos/logo-${formData.slug}`).delete();
      return null;
    }
    return null;
  };

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

      checkExistsTeam.get().then((docSnapshot) => {
        if (!docSnapshot.exists) {
          setDeleteImageExecutable(false);

          db.collection("teams")
            .doc(formData.slug)
            .set(formData)
            .then((docRef) => {
              alert("Time adicionado com sucesso.");
              window.location.href = "/teams";
            })
            .catch((error) => {
              alert("Erro. Tente novamente mais tarde.");
              console.error(error);
            });
        } else {
          alert("Time já existente nos registros.");
          window.location.href = `/teams#:~:text=${formData.teamName}`;
        }
      });
    } else {
      alert("Preencha corretamente o formulário de inscrição.");
      setFormPage(2);
    }
  }

  function handleCancelForm() {
    if (formPage > 1) {
      if (
        confirm(
          "Você tem certeza que deseja sair? As informações preenchidas serão perdidas e sua inscrição descontinuada."
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
        <title>Inscrição • C.A.Mundial</title>
        <meta
          name="description"
          content="Organização de eventos esportivos - especializada em futebol - e captação e formação de atletas pelo território brasileiro."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>

      <main>
        <SubscribeContainer>
          <div className="illustration">
            {(() => {
              switch (formPage) {
                case 1:
                  return (
                    <img
                      src="https://img.wallpapersafari.com/desktop/1920/1080/78/24/0bpJe1.jpg"
                      alt=""
                    />
                  );
                case 2:
                  return (
                    <img
                      src="https://img.wallpapersafari.com/desktop/1920/1080/78/24/0bpJe1.jpg"
                      alt=""
                    />
                  );
                case 3:
                  return (
                    <img
                      src="https://img.wallpapersafari.com/desktop/1920/1080/78/24/0bpJe1.jpg"
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
                          src="https://img.wallpapersafari.com/desktop/1920/1080/78/24/0bpJe1.jpg"
                          alt=""
                        />
                      )}
                    </>
                  );
              }
            })()}
          </div>
          <form id="subscription-form" onSubmit={handleSubmitForm}>
            <div className="info">
              {(() => {
                if (formPage < 4) {
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
                          <span>Antes de se inscrever, lembre-se:</span>
                          <p>
                            A inscrição da avaliação somente será concluída após
                            o pagamento identificado. Caso contrário, a
                            inscrição será cancelada e o clube removido do
                            evento.
                          </p>
                          <p>
                            As informações <u>não obrigatórias</u> são úteis ao
                            ser preenchidas e apenas devem ser deixadas em
                            branco caso não existam.
                          </p>
                          <p>
                            Por favor, preencha esse formulário corretamente.
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
                        <span>Informações da Associação ou Clube</span>
                        <div className="form-group">
                          <label htmlFor="teamName">
                            <b>Nome do Clube ou Associação</b>
                          </label>
                          <input
                            type="text"
                            placeholder="Nome do Clube ou Associação"
                            name="teamName"
                            id="teamName"
                            required
                            value={formData.teamName}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="born-at">
                            <b>Data de Fundação</b>
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
                            <p id="not-required">não obrigatório</p>
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
                            <p>ex.: Jaú - SP</p>
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
                            <b>Endereço</b>
                            <p>ex.: Rua Marechal Deodoro, 235</p>
                          </label>
                          <input
                            type="text"
                            placeholder="Endereço, com nº"
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
                                            máximo é de: <b>2 MB</b>.
                                          </p>
                                          <p>
                                            O arquivo atual contém:{" "}
                                            <b>{logoFileSize(teamLogoSize)}</b>.
                                          </p>
                                        </>
                                      );
                                    } else {
                                      if (
                                        logoProgress > 0 &&
                                        logoProgress < 100
                                      ) {
                                        return <p>{logoProgress}%</p>;
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
                            <p>
                              Preencha o nome do Clube ou da Associação para
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
                        <span>Informações do Responsável ou Diretor</span>
                        <div className="form-group">
                          <label htmlFor="director">
                            <b>Presidente ou Diretor Responsável</b>
                          </label>
                          <input
                            type="text"
                            placeholder="Presidente ou diretor responsável"
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
                            placeholder="Cadastro de Pessoa Física"
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
                            <p>ex.: Jaú - SP</p>
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
                            <b>Endereço</b>
                            <p>ex.: Rua Marechal Deodoro, 235</p>
                          </label>
                          <input
                            type="text"
                            placeholder="Endereço, com nº"
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
                            <b>Número de Telefone</b>
                          </label>
                          <input
                            type="text"
                            placeholder="(DDD) Número de telefone"
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
                        <span>Informações da Associação ou Clube</span>
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
                          <b>Nome do Clube ou Associação</b>
                          {formData.teamName && <p>{formData.teamName}</p>}
                          <b>Data de Fundação</b>
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
                          <b>Endereço</b>
                          {formData.address && <p>{formData.address}</p>}
                        </div>
                        <span>Informações do Responsável ou Diretor</span>
                        <div className="form-group">
                          <b>Presidente ou Diretor Responsável</b>
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
                          <b>Endereço</b>
                          {formData.director.address && (
                            <p>{formData.director.address}</p>
                          )}
                          <b>Email</b>
                          {formData.director.email && (
                            <p>{formData.director.email}</p>
                          )}
                          <b>Número de Telefone</b>
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
                Página <span>{formPage}</span> de 4.
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
