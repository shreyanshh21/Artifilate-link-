import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  const handleJoinNow = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero">
          <h1>Affiliate++</h1>
          <p>The #1 platform to monetize your traffic with ease and transparency.</p>
          <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2>Our Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Easy Link Generation</h3>
              <p>Generate unique affiliate links in seconds with our intuitive dashboard. No technical knowledge required.</p>
            </div>
            <div className="feature-card">
              <h3>Real-Time Analytics</h3>
              <p>Track clicks, conversions, and commissions live to optimize your campaigns effectively.</p>
            </div>
            <div className="feature-card">
              <h3>Fast Payouts</h3>
              <p>Receive your affiliate earnings directly to your account with minimal waiting time.</p>
            </div>
            <div className="feature-card">
              <h3>Secure Dashboard</h3>
              <p>All your data is protected with end-to-end encryption ensuring security and privacy.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <h3>1. Register</h3>
              <p>Sign up for your free Affiliate++ account in just a few clicks.</p>
            </div>
            <div className="step">
              <h3>2. Share Links</h3>
              <p>Generate affiliate links for products and share them anywhere online.</p>
            </div>
            <div className="step">
              <h3>3. Earn</h3>
              <p>Get paid for every successful sale made through your affiliate links.</p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="cta-banner">
          <h2>Ready to boost your income with Affiliate++?</h2>
          <button className="cta-button" onClick={handleJoinNow}>Join Now</button>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2025 Affiliate++. All rights reserved.</p>
        </footer>
      </div>

      <style>{`
        .home-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: white;
          background: linear-gradient(135deg, #4f46e5, #6d28d9);
        }

        .hero {
          text-align: center;
          padding: 80px 20px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
        }

        .hero h1 {
          font-size: 48px;
          margin-bottom: 10px;
        }

        .hero p {
          font-size: 18px;
          margin-bottom: 20px;
        }

        .cta-button {
          padding: 12px 30px;
          border: none;
          border-radius: 999px;
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          color: white;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 0 10px #ec4899;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .cta-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px #ec4899;
        }

        .features {
          padding: 60px 20px;
          text-align: center;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .feature-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 20px;
        }

        .how-it-works {
          padding: 60px 20px;
          text-align: center;
        }

        .steps {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin-top: 30px;
        }

        .step {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 20px;
          width: 220px;
        }

        .cta-banner {
          text-align: center;
          padding: 60px 20px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
        }

        .footer {
          text-align: center;
          padding: 20px;
          background: rgba(0,0,0,0.2);
        }
      `}</style>
    </>
  );
}

export default Home;
