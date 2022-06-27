import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { MainBanner, RecentEvent } from "~/styles/pages/home";

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
            // src="https://raw.githubusercontent.com/gelzinn/C.A.Mundial/main/src/assets/images/banners/New%202022%20site.png"
            src=""
            alt="New 2022 C.A.Mundial site!"
          />
        </MainBanner>
        <main className="space">
          <RecentEvent>
            <div className="info">
              <h1>C.C.F.A.F.B.</h1>
            </div>
          </RecentEvent>
        </main>
      </main>
      <Footer />
    </>
  );
}
