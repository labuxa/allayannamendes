# Allayanna Mendes · Site institucional

Versão 2026.11.20-r6 · 20 de novembro de 2026.

## Atualizar o site que já está publicado

O `index.html` contém a logo, a imagem de abertura, o retrato, as fontes, a navegação e os ícones de aba de 16 e 32 px. Os arquivos na tabela completam a publicação.

1. Extraia o ZIP.
2. Envie o conteúdo extraído para a raiz da branch `main` do repositório `labuxa/allayannamendes`, substituindo os arquivos de mesmo nome. O `index.html` e os arquivos da tabela ficam no mesmo nível.
3. Confirme o envio em **Commit changes**. Após a atualização do GitHub Pages, confira a cena de assinatura na abertura e a frase **Entender seu caso. Antecipar riscos. Agir com estratégia.** em **Atendimento**.

| Arquivo | Função |
| --- | --- |
| `favicon.ico` | Ícone AM em seis tamanhos para navegadores e favoritos. |
| `apple-touch-icon.png` | Ícone AM para o atalho na tela inicial do iPhone. |
| `allayanna-mendes-compartilhamento.jpg` | Imagem para a prévia do link em aplicativos que leem Open Graph. |
| `404.html` | Página para endereços inválidos, com links para o início e o contato. |

O endereço de publicação é [labuxa.github.io/allayannamendes](https://labuxa.github.io/allayannamendes/).

A publicação dos arquivos revisados depende de uma conta com permissão de gravação no repositório.

## O que foi revisado

- Abertura com assinatura de contrato em frente ao imóvel e parágrafo de apresentação justificado.
- Áreas de atuação organizadas em quatro frentes, com due diligence, locações e assessoria jurídica para condomínios em destaque.
- Descrição de contratos imobiliários no mesmo formato dos demais serviços.
- Apresentação profissional mais concisa, com o retrato enviado e link para o LinkedIn.
- Nova frase de abertura de **Atendimento** e parágrafos justificados nos três blocos.
- Seção **Artigos e publicações**, com a matéria do portal Portas e o crédito da reportagem.
- Introdução, resumos e segunda coluna dos serviços alinhados no computador, com disposição em uma coluna no celular.
- Ícones de aba e de atalho derivados do monograma da logo aprovada.
- Imagem de compartilhamento de 1200 × 630 px, com logo e a nova imagem de abertura.
- Página de endereço inválido com links para o início e o contato.
- Logo, imagem de abertura e retrato incorporados ao arquivo final.
- Enquadramento da logo definido a partir da arte aprovada, com nome e complemento visíveis.
- Navegação calculada pela altura efetiva do cabeçalho, com respiro de 24 px no computador e 20 px no celular.
- Destinos das abas posicionados no início do conteúdo de cada seção.
- Menu móvel fecha após escolher uma seção e pela tecla Escape.
- Links diretos para seções, recarregamento e histórico do navegador preservados.
- Tipografia, contraste, espaçamentos, foco de teclado e áreas de toque revisados.
- Telefone ajustado para permanecer em uma linha nas telas pequenas testadas.
- Botão flutuante de WhatsApp ocultado quando o bloco de contato ou o rodapé está visível.
- Informações de privacidade com abertura, fechamento e retorno de foco verificados.
- Navegação e leitura básicas disponíveis também sem o script da aplicação.
- Endereço canônico, metadados e dados estruturados preenchidos com o endereço conhecido.

## Conteúdo e identidade

Allayanna Mendes · Advogada · OAB/MG 233.598.

WhatsApp: (31) 99509-0072.
E-mail: advallayannamendes@gmail.com.
Instagram: @adv.allayannamendes.

A identidade visual usa verde profundo, off-white e dourado discreto. A imagem de abertura ilustra a assinatura de um contrato imobiliário diante da fachada de referência.

## Google e tráfego pago

O pacote inclui o `sitemap.xml`, o endereço canônico e a descrição da página. Após a publicação, a etapa de Google começa pela verificação do endereço no Search Console. A configuração da medição de contatos e das campanhas faz parte da próxima etapa.

## Arquivos de edição

A pasta `fontes` guarda o HTML de origem, CSS e JavaScript legíveis. Para reconstruir o arquivo final após editar esses arquivos, execute `python3 fontes/build.py` na pasta do projeto. O script usa a biblioteca padrão do Python e as imagens otimizadas incluídas no pacote.

A pasta `assets` contém as artes originais em PNG, as versões WebP otimizadas para exibição e as fontes com licenças OFL. Para reconstruir os ícones, a imagem de compartilhamento e os WebP a partir dos PNG originais, execute `python3 fontes/preparar_imagens.py` com Pillow instalado e depois execute o script de publicação.

As fontes e os cuidados com publicação, navegação móvel e acesso por teclado do pacote `artelva-site.zip` serviram como referência técnica. A revisão do pacote `Site_Minas_Sat_2026-07-19_SEO_Atualizado.zip` orientou os ícones em diferentes tamanhos e a página para endereços inválidos.

Consulte `VERIFICACAO.md` para o escopo e os resultados dos testes.
