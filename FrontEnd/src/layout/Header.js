import { Link } from "react-router-dom";
import { Sparkles, Menu, X, Zap } from "lucide-react";
import { useState, useEffect } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`header-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <Sparkles size={24} style={{ marginRight: "8px" }} />
            Affiliate++
          </Link>

          {/* Desktop Navigation */}
          <div className="header-links">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register" className="cta-button">
              <Zap size={16} style={{ marginRight: "5px" }} />
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="header-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="header-mobile-links">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
          </div>
        )}

        {/* Floating Particles */}
        <div className="particles">
          <div className="particle pink"></div>
          <div className="particle purple"></div>
          <div className="particle blue"></div>
        </div>
      </nav>

      <style>{`
        .header-nav {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 50;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .header-nav.scrolled {
          background: rgba(0, 0, 0, 0.7);
          box-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        .header-container {
          max-width: 1200px;
          margin: auto;
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-logo {
          display: flex;
          align-items: center;
          font-size: 20px;
          font-weight: bold;
          text-decoration: none;
          color: white;
        }
        .header-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .header-links a {
          text-decoration: none;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          transition: background 0.3s;
        }
        .header-links a:hover {
          background: rgba(255,255,255,0.2);
        }
        .cta-button {
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          color: white;
          padding: 8px 14px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          font-weight: bold;
          box-shadow: 0 0 10px #ec4899;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px #ec4899;
        }
        .header-menu-icon {
          display: none;
          cursor: pointer;
          color: white;
        }
        .header-mobile-links {
          display: none;
          flex-direction: column;
          background: rgba(0,0,0,0.8);
          padding: 10px 20px;
        }
        .header-mobile-links a {
          text-decoration: none;
          color: white;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        .particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .particle {
          position: absolute;
          border-radius: 999px;
          opacity: 0.3;
          animation: float 6s infinite ease-in-out;
        }
        .pink { top: 30%; left: 25%; width: 8px; height: 8px; background: pink; }
        .purple { top: 10%; right: 30%; width: 6px; height: 6px; background: purple; }
        .blue { bottom: 5%; left: 50%; width: 10px; height: 10px; background: lightblue; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @media (max-width: 768px) {
          .header-links {
            display: none;
          }
          .header-menu-icon {
            display: block;
          }
          .header-mobile-links {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}

export default Header;
