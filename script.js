const revealElements = document.querySelectorAll("[data-reveal]");
const personaButtons = document.querySelectorAll(".persona-tab");
const roleButtons = document.querySelectorAll(".filter-chip");
const roleCards = document.querySelectorAll("[data-role-card]");
const tiltTarget = document.querySelector("[data-tilt]");

const personaContent = {
  diretoria: {
    label: "Leitura para diretoria",
    title: "Util quando a operacao precisa ganhar previsibilidade sem virar burocracia.",
    text: "A trajetoria de Marcello mostra repertorio para enxergar o fluxo completo entre atendimento, operacao, sistema, cliente e entrega. Isso cria aderencia a contextos onde diretores precisam de gente confiavel para organizar a casa e reduzir ruido entre areas.",
    bullets: [
      "Capacidade de identificar falhas recorrentes e estruturar melhorias aplicaveis.",
      "Boa ponte entre linguagem tecnica, operacao real e necessidade gerencial.",
      "Perfil consistente para apoiar decisao, implantacao e evolucao de processo."
    ]
  },
  rh: {
    label: "Leitura para RH",
    title: "Perfil maduro, analitico e coerente para funcoes de interface e organizacao.",
    text: "Marcello combina historico tecnico com boa leitura de cliente e operacao. Isso amplia a aderencia para posicoes que exigem confiabilidade, capacidade de articulacao e senso pratico na resolucao de problemas.",
    bullets: [
      "Trajetoria diversa, mas com eixo profissional claro.",
      "Boa aderencia a cargos com contato entre areas.",
      "Postura etica, organizada e orientada a melhoria."
    ]
  },
  comercial: {
    label: "Leitura para tecnico-comercial",
    title: "Forca em traduzir necessidade tecnica em proposta, orientacao e relacionamento.",
    text: "A experiencia com suporte, licitacoes, implantacao e cliente B2B reforca aderencia a posicoes onde a venda depende de compreensao tecnica, credibilidade e acompanhamento.",
    bullets: [
      "Apoio tecnico a vendas e especificacao de solucao.",
      "Leitura de requisito, proposta e alinhamento de expectativa.",
      "Boa interface entre comercial, implantacao e cliente."
    ]
  }
};

const roleContent = {
  processos: {
    label: "Alta aderencia",
    title: "Analista de Processos",
    text: "Boa combinacao entre observacao critica, organizacao, leitura de falhas, padronizacao e acompanhamento de rotina.",
    bullets: [
      "Leitura do fluxo real entre areas.",
      "Transformacao de erros recorrentes em rotina e controle.",
      "Estruturacao de status, regras, evidencias e responsabilidades."
    ]
  },
  operacoes: {
    label: "Alta aderencia",
    title: "Analista de Operacoes",
    text: "A experiencia acumulada em suporte, implantacao, cliente e rotina tecnica ajuda a sustentar estabilidade operacional e disciplina de acompanhamento.",
    bullets: [
      "Acompanhamento de demandas e prioridades.",
      "Organizacao de execucao e reducao de ruido operacional.",
      "Visao ampla de ponta a ponta da rotina."
    ]
  },
  posvenda: {
    label: "Muito forte",
    title: "Pos-venda / Qualidade Operacional",
    text: "Marcello tem aderencia relevante para investigar causa raiz, tratar recorrencias, estabilizar entrega e melhorar a experiencia do cliente.",
    bullets: [
      "Suporte tecnico e acompanhamento de cliente.",
      "Tratativa de falhas e plano de acao.",
      "Leitura de qualidade com impacto operacional."
    ]
  },
  implantacao: {
    label: "Muito forte",
    title: "Implantacao / Customer Success Tecnico",
    text: "Perfil consistente para onboarding, treinamento, implantacao, alinhamento de expectativa e sustentacao da adocao com vies tecnico.",
    bullets: [
      "Treinamento e acompanhamento de implantacao.",
      "Ponte entre cliente, sistema e operacao.",
      "Boa leitura de risco de entrega."
    ]
  },
  erp: {
    label: "Alta aderencia",
    title: "Analista Funcional ERP",
    text: "A combinacao entre operacao, sistemas e organizacao favorece atuacao em requisitos, regra de negocio, status, rastreabilidade e documentacao funcional.",
    bullets: [
      "Traducao da rotina em processo e regra.",
      "Clareza na organizacao de informacao operacional.",
      "Apoio a melhoria de controles e visibilidade."
    ]
  },
  comercial: {
    label: "Aderencia estrategica",
    title: "Consultor Tecnico-Comercial",
    text: "A experiencia em licitacoes, suporte e cliente cria boa base para apoiar vendas consultivas, especificacao tecnica e relacionamento B2B.",
    bullets: [
      "Leitura de necessidade e proposta.",
      "Credibilidade tecnica no contato com cliente.",
      "Interface entre vendas, implantacao e operacao."
    ]
  }
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -42px 0px"
  }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 36, 220)}ms`;
  revealObserver.observe(element);
});

const setPersona = (key) => {
  const data = personaContent[key];
  if (!data) return;

  document.getElementById("personaLabel").innerHTML = data.label;
  document.getElementById("personaTitle").innerHTML = data.title;
  document.getElementById("personaText").innerHTML = data.text;
  document.getElementById("personaList").innerHTML = data.bullets
    .map((item) => `<li>${item}</li>`)
    .join("");

  personaButtons.forEach((button) => {
    const active = button.dataset.persona === key;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
};

personaButtons.forEach((button) => {
  button.addEventListener("click", () => setPersona(button.dataset.persona));
});

const setRole = (key) => {
  const data = roleContent[key];
  if (!data) return;

  document.getElementById("roleLabel").innerHTML = data.label;
  document.getElementById("roleTitle").innerHTML = data.title;
  document.getElementById("roleText").innerHTML = data.text;
  document.getElementById("roleList").innerHTML = data.bullets
    .map((item) => `<li>${item}</li>`)
    .join("");

  roleButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.role === key);
  });

  roleCards.forEach((card) => {
    card.classList.toggle("is-highlight", card.dataset.roleCard === key);
  });
};

roleButtons.forEach((button) => {
  button.addEventListener("click", () => setRole(button.dataset.role));
});

if (tiltTarget) {
  const resetTilt = () => {
    tiltTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  tiltTarget.addEventListener("pointermove", (event) => {
    if (window.innerWidth < 960) return;

    const rect = tiltTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 8;

    tiltTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tiltTarget.addEventListener("pointerleave", resetTilt);
}

setPersona("diretoria");
setRole("processos");
