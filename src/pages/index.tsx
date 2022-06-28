import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import {
  MainBanner,
  ShortDescription,
  Sponsors,
  Subscribe,
} from "~/styles/pages/home";
import { CircleWavyCheck, Flag, Handshake, Smiley } from "phosphor-react";

export default function Home() {
  return (
    <>
      <Head>
        <title>C.A.Mundial • Venha ser um craque você também!</title>
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
        <MainBanner>
          {/* <div className="actions">
            <a href="">Saiba mais</a>
            <a href="">Se inscrever</a>
          </div> */}
          <img
            src="https://raw.githubusercontent.com/gelzinn/C.A.Mundial/main/src/assets/images/banners/New%202022%20site.png"
            loading="lazy"
            alt="New 2022 C.A.Mundial site!"
          />
        </MainBanner>
        <Sponsors>
          <div className="sponsors">
            <img
              src="https://raw.githubusercontent.com/gelzinn/C.A.Mundial/main/src/assets/images/sponsors/parelli%20sports.png"
              alt="Parelli Sports"
            />
          </div>
        </Sponsors>
        <main className="space">
          <ShortDescription>
            <ul className="info">
              <h1>Por que tão escolhidos?</h1>
              <li>
                <div className="icon">
                  <Handshake />
                </div>
                <div className="about">
                  <span>Parceira</span>
                  <p>
                    A C.A.Mundial tem parcerias com vários clubes do futebol
                    brasileiro.
                  </p>
                </div>
              </li>
              <li>
                <div className="icon">
                  <Smiley />
                </div>
                <div className="about">
                  <span>Receptiva</span>
                  <p>
                    Apresentamos um trabalho de captação e formação de atletas
                    em várias categorias.
                  </p>
                </div>
              </li>
              <li>
                <div className="icon">
                  <CircleWavyCheck />
                </div>
                <div className="about">
                  <span>Preparada</span>
                  <p>
                    Com centro de treinamento próprio, estamos preparados para
                    receber os atletas.
                  </p>
                </div>
              </li>
              <li>
                <div className="icon">
                  <Flag />
                </div>
                <div className="about">
                  <span>Nacional</span>
                  <p>
                    Também são realizadas avaliações por todo o território
                    brasileiro.
                  </p>
                </div>
              </li>
            </ul>
          </ShortDescription>
          <Subscribe>
            <div className="container">
              <div className="info">
                <span>Copa dos Campeões de Futebol de Base</span>
                <p>
                  A edição da Copa dos Campeões de 2022 acontecerá dos dias{" "}
                  <b>12 a 15 de novembro</b> na cidade de Mineiros do Tietê -
                  SP.
                </p>
                <a href="/subscribe">Se inscrever</a>
                <p className="legal-info">
                  Saiba mais sobre acomodação e outros termos{" "}
                  <a href="https://docs.camundial.com.br/">aqui</a>.
                </p>
              </div>
            </div>
            <div className="bg" />
          </Subscribe>
        </main>
      </main>
      <Footer />
    </>
  );
}
