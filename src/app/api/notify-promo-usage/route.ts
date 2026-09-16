import { NextRequest, NextResponse } from "next/server";

// Même schéma que /api/notify-inscription du projet IUA-PARRAINAGE : notifie
// l'admin par Telegram, sans jamais bloquer le téléchargement en cours si la
// notification échoue ou n'est pas configurée.
export async function POST(req: NextRequest) {
  try {
    const { code, usageType, email } = await req.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      // Notification non configurée : on ne bloque jamais le téléchargement pour ça
      return NextResponse.json({ skipped: true });
    }

    const typeLabel = usageType === "unique" ? "usage unique (désormais désactivé)" : "illimité";
    const texte =
      `🎟️ Code promo utilisé — MON CV PRO CI\n\n` +
      `🔑 ${code}\n` +
      `♻️ ${typeLabel}\n` +
      `👤 ${email || "email inconnu"}`;

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: texte,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    // On ne fait jamais échouer le téléchargement à cause d'un souci de notification
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
