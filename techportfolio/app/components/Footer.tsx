import Link from "next/link";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#blog", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <Link href="#home" className="footer-brand">
          Nagarjun <span>Mallesh.</span>
        </Link>

        <nav className="footer-links" aria-label="Footer navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="footer-social">
          <a href="mailto:nagarjunmallesh@gmail.com">Email</a>
          <a
            href="https://linkedin.com/in/nagarjun-mallesh"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/NagarjunMa"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
