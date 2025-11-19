(function(window){
  const WEBHOOK_URL = ""; // masukkan webhook Discord / server kamu

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