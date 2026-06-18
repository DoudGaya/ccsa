export async function sendSMS(to: string, message: string) {
  if (!to) return { error: "No phone number provided" };

  // Basic sanitization: extract digits
  let phone = to.replace(/\D/g, "");
  // In case local number format is used in Nigeria, change 0 to 234
  if (phone.length === 11 && phone.startsWith("0")) {
    phone = "234" + phone.slice(1);
  }

  const TERMII_API_KEY = process.env.TERMII_API_KEY;
  const TERMII_SENDER_ID = process.env.TERMII_SENDER_ID || "CCSA";
  
  const SENDCHAMP_API_KEY = process.env.SENDCHAMP_API_KEY;
  const SENDCHAMP_SENDER_ID = process.env.SENDCHAMP_SENDER_ID || "CCSA";

  if (!TERMII_API_KEY && !SENDCHAMP_API_KEY) {
    console.warn("No SMS API keys configured. Skipping SMS.");
    return { error: "No SMS configuration" };
  }

  // Attempt Termii first
  if (TERMII_API_KEY) {
    try {
      const response = await fetch("https://api.ng.termii.com/api/sms/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: phone,
          from: TERMII_SENDER_ID,
          sms: message,
          type: "plain",
          channel: "generic",
          api_key: TERMII_API_KEY,
        }),
      });
      const data = await response.json();
      if (response.ok && (data.message_id || data.code === "ok")) {
        return { success: true, provider: "termii", data };
      }
      console.error("Termii failed to send:", data);
    } catch (error) {
      console.error("Termii request error:", error);
    }
  }

  // Fallback to Sendchamp
  if (SENDCHAMP_API_KEY) {
    try {
      const response = await fetch("https://api.sendchamp.com/api/v1/sms/send", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${SENDCHAMP_API_KEY}`
        },
        body: JSON.stringify({
          to: [phone],
          message: message,
          sender_name: SENDCHAMP_SENDER_ID,
          route: "dnd",
        }),
      });
      const data = await response.json();
      if (response.ok && data.status === "success") {
        return { success: true, provider: "sendchamp", data };
      }
      console.error("Sendchamp failed to send:", data);
    } catch (error) {
      console.error("Sendchamp request error:", error);
    }
  }

  return { error: "Both SMS providers failed to send." };
}
