import { compileMDX } from "next-mdx-remote/rsc";

export default async function RemoteMdxPage() {
  const { content, frontmatter } = await compileMDX<{
    title: string;
    description: string;
    keywords: string;
  }>({
    source: `---
title: 'Fotos de Festa: Como Não Perder Nenhum Ângulo do Seu Evento Inesquecível'
description: 'Descubra como garantir que todos os momentos especiais da sua festa sejam registrados, aproveitando os olhares únicos dos seus convidados. Dicas para criar um acervo completo e divertido das suas celebrações.'
keywords: ['fotos de festa', 'fotos de convidados', 'álbum colaborativo', 'registrar momentos', 'dicas de fotografia de festa', 'evento inesquecível', 'compartilhar fotos']
---

Quem organiza uma festa sabe: o dia passa voando! Entre cumprimentar os convidados, curtir a música e aproveitar cada segundo, muitos detalhes preciosos podem escapar das lentes do fotógrafo principal ou até mesmo do seu próprio celular. Mas e se houvesse uma forma de capturar *todos* os ângulos, *todas* as risadas espontâneas e *todos* aqueles momentos únicos que só quem está vivendo a festa de perto consegue registrar?

{/* [imagem: Foto vibrante de um grupo de amigos rindo e tirando uma selfie em uma festa bem iluminada, com decoração festiva ao fundo.] */}
<div style={{textAlign: 'center', margin: '20px 0', fontStyle: 'italic', color: '#555'}}>
  [Placeholder: Imagem de amigos tirando selfie em festa]
</div>

## A Magia das Fotos de Convidados: Um Olhar Único Sobre a Sua Festa

Contratar um fotógrafo profissional é essencial para garantir registros de alta qualidade dos momentos-chave. No entanto, há uma magia especial nas fotos tiradas pelos próprios convidados. São eles que capturam:

*   **A espontaneidade:** Aquela piada interna que arrancou gargalhadas.
*   **Os detalhes:** A decoração vista de perto, o drink especial, a interação na pista de dança.
*   **Diferentes perspectivas:** A visão da mesa dos amigos, o flagra da tia emocionada, a selfie divertida da turma.

Essas fotos complementam o trabalho profissional, contando a história da sua festa de uma forma muito mais completa, pessoal e divertida. O desafio? Reunir tudo isso depois!

## O Desafio Pós-Festa: Caçando Fotos em Redes Sociais e Grupos

Acabou a festa, a alegria continua, mas começa a saga: pedir fotos para um e outro, procurar em grupos de WhatsApp, vasculhar hashtags em redes sociais... É um processo cansativo e, muitas vezes, incompleto. Muitas fotos incríveis acabam se perdendo ou nunca chegam até você, o anfitrião.

{/* [imagem: Ilustração ou foto mostrando várias telas de celular com diferentes redes sociais e apps de mensagem, simbolizando a dificuldade de reunir fotos dispersas.] */}
<div style={{textAlign: 'center', margin: '20px 0', fontStyle: 'italic', color: '#555'}}>
  [Placeholder: Imagem simbolizando dificuldade de reunir fotos dispersas]
</div>

## Como Incentivar Seus Convidados a Serem Fotógrafos por um Dia?

A chave é facilitar e engajar! Seus convidados adoram registrar momentos, mas precisam de um empurrãozinho e, principalmente, de um local centralizado e fácil para compartilhar essas memórias *durante* o evento. Pense em maneiras de:

1.  **Comunicar a Ideia:** Já no convite ou no início da festa, incentive os convidados a tirarem fotos e compartilharem seus olhares.
2.  **Criar um Ponto Central:** Facilite ao máximo! Imagine um espaço onde todos possam adicionar suas fotos em tempo real, criando um mosaico vivo da festa. Isso evita o esquecimento e a dispersão pós-evento.
3.  **Tornar Divertido:** Crie uma hashtag divertida, promova mini-competições de fotos (a mais engraçada, a mais artística), ou simplesmente mostre o quão valioso é o registro de cada um.

## O Resultado: Um Álbum Completo e Cheio de Afeto

Ao facilitar o compartilhamento das fotos *durante* a festa, você não só evita a dor de cabeça de coletá-las depois, mas também cria uma experiência mais interativa para os convidados. O resultado final é um tesouro: um álbum de fotos verdadeiramente completo, que mistura o olhar profissional com a visão afetiva e espontânea de cada amigo e familiar presente. É a história da sua festa contada por todos que a viveram.

{/* [imagem: Mosaico de fotos variadas de uma festa – selfies, fotos de detalhes, grupos rindo, pista de dança – transmitindo a ideia de um álbum colaborativo completo.] */}
<div style={{textAlign: 'center', margin: '20px 0', fontStyle: 'italic', color: '#555'}}>
  [Placeholder: Mosaico de fotos variadas de festa]
</div>

Não deixe que momentos preciosos se percam. Pense em como você pode reunir todos esses olhares e criar um acervo inesquecível da sua próxima celebração!
`,
    options: { parseFrontmatter: true },
  });
  return (
    <article className="mx-auto prose prose-invert prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.description}</p>
      <p className="sr-only">{frontmatter.keywords}</p>
      {content}
    </article>
  );
}
