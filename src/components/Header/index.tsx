/* eslint-disable @next/next/no-img-element */
import React from "react";

import { HeaderContainer, Warnings } from "./styles";

export default function Header() {
  return (
    <>
      <HeaderContainer>
        <nav>
          <a href="./" className="logo">
            <img
              src="https://raw.githubusercontent.com/gelzinn/C.A.Mundial/main/assets/images/logo-camundial.png"
              alt="C. A. Mundial"
            />
          </a>
          <ul>
            <a href="./">Início</a>
            <a href="./">Sobre nós</a>
            <a href="./">Momentos</a>
            <ul className="dropdown">
              <a>Avaliações &#38; Competições</a>
            </ul>
            <a href="./">Contato</a>
            <a href="./" className="subscribe">
              Inscrição
            </a>
          </ul>
        </nav>
      </HeaderContainer>
      <Warnings>
        <p>
          Novo site da C.A. Mundial para você acompanhar o Centro de Captação de
          Atletas de Futebol de Base.
        </p>
      </Warnings>
    </>
  );
}
