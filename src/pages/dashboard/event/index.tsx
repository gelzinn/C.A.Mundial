import React, { useEffect } from "react";
import Router from "next/router";

export default function RedirectToEvents() {
  useEffect(() => {
    Router.push("/dashboard/events");
  });
}
