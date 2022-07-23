import Head from "next/head";
import { Minus, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import Aside from "~/components/Dashboard/Aside";
import Header from "~/components/Header";
import { db, firebase } from "~/services/firebase";
import { GridAppContainer } from "~/styles/pages/dashboard";
import { CreateEvent } from "~/styles/pages/dashboard/create-event";

const formInitialValues = {
  time: firebase.firestore.FieldValue.serverTimestamp(),
  name: "",
  date: {
    startAt: "",
    endAt: "",
  },
  location: "",
  description: "",
  ages: [],
};

export default function Home() {
  const [events, setEvents] = useState([]);
  const [addAge, setAddAge] = useState<any>();
  const [formData, setFormData] = useState(formInitialValues);

  useEffect(() => {
    db.collection("events")
      .get()
      .then((response) =>
        setEvents(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  }, []);

  const handleSaveAge = (e) => {
    if (e.target.value >= 1) {
      setAddAge(e.target.value);
    }
  };

  const handleAddAges = () => {
    if (addAge >= 1) {
      if (formData.ages.length >= 1) {
        if (formData.ages.some((age) => addAge != age)) {
          setFormData({
            ...formData,
            ages: [...formData.ages, addAge],
          });

          setAddAge("");
        } else {
          alert("Categoria já adicionada.");
          setAddAge("");
        }
      } else {
        setFormData({
          ...formData,
          ages: [...formData.ages, addAge],
        });

        setAddAge("");
      }
    }
    if (addAge < 0) {
      alert("Insira uma categoria válida.");
      setAddAge("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name != "" &&
      formData.location != "" &&
      formData.date.startAt != "" &&
      formData.date.endAt != "" &&
      formData.description != "" &&
      formData.ages.length >= 1
    ) {
      setFormData({
        ...formData,
        description: `${formData.description}.`,
      });

      db.collection("events")
        .doc()
        .set(formData)
        .then((docRef) => {
          alert("Evento criado com sucesso.");
          window.location.href = "/events";
        })
        .catch((error) => {
          alert("Erro. Tente novamente mais tarde.");
          console.error(error);
        });
    } else {
      alert("Preencha o formulário corretamente.");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <Head>
        <title>Criar evento • C.A.Mundial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <GridAppContainer>
        <Aside />
        <main>
          <div className="title center">
            <p>Crie um novo</p>
            <h1>Evento</h1>
          </div>
          <CreateEvent>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="event-name">Nome do evento</label>
                <input
                  type="text"
                  name="event-name"
                  id="event-name"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="event-start-date">Início</label>
                <input
                  type="date"
                  name="event-start-date"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      date: {
                        ...formData.date,
                        startAt: e.target.value,
                      },
                    });
                  }}
                  min={today}
                />
              </div>
              <div>
                <label htmlFor="event-end-date">Fim</label>
                <input
                  type="date"
                  name="event-end-date"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      date: {
                        ...formData.date,
                        endAt: e.target.value,
                      },
                    });
                  }}
                  min={formData.date.startAt}
                  disabled={!formData.date.startAt}
                />
              </div>
              <div>
                <label htmlFor="event-location">Local do evento</label>
                <input
                  type="text"
                  name="event-location"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      location: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="event-ages">Categorias</label>
                <div className="event-ages-add">
                  <input
                    type="text"
                    name="event-ages"
                    id="event-ages"
                    value={addAge}
                    onChange={handleSaveAge}
                    maxLength={2}
                    min={0}
                  />
                  <a onClick={handleAddAges}>
                    <Plus weight="bold" />
                  </a>
                </div>
                {(() => {
                  if (formData.ages?.length >= 1) {
                    return (
                      <ul>
                        <p>Categorias adicionadas</p>
                        {formData.ages
                          .sort((a, b) => a - b)
                          .map((age: number, i: number) => {
                            return (
                              <li key={i}>
                                <p>{age}</p>
                                <a
                                  onClick={() => {
                                    formData.ages.splice(i, 1);
                                    setFormData({
                                      ...formData,
                                      ...formData.ages,
                                    });
                                  }}
                                >
                                  <Minus weight="bold" />
                                </a>
                              </li>
                            );
                          })}
                      </ul>
                    );
                  } else {
                    return;
                  }
                })()}
              </div>
              <div>
                <label htmlFor="event-description">Descrição</label>
                <div className="event-description">
                  <textarea
                    name="event-description"
                    id="event-description"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <button type="submit">Criar evento</button>
            </form>
          </CreateEvent>
        </main>
      </GridAppContainer>
    </>
  );
}
