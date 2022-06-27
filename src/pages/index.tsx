import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { MainBanner } from "~/styles/pages/home";

export default function Home() {
  return (
    <>
      <Head>
        <title>C.A.Mundial</title>
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
      <MainBanner>
        <img
          src="https://raw.githubusercontent.com/gelzinn/C.A.Mundial/main/src/assets/images/banners/New%202022%20site.png"
          alt="C.C.A.F.B. 2021"
        />
      </MainBanner>
      <Footer />
    </>
  );
}
