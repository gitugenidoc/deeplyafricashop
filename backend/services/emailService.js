const { Resend } = require("resend");

function emailClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is required for reveal email delivery.");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

async function sendRevealEmail({ to, orderId, revealUrl }) {
  if (!to) {
    console.warn(`Order ${orderId} has no email for reveal delivery.`);
    return { delivered: false };
  }

  if (!process.env.REVEAL_FROM_EMAIL) {
    throw new Error("REVEAL_FROM_EMAIL is required for reveal email delivery.");
  }

  const { data, error } = await emailClient().emails.send({
    from: process.env.REVEAL_FROM_EMAIL,
    to,
    subject: "Your Deeply Africa Mystery Country Pass reveal",
    text: `Payment confirmed. Open your secure Deeply Africa reveal link: ${revealUrl}`,
    html: `<p>Payment confirmed.</p><p>Open your secure Deeply Africa Mystery Country Pass reveal:</p><p><a href="${revealUrl}">Reveal your African football nation</a></p><p>Order: ${orderId}</p>`
  });
  if (error) throw new Error(`Resend email failed: ${error.message}`);
  return { delivered: true, id: data.id };
}

module.exports = { sendRevealEmail };
