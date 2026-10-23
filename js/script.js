
const CHAKKI = {
  name: "Apni Aata Chakki",
  location: "Orai, Uttar Pradesh",
  phone: "8468082956",
  whatsapp: "919876543210",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Orai%2C+Uttar+Pradesh"
};

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupFooter();
  setupContactLinks();
  setupProductPrefill();
  setupEnquiryForm();
});

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    });
  });
}

function setupFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  footer.className = "footer";
  footer.innerHTML = `
    <div class="footer-grid">
      <div>
        <a class="brand" href="index.html" style="color:white">
          🌾 ${CHAKKI.name}
        </a>
        <p>Gehu pisai aur aata products ke liye
        aapki local chakki.</p>
        <p>📍 ${CHAKKI.location}</p>
      </div>
      <div>
        <h3>Quick Links</h3>
        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="products.html">Products</a>
          <a href="services.html">Services</a>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact & Enquiry</a>
        </div>
      </div>
      <div>
        <h3>Contact</h3>
        <p class="footer-phone">Phone number update karna baaki hai</p>
        <a href="contact.html">Enquiry bhejein →</a>
      </div>
    </div>
    <div class="footer-bottom">
      © ${new Date().getFullYear()} ${CHAKKI.name}. All rights reserved.
    </div>
  `;
}

function setupContactLinks() {
  document.querySelectorAll("[data-call]").forEach(link => {
    if (CHAKKI.phone) {
      link.href = `tel:${CHAKKI.phone}`;
    } else {
      link.href = "#";
      link.addEventListener("click", event => {
        event.preventDefault();
        alert("Pehle js/script.js mein chakki ka phone number add karein.");
      });
    }
  });

  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    if (CHAKKI.whatsapp) {
      link.href = `https://wa.me/${CHAKKI.whatsapp}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "#";
      link.addEventListener("click", event => {
        event.preventDefault();
        alert("Pehle js/script.js mein WhatsApp number add karein.");
      });
    }
  });

  document.querySelectorAll("[data-maps]").forEach(link => {
    link.href = CHAKKI.mapsUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  const phoneText = document.getElementById("contact-phone");
  if (phoneText && CHAKKI.phone) {
    phoneText.textContent = CHAKKI.phone;
  }

  document.querySelectorAll(".footer-phone").forEach(el => {
    el.textContent = CHAKKI.phone || "Phone number update karna baaki hai";
  });

  const whatsappForm = document.querySelector(".whatsapp-form");

  if (whatsappForm) {
    whatsappForm.addEventListener("click", () => {
      if (!CHAKKI.whatsapp) {
        alert("WhatsApp number abhi add nahi kiya gaya hai.");
        return;
      }

      const form = document.getElementById("enquiryForm");
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const message = [
        `Namaste ${CHAKKI.name}!`,
        "Mujhe aapki chakki ke baare mein enquiry karni hai.",
        `Naam: ${data.get("name")}`,
        `Mobile: ${data.get("phone")}`,
        `Requirement: ${data.get("requirement")}`,
        `Quantity: ${data.get("quantity") || "Nahi batayi"}`,
        `Message: ${data.get("message") || "Nahi diya"}`
      ].join("\n");

      const url = `https://wa.me/${CHAKKI.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }
}

function setupProductPrefill() {
  const select = document.getElementById("requirement");
  if (!select) return;

  const product = new URLSearchParams(window.location.search).get("product");
  if (!product) return;

  const value = product.toLowerCase();

  if (value.includes("pisai")) {
    select.value = "Gehu Pisai";
  } else if (value.includes("makka")) {
    select.value = "Makka Aata";
  } else if (value.includes("bulk")) {
    select.value = "Bulk Order";
  } else if (value.includes("purchase") || value.includes("aata")) {
    select.value = "Aata Purchase";
  } else {
    select.value = "Other Enquiry";
  }

  document.getElementById("enquiry-form")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function setupEnquiryForm() {
  const form = document.getElementById("enquiryForm");
  const status = document.getElementById("form-status");

  if (!form || !status) return;

  form.addEventListener("submit", event => {
    const endpoint = form.getAttribute("action") || "";

    if (endpoint.includes("YOUR_FORM_ID")) {
      event.preventDefault();
      status.textContent =
        "Form ka design taiyar hai. Real enquiry receive karne ke liye Formspree ID configure karein, ya WhatsApp button use karein.";
      status.style.color = "#9a5b12";
      return;
    }

    status.textContent = "Enquiry submit ho rahi hai...";
    status.style.color = "#245b3c";
  });
}
