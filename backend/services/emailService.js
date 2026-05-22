async function sendRevealEmail({ to, orderId, revealUrl }) {
  if (!to) {
    console.warn(`Order ${orderId} has no email for reveal delivery.`);
    return { delivered: false };
  }

  const payload = {
    to,
    orderId,
    revealUrl,
    subject: "Your Deeply Africa Mystery Country Pass reveal",
    text: `Payment confirmed. Open your secure Deeply Africa reveal link: ${revealUrl}`
  };

  if (!process.env.REVEAL_EMAIL_WEBHOOK_URL) {
    console.info(`Reveal email webhook is not configured for order ${orderId}. Reveal URL: ${revealUrl}`);
    return { delivered: false };
  }

  const response = await fetch(process.env.REVEAL_EMAIL_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`Email webhook failed with HTTP ${response.status}.`);
  return { delivered: true };
}

module.exports = { sendRevealEmail };
