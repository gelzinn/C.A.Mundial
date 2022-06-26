import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { MainBanner } from "~/styles/pages/home";

export default function Home() {
  return (
    <>
      <Head>
        <title>C.A.Mundial</title>
        <meta name="description" content="" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>

      <Header />
      <MainBanner>
        <img
          src="https://raw.githubusercontent.com/gelzinn/C.A.Mundial/main/src/assets/images/banners/CCAFB%202021.png"
          alt="C.C.A.F.B. 2021"
        />
      </MainBanner>
      <Footer />
    </>
  );
}
