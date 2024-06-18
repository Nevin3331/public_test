
//burger
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.header_wrapper_burger');
    const menuLaptop = document.querySelector('.menu_laptop');
    const menuClose = document.querySelector('.menu_close');

    burger.addEventListener('click', () => {
        menuLaptop.classList.add('show');
    });

    menuClose.addEventListener('click', () => {
        menuLaptop.classList.remove('show');
    });
});

window.onload = function () {
    const controller = new AbortController();
    // Set the countdown duration to 15 minutes (in milliseconds)
    const countdownDuration = 15 * 60 * 1000;
    // Get the current time and calculate the countdown end time
    const countDownDate = new Date().getTime() + countdownDuration;
    const clockMinutesElement = document.querySelector(".clock-minutes");
    const clockSecondsElement = document.querySelector(".clock-seconds");
  
    // Create an animation callback every second:
    animationInterval(1000, controller.signal, (time) => {
      // Get today's date and time
      let now = new Date().getTime();
  
      // Find the distance between now and the count down date
      let distance = countDownDate - now;
  
      // Time calculations for minutes and seconds
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      clockMinutesElement.textContent = minutes;
      clockSecondsElement.textContent = seconds;
  
      // If the count down is finished, write some text
      if (distance < 0) {
        controller.abort();
        document.querySelector(".clock-container").innerHTML = "EXPIRED";
      }
    });
  };
  
  function animationInterval(ms, signal, callback) {
    // Prefer currentTime, as it'll better sync animations queued in the
    // same frame, but if it isn't supported, performance.now() is fine.
    const start = document.timeline
      ? document.timeline.currentTime
      : performance.now();
  
    function frame(time) {
      if (signal.aborted) return;
      callback(time);
      scheduleFrame(time);
    }
  
    function scheduleFrame(time) {
      const elapsed = time - start;
      const roundedElapsed = Math.round(elapsed / ms) * ms;
      const targetNext = start + roundedElapsed + ms;
      const delay = targetNext - performance.now();
      setTimeout(() => requestAnimationFrame(frame), delay);
    }
  
    scheduleFrame(start);
  }
  