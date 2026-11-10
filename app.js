const jobs = [
  { id: "product-designer", title: "Product Designer", company: "Notion", initials: "N", mark: "purple", image: "assets\\product-designer.svg", category: "Design", location: "Remote", type: "Full-time", salary: "$110k–$145k", posted: "2 days ago", description: "Help shape simple, thoughtful experiences that make work feel a little more human. You’ll partner with product and engineering to bring big ideas to life.", responsibilities: ["Design clear, delightful experiences from first sketch to final polish.", "Work closely with product managers, researchers, and engineers.", "Bring curiosity and a strong point of view to every design conversation."], requirements: ["3+ years designing digital products or experiences.", "A portfolio that shows your process and the impact of your work.", "Thoughtful communication and a collaborative spirit."] },
  { id: "frontend-engineer", title: "Frontend Engineer", company: "Stripe", initials: "S", mark: "green", image: "assets\\frontend-engineer.svg", category: "Engineering", location: "Hybrid", type: "Full-time", salary: "$140k–$180k", posted: "1 day ago", description: "Build fast, accessible interfaces that make online commerce feel effortless. Join a small, friendly team working on products used around the world.", responsibilities: ["Build and improve polished web experiences with the product team.", "Keep performance, accessibility, and maintainability front of mind.", "Share knowledge and help raise the bar for the team."], requirements: ["3+ years building modern web applications.", "Comfortable with JavaScript and component-based UI frameworks.", "A curious, collaborative approach to solving problems."] },
  { id: "brand-marketer", title: "Brand Marketing Manager", company: "Figma", initials: "F", mark: "orange", image: "assets\\brand-marketer.svg", category: "Marketing", location: "Remote", type: "Full-time", salary: "$105k–$135k", posted: "3 days ago", description: "Tell stories that bring creative collaboration to life. You’ll help build a brand people love and campaigns that connect with our community.", responsibilities: ["Develop thoughtful campaigns across digital channels.", "Work with creative partners to bring ideas from brief to launch.", "Learn from performance and share what works."], requirements: ["3+ years in brand, content, or integrated marketing.", "Strong writing, communication, and project skills.", "A genuine interest in creative communities."] },
  { id: "product-manager", title: "Product Manager", company: "Webflow", initials: "W", mark: "blue", image: "assets\\product-manager.svg", category: "Product", location: "Hybrid", type: "Full-time", salary: "$125k–$160k", posted: "4 days ago", description: "Help teams make the web more open and expressive. Bring customer insight and a clear product vision to a collaborative, growing team.", responsibilities: ["Set direction and help the team focus on the right problems.", "Turn customer feedback into clear product opportunities.", "Partner across design, engineering, and go-to-market."], requirements: ["4+ years in product management or a related role.", "Strong customer empathy and prioritization skills.", "Comfortable making decisions with a team."] },
  { id: "people-partner", title: "People Operations Partner", company: "Loom", initials: "L", mark: "pink", image: "assets\\people-partner.svg", category: "People", location: "On-site", type: "Full-time", salary: "$90k–$120k", posted: "5 days ago", description: "Make the employee experience thoughtful, inclusive, and genuinely useful. Partner with managers and teammates through every stage of their journey.", responsibilities: ["Support people programs that help teams do their best work.", "Build clear, caring processes for employees and managers.", "Bring a practical, people-centered perspective to the team."], requirements: ["3+ years in people operations, HR, or employee experience.", "Excellent judgment and a warm communication style.", "A thoughtful approach to inclusion and belonging."] },
  { id: "ux-researcher", title: "UX Researcher", company: "Linear", initials: "L", mark: "yellow", image: "assets\\ux-researcher.svg", category: "Design", location: "Remote", type: "Contract", salary: "$75–$95 / hour", posted: "Today", description: "Help us understand the people behind the product. Plan and run research that helps the team make better, more human decisions.", responsibilities: ["Plan qualitative and quantitative studies with product partners.", "Synthesize findings into useful, actionable insights.", "Help teams make space for customer perspectives."], requirements: ["3+ years conducting product or UX research.", "Experience with interviews, usability testing, and synthesis.", "Clear storytelling and a collaborative mindset."] },
  { id: "growth-marketing-lead", title: "Growth Marketing Lead", company: "Linear", initials: "L", mark: "yellow", image: "assets\\brand-marketer.svg", category: "Marketing", location: "Remote", type: "Full-time", salary: "$120k–$150k", posted: "6 hours ago", description: "Lead the next wave of growth for a product people genuinely love. You’ll turn audience insight into campaigns that bring the right people into the funnel and keep them engaged.", responsibilities: ["Design high-impact growth experiments across acquisition and retention channels.", "Partner with product and content teams to turn insight into action.", "Measure what works and help the team learn quickly."], requirements: ["5+ years in growth marketing, lifecycle, or performance marketing.", "Strong analytical thinking and a practical approach to experimentation.", "Clear communication and a collaborative, data-informed mindset."] },
  { id: "backend-engineer", title: "Backend Engineer", company: "Vercel", initials: "V", mark: "green", image: "assets\\frontend-engineer.svg", category: "Engineering", location: "Remote", type: "Full-time", salary: "$150k–$190k", posted: "2 days ago", description: "Build the systems that power fast, dependable experiences for people building on the web. You’ll help shape products that make modern development feel simple and scalable.", responsibilities: ["Design and ship robust backend services that support product growth.", "Work across systems to improve reliability, performance, and developer experience.", "Collaborate closely with product and frontend teams on architecture decisions."], requirements: ["4+ years building backend systems and APIs.", "Experience with distributed systems, databases, and cloud infrastructure.", "Comfort working in a fast-moving, product-driven environment."], },
  { id: "customer-success-manager", title: "Customer Success Manager", company: "Loom", initials: "L", mark: "pink", image: "assets\\people-partner.svg", category: "People", location: "Hybrid", type: "Full-time", salary: "$85k–$110k", posted: "Today", description: "Help customers feel supported, informed, and excited to keep growing with the product. You’ll partner closely with teams to turn feedback into better experiences.", responsibilities: ["Guide customers through onboarding and adoption with a thoughtful, proactive approach.", "Build strong relationships and help customers reach their goals.", "Capture feedback and share it across the business to improve the product."], requirements: ["2+ years in customer success, account management, or onboarding.", "Strong communication and relationship-building skills.", "A customer-first mindset and a calm, helpful approach."], }
];

const pageNames = ["home", "about", "jobs", "details", "login", "register", "profile", "apply", "contact"];
let selectedJob = jobs[0];
let toastTimer;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const storage = {
  read(key, fallback = null) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch (error) {
      console.error(`Unable to read ${key} from local storage.`, error);
      showToast("Saved data could not be read on this device.");
      return fallback;
    }
  },
  write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (error) {
      console.error(`Unable to save ${key} to local storage.`, error);
      showToast("Could not save your information on this device.");
      return false;
    }
  }
};

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function navigate(page, options = {}) {
  const target = pageNames.includes(page) ? page : "home";
  $$(".page").forEach((section) => section.classList.toggle("active", section.dataset.page === target));
  $$(".main-nav a").forEach((link) => link.classList.toggle("active", link.dataset.route === target));
  $("#main-nav").classList.remove("open");
  $("#menu-toggle").setAttribute("aria-expanded", "false");
  if (target === "details") renderDetails();
  if (target === "apply") prepareApplication();
  if (target === "profile") loadProfile();
  if (target === "login") {
    const user = storage.read("jobzy-user");
    if (user) $("#login-form").elements.email.value = user.email;
  }
  if (!options.keepHash) history.replaceState(null, "", `#${target}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function createJobCard(job) {
  const card = document.createElement("article");
  card.className = "job-card";
  card.innerHTML = `<img class="job-image" src="${job.image}" alt="Illustration for ${job.title}" loading="lazy" decoding="async">
    <div class="job-card-content"><div class="job-card-top"><div class="company-mark mark-${job.mark}">${job.initials}</div><button class="save-job" type="button" aria-label="Save ${job.title}" aria-pressed="false">♡</button></div>
    <h2>${job.title}</h2><p class="job-company">${job.company} <span aria-hidden="true">·</span> ${job.posted}</p>
    <div class="job-tags"><span>${job.category}</span><span>${job.location}</span><span>${job.type}</span></div>
    <div class="job-card-bottom"><span class="job-salary">${job.salary} <small>${job.type === "Contract" ? "" : "/ year"}</small></span><button class="text-link" type="button">View details →</button></div></div>`;
  card.querySelector(".text-link").addEventListener("click", () => openJob(job.id));
  card.querySelector(".save-job").addEventListener("click", (event) => {
    const button = event.currentTarget;
    button.classList.toggle("saved");
    button.setAttribute("aria-pressed", String(button.classList.contains("saved")));
    button.textContent = button.classList.contains("saved") ? "♥" : "♡";
    showToast(button.classList.contains("saved") ? "Job saved to your list." : "Job removed from your saved list.");
  });
  return card;
}

function renderJobs() {
  const keyword = $("#jobs-keyword").value.trim().toLowerCase();
  const category = $("#jobs-category").value;
  const location = $("#jobs-location").value;
  const filtered = jobs.filter((job) => {
    const matchesText = !keyword || `${job.title} ${job.company} ${job.category} ${job.location}`.toLowerCase().includes(keyword);
    return matchesText && (!category || job.category === category) && (!location || job.location === location);
  });
  const list = $("#job-list");
  list.replaceChildren();
  $("#job-count").textContent = `${filtered.length} ${filtered.length === 1 ? "open role" : "open roles"}`;
  if (!filtered.length) {
    const empty = document.createElement("div");
    empty.className = "no-results";
    empty.innerHTML = "<h2>No matches just yet.</h2><p>Try a different keyword or clear a filter to see more roles.</p>";
    list.append(empty);
    return;
  }
  filtered.forEach((job) => list.append(createJobCard(job)));
}

function openJob(id) {
  selectedJob = jobs.find((job) => job.id === id) || jobs[0];
  navigate("details");
}

function renderDetails() {
  if (!selectedJob) return;
  const job = selectedJob;
  $("#job-detail-content").innerHTML = `<article class="detail-main">
    <div class="detail-title-row"><div class="company-mark mark-${job.mark}">${job.initials}</div><div><h1>${job.title}</h1><p>${job.company} <span aria-hidden="true">·</span> Posted ${job.posted}</p></div></div>
    <section class="detail-section"><h2>About the role</h2><p>${job.description}</p></section>
    <section class="detail-section"><h2>What you’ll do</h2><ul>${job.responsibilities.map((item) => `<li>${item}</li>`).join("")}</ul></section>
    <section class="detail-section"><h2>What you’ll bring</h2><ul>${job.requirements.map((item) => `<li>${item}</li>`).join("")}</ul></section>
  </article>
  <aside class="detail-aside"><h2>A few details</h2><div class="detail-meta"><small>Salary</small><strong>${job.salary}</strong></div><div class="detail-meta"><small>Location</small><strong>${job.location}</strong></div><div class="detail-meta"><small>Employment type</small><strong>${job.type}</strong></div><div class="detail-meta"><small>Team</small><strong>${job.category}</strong></div><button class="button button-primary" type="button" data-apply>Apply for this job <span aria-hidden="true">→</span></button></aside>`;
  $("[data-apply]", $("#job-detail-content")).addEventListener("click", () => navigate("apply"));
}

function prepareApplication() {
  $("#apply-job-name").textContent = `Applying for ${selectedJob.title} at ${selectedJob.company}. Tell the team why you’re a great fit.`;
  const user = storage.read("jobzy-user");
  if (user) {
    $("#apply-form").elements.name.value = user.name || "";
    $("#apply-form").elements.email.value = user.email || "";
  }
}

function loadProfile() {
  const profile = storage.read("jobzy-profile", {});
  const user = storage.read("jobzy-user");
  const values = { ...profile };
  if (user) {
    values.fullName ||= user.name;
    values.email ||= user.email;
    $("#profile-avatar").textContent = (user.name || "J").trim().charAt(0).toUpperCase();
  }
  const form = $("#profile-form");
  Object.entries(values).forEach(([name, value]) => {
    if (form.elements[name] && typeof value === "string") form.elements[name].value = value;
  });
  const resume = storage.read("jobzy-resume-name");
  if (resume) $("#resume-file-name").textContent = resume;
}

async function hashPassword(password, salt) {
  if (!globalThis.crypto?.subtle) throw new Error("Secure password hashing is unavailable in this browser. Open Jobzy on localhost to use accounts.");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: new TextEncoder().encode(salt), iterations: 120000, hash: "SHA-256" }, key, 256);
  return [...new Uint8Array(bits)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function validateResume(file) {
  if (!file) return true;
  if (!/\.(pdf|doc|docx)$/i.test(file.name)) {
    showToast("Please choose a PDF, DOC, or DOCX file.");
    return false;
  }
  if (file.size > 10 * 1024 * 1024) {
    showToast("Your resume must be 10 MB or smaller.");
    return false;
  }
  return true;
}

$("#menu-toggle").addEventListener("click", () => {
  const nav = $("#main-nav");
  const open = nav.classList.toggle("open");
  $("#menu-toggle").setAttribute("aria-expanded", String(open));
});

document.addEventListener("click", (event) => {
  const route = event.target.closest("[data-route]");
  if (route) {
    event.preventDefault();
    navigate(route.dataset.route);
  }
  const search = event.target.closest("[data-search]");
  if (search) {
    $("#hero-keyword").value = search.dataset.search;
    $("#hero-search").requestSubmit();
  }
});

$("#hero-search").addEventListener("submit", (event) => {
  event.preventDefault();
  $("#jobs-keyword").value = $("#hero-keyword").value.trim();
  $("#jobs-category").value = "";
  const locationText = $("#hero-location").value.trim().toLowerCase();
  $("#jobs-location").value = locationText.includes("remote") ? "Remote" : "";
  renderJobs();
  navigate("jobs");
});
["#jobs-keyword", "#jobs-category", "#jobs-location"].forEach((selector) => $(selector).addEventListener("input", renderJobs));
$("#jobs-category").addEventListener("change", renderJobs);
$("#jobs-location").addEventListener("change", renderJobs);

$("#register-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const currentUser = storage.read("jobzy-user");
  if (currentUser?.email?.toLowerCase() === data.email.trim().toLowerCase()) {
    showToast("An account with this email already exists. Please log in.");
    return;
  }
  try {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const saltText = [...salt].map((byte) => byte.toString(16).padStart(2, "0")).join("");
    const passwordHash = await hashPassword(data.password, saltText);
    if (!storage.write("jobzy-user", { name: data.name.trim(), email: data.email.trim(), salt: saltText, passwordHash })) return;
    storage.write("jobzy-profile", { ...storage.read("jobzy-profile", {}), fullName: data.name.trim(), email: data.email.trim() });
    event.currentTarget.reset();
    showToast("Your Jobzy account is ready. Welcome!");
    navigate("profile");
  } catch (error) {
    console.error("Unable to create the account.", error);
    showToast(error.message || "Your account could not be created.");
  }
});

$("#login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const user = storage.read("jobzy-user");
  if (!user || user.email.toLowerCase() !== data.email.trim().toLowerCase()) {
    showToast("Those details don’t match an account on this device.");
    return;
  }
  try {
    const passwordHash = await hashPassword(data.password, user.salt);
    if (passwordHash !== user.passwordHash) {
      showToast("Those details don’t match an account on this device.");
      return;
    }
    showToast(`Welcome back, ${user.name.split(" ")[0]}!`);
    navigate("profile");
  } catch (error) {
    console.error("Unable to verify the account.", error);
    showToast(error.message || "Your account could not be verified.");
  }
});

$("#profile-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const profile = Object.fromEntries(new FormData(event.currentTarget).entries());
  if (!storage.write("jobzy-profile", profile)) return;
  $("#profile-status").textContent = "Profile saved on this device.";
  showToast("Your profile has been saved.");
});
$("#profile-resume").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!validateResume(file)) { event.target.value = ""; return; }
  if (file) {
    $("#resume-file-name").textContent = file.name;
    storage.write("jobzy-resume-name", file.name);
    showToast("Resume selected. Save your profile to keep your details together.");
  }
});

$("#apply-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const file = $("#apply-resume").files[0];
  if (!validateResume(file)) return;
  const application = Object.fromEntries(new FormData(event.currentTarget).entries());
  application.jobId = selectedJob.id;
  application.jobTitle = selectedJob.title;
  application.company = selectedJob.company;
  application.resume = file?.name || "";
  application.submittedAt = new Date().toISOString();
  const applications = storage.read("jobzy-applications", []);
  applications.push(application);
  if (!storage.write("jobzy-applications", applications)) return;
  event.currentTarget.reset();
  showToast("Application saved. Best of luck with your next step!");
  navigate("jobs");
});

$("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const messages = storage.read("jobzy-messages", []);
  messages.push({ ...Object.fromEntries(new FormData(event.currentTarget).entries()), submittedAt: new Date().toISOString() });
  if (!storage.write("jobzy-messages", messages)) return;
  event.currentTarget.reset();
  showToast("Thanks for reaching out. Your message has been saved.");
});

$("#current-year").textContent = new Date().getFullYear();
renderJobs();
const initialRoute = location.hash.slice(1);
navigate(pageNames.includes(initialRoute) ? initialRoute : "home", { keepHash: true });
window.addEventListener("hashchange", () => {
  const route = location.hash.slice(1);
  if (pageNames.includes(route)) navigate(route, { keepHash: true });
});