document.addEventListener('DOMContentLoaded', ()=>{

  document.querySelectorAll('.pkg').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const type = btn.dataset.type;
      const amount = btn.dataset.amount;
      sessionStorage.setItem('topup_item', JSON.stringify({type,amount}));
      window.location.href = 'checkout.html';
    })
  });

  const item = sessionStorage.getItem('topup_item');
  if(item){
    const data = JSON.parse(item);
    const tEl = document.getElementById('itemType');
    const aEl = document.getElementById('itemAmount');
    if(tEl) tEl.value = data.type;
    if(aEl) aEl.value = data.amount;
  }

  const form = document.getElementById('checkoutForm');
  if(form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();

      const order = {
        id:'ORD-'+Date.now(),
        player:document.getElementById('playerName').value,
        itemType:document.getElementById('itemType').value,
        itemAmount:document.getElementById('itemAmount').value,
        paymentMethod:document.getElementById('paymentMethod').value,
        createdAt:new Date().toISOString()
      };

      await sendWebhookNotification(order);

      sessionStorage.removeItem('topup_item');
      window.location.href = 'success.html';
    })
  }
});

async function sendWebhookNotification(order){
  if(window.WebhookSender){
    return window.WebhookSender.send(order);
  }
  return {ok:false};
}