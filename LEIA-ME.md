# Allayanna Mendes — site revisado

Versão 2026.11.19-r2 · 19 de novembro de 2026.

## Atualizar o site que já está publicado

O arquivo `index.html` da raiz deste pacote é o arquivo de publicação. Ele contém a logo aprovada, a imagem arquitetônica, as fontes, o visual e a navegação dentro do próprio HTML.

1. Extraia este ZIP.
2. Substitua o `index.html` da raiz do repositório `labuxa/allayannamendes` pelo `index.html` deste pacote.
3. Envie também `sitemap.xml`, `robots.txt` e `.nojekyll`, que estão na raiz.
4. Aguarde a publicação do GitHub Pages e recarregue o endereço do site.

A publicação da página principal funciona com o `index.html` sozinho. As pastas `assets` e `fontes` são fornecidas para futuras edições; o arquivo publicado não faz requisições para elas. Assim, a ausência dessas pastas na publicação não deixa as imagens ou fontes invisíveis.

Endereço configurado: https://labuxa.github.io/allayannamendes/

Esta entrega contém os arquivos revisados. A conexão disponível nesta sessão não tem permissão de gravação nesse repositório, portanto a atualização remota ainda depende da substituição dos arquivos por uma conta autorizada.

## O que foi corrigido

- Logo e imagem incorporadas ao arquivo final.
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

Mantidos: verde profundo, off-white e dourado discreto; atendimento nacional e personalizado; regularização imobiliária, contencioso e assessoria jurídica. A imagem arquitetônica é ilustrativa e não identifica o escritório da profissional. Não foram inseridos endereço, fotos pessoais, formação não confirmada, depoimentos ou artigos inventados.

Os detalhes adicionais da formação e os três artigos previstos poderão ser incluídos quando fornecidos. As ferramentas de medição e o cadastro no Search Console não estão configurados nesta entrega. O sitemap deve ser submetido à conta responsável após a publicação.

## Arquivos de edição

A pasta `fontes` guarda o HTML de origem, CSS e JavaScript legíveis. Para reconstruir o arquivo final após editar esses arquivos, execute `python3 fontes/build.py` na pasta do projeto. O script usa apenas a biblioteca padrão do Python; as imagens otimizadas já estão incluídas.

A pasta `assets` contém as artes originais, cópias WebP e fontes com as licenças OFL. A conversão das imagens para WebP foi realizada sem perda e conferida por igualdade dos pixels, sem redesenhar ou alterar a logo aprovada.

As fontes Newsreader e Manrope e os cuidados com publicação, navegação móvel e acesso por teclado do pacote `artelva-site.zip` foram usados como referência técnica. A identidade e o conteúdo da Allayanna foram preservados.

Consulte `VERIFICACAO.md` para o escopo e os resultados dos testes.
