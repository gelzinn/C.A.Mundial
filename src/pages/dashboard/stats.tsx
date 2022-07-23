import Head from "next/head";
import Aside from "~/components/Dashboard/Aside";
import { GridAppContainer } from "~/styles/pages/dashboard";

export default function Stats() {
  return (
    <>
      <Head>
        <title>Estatísticas gerais • C.A.Mundial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <GridAppContainer>
        <Aside />
        <main>
          <div className="title">
            <span>Entenda os dados da plataforma em</span>
            <h1>ESTATÍSTICAS</h1>
          </div>
        </main>
      </GridAppContainer>
    </>
  );
}
