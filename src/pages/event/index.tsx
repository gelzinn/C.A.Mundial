import React, { useEffect } from "react";
import Router from "next/router";

export default function RedirectToEvent() {
  useEffect(() => {
    Router.push("/event");
  });
}
