import React, { useEffect } from "react";
import Router from "next/router";

export default function RedirectToTeams() {
  useEffect(() => {
    Router.push("/teams");
  });
}
