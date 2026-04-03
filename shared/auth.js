const USERS_KEY = "lms_users_v1";
const SESSION_KEY = "lms_session_v1";

function getBasePathFromScript() {
  const script =
    document.currentScript ||
    document.querySelector('script[src*="shared/auth.js"]');
  if (!script) return "";

  const scriptUrl = new URL(script.src, window.location.href);
  return scriptUrl.pathname.replace(/\/shared\/auth\.js$/, "");
}

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function showMessage(container, message, type) {
  if (!container) return;
  container.textContent = message;
  container.className = `auth-message auth-message--${type}`;
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function validatePassword(password) {
  return String(password || "").trim().length >= 6;
}

document.addEventListener("DOMContentLoaded", () => {
  const role = document.body?.dataset?.role;
  if (!role) return;

  const basePath = getBasePathFromScript();

  const signUpForm = document.getElementById("signup-form");
  const signInForm = document.getElementById("signin-form");

  const signUpMessage = document.getElementById("signup-message");
  const signInMessage = document.getElementById("signin-message");

  if (signUpForm) {
    signUpForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("signup-name")?.value?.trim() || "";
      const email = normalizeEmail(
        document.getElementById("signup-email")?.value
      );
      const password = document.getElementById("signup-password")?.value || "";
      const confirm =
        document.getElementById("signup-confirm")?.value || "";

      if (!name || !email) {
        showMessage(signUpMessage, "Please enter name and email.", "error");
        return;
      }
      if (!validatePassword(password)) {
        showMessage(
          signUpMessage,
          "Password must be at least 6 characters.",
          "error"
        );
        return;
      }
      if (password !== confirm) {
        showMessage(signUpMessage, "Passwords do not match.", "error");
        return;
      }

      const users = loadUsers();
      const exists = users.some(
        (u) => u.role === role && normalizeEmail(u.email) === email
      );
      if (exists) {
        showMessage(
          signUpMessage,
          "Account already exists. Please sign in.",
          "error"
        );
        return;
      }

      users.push({
        role,
        name,
        email,
        password, // demo only (do not use plaintext passwords in real apps)
        createdAt: new Date().toISOString(),
      });
      saveUsers(users);
      showMessage(signUpMessage, "Account created. You can sign in now.", "ok");

      signUpForm.reset();
      document.getElementById("container")?.classList.remove("active");
    });
  }

  if (signInForm) {
    signInForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = normalizeEmail(
        document.getElementById("signin-email")?.value
      );
      const password = document.getElementById("signin-password")?.value || "";

      if (!email || !password) {
        showMessage(signInMessage, "Please enter email and password.", "error");
        return;
      }

      const users = loadUsers();
      const user = users.find(
        (u) =>
          u.role === role &&
          normalizeEmail(u.email) === email &&
          String(u.password) === String(password)
      );

      if (!user) {
        showMessage(signInMessage, "Invalid credentials.", "error");
        return;
      }

      setSession({
        role,
        email: user.email,
        name: user.name,
        signedInAt: new Date().toISOString(),
      });

      showMessage(signInMessage, "Signed in. Redirecting…", "ok");

      window.setTimeout(() => {
        window.location.href = `${basePath}/dashboard/index.html`;
      }, 600);
    });
  }
});
