import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";

export default function RedirectToTeamPage() {
  const { query } = useRouter();

  useEffect(() => {
    Router.push(`/dashboard/team/${query.slug}`);
  });
}
