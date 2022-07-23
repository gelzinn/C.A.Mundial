import Head from "next/head";
import Aside from "~/components/Dashboard/Aside";
import { GridAppContainer } from "~/styles/pages/dashboard";

export default function Users() {
  return (
    <>
      <Head>
        <title>Usuários cadastrados • C.A.Mundial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <GridAppContainer>
        <Aside />
        <main>
          <div className="title">
            <span>Veja todos os</span>
            <h1>USUÁRIOS</h1>
          </div>
        </main>
      </GridAppContainer>
    </>
  );
}
