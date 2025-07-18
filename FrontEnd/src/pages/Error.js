import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="error-container">
      <div className="error-card">
        <h1>⚠️ Something went wrong</h1>
        <p>We couldn't find what you were looking for.</p>
        <Link to="/" className="neon-button">Go Home</Link>
      </div>

      <style>{`
        .error-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #4f46e5, #6d28d9);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: white;
        }

        .error-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 15px;
          text-align: center;
          max-width: 400px;
        }

        .error-card h1 {
          font-size: 28px;
          margin-bottom: 15px;
        }

        .error-card p {
          margin-bottom: 25px;
        }

        .neon-button {
          display: inline-block;
          padding: 10px 20px;
          border: none;
          border-radius: 999px;
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          color: white;
          font-weight: bold;
          text-decoration: none;
          box-shadow: 0 0 10px #ec4899;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .neon-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px #ec4899;
        }
      `}</style>
    </div>
  );
}

export default Error;
