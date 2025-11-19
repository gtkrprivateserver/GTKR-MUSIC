(function (window) {

  // ================================
  //  MASUKKAN WEBHOOK DISCORD ANDA
  // ================================
  const WEBHOOK_URL = "https://discord.com/api/webhooks/1434704722467618889/iHN5u7vAzvScV3oRTHqWNiEcoiwK-E1Lng3gYc9dYv8cJPp9T_JsWja7tnYnZ3u-orH4";


  // Membuat embed Discord
  function buildEmbed(order) {
    return {
      username: "TopUp Bot",
      avatar_url: "https://i.imgur.com/zv3YvQh.png",
      embeds: [
        {
          title: "🛒 Pesanan Baru Masuk!",
          color: 16705372,
          fields: [
            { name: "👤 Nama Player", value: order.player || "-", inline: true },
            { name: "🆔 ID", value: order.userid || "-", inline: true },

            { name: "📦 Jenis", value: order.type || "-", inline: true },
            { name: "🔢 Jumlah", value: order.amount || "-", inline: true },

            { name: "💳 Metode Pembayaran", value: order.payment || "-", inline: false },
            { name: "💰 Total Harga", value: "Rp " + order.price || "-", inline: false },
          ],
          footer: {
            text: "Notifikasi Otomatis TopUp"
          },
          timestamp: new Date().toISOString()
        }
      ]
    };
  }


  // Mengirim ke webhook
  async function send(order) {
    if (!WEBHOOK_URL) {
      console.warn("❌ WEBHOOK belum diisi!");
      return { ok: false };
    }

    try {
      const result = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildEmbed(order))
      });

      console.log("Webhook terkirim:", result.status);
      return result;
    } catch (err) {
      console.error("Gagal mengirim webhook:", err);
      return { ok: false };
    }
  }

  window.WebhookSender = { send };

})(window);