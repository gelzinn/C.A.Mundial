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
