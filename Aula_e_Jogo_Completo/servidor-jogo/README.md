# Serviço da Expedição Bioprodutos

Este serviço sincroniza as salas do jogo. O site estático pode continuar no GitHub Pages. O serviço ainda precisa ser publicado em uma conta de hospedagem para que a turma entre pela internet.

## Estrutura do pacote completo

Mantenha aula-docking/ e servidor-jogo/ como pastas irmãs. O serviço importa os desafios da primeira e também pode servir a aula inteira. Não precisa instalar bibliotecas: utiliza Node.js 22 ou superior e módulos nativos.

## Experimentar no computador

Na raiz do pacote, execute `node servidor-jogo/server.mjs`. Abra http://127.0.0.1:8787/jogo.html. Crie uma sala em uma aba e entre como aluno em outra aba com o código. O endereço 127.0.0.1 só funciona nesse computador; não é o endereço para os celulares dos alunos.

## Publicar na internet

Use uma hospedagem de serviço Node, por exemplo Render, ou a infraestrutura da universidade. Exemplo de configuração no Render, com o pacote completo no repositório:

- Runtime: Node 22 ou superior.
- Diretório raiz do serviço: raiz do repositório, mantendo as duas pastas.
- Build command: `node --check servidor-jogo/server.mjs`.
- Start command: `node servidor-jogo/server.mjs`.
- Variável HOST: `0.0.0.0`.
- PORT: use a variável fornecida pela hospedagem.
- Health check: `/api/health`.
- ALLOWED_ORIGINS: origens exatas permitidas, separadas por vírgulas. Inclua a URL HTTPS do próprio serviço e, se usado, `https://SEU-USUARIO.github.io`. A origem não inclui o caminho do repositório.

Depois de publicar, abra `/api/health` e confirme `ok: true`. Copie a URL HTTPS do serviço em aula-docking/jogo-config.js, por exemplo `window.GAME_API_URL = 'https://SEU-SERVICO.onrender.com';`. Atualize esse arquivo no GitHub Pages. Também é possível usar diretamente o jogo servido pela hospedagem, sem passar pelo GitHub Pages; nesse caso deixe a configuração vazia e autorize a origem HTTPS do serviço.

Não há publicação automática nem conta contratada neste pacote. Confira o plano antes de ativar o serviço. Serviços gratuitos podem suspender ou reiniciar; para uma aula ao vivo, teste previamente e escolha disponibilidade compatível com o horário. Não faça atualizações de código durante a partida.

Documentação do provedor consultada em 19/10/2026: https://render.com/docs/web-services e https://render.com/docs/free . GitHub Pages é estático: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages .

## Condução pelo professor

Crie uma sala e mantenha essa aba. Ela guarda a chave de moderação na sessão do navegador. Compartilhe o convite dos alunos ou apenas o código. Aguarde todos entrarem e abra a rodada. Cada aluno envia uma única alternativa. Revele quando desejar, discuta a justificativa e abra a rodada seguinte. Na oitava rodada, finalize e baixe o resumo JSON.

Quem recarrega a própria aba consegue reconectar enquanto a sessão e o serviço estiverem ativos. Quem sai perde a chave da sessão nesta interface. Novas inscrições são aceitas apenas na sala de espera. Participantes desconectados permanecem na lista; a contagem é de inscritos, não uma prova de presença online. O professor pode revelar sem esperar todos.

## Limites e dados

As salas são mantidas em memória e expiram quatro horas após sua criação. Reiniciar ou substituir a instância encerra as salas. Use apenas uma instância; não há replicação entre servidores. Limite de 150 participantes por sala e 100 salas simultâneas, com limite de solicitações por endereço. Esses limites de código não equivalem a um teste de carga ou garantia de capacidade da hospedagem. O protótipo foi preparado para uma turma, com ensaio prévio.

O serviço usa conexões de eventos HTTP (SSE); a hospedagem precisa permitir conexões longas sem buffering. Se houver proxy, configure-o de acordo. Não publique somente a pasta servidor-jogo sem ajustar as referências para os arquivos estáticos e os desafios.

As escolhas são calculadas no servidor. Uma resposta por rodada; estudantes não podem chamar as operações do professor com sua própria chave. O conteúdo didático é público, portanto o jogo não tem finalidade de avaliação sigilosa. Use apelidos. Dados não são persistidos em banco e não há relatório após expiração, salvo se o professor o baixar.

Não exponha este servidor diretamente por HTTP na internet. Use a URL HTTPS da hospedagem. A configuração de origens, a chave de sessão e os limites já estão presentes, mas não substituem a gestão de acesso e recursos do provedor. O moderador não usa senha institucional: a chave vale apenas para a sala criada.
