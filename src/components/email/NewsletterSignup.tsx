import * as React from "react";

interface EmailTemplateProps {
  email: string;
}

export const NewsletterSignup: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
}) => (
  <div
    style={{
      backgroundColor: "#ffffff",
      padding: "40px 20px",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    }}>
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        border: "1px solid #eaeaea",
        borderRadius: "8px",
        padding: "20px",
      }}>
      <h1
        style={{
          color: "#1a1a1a",
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "24px",
        }}>
        New Newsletter Sign Up
      </h1>

      <div
        style={{
          backgroundColor: "#f9fafb",
          padding: "20px",
          borderRadius: "6px",
          marginBottom: "24px",
        }}>
        <h2
          style={{
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#374151",
          }}>
          Contact Details:
        </h2>

        <div style={{ marginBottom: "12px" }}>
          <p style={{ margin: "0", color: "#6b7280", fontSize: "14px" }}>
            Email:
          </p>
          <p
            style={{ margin: "4px 0 0 0", color: "#111827", fontSize: "16px" }}>
            {email}
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #eaeaea",
          marginTop: "32px",
          paddingTop: "32px",
          textAlign: "center" as const,
        }}>
        <p
          style={{
            color: "#6b7280",
            fontSize: "14px",
            margin: "0",
          }}>
          This is an automated message from your contact form.
        </p>
      </div>
    </div>
  </div>
);
