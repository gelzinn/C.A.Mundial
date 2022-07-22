import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { AboutUsContainer } from "~/styles/pages/about-us";

export default function AboutUS() {
  function ageEnterprise(dateString) {
    const today = new Date();
    const bornAt = new Date(dateString);
    var age = today.getFullYear() - bornAt.getFullYear();
    var m = today.getMonth() - bornAt.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bornAt.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <>
      <Head>
        <title>Sobre Nós • C.A.Mundial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />
      <main>
        <AboutUsContainer>
          <div className="container">
            <div>
              <span>Sobre nós</span>
              <p>
                Tudo o que fazemos está enraizado no esporte, que desempenha um
                papel cada vez mais importante na vida das pessoas, dentro e
                fora do campo.
              </p>
              <p>
                Estamos no mercado desde há {ageEnterprise("2003/12/03")} anos
                com eventos esportivos: captação e formação de atletas. Sempre
                trabalhando com o maior comprometimento e focando em dar
                visibilidade aos nossos clientes e atletas.
              </p>
              <p>
                A C.A.Mundial sempre visa tratar e organizar os eventos e as
                captações com muito respeito aos participantes.
              </p>
            </div>
            <img
              src="../../illustrations/team-spirit-pana.svg"
              alt="C. A. Mundial"
            />
          </div>
          <div className="container">
            <div>
              <span>Nossa missão</span>
              <p>
                Fundada com o propósito de novos atletas surgirem para esse
                grande mundo do futebol, a C.A.Mundial promove eventos
                esportivos - copas, torneios, avaliações - que fazem com que a
                chance de um esportista ser revelado seja grande, basta o mesmo
                desempenhar ao seu máximo.
              </p>
              <p>
                Olheiros e avaliadores de todo o país buscam prodígios e
                reforços conosco. Não perca esta oportunidade. Não perca a
                oportunidade de jogar em um time grande. Não perca a
                oportunidade de jogar no time dos seus sonhos.
              </p>
              <p>
                Só depende do seu desempenho e do seu esforço, faremos o
                possível para te ajudar. Contamos com sua presença aqui.
              </p>
            </div>
            <img
              src="../../illustrations/good-team-pana.svg"
              alt="C. A. Mundial"
            />
          </div>
          <div className="our-team-container">
            <span>Nossa equipe</span>
            <ul className="our-team">
              <li>
                <picture>
                  <img
                    src="https://pps.whatsapp.net/v/t61.24694-24/265430272_120426717096331_1812860507787573229_n.jpg?ccb=11-4&oh=01_AVyXGhrPHMlvcIR4Y609p4hHnTBge28vC9cGDySCD1dCKA&oe=62E825D6"
                    alt="Marcelo Domingos photo"
                  />
                </picture>
                <div className="info">
                  <span>Marcelo Domingos</span>
                  <p>Coordenador Geral</p>
                </div>
              </li>
              <li>
                <picture>
                  <img
                    src="https://scontent.fbau3-2.fna.fbcdn.net/v/t1.6435-9/53483687_1899606490149307_7387477704854994944_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHVHd2V14TCpRTpk6Kw7tXb192JgxwFiMfX3YmDHAWIxzl-GExx_HRYGCbQzH63AOmBfld99oELoGlmjUH2xAqu&_nc_ohc=WWy1RViTEBQAX8_6NGE&tn=uCgf8mqIIDwpLGj1&_nc_ht=scontent.fbau3-2.fna&oh=00_AT9ZxlS4KjPsbemJoBOdj1xn0hvBGGnPfZrjmLIJjubTAQ&oe=630213C6"
                    alt="Vandecleide Angelica Coradi photo"
                  />
                </picture>
                <div className="info">
                  <span>Vandecleide Angelica Coradi</span>
                  <p>Diretora Financeira e Organizadora </p>
                </div>
              </li>
              <li>
                <picture>
                  <img
                    className="zoom-image"
                    src="https://scontent.fbau3-2.fna.fbcdn.net/v/t39.30808-6/246058340_400670328206196_7193136681473457082_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHK83zCU5hCpBg7L_RxXDdzEk4cUMbotGESThxQxui0YRw0k6GM0P6VrtRjz-TFxVg8HZ67XzcPLLgJfB6r1-jb&_nc_ohc=EbZ9u0nqDYMAX8LosIc&_nc_ht=scontent.fbau3-2.fna&oh=00_AT-IHeyJ3kYxbKx2UH_N_4IdZaCkRvGIMoMwDUgwDsXNxQ&oe=62E0943B"
                    alt="Carlos Alexandre Alavasse photo"
                  />
                </picture>
                <div className="info">
                  <span>Carlos Alexandre Alavasse</span>
                  <p>Preparador Físico</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="slogan">
            <div>
              <span>Venha ser um craque!</span>
              <p>Não perca essa chance, te esperamos aqui. Até breve.</p>
            </div>
            <img
              src="../../illustrations/missed-chances-bro.svg"
              alt="C. A. Mundial"
            />
          </div>
        </AboutUsContainer>
      </main>
      <Footer />
    </>
  );
}
