import React from "react";

interface VerificationTemplateProps {
  url: string;
  name: string | null;
  verifyemail: string;
}

export const VerificationTemplate: React.FC<VerificationTemplateProps> = ({
  url,
  name,
  verifyemail,
}) => {
  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        backgroundColor: "#10131a",
        color: "#ffffff",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: "30px" }}>
        <a href="https://toygma.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://toygma.com/logo.png" // Gerçek logonun URL’si
            alt="Toygma Logo"
            style={{ width: "180px", maxWidth: "100%" }}
          />
        </a>
      </div>

      {/* Başlık */}
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Email Verification</h1>

      {/* Mesaj */}
      <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "10px" }}>
        Hello {name || "User"},
      </p>
      <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "10px" }}>
        Thanks for signing up to Toygma!
      </p>
      <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "20px" }}>
        Please confirm your email address by clicking the button below:
      </p>

      <p style={{ fontSize: "14px", marginBottom: "20px" }}>{verifyemail}</p>

      {/* Button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "18px 40px",
          backgroundColor: "#e03e2d",
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: "bold",
          textDecoration: "none",
          borderRadius: "4px",
          marginBottom: "30px",
        }}
      >
        Verify Email
      </a>

      <p style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "10px" }}>
        If you didn’t create an account, you can safely ignore this message.
      </p>

      <p style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}>
        The Toygma Team
      </p>

      <p style={{ fontSize: "14px", color: "#ced4d9", marginTop: "40px" }}>
        © 20XX Toygma. All Rights Reserved.
      </p>
    </div>
  );
};
