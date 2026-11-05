const cv = {
  metadata: {
    version: "1.0",
    language: "pt-BR",
    lastUpdated: "2026-11-05",
  },
  personalInformation: {
    fullName: "Michel Torres",
    professionalTitle: "Software Developer",
    profilePhoto: "https://avatars.githubusercontent.com/u/136039085",
    email: "qualquercoisahhhh@gmail.com",
    phone: "+55 11 97090-8258",
    whatsapp: "",
    location: {
      city: "Suzano",
      state: "São Paulo",
      country: "Brasil",
      address: "Av. Mogi das Cruzes",
    },
    linkedin: "https://www.linkedin.com/in/michel-torres-soares-bb5358435/",
    github: "https://github.com/tichelmorres/",
    portfolio: "",
    website: "",
  },
  professionalSummary: {
    description:
      "Desenvolvedor focado em código eficiente, da web ao baixo nível.",
    yearsOfExperience: 5,
    mainSpecialization: "Web Development, Low-level, ML",
    careerObjective: "Objetivo: Atuar em projetos desafiadores de software.",
  },
  professionalExperience: [
    {
      company: "UniPiaget",
      position: "Estudante",
      employmentType: "Tempo integral",
      location: "São Paulo, SP",
      startDate: "2026-02",
      endDate: "",
      current: true,
      description: "Estudo de desenvolvimento de software.",
      responsibilities: [
        "Desenvolver projetos acadêmicos",
        "Versionar código com Git",
      ],
      achievements: ["Diversos projetos concluídos"],
      technologies: ["js", "git", "github", "bootstrap", "html/css"],
    },
  ],
  education: [
    {
      institution: "UniPiaget",
      degree: "Tecnólogo",
      fieldOfStudy: "Análise e Desenvolvimento de Sistemas",
      level: "Graduação",
      startDate: "2026-02",
      endDate: "",
      current: true,
      description: "Curso superior de tecnologia.",
    },
  ],
  skills: {
    technical: [
      { name: "Algoritmos", level: "Intermediário" },
      { name: "Web", level: "Intermediário" },
    ],
    behavioral: ["Comunicação", "Trabalho em equipe"],
    tools: ["Git", "Linux", "GNU/Emacs", "Vim"],
    methodologies: ["Scrum", "Kanban"],
  },
  languages: [
    { name: "C", proficiency: "5" },
    { name: "Rust", proficiency: "4" },
    { name: "JavaScript", proficiency: "3" },
    { name: "Python", proficiency: "3" },
  ],
  certifications: [
    {
      name: "Python para Machine Learning",
      issuer: "IDESCO",
      issueDate: "2026-09",
      expirationDate: "",
      credentialUrl: "",
    },
  ],
  projects: [
    {
      name: "GRASS",
      description:
        "Biblioteca para renderização de simulações gráficas em baixo nível",
      role: "Autoral",
      technologies: ["C"],
      url: "https://github.com/tichelmorres/grass.git",
      startDate: "2025-01",
      endDate: "",
    },
  ],
  courses: [
    {
      name: "Machine Learning",
      institution: "IDESCO",
      completionDate: "2026-09",
      workloadHours: 43,
    },
  ],
  additionalInformation: {
    availability: "Imediata",
    workModel: "Remoto",
    travelAvailability: false,
    additionalNotes: "Buscando novas experiências.",
  },
  preferences: {
    targetPositions: [],
    targetIndustries: [],
    preferredLocations: [],
    preferredWorkModel: "",
  },
};

// ---------- Helpers ----------

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );

const formatDates = (item) =>
  [item.startDate, item.current ? "atual" : item.endDate]
    .filter(Boolean)
    .join(" – ");

// ---------- HTML ----------

const renderTags = (items) =>
  items.length
    ? `<div class="tags">${items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`
    : "";

const renderList = (items) =>
  items.length
    ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : "";

const renderLink = (url) => {
  if (!url) return "";
  const label = url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`;
};

const renderSection = (title, content) =>
  content ? `<h2>${title}</h2>${content}` : "";

const renderHeader = (person) => {
  const { location } = person;
  const address = [
    location.address,
    location.city,
    location.state,
    location.country,
  ]
    .filter(Boolean)
    .join(", ");
  const email = person.email
    ? `<a href="mailto:${escapeHtml(person.email)}">${escapeHtml(person.email)}</a>`
    : "";
  const contacts = [
    email,
    escapeHtml(person.phone),
    renderLink(person.github),
    renderLink(person.linkedin),
    renderLink(person.portfolio),
  ]
    .filter(Boolean)
    .join(" | ");
  const photo = person.profilePhoto
    ? `<img src="${escapeHtml(person.profilePhoto)}" alt="${escapeHtml(person.fullName)}">`
    : "";

  return `
    <header>
      ${photo}
      <h1>${escapeHtml(person.fullName)}</h1>
      <p>${escapeHtml(person.professionalTitle)}</p>
      <p class="mut">${escapeHtml(address)}</p>
      <p class="mut">${contacts}</p>
    </header>`;
};

const renderSummary = (summary) =>
  renderSection(
    "Resumo",
    `
      <p>${escapeHtml(summary.description)}</p>
      <p>${escapeHtml(summary.careerObjective)}</p>
      <p class="mut">${summary.yearsOfExperience} anos de experiência | ${escapeHtml(summary.mainSpecialization)}</p>`,
  );

const renderExperience = (job) => {
  const meta = [job.employmentType, job.location, formatDates(job)]
    .filter(Boolean)
    .join(" | ");
  const duties = [...job.responsibilities, ...job.achievements];

  return `
    <h3>${escapeHtml(job.position)}, ${escapeHtml(job.company)}</h3>
    <p class="mut">${escapeHtml(meta)}</p>
    <p>${escapeHtml(job.description)}</p>
    ${duties.length ? `<p class="label">Responsabilidades:</p>${renderList(duties)}` : ""}
    ${renderTags(job.technologies)}`;
};

const renderEducation = (edu) => {
  const meta = [edu.institution, edu.level, formatDates(edu)]
    .filter(Boolean)
    .join(" | ");

  return `
    <h3>${escapeHtml(edu.degree)} em ${escapeHtml(edu.fieldOfStudy)}</h3>
    <p class="mut">${escapeHtml(meta)}</p>
    <p>${escapeHtml(edu.description)}</p>`;
};

const renderLanguage = (language) => {
  const level = Number(language.proficiency);
  const percent = Math.min(Math.max(level * 20, 0), 100);

  return `
    <div class="bar">
      <strong class="bar-name">${escapeHtml(language.name)}</strong>
      <span class="bar-track"><span class="bar-fill" style="width: ${percent}%"></span></span>
      <span class="mut">${escapeHtml(language.proficiency)}/5</span>
    </div>`;
};

const renderSkills = (skills) => {
  const technical = skills.technical
    .map((skill) =>
      escapeHtml(skill.name + (skill.level ? ` (${skill.level})` : "")),
    )
    .join(", ");

  return `
    <p>${technical}</p>
    ${renderTags(skills.behavioral)}
    ${renderTags(skills.tools)}
    ${renderTags(skills.methodologies)}`;
};

const renderProject = (project) => `
    <h3>${escapeHtml(project.name)} <span class="mut">(${escapeHtml(project.role)})</span></h3>
    <p>${escapeHtml(project.description)}</p>
    <p>${renderLink(project.url)}</p>
    ${renderTags(project.technologies)}`;

const renderCertification = (cert) => `
    <p>
      <strong>${escapeHtml(cert.name)}</strong>
      <span class="mut">${escapeHtml(cert.issuer)}, ${escapeHtml(cert.issueDate)}</span>
    </p>`;

const renderCourse = (course) => `
    <p>
      <strong>${escapeHtml(course.name)}</strong>
      <span class="mut">${escapeHtml(course.institution)}, ${escapeHtml(course.completionDate)}, ${course.workloadHours}h</span>
    </p>`;

const renderExtra = (extra) => `
    <p class="mut">Disponibilidade: ${escapeHtml(extra.availability)} | Modelo: ${escapeHtml(extra.workModel)} | Viagens: ${extra.travelAvailability ? "sim" : "não"}</p>
    <p>${escapeHtml(extra.additionalNotes)}</p>`;

// ---------- Page ----------

const html = [
  renderHeader(cv.personalInformation),
  renderSummary(cv.professionalSummary),
  renderSection(
    "Experiência",
    cv.professionalExperience.map(renderExperience).join(""),
  ),
  renderSection("Formação", cv.education.map(renderEducation).join("")),
  renderSection("Linguagens", cv.languages.map(renderLanguage).join("")),
  renderSection("Habilidades", renderSkills(cv.skills)),
  renderSection("Projetos", cv.projects.map(renderProject).join("")),
  renderSection(
    "Certificações",
    cv.certifications.map(renderCertification).join(""),
  ),
  renderSection("Cursos", cv.courses.map(renderCourse).join("")),
  renderSection(
    "Informações adicionais",
    renderExtra(cv.additionalInformation),
  ),
  `<p class="mut">Atualizado em ${escapeHtml(cv.metadata.lastUpdated)}</p>`,
].join("");

document.documentElement.lang = cv.metadata.language;
document.title = `${cv.personalInformation.fullName} - CV`;
document.getElementById("cv").innerHTML = html;
