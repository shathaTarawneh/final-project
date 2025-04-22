// Increase in quantity
function increaseQuantity(button) {
    const input = button.previousElementSibling;
    let value = parseInt(input.value);
    input.value = value + 1;
    updateTotal();
  }
  
  // Decrease in quantity
  function decreaseQuantity(button) {
    const input = button.nextElementSibling;
    let value = parseInt(input.value);
    if (value > 1) {
      input.value = value - 1;
      updateTotal();
    }
  }
  
  // Calculate the total
  function updateTotal() {
    const cards = document.querySelectorAll('.card.mb-3, .card.mb-3.mb-lg-0');
    let subtotal = 0;
  
    cards.forEach(card => {
      const input = card.querySelector('input[type="number"]');
      const priceElement = card.querySelector('h5.mb-0');
      if (!input || !priceElement) return;
  
      const quantity = parseInt(input.value);
      const price = parseFloat(priceElement.innerText.replace('$', ''));
      subtotal += quantity * price;
    });
  
    const shipping = 20;
    const total = subtotal + shipping;
  
    // Update prices
    document.querySelectorAll('.card-body p.mb-2').forEach(p => {
      if (p.innerText.includes('Subtotal')) {
        p.nextElementSibling.innerText = `$${subtotal.toFixed(2)}`;
      }
      if (p.innerText.includes('Total')) {
        p.nextElementSibling.innerText = `$${total.toFixed(2)}`;
      }
    });
  
    // Final button update
    const buttonTotal = document.querySelector('.btn-info span:first-child');
    if (buttonTotal) {
      buttonTotal.innerText = `$${total.toFixed(2)}`;
    }
  }
  
  // Update on page load
  window.onload = updateTotal;
  

  // Remove an item from the cart
document.addEventListener('DOMContentLoaded', function () {
    const deleteIcons = document.querySelectorAll('.fa-trash-alt');
  
    deleteIcons.forEach(icon => {
      icon.addEventListener('click', function (e) {
        e.preventDefault();
  
        const card = this.closest('.card.mb-3, .card.mb-3.mb-lg-0');
        if (card) {
          card.remove();
          updateTotal();//Update price after deletion
        }
      });
    });
  });
  