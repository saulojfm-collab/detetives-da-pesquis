// Desafios formativos de uma história fictícia. Cinco alternativas por rodada.
export const rounds = [
  {
    "place": "Origem",
    "icon": "01",
    "title": "Uma descoberta começa na origem",
    "story": "Sua equipe recebeu a proposta de investigar uma planta usada por uma comunidade. O recurso é limitado e o projeto ainda vai começar.",
    "question": "Qual é a primeira decisão mais responsável?",
    "options": [
      "Coletar o máximo possível antes de definir o projeto.",
      "Planejar a pesquisa, verificar as autorizações pertinentes e o uso responsável da biodiversidade e do conhecimento associado.",
      "Anunciar que a planta já poderá virar um medicamento.",
      "Escolher uma técnica de análise antes de definir a pergunta e dispensar o planejamento da coleta.",
      "Presumir que o uso tradicional elimina a necessidade de investigar segurança."
    ],
    "correct": 1,
    "explanation": "A pesquisa começa com uma pergunta, planejamento e condições adequadas para acessar a fonte. Uma história de uso pode orientar uma hipótese, mas ainda não comprova eficácia ou segurança.",
    "concept": "Bioprospecção responsável",
    "discuss": "Qual pergunta de saúde sua equipe pretende responder?"
  },
  {
    "place": "Amostra",
    "icon": "02",
    "title": "O extrato mostrou um efeito. E agora?",
    "story": "Uma fração vegetal reduziu um sinal inflamatório em um ensaio celular. O resultado é preliminar e a composição ainda é pouco conhecida.",
    "question": "O que ajuda a avançar de maneira informada?",
    "options": [
      "Afirmar que o efeito é de uma única molécula, sem identificá-la.",
      "Usar o extrato inteiro como se fosse um ligante único no docking.",
      "Caracterizar os componentes, repetir o ensaio e verificar controles, inclusive viabilidade celular.",
      "Selecionar uma substância apenas pelo score de docking, sem confirmar sua presença na fração.",
      "Aceitar a redução do sinal como atividade específica, sem verificar interferência ou toxicidade."
    ],
    "correct": 2,
    "explanation": "Uma fração contém várias substâncias. Caracterização e controles ajudam a separar atividade de interferência ou toxicidade. O docking exige estruturas químicas definidas para os ligantes.",
    "concept": "Composição e controles",
    "discuss": "Uma célula morta poderia produzir menos do sinal medido? Como verificar?"
  },
  {
    "place": "Alvo",
    "icon": "03",
    "title": "A pergunta precisa de um alvo",
    "story": "A equipe identificou a molécula fictícia Bio-A. Há uma hipótese de que ela interaja com uma enzima envolvida na resposta inflamatória.",
    "question": "Qual justificativa sustenta a escolha do alvo?",
    "options": [
      "Uma ligação entre a função da enzima, o efeito investigado e as evidências disponíveis.",
      "O fato de a proteína ter uma imagem bonita.",
      "A facilidade de conseguir um score muito negativo.",
      "Escolher a enzima mais estudada, mesmo sem relação demonstrável com o efeito investigado.",
      "Assumir que todas as enzimas da mesma família podem representar o alvo sem avaliar suas diferenças."
    ],
    "correct": 0,
    "explanation": "A relevância biológica vem antes da ferramenta. Uma proteína com estrutura disponível facilita o estudo, mas isso não demonstra que ela explique o efeito observado.",
    "concept": "Hipótese biológica",
    "discuss": "Que informação enfraqueceria a hipótese de que essa enzima é o alvo?"
  },
  {
    "place": "Estrutura",
    "icon": "04",
    "title": "A estrutura mais nítida nem sempre responde melhor",
    "story": "Há duas estruturas do mesmo alvo. A tem resolução de 1,3 Å, mas uma mutação que altera o sítio relevante. B tem 1,9 Å, sítio completo e um ligante experimental pertinente.",
    "question": "Qual estrutura você priorizaria para inspecionar?",
    "options": [
      "A, porque a menor resolução numérica resolve todos os outros problemas.",
      "B, porque relevância e qualidade local devem ser avaliadas junto com a resolução.",
      "Qualquer uma: o docking ignora a estrutura fornecida.",
      "Escolher A e ignorar a mutação, pois ela não pode influenciar os resultados.",
      "Escolher B apenas por ser menos detalhada, sem conferir a qualidade do sítio."
    ],
    "correct": 1,
    "explanation": "Em cristalografia, um número menor de resolução indica maior detalhamento potencial. Ainda precisamos de um modelo adequado à pergunta, com sítio utilizável e qualidade local avaliada. Os valores desta rodada são fictícios.",
    "concept": "Relevância e qualidade estrutural",
    "discuss": "Além da resolução, o que você conferiria no sítio?"
  },
  {
    "place": "Docking",
    "icon": "05",
    "title": "Hora de aplicar o docking",
    "story": "O alvo possui um ligante experimental no sítio. A equipe precisa investigar poses de Bio-A e entender se o protocolo consegue recuperar uma pose conhecida.",
    "question": "Qual plano demonstra melhor os conceitos da aula?",
    "options": [
      "Buscar em qualquer lugar da proteína e escolher apenas a primeira imagem.",
      "Manter o ligante experimental ocupando o sítio e tentar colocar Bio-A no mesmo espaço.",
      "Preparar os componentes, definir a região pelo sítio conhecido e testar a recuperação do ligante de referência por redocking.",
      "Usar uma caixa de busca fora do sítio conhecido para evitar comparar com o ligante experimental.",
      "Tratar o score de Bio-A como prova de afinidade, dispensando a avaliação do protocolo."
    ],
    "correct": 2,
    "explanation": "Docking explora e pontua poses. A região de busca deve representar a pergunta. No redocking, retiramos o ligante conhecido para tentar recuperar sua pose e comparar à referência. Isso avalia a geometria naquele caso, sem provar eficácia.",
    "concept": "Pose, região de busca e redocking",
    "discuss": "O que muda se a caixa de busca não incluir o sítio?"
  },
  {
    "place": "Balanço",
    "icon": "06",
    "title": "Os contatos não contam a história inteira",
    "story": "Duas poses têm contatos parecidos. Em uma delas, o ligante precisa ficar muito mais restrito. A água ao redor também muda quando o complexo se forma.",
    "question": "Como interpretar essa situação?",
    "options": [
      "Considerar os contatos, as mudanças de liberdade e a participação do solvente no balanço.",
      "Contar apenas o número de ligações de hidrogênio.",
      "Concluir que o ligante mais rígido sempre terá maior afinidade.",
      "Ignorar a água, pois ela não contribui para o balanço da associação.",
      "Interpretar a perda de movimento do ligante como prova de que a associação é impossível."
    ],
    "correct": 0,
    "explanation": "A entalpia acompanha um balanço energético; a entropia envolve estados acessíveis do sistema. O ligante pode perder liberdade enquanto a água contribui de outras maneiras. ΔG reúne contribuições que podem se compensar.",
    "concept": "Contatos, liberdade e energia livre",
    "discuss": "Como explicar essa decisão a um colega sem usar uma fórmula?"
  },
  {
    "place": "Evidência",
    "icon": "07",
    "title": "Um resultado promissor pede um próximo teste",
    "story": "O redocking recuperou uma pose semelhante à referência. Bio-A recebeu uma pontuação favorável no mesmo protocolo.",
    "question": "O que sua equipe pode concluir e fazer em seguida?",
    "options": [
      "Que Bio-A já apresenta eficácia em seres humanos.",
      "Que há uma hipótese estrutural a testar, por exemplo com um ensaio adequado de ligação ou atividade no alvo e controles.",
      "Que nenhuma outra hipótese precisa ser considerada.",
      "Concluir que uma boa recuperação de pose garante a afinidade de qualquer novo ligante.",
      "Repetir somente o docking até obter um score mais negativo e usá-lo como substituto de um ensaio."
    ],
    "correct": 1,
    "explanation": "A recuperação da referência apoia uma parte do protocolo. A predição de Bio-A continua sendo uma hipótese. Ligação, atividade funcional, seletividade, exposição e segurança exigem evidências próprias.",
    "concept": "Limites da inferência",
    "discuss": "Qual experimento distinguiria ligação direta de um efeito indireto?"
  },
  {
    "place": "Bioproduto",
    "icon": "08",
    "title": "Chegar ao fim é saber decidir o próximo passo",
    "story": "A equipe reuniu dados de composição, ensaios preliminares e modelos de interação. Ela vai apresentar o projeto para planejar sua continuidade.",
    "question": "Qual conclusão é mais responsável?",
    "options": [
      "O produto está pronto para uso clínico porque passou pelo docking.",
      "Quanto mais bonito o modelo, menor a necessidade de validação.",
      "O conjunto sustenta etapas adicionais de validação, com limitações e critérios claros para avançar.",
      "Definir a dose para uso em pessoas apenas a partir da pontuação do docking.",
      "Assumir que a origem natural permite dispensar a avaliação de segurança do futuro produto."
    ],
    "correct": 2,
    "explanation": "O caminho até um bioproduto exige integração de evidências, qualidade, reprodutibilidade e avaliação adequada de segurança e eficácia. Nesta história, vencer significa construir uma decisão justificável, sem transformar uma previsão em certeza.",
    "concept": "Integração de evidências",
    "discuss": "Que resultado faria a equipe mudar de direção?"
  }
];
