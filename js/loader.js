async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
    
    // Re-trigger reveal animations or theme checks if necessary
    if (typeof watchAll === "function") watchAll();
  } catch (err) {
    console.error(`Error loading component: ${componentPath}`, err);
  }
}

// Execute on load
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("nav-placeholder", "components/nav.html");
  loadComponent("footer-placeholder", "components/footer.html");
});
