  // Set max date to today
  const dobInput = document.getElementById('dob');
  const today = new Date();
  dobInput.max = today.toISOString().split('T')[0];

  function calculate() {
    const val = dobInput.value;
    const err = document.getElementById('error');
    const results = document.getElementById('results');

    if (!val) {
      err.style.display = 'block';
      results.classList.remove('show');
      return;
    }

    const dob = new Date(val);
    if (dob > today) {
      err.style.display = 'block';
      results.classList.remove('show');
      return;
    }

    err.style.display = 'none';

    // Years, months, days
    let y = today.getFullYear() - dob.getFullYear();
    let m = today.getMonth() - dob.getMonth();
    let d = today.getDate() - dob.getDate();

    if (d < 0) {
      m--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      d += prevMonth.getDate();
    }
    if (m < 0) { y--; m += 12; }

    document.getElementById('years').textContent = y;
    document.getElementById('months').textContent = m;
    document.getElementById('days').textContent = d;

    // Totals
    const diffMs = today - dob;
    const totalDays = Math.floor(diffMs / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(diffMs / 3600000);
    const totalMins = Math.floor(diffMs / 60000);

    document.getElementById('totalDays').textContent = totalDays.toLocaleString();
    document.getElementById('totalWeeks').textContent = totalWeeks.toLocaleString();
    document.getElementById('totalHours').textContent = totalHours.toLocaleString();
    document.getElementById('totalMins').textContent = totalMins.toLocaleString();

    // Next birthday
    let nextBday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBday <= today) nextBday.setFullYear(today.getFullYear() + 1);
    const daysLeft = Math.ceil((nextBday - today) / 86400000);
    const options = { month: 'long', day: 'numeric' };
    const bdayStr = nextBday.toLocaleDateString('en-US', options);

    document.getElementById('nextBday').textContent = daysLeft === 0
      ? '🎉 Happy Birthday! Today is your birthday!'
      : `🎂 Next birthday on ${bdayStr} — ${daysLeft} day${daysLeft !== 1 ? 's' : ''} away`;

    // Animate
    results.classList.remove('show');
    void results.offsetWidth;
    results.classList.add('show');

    // Re-trigger number animation
    ['years','months','days'].forEach(id => {
      const el = document.getElementById(id);
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    });
  }

  dobInput.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });