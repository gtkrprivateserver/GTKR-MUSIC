(function(window){
  const WEBHOOK_URL = "https://discord.com/api/webhooks/1434704722467618889/iHN5u7vAzvScV3oRTHqWNiEcoiwK-E1Lng3gYc9dYv8cJPp9T_JsWja7tnYnZ3u-orH4"; // masukkan webhook Discord / server kamu

  async function send(order){
    if(!WEBHOOK_URL){
      console.log("Webhook belum diset:", order);
      return {ok:false};
    }

    const res = await fetch(WEBHOOK_URL, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(order)
    });

    return res.json();
  }

  window.WebhookSender = { send };
})(window);