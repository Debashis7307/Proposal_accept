// Start the date planning process
function startDatePlan() {
  document.getElementById('step1Modal').style.display = 'flex';
}

// Navigation between steps
function goToStep2() {
  const name = document.getElementById('userName').value;
  if (!name) {
      alert("Please enter your beautiful name!");
      return;
  }
  document.getElementById('step1Modal').style.display = 'none';
  document.getElementById('step2Modal').style.display = 'flex';
}

function goToStep3() {
  const phone = document.getElementById('userPhone').value;
  if (!phone || !/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number!");
      return;
  }
  document.getElementById('step2Modal').style.display = 'none';
  document.getElementById('step3Modal').style.display = 'flex';
}

function goToStep4() {
  const date = document.getElementById('meetingDate').value;
  const time = document.getElementById('meetingTime').value;
  
  if (!date || !time) {
      alert("Please select both date and time!");
      return;
  }
  
  document.getElementById('step3Modal').style.display = 'none';
  document.getElementById('step4Modal').style.display = 'flex';
}

// Back navigation
function backToStep1() {
  document.getElementById('step2Modal').style.display = 'none';
  document.getElementById('step1Modal').style.display = 'flex';
}

function backToStep2() {
  document.getElementById('step3Modal').style.display = 'none';
  document.getElementById('step2Modal').style.display = 'flex';
}

function backToStep3() {
  document.getElementById('step4Modal').style.display = 'none';
  document.getElementById('step3Modal').style.display = 'flex';
}

// Submit the date plan
function submitDatePlan() {
  const name = document.getElementById('userName').value;
  const phone = document.getElementById('userPhone').value;
  const date = document.getElementById('meetingDate').value;
  const time = document.getElementById('meetingTime').value;
  
  // Format the date nicely
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });
  
  // Create WhatsApp message
  const message = `🌟 Date Plan Confirmation 🌟
  
Name: ${name}
Phone: ${phone}
Date: ${formattedDate}
Time: ${time}

I'm so excited for our date! ❤️`;
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create WhatsApp link that will open in the same tab
  const whatsappUrl = `https://wa.me/916297172118?text=${encodedMessage}`;
  
  // Create hidden link and click it
  const hiddenLink = document.createElement('a');
  hiddenLink.href = whatsappUrl;
  hiddenLink.target = '_blank';  // Still opens in new tab but keeps your page
  hiddenLink.rel = 'noopener noreferrer';
  hiddenLink.style.display = 'none';
  document.body.appendChild(hiddenLink);
  hiddenLink.click();
  document.body.removeChild(hiddenLink);
  
  // Show toast notification
  showToast();
  
  // Close all modals
  document.getElementById('step4Modal').style.display = 'none';
  
  // Reset form
  resetForm();
}

// Show toast notification
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  
  setTimeout(function() {
      toast.classList.remove('show');
  }, 5000); // 5 seconds
}

// Reset form
function resetForm() {
  document.getElementById('userName').value = '';
  document.getElementById('userPhone').value = '';
  document.getElementById('meetingDate').value = '';
  document.getElementById('meetingTime').value = '';
}

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target.classList.contains('modal-step')) {
      event.target.style.display = 'none';
  }
}