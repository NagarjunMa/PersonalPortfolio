"use client";

const navItems = [
  { id: "work", label: "Work" },
  { id: "cases", label: "Cases" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://linkedin.com/in/nagarjun-mallesh", label: "LinkedIn" },
  { href: "https://github.com/NagarjunMa", label: "GitHub" },
  { href: "https://medium.com/@nagarjunmallesh", label: "Medium" },
];

export default function NavBar() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <button className="brand-mark" type="button" onClick={() => scrollTo("home")} aria-label="Go home: Nagarjun Mallesh">
          <span aria-hidden="true">-&gt;</span>
          <span>Nagarjun</span>
        </button>

        <div className="social-rail" aria-label="Social links">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button key={item.id} type="button" onClick={() => scrollTo(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
