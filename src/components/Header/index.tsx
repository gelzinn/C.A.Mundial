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
            <a href="./">Início</a>
            <a href="./about-us">Sobre nós</a>
            <a href="./memories">Memórias</a>
            <a href="./competitions">Avaliações &#38; Competições</a>
            <a href="./contact">Contato</a>
            <a href="./subscribe" className="subscribe">
              Inscrição
            </a>
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
