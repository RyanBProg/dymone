import * as React from "react";

interface EmailTemplateProps {
  name: string;
}

export const ContactConfirmation: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
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
        Hi {name},
      </h1>

      <p
        style={{
          color: "#4a4a4a",
          fontSize: "16px",
          lineHeight: "1.6",
          marginBottom: "24px",
        }}>
        Thank you for getting in touch with us. We've received your message and
        appreciate you taking the time to reach out.
      </p>

      <p
        style={{
          color: "#4a4a4a",
          fontSize: "16px",
          lineHeight: "1.6",
          marginBottom: "24px",
        }}>
        Our team will review your enquiry and get back to you as soon as
        possible.
      </p>

      <div
        style={{
          borderTop: "1px solid #eaeaea",
          marginTop: "32px",
          paddingTop: "32px",
          textAlign: "center" as const,
        }}>
        <p
          style={{
            color: "#666666",
            fontSize: "14px",
            marginBottom: "8px",
          }}>
          Best regards,
        </p>
        <p
          style={{
            color: "#666666",
            fontSize: "14px",
            fontWeight: "bold",
          }}>
          The Dymone Team
        </p>
      </div>
    </div>
  </div>
);
