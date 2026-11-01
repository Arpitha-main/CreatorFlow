const $ = id => document.getElementById(id);

const dealModal = $("dealModal");
const dealForm = $("dealForm");
const taskList = $("taskList");
const toast = $("toast");

const OLD_DEAL_KEY = "creatorflow-deals-v2";
const OLD_TASK_KEY = "creatorflow-tasks";
const USERS_KEY = "creatorflow-demo-users";
const SESSION_KEY = "creatorflow-demo-session";

let deals = [];
let tasks = [];
let activeUser = null;
let editingDealId = null;
let toastTimer;
let selectedCalendarDate = new Date();
let calendarMonth = new Date();

/* =================================
   STARTER DATA
================================= */

const starterDeals = [
  {
    id: 1,
    brand: "Fastrack",
    campaign: "New Year drip reel",
    platform: "Instagram",
    contact: "creators@fastrack.in",
    amount: 5000,
    paid: 5000,
    deadline: "2026-01-20",
    paymentDue: "2026-01-30",
    status: "Completed"
  },
  {
    id: 2,
    brand: "Nykaa",
    campaign: "Valentine beauty review",
    platform: "YouTube",
    contact: "partnerships@nykaa.com",
    amount: 8000,
    paid: 8000,
    deadline: "2026-02-18",
    paymentDue: "2026-02-28",
    status: "Completed"
  },
  {
    id: 3,
    brand: "Puma",
    campaign: "Spring street style",
    platform: "Instagram",
    contact: "collabs@puma.com",
    amount: 12000,
    paid: 12000,
    deadline: "2026-03-15",
    paymentDue: "2026-03-25",
    status: "Completed"
  },
  {
    id: 4,
    brand: "boAt",
    campaign: "Airdopes lifestyle unboxing",
    platform: "YouTube",
    contact: "influencers@boat-lifestyle.com",
    amount: 16000,
    paid: 16000,
    deadline: "2026-04-22",
    paymentDue: "2026-04-30",
    status: "Completed"
  },
  {
    id: 5,
    brand: "Myntra",
    campaign: "Summer fashion haul",
    platform: "Instagram",
    contact: "brandcollabs@myntra.com",
    amount: 20000,
    paid: 20000,
    deadline: "2026-05-18",
    paymentDue: "2026-05-28",
    status: "Completed"
  },
  {
    id: 6,
    brand: "Zomato",
    campaign: "Late night cravings reel",
    platform: "TikTok",
    contact: "@zomatocreators",
    amount: 25000,
    paid: 25000,
    deadline: "2026-06-25",
    paymentDue: "2026-07-05",
    status: "Completed"
  },
  {
    id: 7,
    brand: "Gymshark",
    campaign: "Summer conditioning training",
    platform: "Instagram",
    contact: "influencers@gymshark.com",
    amount: 30000,
    paid: 30000,
    deadline: "2026-07-20",
    paymentDue: "2026-07-30",
    status: "Completed"
  },
  {
    id: 8,
    brand: "Mamaearth",
    campaign: "Natural skincare routine",
    platform: "YouTube",
    contact: "collabs@mamaearth.in",
    amount: 8000,
    paid: 8000,
    deadline: "2026-08-14",
    paymentDue: "2026-08-24",
    status: "Completed"
  },
  {
    id: 9,
    brand: "Red Bull",
    campaign: "Energy boost showcase",
    platform: "YouTube",
    contact: "partnerships@redbull.com",
    amount: 48000,
    paid: 48000,
    deadline: "2026-09-10",
    paymentDue: "2026-09-20",
    status: "Completed"
  },
  {
    id: 10,
    brand: "Samsung",
    campaign: "Galaxy Creator camera test",
    platform: "Instagram",
    contact: "creators@samsung.com",
    amount: 68000,
    paid: 68000,
    deadline: "2026-10-24",
    paymentDue: "2026-11-04",
    status: "Completed"
  },
  {
    id: 11,
    brand: "Nike",
    campaign: "Just Do It winter launch",
    deliverables: [
      "1x IG Reel styling winter apparel",
      "3x Instagram Stories with swipe-up link",
      "Submit campaign performance report"
    ],
    platform: "Instagram",
    contact: "collabs@nike.com",
    amount: 85000,
    paid: 45000,
    deadline: "2026-11-08",
    paymentDue: "2026-11-15",
    status: "In progress"
  },
  {
    id: 12,
    brand: "Amazon",
    campaign: "Great Indian Festival showcase",
    deliverables: [
      "Dedicated 60s YouTube integration",
      "Pinned comment with tracked discount link",
      "Community tab announcement post"
    ],
    platform: "YouTube",
    contact: "@amazoninfluencer",
    amount: 100000,
    paid: 20000,
    deadline: "2026-12-18",
    paymentDue: "2026-12-25",
    status: "In review"
  }
];

const starterTasks = [
  {
    id: "starter-nike-1",
    dealId: 11,
    title: "1x IG Reel styling winter apparel",
    detail: "Nike · Instagram · Due 08 Nov 2026",
    dueDate: "2026-11-08",
    completed: false
  },
  {
    id: "starter-nike-2",
    dealId: 11,
    title: "3x Instagram Stories with swipe-up link",
    detail: "Nike · Instagram · Due 08 Nov 2026",
    dueDate: "2026-11-08",
    completed: false
  },
  {
    id: "starter-nike-3",
    dealId: 11,
    title: "Submit campaign performance report",
    detail: "Nike · Instagram · Due 08 Nov 2026",
    dueDate: "2026-11-08",
    completed: false
  },
  {
    id: "starter-amazon-1",
    dealId: 12,
    title: "Dedicated 60s YouTube integration",
    detail: "Amazon · YouTube · Due 18 Dec 2026",
    dueDate: "2026-12-18",
    completed: false
  },
  {
    id: "starter-amazon-2",
    dealId: 12,
    title: "Pinned comment with tracked discount link",
    detail: "Amazon · YouTube · Due 18 Dec 2026",
    dueDate: "2026-12-18",
    completed: false
  },
  {
    id: "starter-amazon-3",
    dealId: 12,
    title: "Community tab announcement post",
    detail: "Amazon · YouTube · Due 18 Dec 2026",
    dueDate: "2026-12-18",
    completed: false
  },
  {
    id: 1,
    title: "Plan this week's content calendar",
    detail: "Content planning · Today",
    completed: false
  },
  {
    id: 2,
    title: "Review analytics and brand rate card",
    detail: "Business growth · This week",
    completed: false
  }
];

/* =================================
   GENERAL HELPERS
================================= */

function showToast(message) {
  toast.textContent = "✓ " + message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function formatCurrency(value) {
  return "₹" + Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2
  });
}

function parseLocalDate(value) {
  if (!value) return null;

  const parts = value.split("-").map(Number);

  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function formatDate(value) {
  const date = parseLocalDate(value);

  if (!date) return "Not set";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function shortDate(value) {
  const date = parseLocalDate(value);

  if (!date) return { day: "--", month: "---" };

  return {
    day: date.toLocaleDateString("en-IN", { day: "2-digit" }),
    month: date.toLocaleDateString("en-IN", { month: "short" }).toUpperCase()
  };
}

function getDateKey(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-");
}

function userKey(type) {
  return `creatorflow-${type}-${activeUser.email}`;
}

function statusClass(status) {
  if (status === "In review") return "review";
  if (status === "Pending") return "pending";
  if (status === "Completed") return "completed-status";
  return "in-progress";
}

function paymentStatus(deal) {
  if (Number(deal.paid) >= Number(deal.amount)) return "Paid";
  if (Number(deal.paid) > 0) return "Partially paid";
  return "Pending";
}

function paymentClass(status) {
  if (status === "Paid") return "paid-status";
  if (status === "Partially paid") return "partial-status";
  return "unpaid-status";
}

/* =================================
   LOGIN AND SIGNUP
================================= */

const app = document.querySelector(".app");

app.style.display = "none";

const authScreen = document.createElement("div");
authScreen.id = "authScreen";
authScreen.className = "auth-screen";

document.body.prepend(authScreen);

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function showAuth(mode = "login", message = "") {
  app.style.display = "none";
  authScreen.style.display = "grid";

  const isSignup = mode === "signup";

  authScreen.innerHTML = `
    <div class="auth-card">
      <div class="auth-logo">✦</div>
      <h1>creator<span>flow</span></h1>
      <p class="auth-subtitle">
        Your creator business, beautifully organized.
      </p>

      <h2>${isSignup ? "Create your account" : "Welcome back!"}</h2>
      <p class="auth-description">
        ${isSignup ? "Start organizing your creator journey." : "Log in to your creator workspace."}
      </p>

      <form id="authForm">
        ${isSignup ? `
          <label>
            Your name
            <input id="authName" required placeholder="Enter your name">
          </label>
        ` : ""}

        <label>
          Email address
          <input id="authEmail" type="email" required placeholder="you@example.com">
        </label>

        <label>
          Password
          <input id="authPassword" type="password" required minlength="6" placeholder="At least 6 characters">
        </label>

        <p class="auth-error" id="authError">${message}</p>

        <button class="primary-btn auth-submit" type="submit">
          ${isSignup ? "Create account →" : "Log in →"}
        </button>
      </form>

      <p class="auth-switch">
        ${isSignup ? "Already have an account?" : "New to CreatorFlow?"}
        <button type="button" id="authSwitch">
          ${isSignup ? "Log in" : "Sign up"}
        </button>
      </p>

      <small class="auth-demo-note">
        Demo authentication for your hackathon prototype.
      </small>
    </div>
  `;

  $("authSwitch").addEventListener("click", () => {
    showAuth(isSignup ? "login" : "signup");
  });

  $("authForm").addEventListener("submit", event => {
    event.preventDefault();

    const email = $("authEmail").value.trim().toLowerCase();
    const password = $("authPassword").value;

    const users = getUsers();

    if (isSignup) {
      const name = $("authName").value.trim();

      if (!name) {
        $("authError").textContent = "Please enter your name.";
        return;
      }

      if (users.some(user => user.email === email)) {
        $("authError").textContent = "This email already has an account. Please log in.";
        return;
      }

      const user = { name, email, password };

      users.push(user);
      saveUsers(users);

      activateUser(user);
      return;
    }

    const user = users.find(item =>
      item.email === email && item.password === password
    );

    if (!user) {
      $("authError").textContent = "Incorrect email or password.";
      return;
    }

    activateUser(user);
  });
}

function activateUser(user) {
  activeUser = user;

  localStorage.setItem(SESSION_KEY, user.email);

  const savedDeals = localStorage.getItem(userKey("deals"));
  const savedTasks = localStorage.getItem(userKey("tasks"));

  if (savedDeals !== null) {
    deals = JSON.parse(savedDeals);
    if (Array.isArray(deals) && deals.length <= 3 && deals.every(d => [1, 2, 3].includes(d.id))) {
      deals = starterDeals.map(deal => ({ ...deal }));
    }
  } else {
    const oldDeals = localStorage.getItem(OLD_DEAL_KEY);

    if (!localStorage.getItem("creatorflow-legacy-migrated") && oldDeals) {
      deals = JSON.parse(oldDeals);
    } else {
      deals = starterDeals.map(deal => ({ ...deal }));
    }
  }

  if (savedTasks !== null) {
    tasks = JSON.parse(savedTasks);
  } else {
    const oldTasks = localStorage.getItem(OLD_TASK_KEY);

    if (!localStorage.getItem("creatorflow-legacy-migrated") && oldTasks) {
      tasks = JSON.parse(oldTasks);
    } else {
      tasks = starterTasks.map(task => ({ ...task }));
    }
  }

  // Ensure active deals with deliverables have linked tasks in the task list
  deals.forEach(deal => {
    if (deal.deliverables && deal.deliverables.length) {
      const hasTasks = tasks.some(t => String(t.dealId) === String(deal.id));
      if (!hasTasks) {
        syncDeliverablesToTasks(deal);
      }
    }
  });

  localStorage.setItem("creatorflow-legacy-migrated", "true");

  saveDeals();
  saveTasks();
  updateProfile();
  setupAvatarEditor();

  authScreen.style.display = "none";
  app.style.display = "grid";

  initializeDashboard();
}

function logout() {
  saveDeals();
  saveTasks();

  localStorage.removeItem(SESSION_KEY);

  activeUser = null;

  showAuth("login");
}

function updateProfile() {
  const initials = activeUser.name
    .split(" ")
    .map(part => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const profile = document.querySelector(".profile");

  const avatar = profile.querySelector(".avatar");

  if (activeUser.avatar) {
    avatar.textContent = "";
    avatar.style.backgroundImage = `url("${activeUser.avatar}")`;
    avatar.style.backgroundSize = "cover";
    avatar.style.backgroundPosition = "center";
  } else {
    avatar.style.backgroundImage = "none";
    avatar.textContent = initials;
  }

  profile.querySelector("strong").textContent = activeUser.name;

  const logoutButton = document.getElementById("logoutBtn");

  if (logoutButton) {
    logoutButton.onclick = logout;
  }

  const topAvatar = document.querySelector(".top-avatar");

  if (topAvatar) {
    if (activeUser.avatar) {
      topAvatar.textContent = "";
      topAvatar.style.backgroundImage = `url("${activeUser.avatar}")`;
      topAvatar.style.backgroundSize = "cover";
      topAvatar.style.backgroundPosition = "center";
    } else {
      topAvatar.style.backgroundImage = "none";
      topAvatar.textContent = initials;
    }
    topAvatar.title = "Change avatar (" + activeUser.name + ")";
  }

  const welcome = document.querySelector(".welcome-row h1");

  if (welcome) {
    welcome.textContent = `Good morning, ${activeUser.name} ✦`;
  }
}

/* =================================
   STORAGE
================================= */

function saveDeals() {
  if (!activeUser) return;

  try {
    localStorage.setItem(userKey("deals"), JSON.stringify(deals));
  } catch (error) {
    console.error(error);
    showToast("Could not save deals.");
  }
}

function saveTasks() {
  if (!activeUser) return;

  try {
    localStorage.setItem(userKey("tasks"), JSON.stringify(tasks));
  } catch (error) {
    console.error(error);
    showToast("Could not save tasks.");
  }
}

/* =================================
   BRAND DEALS AND PAYMENTS
================================= */

function addActionButton(text, className, id, label) {
  const button = document.createElement("button");

  button.type = "button";
  button.textContent = text;
  button.className = className;
  button.dataset.id = id;
  button.title = label;

  return button;
}

function renderDeals() {
  const tbody = $("dealsTable");
  tbody.replaceChildren();

  const headerRow = document.querySelector("table thead tr");

  if (headerRow && !headerRow.querySelector(".actions-heading")) {
    const heading = document.createElement("th");
    heading.textContent = "ACTIONS";
    heading.className = "actions-heading";
    headerRow.append(heading);
  }

  deals.forEach(deal => {
    const row = document.createElement("tr");

    const brandCell = document.createElement("td");
    const wrap = document.createElement("div");
    wrap.className = "brand-cell";

    const logo = document.createElement("span");
    logo.className = "company-logo";
    logo.textContent = deal.brand.trim().charAt(0).toUpperCase();

    const info = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = deal.brand;

    const campaign = document.createElement("small");
    campaign.textContent = deal.campaign;

    info.append(name, campaign);
    wrap.append(logo, info);
    brandCell.append(wrap);

    const platformCell = document.createElement("td");
    const platformTag = document.createElement("span");
    platformTag.className = "platform-tag";
    platformTag.textContent = deal.platform;
    platformCell.append(platformTag);

    const contactCell = document.createElement("td");
    const contactVal = (deal.contact || "").trim();

    if (contactVal) {
      const isEmail = contactVal.includes("@") && !contactVal.startsWith("@") && contactVal.includes(".");
      const isUrl = contactVal.startsWith("http://") || contactVal.startsWith("https://");

      const link = document.createElement("a");
      link.className = "contact-link";

      if (isEmail) {
        link.href = `mailto:${contactVal}`;
        link.innerHTML = `<span class="contact-icon">✉</span> ${contactVal}`;
        link.title = `Send email to ${contactVal}`;
      } else if (isUrl) {
        link.href = contactVal;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.innerHTML = `<span class="contact-icon">↗</span> ${contactVal.replace(/^https?:\/\/(www\.)?/, "")}`;
        link.title = `Open ${contactVal}`;
      } else {
        link.href = "#";
        link.innerHTML = `<span class="contact-icon">${contactVal.startsWith("@") ? "" : "@"}</span>${contactVal}`;
        link.title = `Click to copy ${contactVal}`;
        link.addEventListener("click", event => {
          event.preventDefault();
          if (navigator.clipboard) {
            navigator.clipboard.writeText(contactVal).then(() => {
              showToast(`Copied ${contactVal} to clipboard!`);
            }).catch(() => {
              showToast(`Contact: ${contactVal}`);
            });
          } else {
            showToast(`Contact: ${contactVal}`);
          }
        });
      }

      contactCell.append(link);
    } else {
      const empty = document.createElement("span");
      empty.className = "contact-empty";
      empty.textContent = "—";
      contactCell.append(empty);
    }

    const statusCell = document.createElement("td");
    const status = document.createElement("span");
    status.className = "status " + statusClass(deal.status);
    status.textContent = deal.status;
    statusCell.append(status);

    const dateCell = document.createElement("td");
    dateCell.textContent = formatDate(deal.deadline);

    const amountCell = document.createElement("td");
    amountCell.className = "amount";
    amountCell.textContent = formatCurrency(deal.amount);

    const paidCell = document.createElement("td");
    paidCell.className = "amount";
    paidCell.textContent = formatCurrency(deal.paid);

    const pendingCell = document.createElement("td");
    pendingCell.className = "amount";
    pendingCell.textContent = formatCurrency(
      Math.max(0, Number(deal.amount) - Number(deal.paid))
    );

    const actionsCell = document.createElement("td");
    actionsCell.className = "deal-actions";

    actionsCell.append(
      addActionButton("Edit", "edit-btn", deal.id, "Edit deal"),
      addActionButton("Delete", "delete-btn", deal.id, "Delete deal")
    );

    row.append(
      brandCell,
      platformCell,
      contactCell,
      statusCell,
      dateCell,
      amountCell,
      paidCell,
      pendingCell,
      actionsCell
    );

    tbody.append(row);
  });

  const total = deals.reduce(
    (sum, deal) => sum + Number(deal.amount || 0), 0
  );

  const paid = deals.reduce(
    (sum, deal) => sum + Math.min(
      Number(deal.paid || 0),
      Number(deal.amount || 0)
    ), 0
  );

  const pending = Math.max(0, total - paid);

  $("totalDeals").textContent = deals.length;
  $("navDealCount").textContent = deals.length;

  $("overviewPaymentTotal").textContent = formatCurrency(total);
  $("overviewPaymentPaid").textContent = formatCurrency(paid);
  $("overviewPaymentPending").textContent = formatCurrency(pending);

  $("paymentExpected").textContent = formatCurrency(total);
  $("paymentPaid").textContent = formatCurrency(paid);
  $("paymentPending").textContent = formatCurrency(pending);

  const paidPercent = total > 0 ? (paid / total) * 100 : 0;

  $("paidBar").style.width = paidPercent + "%";
  $("pendingBar").style.width = (100 - paidPercent) + "%";

  $("paymentNote").textContent =
    `${Math.round(paidPercent)}% received · ${Math.round(100 - paidPercent)}% still pending`;
}

$("dealsTable").addEventListener("click", event => {
  const editButton = event.target.closest(".edit-btn");
  const deleteButton = event.target.closest(".delete-btn");

  if (editButton) {
    const deal = deals.find(item => String(item.id) === editButton.dataset.id);
    if (deal) openDealModal(deal);
  }

  if (deleteButton) {
    const deal = deals.find(item => String(item.id) === deleteButton.dataset.id);

    if (deal && confirm(`Delete the ${deal.brand} deal? This cannot be undone.`)) {
      deals = deals.filter(item => String(item.id) !== deleteButton.dataset.id);
      tasks = tasks.filter(item => String(item.dealId) !== deleteButton.dataset.id);

      saveDeals();
      saveTasks();
      refreshDashboard();

      showToast("Brand deal deleted.");
    }
  }
});

/* =================================
   ADD AND EDIT DEAL MODAL
================================= */

function openDealModal(deal = null) {
  editingDealId = deal ? deal.id : null;

  dealForm.reset();

  $("brandName").value = deal?.brand || "";
  $("campaignName").value = deal?.campaign || "";

  let delivText = "";
  if (Array.isArray(deal?.deliverables) && deal.deliverables.length) {
    delivText = deal.deliverables.join("\n");
  } else if (typeof deal?.deliverables === "string" && deal.deliverables.trim()) {
    delivText = deal.deliverables;
  } else if (deal && deal.id) {
    const linked = tasks.filter(t => String(t.dealId) === String(deal.id));
    if (linked.length) {
      delivText = linked.map(t => t.title).join("\n");
    }
  }
  $("dealDeliverables").value = delivText;

  $("dealPlatform").value = deal?.platform || "";
  $("dealContact").value = deal?.contact || "";
  $("dealAmount").value = deal?.amount ?? "";
  $("amountPaid").value = deal?.paid ?? 0;
  $("dealDeadline").value = deal?.deadline || "";
  $("paymentDueDate").value = deal?.paymentDue || "";
  $("dealStatus").value = deal?.status || "In progress";

  dealModal.querySelector(".modal-heading h2").textContent =
    deal ? "Edit brand deal" : "Add a brand deal";

  dealModal.querySelector(".modal-heading .eyebrow").textContent =
    deal ? "UPDATE COLLABORATION" : "NEW COLLABORATION";

  dealForm.querySelector('button[type="submit"]').innerHTML =
    deal ? "Save changes →" : "Create deal →";

  dealModal.classList.add("show");
}

function hideModal() {
  dealModal.classList.remove("show");
  dealForm.reset();
  editingDealId = null;
}

$("addDealBtn").addEventListener("click", () => openDealModal());
$("closeModal").addEventListener("click", hideModal);
$("cancelModal").addEventListener("click", hideModal);

dealModal.addEventListener("click", event => {
  if (event.target === dealModal) hideModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    hideModal();
    closeTemplatePreview();
  }
});

/* =================================
   AUTOMATIC DEAL TASKS & SYNC
================================= */

function cleanDeliverableText(str) {
  if (!str) return "";
  let s = String(str).trim();
  // Strip leading bullet characters (•, -, *, >, ✦, etc.)
  s = s.replace(/^[\s•\-\*\>\✦\·\–\—]+/, "").trim();
  // Strip numbered prefixes like "1. ", "1) ", "(1) " but keep quantities like "1x Reel" or "1 Instagram reel"
  s = s.replace(/^\(?\d+[\.\)]\s*/, "").trim();
  return s;
}

function parseDeliverablesInput(rawInput) {
  if (Array.isArray(rawInput)) {
    return rawInput.map(cleanDeliverableText).filter(Boolean);
  }
  if (!rawInput || typeof rawInput !== "string") return [];

  const lines = rawInput.split(/\r?\n|;/);
  const items = [];

  for (const line of lines) {
    const parts = line.split(",");
    for (const part of parts) {
      const cleaned = cleanDeliverableText(part);
      if (cleaned) items.push(cleaned);
    }
  }

  return items;
}

function syncDeliverablesToTasks(deal) {
  if (!deal || !deal.id) return;

  const rawDeliverables = deal.deliverables;
  let items = parseDeliverablesInput(rawDeliverables);

  const dealIdStr = String(deal.id);
  const existingForDeal = tasks.filter(t => String(t.dealId) === dealIdStr);
  const otherTasks = tasks.filter(t => String(t.dealId) !== dealIdStr);

  if (items.length === 0) {
    if (existingForDeal.length === 0) {
      items = ["Create campaign content", "Review and submit content"];
    } else {
      tasks = otherTasks;
      saveTasks();
      return;
    }
  }

  const syncedDealTasks = items.map((deliverableTitle, idx) => {
    // Preserve existing task completion state and ID if already present
    const existing = existingForDeal.find(
      t => t.title.toLowerCase().trim() === deliverableTitle.toLowerCase().trim()
    ) || (existingForDeal[idx] && existingForDeal.length === items.length ? existingForDeal[idx] : null);

    if (existing) {
      return {
        ...existing,
        title: deliverableTitle,
        detail: `${deal.brand} · ${deal.platform} · Due ${formatDate(deal.deadline)}`,
        dueDate: deal.deadline,
        dealId: deal.id
      };
    }

    return {
      id: `task-${deal.id}-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000)}`,
      title: deliverableTitle,
      detail: `${deal.brand} · ${deal.platform} · Due ${formatDate(deal.deadline)}`,
      dueDate: deal.deadline,
      dealId: deal.id,
      completed: deal.status === "Completed"
    };
  });

  // Prepend synced deal tasks so they appear at the top of the task list
  tasks = [...syncedDealTasks, ...otherTasks];
  saveTasks();
}

function syncDealStatusFromTasks(dealId) {
  if (dealId === undefined || dealId === null) return null;

  const dealIdStr = String(dealId);
  const linkedTasks = tasks.filter(task => String(task.dealId) === dealIdStr);
  if (!linkedTasks.length) return null;

  const deal = deals.find(item => String(item.id) === dealIdStr);
  if (!deal) return null;

  const prevStatus = deal.status;
  const allCompleted = linkedTasks.every(task => Boolean(task.completed));

  let changed = false;

  if (allCompleted) {
    if (deal.status !== "Completed") {
      deal.status = "Completed";
      changed = true;
    }
  } else {
    // If not all tasks are completed and deal was previously marked Completed, revert to In progress
    if (deal.status === "Completed") {
      deal.status = "In progress";
      changed = true;
    }
  }

  if (changed) {
    saveDeals();
  }

  return {
    changed,
    deal,
    brand: deal.brand,
    status: deal.status,
    allCompleted
  };
}

dealForm.addEventListener("submit", event => {
  event.preventDefault();

  const brand = $("brandName").value.trim();
  const campaign = $("campaignName").value.trim();

  const deliverables = parseDeliverablesInput($("dealDeliverables").value);

  const platform = $("dealPlatform").value;
  const contact = $("dealContact").value.trim();
  const amount = Number($("dealAmount").value);
  const paid = Number($("amountPaid").value);
  const deadline = $("dealDeadline").value;
  const paymentDue = $("paymentDueDate").value;
  const status = $("dealStatus").value;

  if (
    !brand || !campaign || !platform || !deadline ||
    !Number.isFinite(amount) || amount <= 0 ||
    !Number.isFinite(paid) || paid < 0 || paid > amount
  ) {
    showToast("Check your details. Paid amount cannot exceed deal amount.");
    return;
  }

  const dealId = editingDealId || Date.now();

  const dealData = {
    id: dealId,
    brand,
    campaign,
    deliverables,
    platform,
    contact,
    amount,
    paid,
    deadline,
    paymentDue,
    status
  };

  const wasEditing = editingDealId !== null;

  if (wasEditing) {
    deals = deals.map(deal =>
      String(deal.id) === String(editingDealId) ? dealData : deal
    );
  } else {
    // Put new deal at the beginning so it appears immediately at the top
    deals.unshift(dealData);
  }

  // Synchronize deliverables to tasks for both new and edited deals
  syncDeliverablesToTasks(dealData);

  // If status was explicitly set to Completed in modal, mark all its tasks completed
  if (status === "Completed") {
    tasks.forEach(t => {
      if (String(t.dealId) === String(dealId)) {
        t.completed = true;
      }
    });
    saveTasks();
  } else {
    syncDealStatusFromTasks(dealId);
  }

  saveDeals();
  hideModal();
  refreshDashboard();

  showToast(wasEditing ? "Deal and deliverables updated!" : "New brand deal added!");
});

/* =================================
   TASK MANAGER
================================= */

function renderTasks() {
  taskList.replaceChildren();

  tasks.forEach(task => {
    const item = document.createElement("div");
    item.className = "task-item";

    if (task.completed) item.classList.add("completed");

    const label = document.createElement("label");
    label.className = "task-toggle";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(task.completed);
    checkbox.dataset.id = task.id;

    const check = document.createElement("span");
    check.className = "custom-check";

    label.append(checkbox, check);

    const copy = document.createElement("span");
    copy.className = "task-copy";

    const title = document.createElement("strong");
    title.textContent = task.title;

    const detail = document.createElement("small");
    detail.textContent = task.detail;

    copy.append(title, detail);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    actions.append(
      addActionButton("Edit", "edit-task-btn", task.id, "Edit task"),
      addActionButton("×", "delete-task-btn", task.id, "Delete task")
    );

    item.append(label, copy, actions);
    taskList.append(item);
  });

  updateTaskProgress();
}

function updateTaskProgress() {
  const completed = tasks.filter(task => task.completed).length;
  const pending = tasks.length - completed;

  const percentage = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  $("pendingTasks").textContent = pending;
  $("taskCount").textContent = pending;

  $("taskProgressText").textContent =
    `${completed} of ${tasks.length} completed`;

  $("taskPercent").textContent = percentage + "%";
  $("taskProgressBar").style.width = percentage + "%";
}

function addTask(title, detail) {
  tasks.push({
    id: Date.now() + Math.random(),
    title,
    detail,
    completed: false
  });

  saveTasks();
  renderTasks();
}

$("addTaskBtn").addEventListener("click", () => {
  const title = prompt("Enter your task name:");

  if (!title || !title.trim()) return;

  const detail = prompt("Enter task details:", "Personal task") || "Personal task";

  addTask(title.trim(), detail.trim());

  showToast("Task added!");
});

taskList.addEventListener("change", event => {
  if (!event.target.matches('input[type="checkbox"]')) return;

  const task = tasks.find(
    item => String(item.id) === event.target.dataset.id
  );

  if (!task) return;

  task.completed = event.target.checked;

  if (task.dealId !== undefined && task.dealId !== null) {
    syncDealStatusFromTasks(task.dealId);
  }

  saveTasks();
  renderTasks();
  renderDeals();

  showToast(task.completed ? "Task completed!" : "Task marked pending.");
});

taskList.addEventListener("click", event => {
  const editButton = event.target.closest(".edit-task-btn");
  const deleteButton = event.target.closest(".delete-task-btn");

  if (editButton) {
    const task = tasks.find(
      item => String(item.id) === editButton.dataset.id
    );

    if (!task) return;

    const newTitle = prompt("Edit task name:", task.title);

    if (newTitle === null || !newTitle.trim()) return;

    const newDetail = prompt("Edit task details:", task.detail);

    if (newDetail === null) return;

    task.title = newTitle.trim();
    task.detail = newDetail.trim();

    saveTasks();
    renderTasks();

    showToast("Task updated!");
  }

  if (deleteButton) {
    const id = deleteButton.dataset.id;
    const task = tasks.find(item => String(item.id) === id);

    if (task && confirm(`Delete task "${task.title}"?`)) {
      tasks = tasks.filter(item => String(item.id) !== id);

      saveTasks();
      renderTasks();

      showToast("Task deleted.");
    }
  }
});

/* =================================
   UPCOMING DEADLINES
================================= */

function renderDeadlines() {
  const list = $("deadlineList");
  list.replaceChildren();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const reminders = [
    ...deals.filter(deal => deal.deadline && deal.status !== "Completed").map(deal => ({
      date: deal.deadline,
      title: `${deal.brand} — ${deal.campaign}`,
      detail: `${deal.platform} · Campaign deadline`,
      kind: "deal"
    })),

    ...tasks.filter(task => task.dueDate && !task.completed).map(task => ({
      date: task.dueDate,
      title: task.title,
      detail: task.dealId ? "Brand deal deliverable" : "Task deadline",
      kind: "task"
    }))
  ]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 8);

  reminders.forEach(reminder => {
    const date = shortDate(reminder.date);
    const target = parseLocalDate(reminder.date);
    const diff = Math.ceil((target - today) / 86400000);

    const item = document.createElement("div");
    item.className = "deadline-item" + (diff < 0 ? " overdue" : "");

    const box = document.createElement("div");
    box.className = "date-box";

    const day = document.createElement("strong");
    day.textContent = date.day;

    const month = document.createElement("small");
    month.textContent = date.month;

    box.append(day, month);

    const copy = document.createElement("div");
    copy.className = "deadline-copy";

    const title = document.createElement("strong");
    title.textContent = reminder.title;

    const detail = document.createElement("small");
    detail.textContent = reminder.detail;

    copy.append(title, detail);

    const tag = document.createElement("span");
    tag.className = "due-tag" + (diff <= 7 ? " urgent" : "");
    tag.textContent =
      diff < 0 ? "Overdue" : diff === 0 ? "Today" : `In ${diff} days`;

    item.append(box, copy, tag);
    list.append(item);
  });

  if (!reminders.length) {
    const empty = document.createElement("p");
    empty.className = "calendar-empty";
    empty.textContent = "You're all caught up. No open deadlines.";
    list.append(empty);
  }

  const count = reminders.filter(item => {
    const diff = (parseLocalDate(item.date) - today) / 86400000;
    return diff >= 0 && diff <= 7;
  }).length;

  $("upcomingDeadlines").textContent = count;
}

/* =================================
   GROWTH GRAPH
================================= */

function formatCompactCurrency(value) {
  if (value >= 10000000) return "₹" + (value / 10000000).toFixed(1) + "Cr";
  if (value >= 100000) return "₹" + (value / 100000).toFixed(1) + "L";
  if (value >= 1000) return "₹" + (value / 1000).toFixed(0) + "K";
  return "₹" + Math.round(value);
}

// Generates smooth cubic Bézier spline curve segments through data points
function getSmoothSpline(points, tension = 0.22, yMin = 65, yMax = 300) {
  if (!points || !points.length) return "";
  let curves = "";
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < points.length - 2 ? points[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) * tension;
    let cp1y = p1.y + (p2.y - p0.y) * tension;

    const cp2x = p2.x - (p3.x - p1.x) * tension;
    let cp2y = p2.y - (p3.y - p1.y) * tension;

    // Keep control points within upper and lower chart bounds
    cp1y = Math.min(yMax, Math.max(yMin, cp1y));
    cp2y = Math.min(yMax, Math.max(yMin, cp2y));

    curves += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return curves;
}

function renderGrowth() {
  const grid = $("lineGrid");
  const area = $("monthlyArea");
  const line = $("monthlyLine");
  const pointsGroup = $("linePoints");
  const monthsContainer = $("growthMonths");
  const labels = $("lineYLabels");

  if (!grid || !line || !pointsGroup || !monthsContainer || !labels) return;

  const now = new Date();
  const currentYear = now.getFullYear();

  // Full 12-month calendar year Jan - Dec
  const months = [];
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  for (let i = 0; i < 12; i++) {
    months.push({
      year: currentYear,
      month: i,
      label: monthNames[i]
    });
  }

  const values = months.map(month =>
    deals.filter(deal => {
      if (!deal.deadline) return false;
      const date = parseLocalDate(deal.deadline);
      return date.getFullYear() === month.year &&
        date.getMonth() === month.month;
    }).reduce((sum, deal) => sum + Number(deal.amount || 0), 0)
  );

  const total = values.reduce((sum, value) => sum + value, 0);
  const maxValue = Math.max(...values);
  const bestIndex = values.indexOf(maxValue);

  // Set friendly scale max
  const scaleMax = maxValue > 0
    ? Math.ceil(maxValue / 1000) * 1000
    : 1000;

  $("growthTotal").textContent = formatCurrency(total);
  $("growthBestMonth").textContent =
    maxValue > 0 ? months[bestIndex].label : "—";

  // Coordinates matching viewBox="0 0 800 360"
  const xMin = 55;
  const xMax = 705;
  const yMin = 65;   // Top margin of plot
  const yMax = 300;  // Baseline of plot
  const plotWidth = xMax - xMin;
  const plotHeight = yMax - yMin;

  grid.replaceChildren();
  labels.replaceChildren();
  monthsContainer.replaceChildren();

  // 1. Horizontal Dotted Grid Lines & Y-Axis Labels (Right side in cyan)
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    const fraction = i / steps;
    const val = scaleMax * (1 - fraction);
    const y = yMin + fraction * plotHeight;

    const hLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    hLine.setAttribute("x1", xMin);
    hLine.setAttribute("x2", xMax);
    hLine.setAttribute("y1", y);
    hLine.setAttribute("y2", y);
    hLine.setAttribute("stroke", "rgba(103, 232, 249, 0.28)");
    hLine.setAttribute("stroke-dasharray", "2 3");
    hLine.setAttribute("stroke-width", "1");
    grid.append(hLine);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", xMax + 12);
    text.setAttribute("y", y + 4);
    text.setAttribute("fill", "#67e8f9");
    text.setAttribute("font-size", "11");
    text.setAttribute("font-weight", "600");
    text.setAttribute("text-anchor", "start");
    text.textContent = val === 0 ? "0" : formatCompactCurrency(val);
    labels.append(text);
  }

  // 2. Vertical Dotted Grid Lines & X-Axis Month Labels (Bottom in cyan)
  const points = months.map((month, index) => {
    const x = xMin + (index / (months.length - 1)) * plotWidth;
    const value = values[index];
    const y = yMax - (value / scaleMax) * plotHeight;

    const vLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    vLine.setAttribute("x1", x);
    vLine.setAttribute("x2", x);
    vLine.setAttribute("y1", yMin);
    vLine.setAttribute("y2", yMax);
    vLine.setAttribute("stroke", "rgba(103, 232, 249, 0.28)");
    vLine.setAttribute("stroke-dasharray", "2 3");
    vLine.setAttribute("stroke-width", "1");
    grid.append(vLine);

    const mText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    mText.setAttribute("x", x);
    mText.setAttribute("y", yMax + 26);
    mText.setAttribute("fill", "#38bdf8");
    mText.setAttribute("font-size", "12");
    mText.setAttribute("font-weight", "700");
    mText.setAttribute("text-anchor", "middle");
    mText.textContent = month.label;
    monthsContainer.append(mText);

    return { x, y, value, month: month.label, index };
  });

  // 3. Smooth Area Path (Green glowing fill under curve)
  if (area && points.length) {
    const spline = getSmoothSpline(points, 0.22, yMin, yMax);
    const areaPath = `M ${points[0].x.toFixed(1)} ${yMax.toFixed(1)} L ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}${spline} L ${points[points.length - 1].x.toFixed(1)} ${yMax.toFixed(1)} Z`;
    area.setAttribute("d", areaPath);
  }

  // 4. Smooth Growth Line Path (Red to Pink to White gradient stroke)
  if (points.length) {
    const spline = getSmoothSpline(points, 0.22, yMin, yMax);
    const linePath = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}${spline}`;
    line.setAttribute("d", linePath);
  }

  // 5. Data Point Nodes (Luminous glowing circles along the smooth curve)
  pointsGroup.replaceChildren();

  points.forEach(point => {
    const isBest = point.index === bestIndex && maxValue > 0;
    const isPeak = isBest || (point.value >= scaleMax * 0.75);
    const isMedium = point.value >= scaleMax * 0.35;
    const dotFill = isPeak ? "#ffffff" : (isMedium ? "#f472b6" : "#f43f5e");
    const dotStroke = isPeak ? "#ffffff" : "rgba(255, 255, 255, 0.9)";

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", point.x);
    circle.setAttribute("cy", point.y);
    circle.setAttribute("r", isBest ? "6.5" : "5");
    circle.setAttribute("fill", dotFill);
    circle.setAttribute("stroke", dotStroke);
    circle.setAttribute("stroke-width", isBest ? "2.5" : "1.8");
    circle.setAttribute("filter", "url(#pointGlow)");
    circle.style.cursor = "pointer";

    const tooltip = document.createElementNS("http://www.w3.org/2000/svg", "title");
    tooltip.textContent = `${point.month}: ${formatCurrency(point.value)}`;
    circle.append(tooltip);

    pointsGroup.append(circle);
  });

  $("growthNote").textContent = maxValue > 0
    ? `Your strongest month is ${months[bestIndex].label}, with ${formatCurrency(maxValue)} in brand deals.`
    : "Add brand deals with campaign deadlines to see your monthly growth line.";
}

/* =================================
   CALENDAR
================================= */

function getCalendarEvents(dateKey) {
  const events = [];

  tasks.forEach(task => {
    if (task.dueDate === dateKey && !task.completed) {
      events.push({
        type: "task",
        title: task.title,
        detail: task.dealId
          ? "Brand deal deliverable · Task due"
          : "Task due"
      });
    }
  });

  deals.forEach(deal => {
    if (deal.deadline === dateKey) {
      events.push({
        type: "campaign",
        title: `${deal.brand} — ${deal.campaign}`,
        detail: `${deal.platform} · Campaign deadline`
      });
    }

    if (deal.paymentDue && deal.paymentDue === dateKey) {
      events.push({
        type: "payment",
        title: `${deal.brand} payment`,
        detail: `Payment due · ${formatCurrency(
          Math.max(0, Number(deal.amount) - Number(deal.paid))
        )} pending`
      });
    }
  });

  return events;
}

function renderSelectedDate() {
  const dateKey = getDateKey(selectedCalendarDate);

  $("selectedDateTitle").textContent =
    selectedCalendarDate.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });

  const container = $("calendarEvents");
  container.replaceChildren();

  const events = getCalendarEvents(dateKey);

  if (!events.length) {
    const empty = document.createElement("p");
    empty.className = "calendar-empty";
    empty.textContent = "No events scheduled for this date.";
    container.append(empty);
    return;
  }

  events.forEach(event => {
    const item = document.createElement("div");
    item.className = "calendar-event";

    const mark = document.createElement("span");

    mark.className = "calendar-event-mark" +
      (event.type === "payment" ? " payment" : "");

    const copy = document.createElement("div");

    const title = document.createElement("strong");
    title.textContent = event.title;

    const detail = document.createElement("small");
    detail.textContent = event.detail;

    copy.append(title, detail);
    item.append(mark, copy);
    container.append(item);
  });
}

function renderCalendar() {
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();

  $("calendarMonth").textContent =
    calendarMonth.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric"
    });

  const daysContainer = $("calendarDays");
  daysContainer.replaceChildren();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayKey = getDateKey(new Date());

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar-day empty";
    daysContainer.append(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateKey = getDateKey(date);
    const events = getCalendarEvents(dateKey);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";

    if (dateKey === todayKey) button.classList.add("today");

    if (dateKey === getDateKey(selectedCalendarDate)) {
      button.classList.add("selected");
    }

    const number = document.createElement("span");
    number.className = "day-number";
    number.textContent = day;

    button.append(number);

    if (events.some(event => event.type === "campaign")) {
      const dot = document.createElement("i");
      dot.className = "calendar-dot campaign";
      button.append(dot);
    }

    if (events.some(event => event.type === "payment")) {
      const dot = document.createElement("i");
      dot.className = "calendar-dot payment";
      button.append(dot);
    }

    if (events.length) {
      const count = document.createElement("span");
      count.className = "calendar-event-count";
      count.textContent =
        `${events.length} event${events.length > 1 ? "s" : ""}`;

      button.append(count);
    }

    button.addEventListener("click", () => {
      selectedCalendarDate = date;
      renderCalendar();
    });

    daysContainer.append(button);
  }

  renderSelectedDate();
}

$("prevMonth").addEventListener("click", () => {
  calendarMonth.setMonth(calendarMonth.getMonth() - 1);
  renderCalendar();
});

$("nextMonth").addEventListener("click", () => {
  calendarMonth.setMonth(calendarMonth.getMonth() + 1);
  renderCalendar();
});

/* =================================
   DASHBOARD REFRESH
================================= */

function refreshDashboard() {
  renderDeals();
  renderDeadlines();
  renderGrowth();
  renderCalendar();
  renderTasks();
}

/* =================================
   CREATOR TEMPLATES
================================= */

const creatorTemplates = [
  {
    id: "ig-bundle",
    category: "campaign",
    categoryLabel: "Campaign Package",
    icon: "📱",
    title: "Instagram Reel & Story Package",
    description: "High-impact social collaboration bundle tailored for product awareness, organic discovery, and link traffic.",
    tags: ["Instagram", "Reel", "Stories"],
    suggestedAmount: 25000,
    platform: "Instagram",
    campaign: "Instagram Reel & Story Showcase",
    deliverables: [
      "1x 60s Reel showcasing product in use with trending audio",
      "2x Stories with brand tag and direct link sticker",
      "30-day digital advertising and whitelisting rights"
    ],
    content: `INSTAGRAM CAMPAIGN PACKAGE
Platform: Instagram
Deliverables:
1. 1x 60-second high-energy Reel highlighting key product features and real-life demonstration.
2. 2x Instagram Stories with interactive poll/question sticker + direct link sticker.
3. 30-day digital advertising usage rights.
4. Final raw assets delivered in 9:16 4K format.`
  },
  {
    id: "yt-integration",
    category: "campaign",
    categoryLabel: "Campaign Package",
    icon: "🎥",
    title: "YouTube Dedicated Mid-Roll",
    description: "In-depth video sponsorship with authentic testimonial, custom discount code, and pinned comment.",
    tags: ["YouTube", "Integration", "Sponsorship"],
    suggestedAmount: 45000,
    platform: "YouTube",
    campaign: "60-90s Dedicated YouTube Sponsorship",
    deliverables: [
      "60-90s dedicated integrated segment within main video",
      "Pinned top comment with tracked affiliate or discount link",
      "Link in the first 3 lines of video description"
    ],
    content: `YOUTUBE SPONSORSHIP PACKAGE
Platform: YouTube
Deliverables:
1. 60-90s dedicated integrated segment in the first half of the video.
2. Pinned top comment with tracked promotional link and discount code.
3. Link and promo description in the top 3 lines of the description box.
4. Permanent placement with no deletion or archiving.`
  },
  {
    id: "tiktok-ugc",
    category: "campaign",
    categoryLabel: "Campaign Package",
    icon: "✨",
    title: "TikTok & UGC Creator Bundle",
    description: "Organic viral-style product review + Spark Ad authorization code for paid acquisition boosting.",
    tags: ["TikTok", "UGC", "Spark Ads"],
    suggestedAmount: 30000,
    platform: "TikTok",
    campaign: "2x TikTok UGC Product Showcase",
    deliverables: [
      "2x Viral-hook TikTok videos with organic storytelling",
      "Spark Ad 30-day authorization code for performance boosting",
      "High-res raw video footage for brand's internal channels"
    ],
    content: `TIKTOK & UGC PACKAGE
Platform: TikTok
Deliverables:
1. 2x Organic viral-hook TikTok videos focusing on problem-solution storytelling.
2. Spark Ad 30-day authorization code for performance ad boosting.
3. Clean raw 4K video clips transferred via Google Drive / Dropbox for internal brand ads.`
  },
  {
    id: "pitch-email",
    category: "email",
    categoryLabel: "Pitch & Outreach",
    icon: "📩",
    title: "High-Converting Brand Pitch Email",
    description: "Proven cold outreach template to pitch brand marketing managers, PR agencies, and founders.",
    tags: ["Email", "Pitch", "Outreach"],
    content: `Subject: Collaboration Proposal: [Your Name/Handle] × [Brand Name]

Hi [Brand Marketing Team / Contact Name],

I hope you're having a great week!

I've been following [Brand Name] closely and love your recent launch of [Product/Campaign]. Your focus on [mention brand value, e.g. clean ingredients / modern creator gear] truly resonates with my audience.

I create content around [Your Niche: e.g. tech & productivity, fitness, lifestyle], where my community of [Follower Count, e.g. 50K+] creators actively seeks honest recommendations. My recent collaborations have generated an average engagement rate of [X%] and over [X] impressions per campaign.

I would love to partner with [Brand Name] on an upcoming campaign. A few collaboration ideas tailored to your audience:
• 1x High-engagement Reel/TikTok demonstrating [specific product] in an everyday routine
• Multi-story sequence featuring a custom promo code & direct purchase link
• Optional Spark Ad / Whitelisting rights for your paid marketing campaigns

I've attached my media kit with audience demographics, recent case studies, and performance statistics. 

Would you be open to a quick 5-minute call or email chat this Thursday to explore this further?

Warm regards,

[Your Name]
[Creator Handle / Link to Profile]
[Your Phone / Portfolio Link]`
  },
  {
    id: "payment-reminder",
    category: "email",
    categoryLabel: "Finance & Invoicing",
    icon: "💳",
    title: "Polite Payment Follow-Up Email",
    description: "Professional, cordial follow-up email to politely nudge clients on pending or overdue payments.",
    tags: ["Email", "Finance", "Invoice"],
    content: `Subject: Friendly Follow-Up: Invoice #[Invoice No.] for [Campaign Name] — [Brand Name]

Hi [Client Name / Finance Team],

I hope you're doing well!

I'm writing to gently check in on invoice #[Invoice No.] for the [Campaign Name] collaboration, which had a scheduled payment date of [Due Date] for the amount of [₹XX,XXX].

Could you please confirm if this invoice has been approved for processing, or let me know if you need any additional tax documentation, GST details, or invoices re-sent from my end?

For your reference, here are my payment details:
• Bank Name: [Your Bank]
• Account Number: [Account No.]
• IFSC / SWIFT Code: [IFSC Code]
• UPI ID: [yourname@upi]
• Total Due: [₹XX,XXX]

Thank you so much for the wonderful collaboration on this campaign. I look forward to working together again soon!

Best regards,

[Your Name]
[Your Creator Business Name / Contact]`
  },
  {
    id: "contract-checklist",
    category: "legal",
    categoryLabel: "Agreements & Legal",
    icon: "📜",
    title: "Creator Contract Protection Checklist",
    description: "Essential protective terms every creator must include in brand collaboration agreements.",
    tags: ["Contract", "Scope", "Protection"],
    content: `CREATOR COLLABORATION AGREEMENT ESSENTIAL CHECKLIST

1. DELIVERABLES & SPECIFICATIONS:
   - Clearly state exact format (e.g. 1x 9:16 Instagram Reel, 30-60s length).
   - Define whether sound is trending audio vs brand-owned commercial audio.
   - Specify posting dates and active duration before archiving.

2. REVISION POLICY:
   - Maximum of two (2) rounds of minor edits included.
   - Edits must be requested within 3 business days of draft submission.
   - Script re-writes or full re-shoots after initial storyboard approval incur a 25% re-shoot fee.

3. PAYMENT SCHEDULE & ADVANCE:
   - Minimum 50% non-refundable deposit upon contract signing before filming begins.
   - Remaining 50% payable strictly within 15 days of content go-live date.
   - 2% per month late fee applied to payments overdue beyond 30 days.

4. EXCLUSIVITY BOUNDARIES:
   - Exclusivity must be limited strictly to direct competitor category (not broad industry).
   - Exclusivity period should not exceed 30 days from publication without additional compensation.

5. USAGE RIGHTS & WHITELISTING:
   - Base fee covers organic posting on creator's profile only.
   - Paid ad amplification (Meta Whitelisting, TikTok Spark Ads) requires a separate monthly licensing fee (suggested 30% of base rate per 30 days).

6. CANCELLATION & KILL FEE:
   - If brand cancels after production starts, creator retains the 50% advance deposit.
   - If cancelled after final content submission, 100% of agreed fee is payable.`
  }
];

function useTemplateAsDeal(templateId) {
  const template = creatorTemplates.find(t => t.id === templateId);
  if (!template) return;

  openDealModal({
    brand: "",
    campaign: template.campaign || template.title,
    deliverables: template.deliverables || [],
    platform: template.platform || "Instagram",
    contact: "",
    amount: template.suggestedAmount || 25000,
    paid: 0,
    deadline: "",
    paymentDue: "",
    status: "In progress"
  });

  editingDealId = null;
  dealModal.querySelector(".modal-heading h2").textContent = "Add a brand deal (from Template)";
  dealModal.querySelector(".modal-heading .eyebrow").textContent = "TEMPLATE PRE-FILLED";

  $("brandName").focus();
  showToast(`Loaded ${template.title} into new deal!`);
}

function copyTemplateText(content) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(content)
      .then(() => showToast("Template copied to clipboard!"))
      .catch(() => fallbackCopy(content));
  } else {
    fallbackCopy(content);
  }
}

function fallbackCopy(content) {
  const temp = document.createElement("textarea");
  temp.value = content;
  document.body.append(temp);
  temp.select();
  document.execCommand("copy");
  temp.remove();
  showToast("Template copied to clipboard!");
}

function openTemplatePreview(templateId) {
  const template = creatorTemplates.find(t => t.id === templateId);
  if (!template) return;

  const modal = $("templateModal");
  if (!modal) return;

  $("templateModalCategory").textContent = template.categoryLabel.toUpperCase();
  $("templateModalTitle").textContent = template.title;
  $("templateModalSubtitle").textContent = template.description;
  $("templateModalContent").value = template.content;

  $("copyTemplateModalBtn").onclick = () => {
    copyTemplateText(template.content);
  };

  modal.classList.add("show");
}

function closeTemplatePreview() {
  const modal = $("templateModal");
  if (modal) modal.classList.remove("show");
}

function renderTemplates(filter = "all") {
  const container = $("templatesGrid");
  if (!container) return;

  container.replaceChildren();

  const filtered = filter === "all"
    ? creatorTemplates
    : creatorTemplates.filter(t => t.category === filter);

  filtered.forEach(template => {
    const card = document.createElement("article");
    card.className = "template-card";

    const top = document.createElement("div");
    top.className = "template-card-top";

    const icon = document.createElement("span");
    icon.className = "template-card-icon";
    icon.textContent = template.icon;

    const badge = document.createElement("span");
    badge.className = "template-card-badge";
    badge.textContent = template.categoryLabel;

    top.append(icon, badge);

    const title = document.createElement("h3");
    title.textContent = template.title;

    const desc = document.createElement("p");
    desc.textContent = template.description;

    card.append(top, title, desc);

    if (Array.isArray(template.deliverables) && template.deliverables.length) {
      const dWrap = document.createElement("div");
      dWrap.className = "template-deliverables";
      template.deliverables.forEach(item => {
        const dItem = document.createElement("div");
        dItem.className = "template-deliverable-item";
        dItem.innerHTML = `<span>✓</span> ${item}`;
        dWrap.append(dItem);
      });
      card.append(dWrap);
    }

    const foot = document.createElement("div");
    foot.className = "template-card-foot";

    if (template.category === "campaign") {
      const useBtn = document.createElement("button");
      useBtn.type = "button";
      useBtn.className = "template-action-btn template-use-btn";
      useBtn.innerHTML = "Use as deal ＋";
      useBtn.onclick = () => useTemplateAsDeal(template.id);

      const previewBtn = document.createElement("button");
      previewBtn.type = "button";
      previewBtn.className = "template-action-btn";
      previewBtn.innerHTML = "Preview 👁";
      previewBtn.onclick = () => openTemplatePreview(template.id);

      foot.append(previewBtn, useBtn);
    } else {
      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.className = "template-action-btn template-use-btn";
      copyBtn.innerHTML = "Copy template 📋";
      copyBtn.onclick = () => copyTemplateText(template.content);

      const previewBtn = document.createElement("button");
      previewBtn.type = "button";
      previewBtn.className = "template-action-btn";
      previewBtn.innerHTML = "Preview 👁";
      previewBtn.onclick = () => openTemplatePreview(template.id);

      foot.append(previewBtn, copyBtn);
    }

    card.append(foot);
    container.append(card);
  });
}

function setupTemplateTabs() {
  const tabs = document.querySelectorAll(".template-tab");
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderTemplates(tab.dataset.filter);
    };
  });

  const closeBtn = $("closeTemplateModal");
  const cancelBtn = $("cancelTemplateModal");
  if (closeBtn) closeBtn.onclick = closeTemplatePreview;
  if (cancelBtn) cancelBtn.onclick = closeTemplatePreview;

  const modal = $("templateModal");
  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) closeTemplatePreview();
    };
  }
}

function initializeDashboard() {
  const today = new Date();
  const localDate = getDateKey(today);

  $("dealDeadline").min = localDate;
  $("paymentDueDate").min = localDate;

  $("todayLabel").textContent =
    today.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric"
    });

  calendarMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  selectedCalendarDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  refreshDashboard();
  renderTemplates();
  setupTemplateTabs();
}

/* =================================
   NAVIGATION AND OTHER BUTTONS
================================= */

$("viewDealsBtn").addEventListener("click", () => {
  $("deals").scrollIntoView({ behavior: "smooth" });
});

const templateBtn = $("templateBtn");
if (templateBtn) {
  templateBtn.addEventListener("click", () => {
    $("templates").scrollIntoView({ behavior: "smooth" });
  });
}

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(item => {
      item.classList.remove("active");
    });

    link.classList.add("active");
    $("sidebar").classList.remove("open");
  });
});

$("menuBtn").addEventListener("click", () => {
  $("sidebar").classList.toggle("open");
});

/* =================================
   START APP
================================= */

const savedSession = localStorage.getItem(SESSION_KEY);

if (savedSession) {
  const user = getUsers().find(item => item.email === savedSession);

  if (user) {
    activateUser(user);
  } else {
    showAuth("login");
  }
} else {
  showAuth("login");

}
function setupAvatarEditor() {
  const avatarButton = document.getElementById("avatarButton");
  const topAvatarButton = document.getElementById("topAvatarButton") || document.querySelector(".top-avatar");
  const upload = document.getElementById("avatarUpload");
  const editButton = document.getElementById("editProfileBtn");

  if (!upload) return;

  if (avatarButton) {
    avatarButton.onclick = () => upload.click();
  }

  if (topAvatarButton) {
    topAvatarButton.onclick = () => upload.click();
  }

  upload.onchange = () => {
    const file = upload.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      activeUser.avatar = reader.result;
      saveProfile();
      updateProfile();
    };

    reader.readAsDataURL(file);
    upload.value = "";
  };

  if (editButton) {
    editButton.onclick = () => {
      const name = prompt("Enter your display name:", activeUser.name);
      if (!name || !name.trim()) return;

      activeUser.name = name.trim();
      saveProfile();
      updateProfile();
    };
  }
}

function saveProfile() {
  const users = getUsers();
  const index = users.findIndex(user => user.email === activeUser.email);

  if (index !== -1) {
    users[index] = activeUser;
    saveUsers(users);
  }
}
