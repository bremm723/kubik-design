// ========================== NAVBAR ANIMATION ==========================
window.addEventListener("load", () => {
  const navbar = document.getElementById("navbar");
  setTimeout(() => {
    navbar.classList.add("show");
  }, 300);
});

// ========================== SCROLL ARROW ==========================
document.getElementById("scroll-arrow").addEventListener("click", () => {
  document.getElementById("content").scrollIntoView({
    behavior: "smooth"
  });
});

// ========================== COPY LINK ==========================
function copyLink() {
  const link = window.location.href; // ambil URL halaman sekarang
  navigator.clipboard.writeText(link)
    .then(() => {
      alert("Link berhasil disalin!");
    })
    .catch(() => {
      alert("Gagal menyalin link");
    });
}

// ========================== SCROLL TO TOP ==========================
document.querySelector(".footer-logo").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================== SMOOTH SCROLL FOR ANCHOR ==========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// ========================== HAMBURGER MENU ==========================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Tutup menu kalau klik salah satu link
const links = document.querySelectorAll(".nav-links a");
links.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// ========================== SMOOTH SCROLL ALL ANCHORS ==========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60, // biar gak ketutup navbar
        behavior: "smooth"
      });
    }
  });
});

// ========================== COPY LINK (🔗 BUTTON) ==========================


// ========================== NAVBAR SHOW + SECTION ANIMATION ==========================
/* window.addEventListener("load", () => {
  const navbar = document.getElementById("navbar");
  setTimeout(() => {
    navbar.classList.add("show");
  }, 300);

  // Hero
  document.querySelector(".hero-content").classList.add("show");

  // Section pertama langsung muncul
  document.querySelectorAll(".section-header img").forEach(el => el.classList.add("show"));
  document.querySelectorAll(".section-text").forEach(el => el.classList.add("show"));
}); */

// ========================== INTERSECTION OBSERVER ==========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target); // hanya animasi sekali
    }
  });
}, { threshold: 0.2 });

// Tambahkan ke elemen
document.querySelectorAll(".fade-in, .slide-left, .slide-right, .zoom-in, .photo-scroll img, footer")
  .forEach(el => observer.observe(el));

// ========================== BAGIAN BERANDA ==========================
document.addEventListener("DOMContentLoaded", () => {
  // GSAP Register Plugin
  gsap.registerPlugin(ScrollTrigger);

  // 1. Animasi Hero Gambar saat scroll
  gsap.to(".hero-img", {
    scale: 1,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // 2. Teks Hero masuk dengan efek bounce
  gsap.to(".hero-text h1", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "bounce.out",
    delay: 0.3
  });

  // 3. Animasi Section teks saat masuk viewport
  gsap.utils.toArray(".content h2, .content p").forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });
});

// ========================== TUTUP BAGIAN BERANDA ==========================


// ========================== START BAGIAN PROFIL ==========================
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let revealTop = reveals[i].getBoundingClientRect().top;
    let revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);

// ========================== END PROFIL ==========================


// ========================== BERANDA - PROSES PEMESANAN (SLIDER GAMBAR) ==========================
document.addEventListener("DOMContentLoaded", () => {
  let index = 0;
  const slides = document.querySelectorAll(".slide");
  const total = slides.length;
  const slidesContainer = document.querySelector(".slides");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");

  function showSlide(n) {
    if (!slidesContainer) return;
    index = (n + total) % total;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showSlide(index - 1);
    });

    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showSlide(index + 1);
    });
  }

  // Auto-slide setiap 4 detik
  setInterval(() => showSlide(index + 1), 4000);
});
