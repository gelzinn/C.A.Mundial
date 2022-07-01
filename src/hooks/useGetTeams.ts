import { useState } from "react";
import { db } from "~/services/firebase";

export default async function useGetTeams() {
  const [data, setData] = useState({});

  const teams = await db.collection("teams").get();
  setData({ teams });

  return data;

  // if (snapshot.val() !== null) {
  //   setData({
  //     ...snapshot.val(),
  //   });
  // } else {
  //   setData({});
  // }
}
