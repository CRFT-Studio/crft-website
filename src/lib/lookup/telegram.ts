export async function notifyTelegram(text: string) {
  const token = process.env.TELEGRAM_API || import.meta.env.TELEGRAM_API;
  const chatId = process.env.TELEGRAM_CHAT_ID || import.meta.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
}
