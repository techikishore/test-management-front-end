import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
const API_URL = process.env.REACT_APP_API_URL;

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard", { replace: true });
      } else {
        setErr(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setErr("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "40px",
          background: "white",
          borderRadius: "16px",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          margin: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#1f2937",
              marginBottom: "8px",
            }}
          >
            Welcome Back
          </h2>
          <p
            style={{
              color: "#6b7280",
              fontSize: "16px",
              margin: "0",
            }}
          >
            Sign in to your admin account
          </p>
        </div>

        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "500",
            color: "#374151",
            marginBottom: "6px",
          }}
          htmlFor="username"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "2px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "16px",
            transition: "all 0.2s ease",
            boxSizing: "border-box",
            outline: "none",
            marginBottom: "20px",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#667eea")}
          onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
        />

        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "500",
            color: "#374151",
            marginBottom: "6px",
          }}
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "2px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "16px",
            transition: "all 0.2s ease",
            boxSizing: "border-box",
            outline: "none",
            marginBottom: "24px",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#667eea")}
          onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
        />

        {err && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {err}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: loading
              ? "#9ca3af"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            boxShadow: loading
              ? "none"
              : "0 4px 14px 0 rgba(102, 126, 234, 0.4)",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow =
                "0 6px 20px 0 rgba(102, 126, 234, 0.6)";
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow =
                "0 4px 14px 0 rgba(102, 126, 234, 0.4)";
            }
          }}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
