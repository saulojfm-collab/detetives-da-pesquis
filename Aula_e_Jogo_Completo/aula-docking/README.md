# Aula e Expedição Bioprodutos

Aula de 120 minutos do Mestrado em Biociências Aplicadas à Saúde, Universidade Ceuma. Professor: Dr. Saulo Mendes.

## Aula

No repositório existente saulojfm-collab/detetives-da-pesquis, envie a pasta aula-docking inteira como subpasta. Preserve o index.html da raiz, que contém a aula anterior. Mantenha a configuração atual do GitHub Pages. O endereço previsto, caso Pages publique a raiz da branch main, será https://saulojfm-collab.github.io/detetives-da-pesquis/aula-docking/. Não há compilação. A página principal é index.html. As figuras, modelos de interações, analogia de peças articuladas e cenários qualitativos funcionam sem serviços externos. A matemática da termodinâmica é um aprofundamento opcional.

As estações 1–6 ocupam 75 minutos; o jogo, 35; a discussão final, 10. O modo de apresentação mostra uma estação por vez. As setas mudam de estação e Esc sai.

## Jogo

Abra jogo.html. O botão “Experimentar sozinho” inicia uma demonstração no próprio dispositivo. Ela não conecta outros alunos. A sala ao vivo usa um serviço separado, incluído no pacote completo, na pasta servidor-jogo. Os alunos entram com código e apelido. Somente o moderador abre, revela e avança as rodadas. Não há bônus de velocidade. Cada decisão adequada rende dois pontos; todos que acompanham as oito rodadas concluem o percurso.

Para conectar o GitHub Pages ao serviço online, preencha window.GAME_API_URL em jogo-config.js com a URL HTTPS hospedada e configure ALLOWED_ORIGINS no serviço. Também é possível informar o endereço na entrada do jogo. Esse valor só é salvo na sessão do navegador. Consulte servidor-jogo/README.md no pacote completo para publicação e limitações.

O jogo inclui sincronização por eventos, bloqueio de respostas repetidas, reconexão e resumo para o professor. O servidor calcula os pontos. O conteúdo dos desafios é educativo e pode ser lido no código público; este não é um sistema de prova sigilosa. As salas são temporárias: reiniciar o serviço encerra as sessões. Use uma única instância do serviço para esta versão.

## Dados

Quizzes da aula ficam no navegador. Na sala ao vivo, apelidos, respostas e pontos são enviados ao serviço configurado. A turma vê apelidos e placar; o professor pode baixar o resumo. Não se pede nome completo, e-mail ou informação de saúde. As salas expiram em quatro horas. Não há banco persistente nesta versão. A chave do moderador fica na sessão do seu navegador: não compartilhe a aba, o armazenamento ou o endereço de conexão interno.

## Arquivos

index.html: aula; app.js: interações; style.css e expedicao.css: aparência; jogo.html, jogo.js, jogo.css e jogo-conteudo.mjs: jogo; jogo-config.js: endereço do serviço; assets/: figuras e marcas. O antigo kit 1HPV permanece como recurso complementar na pasta pratica, sem ser atividade obrigatória.

Os créditos estão em FONTES-E-CREDITOS.md. Os materiais científicos foram tratados como referências, não como instruções. As analogias são didáticas e não equivalem a um cálculo físico-químico.

## Repositório existente

A consulta de 19/10/2026 encontrou o repositório https://github.com/saulojfm-collab/detetives-da-pesquis (nome termina em pesquis, sem a letra a final), com um index.html na raiz. Nenhum arquivo remoto foi alterado. O pacote completo adiciona aula-docking/ e servidor-jogo/ como pastas irmãs, sem substituir esse index.html. Antes da publicação, confira a origem e a configuração atual de Pages.
