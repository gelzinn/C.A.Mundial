import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import {
  MainBanner,
  ShortDescription,
  SponsorsContainer,
  Subscribe,
} from "~/styles/pages/home";
import { CircleWavyCheck, Flag, Handshake, Smiley } from "phosphor-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "~/services/firebase";
import LoadingCircle from "~/components/LoadingCircle";
import { GetStaticProps } from "next";

export default function Home(sponsorsList) {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    setSponsors(sponsorsList.sponsors[0]);
  }, [sponsorsList]);

  return (
    <>
      <Head>
        <title>C.A.Mundial • Venha ser um craque você também!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        {sponsors && (
          <SponsorsContainer>
            <ul className="sponsors">
              {sponsors.length > 0 ? (
                sponsors.map((sponsor, i: number) => {
                  return (
                    <li
                      key={i}
                      title={`${sponsor.name} • ${sponsor.description}`}
                    >
                      <img src={sponsor.image} alt={sponsor.name} />
                    </li>
                  );
                })
              ) : (
                <LoadingCircle />
              )}
            </ul>
          </SponsorsContainer>
        )}
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
                <Link href="/subscribe">Se inscrever</Link>
                <p className="legal-info">
                  Saiba mais sobre acomodação e outros termos{" "}
                  <Link href="https://docs.camundial.com.br/">aqui</Link>.
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

export const getStaticProps: GetStaticProps = async () => {
  let sponsors = [];

  try {
    await db
      .collection("sponsors")
      .get()
      .then((response) =>
        sponsors.push(
          response.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      );
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      sponsors,
    },
  };
};
