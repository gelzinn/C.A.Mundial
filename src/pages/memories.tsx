import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { MemoriesDescription, MemoriesLayout } from "~/styles/pages/memories";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sobre nós • C.A.Mundial</title>
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
        <MemoriesDescription>
          <div className="info">
            <h1>Memórias</h1>
            <p>
              Reviva nossos brilhantes momentos. Veja todas as edições
              anteriores de campeonatos, torneios e avaliações.
            </p>
          </div>
          <video
            disablePictureInPicture
            controlsList="nodownload"
            autoPlay
            muted
            loop
          >
            <source
              src="https://raw.githubusercontent.com/gelzinn/C.A.Mundial/main/src/assets/memories/praying-video.mp4"
              title="Nossas memórias"
            />
          </video>
        </MemoriesDescription>
        <MemoriesLayout>
          <span>C.C.F.A.F.B. 2021</span>
          <div className="container">
            <div className="item">
              <img
                src="https://raw.githubusercontent.com/gelzinn/C.A.Mundial/main/src/assets/memories/2.jpg"
                alt=""
              />
            </div>
            <div className="item">
              <img
                src="https://raw.githubusercontent.com/gelzinn/C.A.Mundial/main/src/assets/memories/3.jpg"
                alt=""
              />
            </div>
            <div className="item">
              <img
                src="https://raw.githubusercontent.com/gelzinn/C.A.Mundial/main/src/assets/memories/10.jpg"
                alt=""
              />
            </div>
            <div className="item">
              <img
                src="https://raw.githubusercontent.com/gelzinn/C.A.Mundial/main/src/assets/memories/12.jpg"
                alt=""
              />
            </div>
          </div>
        </MemoriesLayout>
      </main>
      <Footer />
    </>
  );
}
