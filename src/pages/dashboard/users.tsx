import { GetStaticProps } from "next";
import Head from "next/head";
import Aside from "~/components/Dashboard/Aside";
import LoadingCircle from "~/components/LoadingCircle";
import { db } from "~/services/firebase";
import { GridAppContainer } from "~/styles/pages/dashboard";
import { UsersContainer } from "~/styles/pages/dashboard/users";

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
              <UsersContainer>
                {users[0].map((user, i) => {
                  return (
                    <li key={i}>
                      <img src={user.image} alt={user.name} />
                      <span>{user.name}</span>
                      <p>{user.email}</p>
                      <p>{user.phone}</p>
                      {user.admin && <p>Admininstrador</p>}
                    </li>
                  );
                })}
              </UsersContainer>
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

  await db
    .collection("users")
    .get()
    .then((response) => {
      users.push(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

  return {
    props: {
      users: users,
    },
    revalidate: 10,
  };
};
function useImageColor(
  image: any,
  arg1: { cors: boolean; colors: number }
): { colors: any } {
  throw new Error("Function not implemented.");
}
