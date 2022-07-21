import Link from "next/link";
import { CaretRight } from "phosphor-react";
import React, { useEffect, useState } from "react";

import { HeaderContainer, Warnings } from "./styles";

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrolledNavbar, setScrolledNavbar] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  if (openMenu === true) {
    document.body.classList.add("menu-opened");
  } else {
    document.body.classList.remove("menu-opened");
  }

  const currentUrl = location.pathname;

  window.addEventListener("scroll", (event) => {
    setScrollPosition(scrollY);
  });

  useEffect(() => {
    if (scrollPosition >= 200) {
      setScrolledNavbar(true);
    } else {
      setScrolledNavbar(false);
    }
  }, [scrollPosition]);

  return (
    <>
      <HeaderContainer className={scrolledNavbar ? "scrolled" : ""}>
        <nav>
          <a href="./" className="logo">
            <img
              src="../../assets/images/logo-camundial.png"
              alt="C. A. Mundial"
            />
          </a>
          <ul className={`menu ${openMenu ? "open" : ""}`}>
            <Link href="/">
              <li>Início</li>
            </Link>
            <Link href="/about-us">
              <li>Sobre</li>
            </Link>
            <Link href="/memories">
              <li>Memórias</li>
            </Link>
            <Link href="/events">
              <li className="new">Eventos</li>
            </Link>
            <ul className="account-actions">
              <Link href="/signin">
                <a className="signin">Entrar</a>
              </Link>
              <Link href="/subscribe">
                <a className="subscribe">
                  Cadastrar <CaretRight weight="bold" />
                </a>
              </Link>
            </ul>
          </ul>
          <ul className="account-actions">
            <Link href="/signin">
              <a className="signin">Entrar</a>
            </Link>
            <Link href="/subscribe">
              <a className="subscribe">
                Cadastrar <CaretRight weight="bold" />
              </a>
            </Link>
          </ul>
          <button
            className={openMenu ? "mobile-menu opened" : "mobile-menu"}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <div />
          </button>
        </nav>
      </HeaderContainer>
      {currentUrl == "/" && (
        <>
          <Warnings>
            <p>
              Novo site da C.A.Mundial para você acompanhar o{" "}
              <a href="./">Centro de Captação e Formação de Atletas</a>.
            </p>
          </Warnings>
        </>
      )}
    </>
  );
}
