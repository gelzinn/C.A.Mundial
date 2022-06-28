/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  AsideDocs,
  DocsContent,
  DocumentationContainer,
  MainDocs,
  PresentationDocs,
} from "~/styles/pages/docs";

export default function Documentation() {
  // location.replace("https://docs.camundial.com.br");
  const [scrollPosition, setPosition] = useState({ scrollX: 0, scrollY: 0 });
  const [viewPresentation, setViewPresentation] = useState(true);

  useEffect(() => {
    if (scrollPosition.scrollY > 1) {
      setViewPresentation(false);
    }

    function updatePosition() {
      setPosition({ scrollX: window.scrollX, scrollY: window.scrollY });
    }

    window.addEventListener("scroll", updatePosition);
    updatePosition();
  }, [scrollPosition.scrollY]);

  return (
    <>
      <Head>
        <title>Serviços de Acordo • C.A.Mundial</title>
        <meta
          name="description"
          content="Organização de eventos esportivos - especializada em futebol - e captação e formação de atletas pelo território brasileiro."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>

      <MainDocs>
        {viewPresentation && (
          <>
            <PresentationDocs>
              <div className="container">
                <p>Bem-vindo aos</p>
                <span>Serviços de Acordo</span>
                <p>
                  da C.A.Mundial, aqui você encontra todos os termos e sobre as
                  políticas contidas em nossos serviços e site.
                </p>
                <a href="#read">Ler sobre</a>
              </div>
              <div className="bg" />
            </PresentationDocs>
          </>
        )}
        <DocumentationContainer id="read">
          <AsideDocs>
            <nav>
              <a href="./" className="logo">
                <img
                  src="https://raw.githubusercontent.com/gelzinn/C.A.Mundial/main/src/assets/images/logo-camundial.png"
                  alt="C. A. Mundial"
                />
              </a>
              <ul>
                <a href="">Política de privacidade</a>
                <a href="">Termos de uso</a>
                <a href="">Acomodação para viajantes</a>
                <a href="">Reembolso e devolução</a>
              </ul>
            </nav>
            <div className="legal-data">
              <p>
                C.A.Mundial Promoção e Organização de Eventos Esportivos
                LTDA-ME. CNPJ: 06.043.445/0001-35
              </p>
              <p>Copyright © 2021. Todos os direitos reservados.</p>
            </div>
          </AsideDocs>
          <DocsContent>
            <h1>POLÍTICA DE PRIVACIDADE</h1>
            <h2>DECLARAÇÃO DA POLÍTICA DE PRIVACIDADE</h2>
            <p>
              Este site é mantido e operado pela{" "}
              <a href=".././">CAMUNDIAL.COM.BR</a>.
            </p>
            <p>
              A <b>política de privacidade e termos de uso</b> se aplicam a
              todos os usuários que acessam nosso website. A privacidade dos
              visitantes do nosso site é muito importante para nós, e estamos
              comprometidos em protegê-la. Coletamos e utilizamos alguns dados
              pessoais pertencentes àqueles usuários que utilizam este website.
              Agimos na qualidade de controlador desses dados de acordo com a
              legislação federal e com as normas internacionais de segurança da
              informação.
            </p>
            <h2>NESTA DECLARAÇÃO CONTÉM INFORMAÇÕES IMPORTANTES SOBRE:</h2>
            <li className="itens">Quem deve utilizar este website</li>
            <li className="itens">
              Quais dados coletamos e o que fazemos com eles
            </li>
            <li className="itens">
              Seus direitos em relação aos seus dados pessoais
            </li>
            <li className="itens">Como entrar em contato conosco</li>
            <p>
              Esta política explica o que faremos com suas informações pessoais
              e visa esclarecer a todos os(as) interessados(as) sobre os tipos
              de dados que coletamos, os motivos da coleta e a forma como os
              usuários deste site podem gerenciar ou excluir suas informações
              pessoais. Os presentes termos foram elaborados em conformidade com
              a Lei Geral de Proteção de Dados pessoais (Lei 13.709/18), o Marco
              Civil da Internet (Lei 12.965/14) e o Regulamento da EU
              (n.2016/6790).
            </p>
            <h2>QUEM DEVE UTILIZAR ESTE SITE</h2>
            <p>
              Nosso website só deve ser utilizado por pessoas com mais de 18
              anos de idade. Isso garante que nenhuma criança se auto inscreva
              sem nenhuma supervisão.
            </p>
            <h2>DADOS QUE COLETAMOS E MOTIVOS DA COLETA</h2>
            <p>
              Nosso site coleta e utiliza alguns dados pessoais dos visitantes e
              usuários da seguinte forma:
            </p>
            <li className="nolist">
              1. Dados pessoais fornecidos expressamente pelo usuário
            </li>
            <p>
              Coletamos os seguintes dados pessoais que os usuários nos fornecem
              ao utilizar nosso site: Nome Completo; RG; CPF; Endereço de
              e-mail; Números de Telefone; Mensagens de contato.
            </p>
            <p>
              A coleta destes dados ocorre nos seguintes momentos: - Quando o
              usuário utiliza o formulário de contato; - Quando o usuário entra
              em contato por meio de aplicativos de mensagens, chats, ligações
              telefônicas, videochamadas ou outra via; - Quando o usuário se
              cadastra para receber avisos; - Quando o usuário solicita uma
              cotação ou contratação de serviço; - Quando o usuário participa de
              estudos, enquetes e pesquisas.
            </p>
            <p>
              Os dados fornecidos por nossos usuários são coletados com as
              seguintes finalidades:
            </p>
            <p>
              - Para orçar ou contratar nossos serviços; - Para entrar em
              contato com nosso atendimento ao cliente; - Para enviar materiais
              informativos e conteúdos educativos; - Para comunicar ofertas,
              anúncios e promoções; - Para que nossos colaboradores possam
              entrar em contato via e-mail, telefone, chat e mensagens de texto
              para fazer pesquisas e/ou apresentar produtos e serviços. - Para
              enviar faturas e lembretes de pagamento; - Para enviar mensagens
              relativas ao suporte ou serviços, como alertas, notificações e
              atualizações; - Para enviar lembretes e notificações de reuniões e
              eventos; - Para todo e qualquer fim que o usuário nos autorizar no
              momento da coleta dos dados; - Para cumprir com nossas obrigações
              legais, regulatórias e fiscais.
            </p>
            <li className="nolist">2. Dados pessoais comportamentais:</li>
            <p>
              Quando o usuário visita o nosso website, é inserido um ‘cookie’ em
              seu navegador por meio do software Google Analytics, para
              identificar quantas vezes visitou o nosso endereço eletrônico,
              quanto tempo permaneceu em nosso website, desde que cidade nos
              acessou e quais páginas leu e recomendou, entre outros.
            </p>
            <p>
              Coletamos os seguintes dados pessoais através de cookies e outras
              formas que os usuários geram e/ou nos fornecem ao utilizar nosso
              site:
            </p>
            <p>
              - Endereço IP; - Dados de geolocalização e localização geográfica;
              - Fonte de referência, tipo e versão de navegador; - Páginas
              visitadas, tempo de duração de cada visita e histórico de visitas
              - Dados contextuais baseados na experiência de navegação, como
              datas e horários de acesso mais frequentes, contagem de cliques em
              links e botões, entre outros.
            </p>
            <p>A coleta destes dados ocorre nos seguintes momentos:</p>
            <p>
              - Quando o usuário visita uma de nossas páginas; - Quando assiste
              um de nossos vídeos; - Quando o usuário utiliza aplicativos de
              mensagens ou chats; - Quando o usuário entra em contato por
              e-mail, telefone ou formulário; - Quando o usuário se cadastra
              para receber avisos; - Quando o usuário clica em links, botões,
              imagens e vídeos; - Quando o usuário participa de enquetes e
              pesquisas online; - Quando o usuário reenvia ou compartilha nossas
              páginas e conteúdos; - Quando o usuário solicita uma cotação ou
              contratação de serviço; - Quando realiza algum tipo de interação
              com nosso site.
            </p>
            <p>
              Os dados gerados e/ou fornecidos por nossos usuários são coletados
              com as seguintes finalidades:
            </p>
            <p>
              - Para garantir a segurança do website; - Para detectar
              comportamento fora do habitual e brechas de segurança; - Para
              rastrear de onde partem possíveis tentativas de invasão; - Para
              cumprir determinação legal de armazenamento de registros de
              acesso, conforme o disposto no art. 15 do Marco Civil da Internet;
              - Para gerar estatísticas de visitação e de interação com nosso
              site; - Para desenvolver novas funcionalidades em nosso website; -
              Para otimizar e aprimorar a navegação, usabilidade e layout do
              site; - Para compreender como os usuários utilizam nosso site e
              ajudar nas pesquisa de novas soluções, cursos, conteúdos, produtos
              e serviços; - Para realizar anúncios e comunicação direcionada aos
              gostos e interesses do usuários; - Para personalizar a experiência
              do usuário que visita nosso site; - Para todo e qualquer fim que o
              usuário nos autorizar no momento da recolha dos dados; - Para
              assegurar a autenticidade das transações feitas no site; - Para
              cumprir com nossas obrigações legais e regulatórias.
            </p>
            <li className="nolist">3. Dados pessoais sensíveis:</li>
            <p>
              Não coletamos dados sensíveis de nossos usuários, assim entendidos
              aqueles definidos nos arts. 11 e seguintes da Lei Geral da
              Proteção de Dados Pessoais.
            </p>
            <li className="nolist">4. Dados de crianças e adolescentes:</li>
            <p>
              Coletamos os seguintes dados de crianças e adolescentes que os
              usuários nos fornecem ao utilizar nosso site:
            </p>
            <p>
              Exemplos: - Nome Completo; - RG; - CPF; - Endereço de e-mail; -
              Números de Telefone; - Mensagens de contato.
            </p>
            <li className="nolist">5. Cookies:</li>
            <p>
              Cookies são pequenos arquivos de texto baixados automaticamente em
              seu dispositivo quando você acessa e navega por um site. Eles
              servem, para que seja possível identificar dispositivos,
              atividades e preferências de usuários.
            </p>
            <p>
              Os cookies não permitem que qualquer arquivo ou informação sejam
              extraídos do disco rígido do usuário. Não sendo possível que, por
              meio dos cookies, se tenha acesso a informações pessoais que não
              tenham partido do usuário ou da forma como utiliza os recursos e
              funcionalidades do site.
            </p>
            <p>
              A desativação dos cookies que podem ser desabilitados poderá
              prejudicar a experiência do usuário, uma vez que informações
              utilizadas para personalizá-la deixarão de ser utilizadas.
            </p>
            <li className="nolist letters">a) Cookies do Site</li>
            <p>
              Os cookies do site são aqueles enviados ao computador ou
              dispositivo do usuário, exclusivamente pelo website. As
              informações coletadas por meio destes cookies são utilizadas para
              melhorar e personalizar a experiência do usuário, sendo que alguns
              cookies podem, por exemplo, ser utilizados para lembrar as
              preferências e escolhas do usuário, bem como para o oferecimento
              de conteúdo personalizado.
            </p>
            <li className="nolist letters">b) Cookies de Terceiros</li>
            <p>Não são usados quaisquer cookies de terceiros.</p>
            <li className="nolist letters">c) Gestão de Cookies</li>
            <p>
              O usuário poderá se opor ao registro de cookies pelo site,
              bastando que desative esta opção no seu próprio navegador. Mais
              informação sobre como fazer isso emalguns dos principais
              navegadores utilizados hoje podem ser acessados a partir dos
              seguintes links:
            </p>
            <li className="itens noupper">
              <a href="https://support.microsoft.com/pt-br/topic/excluir-e-gerenciar-cookies-168dab11-0753-043d-7c16-ede5947fc64d">
                Internet Explorer
              </a>
            </li>
            <li className="itens noupper">
              <a href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac">
                Safari
              </a>
            </li>
            <li className="itens noupper">
              <a href="https://support.google.com/chrome/answer/95647">
                Google Chrome
              </a>
            </li>
            <li className="itens noupper">
              <a href="https://support.mozilla.org/pt-BR/kb/cookies-informacoes-sites-armazenam-no-computador#w_configuracoes-de-cookies">
                Mozila Firefox
              </a>
            </li>
            <li className="itens noupper">
              <a href="https://www.opera.com/pt/secure-private-browser">
                Opera
              </a>
            </li>
            <p id="obs">
              <i id="arrow" className="fas fa-level-up-alt"></i>Obs.: Apenas
              clique no nome do navegador.
            </p>
            <p>
              O usuário também poderá se opor à utilização de cookies pelo
              próprio site, bastando que os desative no momento em que começar a
              utilizar o site pela primeira vez, clicando no aviso de cookies e
              depois desativando esta opção no seu navegador, para se assegurar
              de que o registro de cookies foi desativado.
            </p>
            <p>
              Assim que entrar no site pela primeira vez, o usuário terá a opção
              de bloquear ou de permitir a utilização de cookies, bastando que
              selecione a opção correspondente na caixa de diálogo (aviso de
              cookies) carregada automaticamente assim que nossa página é
              acessada.
            </p>
            <p>
              A desativação dos cookies, no entanto, pode afetar a
              disponibilidade de algumas ferramentas e funcionalidades do site,
              comprometendo seu correto e esperado funcionamento. Outra
              consequência possível é a remoção das preferências do usuário que
              eventualmente tiverem sido salvas, prejudicando sua experiência de
              navegação.
            </p>
            <p>
              A desativação de todos os cookies, no entanto, não será possível,
              uma vez que alguns deles são essenciais para que o site funcione
              corretamente.
            </p>
            <h2>COMPARTILHAMENTO DE DADOS COM TERCEIROS</h2>
            <p>
              Não compartilhamos seus dados além/fora de nossos
              sistemas/servidores.
            </p>
            <h2>POR QUANTO TEMPO SEUS DADOS PESSOAIS SÃO ARMAZENADOS</h2>
            <p>
              Os dados pessoais coletados através do site são armazenados e
              utilizados pelo período de tempo que for necessário para atingir
              as finalidades elencadas neste documento e que considere os
              direitos de seus titulares, os direitos do controlador do site e
              as disposições legais ou regulatórias aplicáveis.
            </p>
            <p>
              O tempo mínimo de armazenamento é de 6 meses para dados
              comportamentais, segundo o Art. 15 do Marco Civil da Internet e de
              5 anos após o término da relação com o usuário para dados
              cadastrais, segundo o Art. 27 do Código de Defesa do Consumidor.
            </p>
            <p>
              Uma vez expirados os períodos de armazenamento dos dados pessoais,
              eles podem vir a ser removidos de nossas bases de dados ou
              anonimizados, salvo nos casos em que houver a possibilidade e/ou a
              necessidade de armazenamento em virtude de disposição legal ou
              regulatória.
            </p>
            <p>
              Caso haja solicitação do Usuário, os dados poderão ser apagados
              antes desse prazo. No entanto, pode ocorrer de os dados precisarem
              ser mantidos por período superior, por motivo de lei, ordem
              judicial, prevenção à fraude (art. 11, II, “a” da Lei Geral de
              Proteção de Dados “LGPD”, Lei nº 13.709/2018), proteção ao crédito
              (art. 7º, X, LGPD) e outros interesses legítimos, em conformidade
              com o artigo 10 da LGPD. Findo o prazo e a necessidade legal,
              serão excluídos com uso de métodos de descarte seguro, ou
              utilizados de forma anonimizada para fins estatísticos.
            </p>
            <p>
              Ressaltamos que os dados poderão continuar armazenados se houver
              alguma justificativa legal ou regulatória, ainda que tenha se
              exaurido a finalidade para a qual os dados tenham sido coletados
              e/ou tratados.
            </p>
            <p>
              Os dados são armazenados de forma contínua enquanto o usuário
              tiver uma conta ativa em nosso site e/ou continuar utilizando,
              navegando, interagindo, comunicando-se e mantendo algum tipo de
              relação ou contato conosco. Uma vez finalizado o tratamento e/ou a
              relação com o usuário, observadas as disposições desta seção, os
              dados são apagados ou anonimizados.
            </p>
            <h2>TERMOS DE USO</h2>
            <h3>DECLARAÇÃO DOS TERMOS DE USO</h3>
            <p>
              Na declaração dos <b>termos de uso</b> a seguir, estão descritas
              as regras que um usuário do site{" "}
              <a href=".././">CAMUNDIAL.COM.BR</a> concorda em respeitar para
              usar os serviços do mesmo.
            </p>
            <h3>DO SITE CAMUNDIAL.COM.BR</h3>
            <p>
              O site poderá apresentar links, tais como hyperlinks ou botões,
              direcionando o acesso a websites de terceiros. Esses sites
              mencionados/marcados não são controlados ou monitorados pela{" "}
              <a href=".././">CAMUNDIAL.COM.BR</a>.
            </p>
            <p id="glossario">
              Glossário: Hiperlink - “Uma hiperligação, ou simplesmente uma
              ligação (em inglês, hyperlink e link), é uma referência dentro de
              um documento em hipertexto a outras partes desse documento ou a
              outro documento. Um programa informático utilizado para visualizar
              e criar esse documento chama-se um sistema de hipertexto,
              normalmente um usuário pode criar uma hiperligação ou simplesmente
              uma ligação. Um usuário que siga as ligações está a navegar o
              hipertexto ou a navegar a web.”
            </p>
            <p id="fonte">
              - Fonte:{" "}
              <a href="https://pt.wikipedia.org/wiki/Hiperliga%C3%A7%C3%A3o">
                https://pt.wikipedia.org/wiki/Hiperligação
              </a>
            </p>
            <p id="obs">
              <i id="arrow" className="fas fa-level-up-alt"></i>Obs.: A{" "}
              <a href=".././">CAMUNDIAL.COM.BR</a> nunca irá te direcionar a
              websites perigosos ou duvidosos.
            </p>
            <h2>EVENTOS CAMUNDIAL.COM.BR</h2>
            <p>
              Para participar de nossos eventos, Avaliações e Competições, o
              atleta deverá estar devidamente inscrito nos formulários. Caso
              verificarmos os dados, e estarem preenchidos de forma incorreta, o
              atleta será auto desclassificado.
            </p>
            <p>
              Nos formulários são solicitadas as informações do atleta e de seu
              devido responsável. Por favor preencha seus dados corretamente
              para um fácil e melhor funcionamento, sem complicações.
            </p>
            <p>
              Ao se inscrever em algum evento{" "}
              <a href=".././">CAMUNDIAL.COM.BR</a>, seja qual for, você concorda
              que esta inscrição somente será válida após o pagamento e a
              confirmação do mesmo.
            </p>
            <h3>ACOMODAÇÃO PARA VIAJANTES</h3>
            <p>
              Na necessidade de viagem até o local do evento, temos uma parceria
              que disponibiliza Hotel e Restaurante para os participantes. Não
              há necessidade da hospedagem se o participante é da região, ainda
              assim, são disponibilizados da mesma maneira.
            </p>
            <h3>REEMBOLSO & DEVOLUÇÃO</h3>
            <p>
              O reembolso e a devolução do valor, somente será válida caso não
              possa comparecer no evento. Quaisquer outras circunstâncias, o
              reembolso não é válido e não será confirmado. A{" "}
              <a href=".././">CAMUNDIAL.COM.BR</a> é uma empresa que busca ser
              parceira de todos. Prezamos pelo compromisso e a lealdade.
            </p>
            <h3>COMO ENTRAR EM CONTATO</h3>
            <li className="itens noupper">
              <i id="icones-contato" className="fas fa-envelope"></i>Email:{" "}
              <a href="mailto:contato@camundial.com.br">
                contato@camundial.com.br
              </a>
            </li>
            <li className="itens noupper">
              <i id="icones-contato" className="fas fa-phone-alt"></i>Telefone -
              <i id="icones-contato" className="fab fa-whatsapp"></i>WhatsApp:{" "}
              <a href="tel:+5514991028512">
                +55 14 99102-8512 - Marcelo Domingos
              </a>
            </li>
            <li className="itens noupper">
              <i id="icones-contato" className="fas fa-map-marker-alt"></i>
              Endereço: <a>Rua Aquidaban, 605. Mineiros do Tietê - SP</a>
            </li>
            <h3>ALTERAÇÃO DOS SERVIÇOS DE ACORDO</h3>
            <p>
              A presente versão desta Política de Privacidade foi atualizada
              pela última vez em: 29-01-2021.
            </p>
            <p>
              Nos reservamos o direito de modificar a política de privacidade a
              qualquer momento, especialmente para adaptá-las às alterações
              feitas em nosso site, seja pela disponibilização de novas
              funcionalidades, seja pelo cancelamento ou modificação daquelas já
              existentes.
            </p>
            <p>
              Sempre que houver uma modificação, nossos usuários serão
              notificados sobre a mudança.
            </p>
          </DocsContent>
        </DocumentationContainer>
      </MainDocs>
    </>
  );
}
