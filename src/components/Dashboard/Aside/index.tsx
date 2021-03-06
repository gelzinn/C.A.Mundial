import firebase from "firebase/compat/app";
import Link from "next/link";
import router from "next/router";
import {
  ArrowLeft,
  CalendarPlus,
  ChartLineUp,
  CircleWavyWarning,
  ClockClockwise,
  CurrencyCircleDollar,
  Gauge,
  Info,
  Receipt,
  Scroll,
  Shield,
  ShieldCheck,
  SignOut,
  SoccerBall,
  User,
  Users,
  Warning,
} from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import LoadingCircle from "~/components/LoadingCircle";
import AuthContext from "~/contexts/AuthContext";
import { UserInfo } from "~/models/importUserInfo";
import { auth, db } from "~/services/firebase";
import { AsideContainer, LinksContainer } from "./styles";

export default function Aside() {
  const { user } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState<UserInfo | any>([]);
  const [openMenu, setOpenMenu] = useState(false);

  if (window.innerWidth < 768) {
    if (openMenu === true) {
      document.body.classList.add("menu-opened");
    }
    if (openMenu === false) {
      document.body.classList.remove("menu-opened");
    }
  } else {
    document.body.classList.remove("menu-opened");
  }

  window.addEventListener("resize", () => {
    if (
      document.body.classList.contains("menu-opened") &&
      window.innerWidth > 768
    ) {
      document.body.classList.remove("menu-opened");
      setOpenMenu(false);
    }
  });

  async function logOutFirebase() {
    if (confirm("Você tem certeza que deseja sair?")) {
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
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid, email } = user;
      } else {
        router.push("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.id)
        .get()
        .then((response) => {
          setUserInfo(response.data());
        });
    }
  }, [user]);

  return (
    <AsideContainer className={openMenu && "opened"}>
      <Link href="/">
        <div className="logo">
          <ArrowLeft />
          <img
            src="../../assets/images/logo-camundial.png"
            alt="C. A. Mundial"
          />
        </div>
      </Link>
      <nav className={openMenu ? "opened" : ""}>
        <LinksContainer>
          {userInfo ? (
            <>
              {userInfo.admin ? (
                <>
                  <div>
                    <span>Geral</span>
                    <ul>
                      <Link href="/dashboard">
                        <li
                          className={`${
                            location.pathname === "/dashboard" ? "active" : ""
                          }`}
                        >
                          <Gauge />
                          <p>Painel de controle</p>
                        </li>
                      </Link>
                      <li
                        className={`${
                          location.pathname === "/dashboard/stats"
                            ? "active"
                            : ""
                        } soon`}
                      >
                        <ChartLineUp />
                        <p>Estatísticas</p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span>Eventos</span>
                    <ul>
                      <Link href="/dashboard/events">
                        <li
                          className={`${
                            location.pathname === "/dashboard/events"
                              ? "active"
                              : ""
                          }`}
                        >
                          <SoccerBall />
                          <p>Todos eventos</p>
                        </li>
                      </Link>
                      <Link href="/dashboard/event/create">
                        <li
                          className={`${
                            location.pathname === "/dashboard/event/create"
                              ? "active"
                              : ""
                          }`}
                        >
                          <CalendarPlus />
                          <p>Novo evento</p>
                        </li>
                      </Link>
                      <Link href="/dashboard/event/highlight">
                        <li
                          className={`${
                            location.pathname === "/dashboard/event/highlight"
                              ? "active"
                              : ""
                          }`}
                        >
                          <ClockClockwise />
                          <p>Destacar evento</p>
                        </li>
                      </Link>
                      <li
                        className={`${
                          location.pathname === "/dashboard/event/rules"
                            ? "active"
                            : ""
                        } soon`}
                      >
                        <Scroll />
                        <p>Regulamento geral</p>
                      </li>
                      <li
                        className={`${
                          location.pathname === "/dashboard/event/rules"
                            ? "active"
                            : ""
                        } soon`}
                      >
                        <CircleWavyWarning />
                        <p>Informativo</p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span>Equipes</span>
                    <ul>
                      <Link href="/dashboard/teams">
                        <li
                          className={`${
                            location.pathname === "/dashboard/teams"
                              ? "active"
                              : ""
                          }`}
                        >
                          <Shield />
                          <p>Todas equipes</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                  <div>
                    <span>Finanças</span>
                    <ul>
                      <Link href="/dashboard/sponsors">
                        <li
                          className={`${
                            location.pathname === "/dashboard/sponsors"
                              ? "active"
                              : ""
                          } new`}
                        >
                          <CurrencyCircleDollar />
                          <p>Patrocinadores</p>
                        </li>
                      </Link>
                      <li
                        className={`${
                          location.pathname === "/dashboard/receipt"
                            ? "active"
                            : ""
                        } soon`}
                      >
                        <Receipt />
                        <p>Receita</p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span>Sistema</span>
                    <ul>
                      <Link href="/dashboard/users">
                        <li
                          className={`${
                            location.pathname === "/dashboard/users"
                              ? "active"
                              : ""
                          }`}
                        >
                          <Users />
                          <p>Usuários</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                  <div>
                    <span>Suporte</span>
                    <ul>
                      <li
                        className={`${
                          location.pathname === "/dashboard/help"
                            ? "active"
                            : ""
                        } soon`}
                      >
                        <Info />
                        <p>Dúvidas</p>
                      </li>
                      <li
                        className={`${
                          location.pathname === "/dashboard/report"
                            ? "active"
                            : ""
                        } soon`}
                      >
                        <Warning />
                        <p>Reportar</p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span>Conta</span>
                    <ul>
                      <Link href="/dashboard/profile">
                        <li
                          className={`${
                            location.pathname === "/dashboard/profile"
                              ? "active"
                              : ""
                          }`}
                        >
                          <User />
                          <p>Minha conta</p>
                        </li>
                      </Link>
                      <li onClick={() => logOutFirebase()}>
                        <SignOut />
                        <p>Sair</p>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span>Geral</span>
                    <ul>
                      <Link href="/dashboard">
                        <li
                          className={`${
                            location.pathname === "/dashboard" ? "active" : ""
                          }`}
                        >
                          <Gauge />
                          <p>Painel de controle</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                  <div>
                    <span>Eventos</span>
                    <ul>
                      <Link href="/dashboard/events">
                        <li
                          className={`${
                            location.pathname === "/dashboard/events"
                              ? "active"
                              : ""
                          }`}
                        >
                          <SoccerBall />
                          <p>Todos eventos</p>
                        </li>
                      </Link>
                      <li
                        className={`${
                          location.pathname === "/dashboard/event/rules"
                            ? "active"
                            : ""
                        } soon`}
                      >
                        <Scroll />
                        <p>Regulamento geral</p>
                      </li>
                      <li
                        className={`${
                          location.pathname === "/dashboard/event/rules"
                            ? "active"
                            : ""
                        } soon`}
                      >
                        <CircleWavyWarning />
                        <p>Informativo</p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span>Equipes</span>
                    <ul>
                      <li
                        className={`${
                          location.pathname === "/dashboard/team"
                            ? "active"
                            : ""
                        } soon`}
                      >
                        <ShieldCheck />
                        <p>Minha equipe</p>
                      </li>
                      <Link href="/dashboard/teams">
                        <li
                          className={`${
                            location.pathname === "/dashboard/teams"
                              ? "active"
                              : ""
                          }`}
                        >
                          <Shield />
                          <p>Todas equipes</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                  <div>
                    <span>Suporte</span>
                    <ul>
                      <li
                        className={`${
                          location.pathname === "/dashboard/help"
                            ? "active"
                            : ""
                        } soon`}
                      >
                        <Info />
                        <p>Dúvidas</p>
                      </li>
                      <li
                        className={`${
                          location.pathname === "/dashboard/report"
                            ? "active"
                            : ""
                        } soon`}
                      >
                        <Warning />
                        <p>Reportar</p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span>Conta</span>
                    <ul>
                      <Link href="/dashboard/profile">
                        <li
                          className={`${
                            location.pathname === "/dashboard/profile"
                              ? "active"
                              : ""
                          }`}
                        >
                          <User />
                          <p>Minha conta</p>
                        </li>
                      </Link>
                      <li onClick={() => logOutFirebase()}>
                        <SignOut />
                        <p>Sair</p>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="loading">
              <LoadingCircle />
            </div>
          )}
        </LinksContainer>
      </nav>
      <button
        className={openMenu ? "mobile-menu opened" : "mobile-menu"}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <div />
      </button>
    </AsideContainer>
  );
}
