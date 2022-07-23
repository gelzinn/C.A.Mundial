import firebase from "firebase/compat/app";
import Link from "next/link";
import {
  CaretDown,
  CaretRight,
  CaretUp,
  Gauge,
  SignOut,
  User,
  UserCircle,
} from "phosphor-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "~/contexts/AuthContext";
import { auth } from "~/services/firebase";

import { HeaderContainer, Warnings } from "./styles";

export default function Header() {
  const { user } = useContext(AuthContext);
  const currentUrl = location.pathname;

  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrolledNavbar, setScrolledNavbar] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const [actualScroll, setActualScroll] = useState<number | null>(null);

  if (openMenu === true) {
    document.body.classList.add("menu-opened");
  } else {
    document.body.classList.remove("menu-opened");
  }

  window.addEventListener("scroll", (event) => {
    setScrollPosition(scrollY);

    if (actualScroll && actualScroll != scrollY) {
      setOpenUserMenu(false);
      setActualScroll(null);
    }
  });

  useEffect(() => {
    if (scrollPosition >= 200) {
      setScrolledNavbar(true);
    } else {
      setScrolledNavbar(false);
    }
  }, [scrollPosition]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid, email } = user;
        // location.reload();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (openUserMenu) {
      setActualScroll(scrollPosition);
    }
  }, [actualScroll, openUserMenu, scrollPosition]);

  async function logOutFirebase() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        alert("Você saiu da conta.");
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    const handler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenUserMenu((openUserMenu) => !openUserMenu);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const ref = useRef(null);

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
              {user ? (
                <>
                  <div className="user">
                    <Link href="/dashboard">
                      <a className="user-icon">
                        <User />
                        <p>Sua Conta</p>
                      </a>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/signin">
                    <a className="signin">Entrar</a>
                  </Link>
                  <Link href="/subscribe">
                    <a className="subscribe">
                      Cadastrar <CaretRight weight="bold" />
                    </a>
                  </Link>
                </>
              )}
            </ul>
          </ul>
          <ul className="account-actions">
            {user ? (
              <>
                <div className="user">
                  {openUserMenu ? (
                    <CaretUp
                      onClick={() =>
                        setOpenUserMenu((openUserMenu) => !openUserMenu)
                      }
                      weight="bold"
                    />
                  ) : (
                    <CaretDown
                      onClick={() =>
                        setOpenUserMenu((openUserMenu) => !openUserMenu)
                      }
                      weight="bold"
                    />
                  )}
                  <Link href="/dashboard">
                    <a className="user-icon">
                      <User />
                    </a>
                  </Link>
                  {openUserMenu && (
                    <ul ref={ref}>
                      <Link href="/dashboard">
                        <li>
                          <Gauge weight="bold" />
                          Painel de Controle
                        </li>
                      </Link>
                      <Link href="/account">
                        <li>
                          <UserCircle weight="bold" />
                          Perfil
                        </li>
                      </Link>
                      <li onClick={logOutFirebase}>
                        <SignOut weight="bold" />
                        Sair
                      </li>
                      <footer>
                        <p>Logado como: {user.email}.</p>
                        <p>Seu ID: {user.id}.</p>
                      </footer>
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <a className="signin">Entrar</a>
                </Link>
                <Link href="/subscribe">
                  <a className="subscribe">
                    Cadastrar <CaretRight weight="bold" />
                  </a>
                </Link>
              </>
            )}
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
