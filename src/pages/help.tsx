import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { HelpContainer, HelpTitle } from "~/styles/pages/help";
import { CaretRight, ChatsCircle, MagnifyingGlass } from "phosphor-react";
import Link from "next/link";

export default function HelpCenter() {
  return (
    <>
      <Head>
        <title>Central de Ajuda • C.A.Mundial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />
      <main>
        <HelpTitle>
          <h1>Central de Ajuda</h1>
          <p>
            Aqui você pode compreender melhor como tudo relacionado a
            C.A.Mundial funciona.
          </p>
        </HelpTitle>
        <HelpContainer>
          <div className="questions-and-topics">
            <div className="help-content">
              <header>
                <h1>Perguntas frequentes</h1>
                <div className="input disabled">
                  <MagnifyingGlass weight="bold" />
                  <input
                    autoComplete="off"
                    spellCheck="false"
                    aria-invalid="false"
                    name="q"
                    placeholder="Buscar tópicos de ajuda..."
                    type="search"
                    disabled
                  />
                </div>
              </header>
              <p id="about-info">
                As perguntas mais frequentes sobre a C.A.Mundial e seus
                serviços.
              </p>
              <div className="questions">
                <ul>
                  <span id="first-steps">Primeiros passos</span>
                  <ul>
                    <li>
                      <span>Como começar na C.A.Mundial?</span>
                      <p>
                        Existem duas maneiras de utilizar os nossos serviços:
                        <p>
                          <b>Como organização/equipe:</b> caso você seja o
                          presidente ou diretor responsável, representante de
                          sua ou alguma equipe ou organização de futebol, é
                          possível se inscrever e participar de nossos eventos.
                        </p>
                        <p>
                          <b>Como usuário:</b> caso você não tenha nenhuma
                          relação com qualquer equipe ou organização, é possível
                          ainda assim acompanhar os eventos, vendo os
                          resultados, estatísticas e tabelas do mesmo na página
                          de cada um.
                        </p>
                      </p>
                    </li>
                    <li>
                      <span>
                        Existe algum custo para participar e se inscrever em
                        eventos?
                      </span>
                      <p>
                        No momento em que você, seu representante, ou
                        presidente, se inscrever em quaisquer evento realizado e
                        organizado pela C.A.Mundial, previamente à confirmação e
                        para que a inscrição seja concluída com êxito, haverá um
                        redirecionamento para realização de um pagamento.
                      </p>
                      <p>
                        O valor estará escrito em destaque na página para fazer
                        da conferência algo simples e prático, assim evitando
                        mal-entendidos.
                      </p>
                    </li>
                  </ul>
                  <span id="my-account">Contas</span>
                  <ul>
                    <li>
                      <span>Posso gerenciar minha conta?</span>
                      <p>
                        Qualquer dado inserido pode ser alterado ou até mesmo
                        excluído - tenha certeza ao realizar alguma ação dessa,
                        ao serem confirmadas, os dados não poderão ser
                        recuperados.
                      </p>
                      <p>
                        Dados sigilosos, comprometedores e pessoais para que
                        sejam alterados, é necessário que o proprietário da
                        conta faça uma requisição no{" "}
                        <a href="https://app.camundial.com.br/">
                          painel de controle
                        </a>
                        .
                      </p>
                      <p>
                        Após analisada, caso aprovada por algum administrador da
                        plataforma, os dados estarão liberados por tempo
                        limitado para o usuário, assim podendo efetuar as
                        mudanças necessárias.
                      </p>
                      <span>Onde gerencio minha conta?</span>
                      <p>
                        Você pode gerenciar sua conta C.A.Mundial diretamente no{" "}
                        <a href="https://app.camundial.com.br/">
                          painel de controle
                        </a>
                        .
                      </p>
                    </li>
                    <li>
                      <span>Esqueci minha senha, e agora?</span>
                      <p>
                        Mesmo ainda não tendo uma forma mais simples e,
                        consequentemente mais eficiente, para recuperação,
                        podemos resolver com você. Não se preocupe.
                      </p>
                      <p>
                        Entre em{" "}
                        <Link href="/contact">contato com o suporte</Link>.
                        Faremos o possível para ajudá-lo em relação a
                        recuperação de sua conta.
                      </p>
                    </li>
                  </ul>
                  <span id="signup">Cadastro</span>
                  <ul>
                    <li>
                      <span>Como funciona o cadastro?</span>
                      <p>
                        Antes de tudo, lembre-se previamente de que:{" "}
                        <u>
                          apenas serão aceitos cadastros de diretores ou
                          representantes de equipes ou organizações em nossa
                          plataforma
                        </u>
                        . Tendo essas informações em mente e estando ciente do
                        que foi dito anteriormente, vamos começar:
                        <p>
                          Acesse a página de{" "}
                          <Link href="/subscribe">cadastro</Link> da
                          C.A.Mundial. Será obrigatória a inserção de
                          informações importantes, como CNPJ da equipe, RG e CPF
                          do presidente ou diretor responsável e endereços, além
                          de outros dados não tão sigilosos, como nome e logo da
                          equipe.
                        </p>
                      </p>
                    </li>
                    <li>
                      <span>
                        Será necessário se recadastrar após o fim de cada
                        evento?
                      </span>
                      <p>
                        Uma equipe ou organização uma vez inscrita, pode
                        permanecer o tempo que quiser no sistema da C.A.Mundial,
                        assim facilitando a particapação em diversos eventos.
                      </p>
                      <p>
                        A permanência de dados não será uma opção e a exclusão
                        dos mesmos pelo painel de controle será desativada
                        apenas durante a participação da equipe em algum evento.
                      </p>
                    </li>
                  </ul>
                  <span id="subscription">Inscrição em eventos</span>
                  <ul>
                    <li>
                      <span>
                        Como me inscrever ou inscrever minha equipe em algum
                        evento?
                      </span>
                      <p>
                        Essa é a parte mais simples, basta seguir o passo a
                        passo abaixo, os requisitos e as regras do evento.
                      </p>
                      <p>
                        Vá até a página de <Link href="/events">eventos</Link> e
                        procure o evento que deseja participar. Após
                        localizá-lo, clique sobre o botão ou nome do evento.
                      </p>
                      <p>
                        Dentro da página do evento, estarão descritas todas as
                        regras e informações referentes a ele. Um pouco abaixo,
                        haverá uma seção amarela, onde será possível a
                        realização da inscrição neste evento.
                      </p>
                    </li>
                    <li>
                      <span>
                        Posso me inscrever estar relacionado a alguma equipe?
                      </span>
                      <p>
                        Infelizmente, nos eventos organizados pela C.A.Mundial,
                        ainda não é possível que um atleta se inscreva sem estar
                        incluso em alguma equipe, organização ou escola de
                        futebol.
                      </p>
                    </li>
                  </ul>
                  <span id="my-team">Minha equipe</span>
                  <ul>
                    <li>
                      <span>
                        Já cadastrei minha equipe, como inscrevo jogadores e a
                        comissão técnica?
                      </span>
                      <p>
                        Incrível que está conosco! A C.A.Mundial agradece muito
                        a sua preferência. Após cadastrado, acesse o{" "}
                        <a href="https://app.camundial.com.br/">
                          painel de controle
                        </a>{" "}
                        para efetuar estas ações.
                      </p>
                    </li>
                  </ul>
                  <span id="sponsors">Patrocínio</span>
                  <ul>
                    <li>
                      <span>Onde vejos os patrocinadores atuais?</span>
                      <p>
                        Você pode conferir todos nossos parceiros na{" "}
                        <Link href="/">página inicial</Link> do site, logo após
                        o <i>banner</i>.
                      </p>
                    </li>
                    <li>
                      <span>
                        Gostei dos eventos, quero me tornar um patrocinador.
                        Como faço?
                      </span>
                      <p>
                        Entre em{" "}
                        <Link href="/contact">contato com o suporte</Link> e nos
                        assustos selecione &quot;Patrocínio&quot;. Lá você pode
                        nos descrever a situação e nós iremos entrar num acordo.
                      </p>
                    </li>
                  </ul>
                  <span id="privacy">Privacidade</span>
                  <ul>
                    <li>
                      <span>Meus dados estão seguros?</span>
                      <p>
                        Todas as suas informações contém criptografias de ponta
                        a ponta. Não se preocupe.
                      </p>
                      <p>
                        Você pode conferir exatamente como tratamos seus dados
                        dando uma olhada na nossa{" "}
                        <a href="https://docs.camundial.com.br/">
                          política de privacidade
                        </a>
                        .
                      </p>
                    </li>
                  </ul>
                  <span id="refund">Reembolso</span>
                  <ul>
                    <li>
                      <span>Quero reembolso, como solicito?</span>
                      <p>
                        Um cliente somente estará apto ao reembolso somente caso
                        não possa comparecer no evento. Quaisquer outras
                        circunstâncias, o reembolso não é válido e não será
                        confirmado.
                      </p>
                      <p>
                        A C.A.Mundial é uma empresa que busca ser parceira de
                        todos. Prezamos pelo compromisso e a lealdade. Não use
                        esta solicitação de má-fé.
                      </p>
                      <p>
                        Você pode conferir exatamente como nossa política de
                        reembolso e trocas funciona, dando uma olhada na nossa{" "}
                        <a href="https://docs.camundial.com.br/">
                          política de privacidade
                        </a>
                        .
                      </p>
                    </li>
                  </ul>
                </ul>
              </div>
            </div>
            <aside className="help-side">
              <div>
                <div className="info">
                  <span>Fale com o suporte</span>
                  <p>
                    Qualquer dúvida que não esteja prevista e descrita aqui,
                    você pode nos contatar.
                  </p>
                  <p>Normalmente o tempo de resposta é de até um dia útil.</p>
                </div>
              </div>
              <div>
                <div className="info">
                  <span>SAC - Suporte ao cliente</span>
                  <p>
                    Não resolveu o problema por <i>chat</i>? Você pode nos
                    ligar.
                  </p>
                  <p>
                    Estamos disponíveis durante os dias úteis, das 13 às 20
                    horas - Horário de Brasília.
                  </p>
                </div>
              </div>
              <div id="topics">
                <span>Assuntos relevantes</span>
                <ul>
                  <Link href="/help#first-steps">Primeiros passos</Link>
                  <Link href="/help#my-account">Conta</Link>
                  <Link href="/help#signup">Cadastro</Link>
                  <Link href="/help#subscription">Inscrição em eventos</Link>
                  <Link href="/help#my-team">Minha equipe</Link>
                  <Link href="/help#sponsors">Patrocínio</Link>
                  <Link href="/help#privacy">Privacidade</Link>
                  <Link href="/help#refund">Reembolso</Link>
                </ul>
              </div>
            </aside>
          </div>
          <div className="still-have-doubts">
            <span>Continua com dúvidas?</span>
            <p>
              Sem problemas. Entre em contato com o nosso suporte e nos explique
              detalhadamente a dúvida ou sobre o problema que você está passando
              com os nossos serviços. O tempo de resposta é de até um dia útil.
            </p>
            <button>
              Entrar em contato <CaretRight weight="bold" />
            </button>
            <div className="bg">
              <ChatsCircle weight="light" />
            </div>
          </div>
        </HelpContainer>
      </main>
      <Footer />
    </>
  );
}
