(function (window) {

  // ================================
  //  MASUKKAN WEBHOOK DISCORD ANDA
  // ================================
  const WEBHOOK_URL = "https://discord.com/api/webhooks/1434704722467618889/iHN5u7vAzvScV3oRTHqWNiEcoiwK-E1Lng3gYc9dYv8cJPp9T_JsWja7tnYnZ3u-orH4"; 


  // Format embed Discord
  function buildEmbed(order){
    return {
      username: "TopUp Bot",
      avatar_url: "https://i.imgur.com/zv3YvQh.png",
      embeds: [
        {
          title: "🛒 Pembelian Baru!",
          color: 16705372,
          fields: [
            { name: "👤 Username", value: order.username || "-", inline: true },
            { name: "📦 Paket", value: order.package || "-", inline: true },
            { name: "💳 Harga", value: "Rp " + order.price || "-", inline: true },
            { name: "📱 ID", value: order.userid || "-", inline: false },
          ],
          footer: {
            text: "Notifikasi Otomatis TopUp",
          },
          timestamp: new Date().toISOString()
        }
      ]
    };
  }

  async function send(order) {
    if (!WEBHOOK_URL) {
      console.warn("❌ WEBHOOK belum di-set!");
      return { ok: false };
    }

    try {
      const result = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildEmbed(order))
      });

      console.log("Webhook sent:", result.status);
      return result;
    } catch (err) {
      console.error("Gagal kirim webhook:", err);
      return { ok: false };
    }
  }

  window.WebhookSender = { send };

})(window);