/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { AboutUs } from "~/styles/pages/about-us";

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
      <main></main>
      <Footer />
    </>
  );
}
