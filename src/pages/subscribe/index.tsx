import Head from "next/head";
import { useState } from "react";
import { db, storage } from "~/services/firebase";
import { SubscribeContainer } from "~/styles/pages/subscribe";

const formInitialValues = {
  teamName: "",
  bornAt: "",
  cnpj: "",
  location: "",
  address: "",
  logo: "",
  directorName: "",
  directorRG: "",
  directorCPF: "",
  directorLocation: "",
  directorAddress: "",
  directorEmail: "",
  directorPhone: "",
};

export default function Subscribe() {
  const [formPage, setFormPage] = useState(1);
  const [formData, setFormData] = useState(formInitialValues);
  const [teamLogo, setTeamLogo] = useState<any>("");
  const [logoProgress, setLogoProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setTeamLogo(e.target.files[0]);
      uploadFiles(e.target.files[0]);

      setFormData({
        ...formData,
        logo: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      alert("Error ao enviar imagem.");
    }
  };

  const uploadFiles = (file) => {
    const uploadTask = storage.ref(`teams-logos/${file.name}`).put(file);
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
          .ref("teams-logos")
          .child(file.name)
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

  function handleSubmitForm(e) {
    e.preventDefault();

    db.collection("teams")
      .add(formData)
      .then((docRef) => {
        alert("Time adicionado com sucesso.");
        window.location.href = "/teams";
      })
      .catch((error) => {
        alert("Erro. Tente novamente mais tarde.");
        console.error(error);
      });
  }

  function handleCancelForm() {
    if (formPage > 1) {
      if (
        confirm(
          "Você tem certeza que deseja sair? As informações preenchidas serão perdidas e sua inscrição descontinuada."
        )
      ) {
        window.location.href = "/";
      } else {
        return;
      }
    } else {
      window.location.href = "/";
    }
  }

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
                  return <img src={URL.createObjectURL(teamLogo)} alt="" />;
                default:
              }
            })()}
          </div>
          <form>
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
                        <span>Antes de se inscrever, lembre-se:</span>
                        <p>
                          A inscrição da avaliação somente será concluída após o
                          pagamento identificado. Caso contrário, a inscrição
                          será cancelada e o clube removido do evento.
                        </p>
                        <p>Por favor, preencha este formulário corretamente.</p>
                        <div className="actions">
                          <button
                            onClick={() => {
                              setFormPage(formPage + 1);
                            }}
                          >
                            Prosseguir
                          </button>
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
                          </label>
                          <input
                            type="text"
                            placeholder="CNPJ"
                            name="cnpj"
                            id="cnpj"
                            value={formData.cnpj}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="location">
                            <b>Cidade e Estado</b>
                            <p>ex.: Jaú - SP</p>
                          </label>
                          <input
                            type="text"
                            placeholder="Cidade e estado"
                            name="location"
                            id="location"
                            required
                            value={formData.location}
                            onChange={handleInputChange}
                          />
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
                          {teamLogo ? (
                            <div className="logo-preview">
                              <img src={URL.createObjectURL(teamLogo)} alt="" />
                              <button
                                onClick={() => {
                                  setTeamLogo(null);
                                }}
                              >
                                Limpar Logo
                              </button>
                            </div>
                          ) : (
                            <input
                              type="file"
                              accept=".png,.jpg"
                              name="logo"
                              required
                              onChange={handleImageChange}
                            />
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
                            value={formData.directorName}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="directorRG">
                            <b>RG</b>
                          </label>
                          <input
                            type="text"
                            placeholder="Registro Geral - RG"
                            name="directorRG"
                            id="directorRG"
                            required
                            value={formData.directorRG}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="directorCPF">
                            <b>CPF</b>
                          </label>
                          <input
                            type="text"
                            placeholder="Cadastro de Pessoa Física - CPF"
                            name="directorCPF"
                            id="directorCPF"
                            required
                            value={formData.directorCPF}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="location">
                            <b>Cidade e Estado</b>
                            <p>ex.: Jaú - SP</p>
                          </label>
                          <input
                            type="text"
                            placeholder="Cidade e Estado"
                            name="directorLocation"
                            id="directorLocation"
                            required
                            value={formData.directorLocation}
                            onChange={handleInputChange}
                          />
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
                            value={formData.directorAddress}
                            onChange={handleInputChange}
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
                            value={formData.directorEmail}
                            onChange={handleInputChange}
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
                            value={formData.directorPhone}
                            onChange={handleInputChange}
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
                          <div className="logo-preview">
                            <img src={formData.logo} alt={formData.teamName} />
                          </div>
                          <b>Nome do Clube ou Associação</b>
                          <p>{formData.teamName}</p>
                          <b>Data de Fundação</b>
                          <p>{formData.bornAt}</p>
                          <b>CNPJ</b>
                          <p>{formData.cnpj}</p>
                          <b>Cidade e Estado</b>
                          <p>{formData.location}</p>
                          <b>Endereço</b>
                          <p>{formData.address}</p>
                        </div>
                        <span>Informações do Responsável ou Diretor</span>
                        <div className="form-group">
                          <b>Presidente ou Diretor Responsável</b>
                          <p>{formData.directorName}</p>
                          <b>RG</b>
                          <p>{formData.directorRG}</p>
                          <b>CPF</b>
                          <p>{formData.directorCPF}</p>
                          <b>Cidade e Estado</b>
                          <p>{formData.directorLocation}</p>
                          <b>Endereço</b>
                          <p>{formData.directorAddress}</p>
                          <b>Email</b>
                          <p>{formData.directorEmail}</p>
                          <b>Número de Telefone</b>
                          <p>{formData.directorPhone}</p>
                        </div>
                        <div className="actions">
                          <button
                            onClick={() => {
                              setFormPage(formPage - 1);
                            }}
                          >
                            Modificar
                          </button>
                          <button type="submit" onClick={handleSubmitForm}>
                            Concluir
                          </button>
                        </div>
                      </>
                    );
                }
              })()}
              <div className="pages-count">
                <p>
                  Página <span>{formPage}</span> de 4.
                </p>
              </div>
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
