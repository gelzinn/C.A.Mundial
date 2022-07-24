import { GetStaticProps } from "next";
import Head from "next/head";
import Aside from "~/components/Dashboard/Aside";
import LoadingCircle from "~/components/LoadingCircle";
import { db } from "~/services/firebase";
import { GridAppContainer } from "~/styles/pages/dashboard";

export default function Users({ users }) {
  return (
    <>
      <Head>
        <title>Usuários cadastrados • C.A.Mundial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <GridAppContainer>
        <Aside />
        <main>
          <>
            <div className="title">
              <span>Veja todos os</span>
              <h1>USUÁRIOS</h1>
            </div>
            {users ? (
              <>
                {users[0].map((user, i) => {
                  console.log(user);

                  return (
                    <li key={i}>
                      <p>{user.name}</p>
                      <p>{user.email}</p>
                      <p>{user.phone}</p>
                      {user.admin && <p>Admininstrador</p>}
                    </li>
                  );
                })}
              </>
            ) : (
              <LoadingCircle />
            )}
          </>
        </main>
      </GridAppContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let users = [];

  try {
    await db
      .collection("users")
      .get()
      .then((response) => {
        users.push(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      users: users[0],
    },
    revalidate: 10,
  };
};
