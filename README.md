# Site Ilustrar — versão 3

Esta versão preserva o layout aprovado e altera somente a hero/carrossel.

## O que mudou

- Hero voltou à altura visual da V1 no desktop (trilho fixo em 610px).
- Removidas as setas do carrossel para reduzir ruído visual.
- Bolinhas centralizadas na faixa branca inferior.
- Swipe horizontal habilitado em celular/tablet, sem bloquear a rolagem vertical.
- Slide 2 usa fundo creme da paleta do site.
- Adicionado Slide 3: Expo Ilustrar 2026 — Doodles.
- Mobile foi compactado para priorizar título, mensagem, CTA e prova social antes da arte.

## Como editar o carrossel

Abra `index.html` e procure por `CARROSSEL DA HERO — ÁREA DE MANUTENÇÃO`.
Cada trecho entre `INÍCIO DO SLIDE` e `FIM DO SLIDE` representa um destaque.
Para adicionar outro destaque, duplique um bloco `.hero-slide`. As bolinhas são criadas automaticamente por `js/main.js`.

### Cor de fundo

Cada slide possui `data-theme`:

- `default`: amarelo claro original;
- `cream`: creme da paleta;
- `pink`: rosa suave derivado da paleta.


## Arquitetura do CSS

O CSS foi separado em duas responsabilidades:

- `css/global.css`: identidade visual e regras que não pertencem a uma seção específica. Aqui ficam paleta de cores, tipografia, transparências, sombras, dimensões globais e configurações base de `html`, `body`, imagens e links.
- `css/style.css`: componentes e seções do site. As cores e fontes deste arquivo devem consumir as variáveis declaradas em `global.css`.

### Alterando uma cor do site

Evite procurar e substituir códigos hexadecimais em `style.css`. Por exemplo, o roxo principal é `--primary-color-2`; alterando seu valor em `:root` dentro de `global.css`, todos os componentes que utilizam esse token acompanham a alteração.

A paleta atual foi mantida exatamente como na versão aprovada pelo cliente.


## Vídeo

O vídeo da página utiliza o embed oficial do YouTube diretamente em `index.html`. A antiga pasta `media/`, criada ao salvar a página pelo navegador, foi removida porque não é mais necessária.
