// Company object (same as before)
const myCompany = {
  name: "Sibu & Ike",
  cultureType: "clan",
  britishValues: ["mutual respect", "individual liberty", "democracy"],
  foundedYear: 2019,
  employeeCount: 5,
  jobs: [
    {
      title: "IT Project Manager",
      description: "Join our supportive team focused on user experience.",
      skills: ["HTML", "CSS", "JavaScript"]
    },
    {
      title: "Frontend Developer",
      description: "Develop modern web interfaces with a collaborative approach.",
      skills: ["HTML", "CSS", "React"]
    }
  ],
  listValues: function() {
    return this.britishValues.join(", ");
  },
  displayCulture: function() {
    switch(this.cultureType) {
      case "clan": return "Clan Culture: Collaborative and family-like environment. ";
      case "market": return "Market Culture: Results-driven and competitive.";
      case "adhocracy": return "Adhocracy Culture: Innovative and risk-taking.";
      case "hierarchy": return "Hierarchy Culture: Structured and process-focused.";
      default: return "Unknown Culture";
    }
  }
};

// DOM references
const companyInfo = document.getElementById("company-info");
const jobList = document.getElementById("job-list");
const skillFilter = document.getElementById("skill-filter");
const jobForm = document.getElementById("job-form");

// Function to render jobs
function renderJobs(jobs) {
  jobList.innerHTML = ""; // clear list
  jobs.forEach(job => {
    const jobDiv = document.createElement("div");
    jobDiv.classList.add("job");
    jobDiv.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.description}</p>
      <div class="skills"><strong>Skills:</strong> ${job.skills.map(skill => `<span>${skill.trim()}</span>`).join("")}</div>
    `;
    jobList.appendChild(jobDiv);
  });
}

// Display company info
companyInfo.innerHTML = `
  <h2>${myCompany.name}</h2>
  <p><strong>Culture:</strong> ${myCompany.displayCulture()}</p>
  <p><strong>Founded Year:</strong> ${myCompany.foundedYear}</p>
  <p><strong>Employees:</strong> ${myCompany.employeeCount}</p>
  <p><strong>British Values:</strong> ${myCompany.listValues()}</p>
`;

// Initial job render
renderJobs(myCompany.jobs);

// Filter jobs by skill
skillFilter.addEventListener("input", (e) => {
  const filterValue = e.target.value.toLowerCase();
  const filteredJobs = myCompany.jobs.filter(job =>
    job.skills.some(skill => skill.toLowerCase().includes(filterValue))
  );
  renderJobs(filteredJobs);
});

// Add new job via form
jobForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("job-title").value;
  const desc = document.getElementById("job-desc").value;
  const skills = document.getElementById("job-skills").value.split(",");
  
  myCompany.jobs.push({ title, description: desc, skills });
  renderJobs(myCompany.jobs);
  
  // Reset form
  jobForm.reset();
});
