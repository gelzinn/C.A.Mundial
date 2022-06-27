import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { MainBanner, ShortDescription } from "~/styles/pages/home";
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
                    Apresentamos um trabalho de captação em várias categorias.
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
                    Com C.T. próprio, a C.A.Mundial está preparada para receber
                    os atletas.
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
        </main>
      </main>
      <Footer />
    </>
  );
}
