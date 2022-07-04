import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { CompetitionsContainer } from "~/styles/pages/competitions";
import Link from "next/link";

export default function Competitions() {
  return (
    <>
      <Head>
        <title>Avaliações e Competições • C.A.Mundial</title>
      </Head>

      <Header />
      <main>
        <CompetitionsContainer>
          <Link href="/teams">Times</Link>
        </CompetitionsContainer>
      </main>
      <Footer />
    </>
  );
}
