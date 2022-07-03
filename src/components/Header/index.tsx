import Link from "next/link";
import React, { useState } from "react";

import { HeaderContainer, Warnings } from "./styles";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  if (openMenu === true) {
    document.body.classList.add("menu-opened");
  } else {
    document.body.classList.remove("menu-opened");
  }

  const currentUrl = location.pathname;

  return (
    <>
      <HeaderContainer>
        <nav>
          <a href="./" className="logo">
            <img
              src="https://raw.githubusercontent.com/gelzinn/C.A.Mundial/main/src/assets/images/logo-camundial.png"
              alt="C. A. Mundial"
            />
          </a>
          <button
            className={openMenu ? "mobile-menu opened" : "mobile-menu"}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <div />
          </button>
          <ul className={openMenu ? "open" : ""}>
            <Link href="/">Início</Link>
            <Link href="/about-us">Sobre nós</Link>
            <Link href="/memories">Memórias</Link>
            <Link href="/competitions">Avaliações &#38; Competições</Link>
            <Link href="/contact">Contato</Link>
            <Link href="/subscribe">
              <a className="subscribe">Inscrição</a>
            </Link>
          </ul>
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
