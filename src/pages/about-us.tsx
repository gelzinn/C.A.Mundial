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
                Estamos no mercado desde 2003 - fazem{" "}
                {ageEnterprise("2003/12/03")} anos - com eventos esportivos:
                captação e formação de atletas. Sempre trabalhando com o maior
                comprometimento e focando em dar visibilidade aos nossos
                clientes e atletas.
              </p>
              <p>
                A C.A.Mundial sempre visa tratar e organizar os eventos e as
                captações com muito respeito aos participantes.
              </p>
            </div>
            <img
              src="../../illustrations/undraw_stand_out_-1-oag.svg"
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
              src="../../illustrations/undraw_fans_re_cri3.svg"
              alt="C. A. Mundial"
            />
          </div>
          <div className="container container-vertical">
            <p style={{ textAlign: "center" }}>
              Esperamos te encontrar aqui em nossos eventos, futuro craque. Até
              breve.
            </p>
            <img
              src="../../illustrations/undraw_goal_-0-v5v.svg"
              alt="C. A. Mundial"
            />
          </div>
          <p className="slogan">
            <p>Venha ser um craque você também!</p>
          </p>
        </AboutUsContainer>
      </main>
      <Footer />
    </>
  );
}
