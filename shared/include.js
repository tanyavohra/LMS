function getBasePathFromScript() {
  const script = document.currentScript || document.querySelector('script[src*="shared/include.js"]');
  if (!script) return "";

  const scriptUrl = new URL(script.src, window.location.href);
  return scriptUrl.pathname.replace(/\/shared\/include\.js$/, "");
}

function prefixRootRelativeUrls(root, basePath) {
  if (!basePath) return;

  const candidates = [
    { selector: "a[href^='/']", attr: "href" },
    { selector: "img[src^='/']", attr: "src" },
    { selector: "link[href^='/']", attr: "href" },
    { selector: "script[src^='/']", attr: "src" },
  ];

  for (const { selector, attr } of candidates) {
    root.querySelectorAll(selector).forEach((node) => {
      const value = node.getAttribute(attr);
      if (!value || !value.startsWith("/") || value.startsWith("//")) return;
      if (value.startsWith(`${basePath}/`) || value === basePath) return;
      node.setAttribute(attr, `${basePath}${value}`);
    });
  }
}

async function includeFragment(targetId, url, basePath) {
  const target = document.getElementById(targetId);
  if (!target) return;

  try {
    const response = await fetch(url, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const htmlText = await response.text();
    const template = document.createElement("template");
    template.innerHTML = htmlText;
    prefixRootRelativeUrls(template.content, basePath);
    target.innerHTML = "";
    target.appendChild(template.content.cloneNode(true));
  } catch (error) {
    // Keep the page usable even if fragments fail to load.
    // eslint-disable-next-line no-console
    console.warn(error);
  }
}

function setupSidebar() {
  const sidebar = document.getElementById("mySidebar");
  if (!sidebar) return;

  const openButton = document.querySelector(".js-sidebar-open");
  const closeButton = document.querySelector(".js-sidebar-close");
  const backdrop = document.querySelector(".js-sidebar-backdrop");

  function openNav() {
    sidebar.style.width = "min(370px, 85vw)";
    sidebar.setAttribute("aria-hidden", "false");
    if (openButton) openButton.setAttribute("aria-expanded", "true");
    if (backdrop) backdrop.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    sidebar.style.width = "0";
    sidebar.setAttribute("aria-hidden", "true");
    if (openButton) openButton.setAttribute("aria-expanded", "false");
    if (backdrop) backdrop.hidden = true;
    document.body.style.overflow = "";
  }

  if (openButton) openButton.addEventListener("click", openNav);
  if (closeButton) closeButton.addEventListener("click", closeNav);
  if (backdrop) backdrop.addEventListener("click", closeNav);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const basePath = getBasePathFromScript();
  await includeFragment("site-header", `${basePath}/shared/header.html`, basePath);
  await includeFragment("site-footer", `${basePath}/shared/footer.html`, basePath);
  prefixRootRelativeUrls(document, basePath);
  setupSidebar();
});
