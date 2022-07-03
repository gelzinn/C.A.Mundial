import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { CompetitionsContainer } from "~/styles/pages/competitions";

export default function Competitions() {
  return (
    <>
      <Head>
        <title>Avaliações e Competições • C.A.Mundial</title>
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
        <CompetitionsContainer></CompetitionsContainer>
      </main>
      <Footer />
    </>
  );
}
