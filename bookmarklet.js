// Does not function without a secretkey being entered

(function() {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/otplib@11.1.0-0/otplib-browser.js';
    document.head.appendChild(script);
    script.onload = function() {
        var secretKey = 'yourSecretKey';
        var otp = otplib.authenticator.generate(secretKey);
        
        // Check if the page URL contains 'https://login.uu.nl/'
        if (window.location.href.indexOf('https://login.uu.nl/') !== -1) {
            var inputElement = document.getElementById('nffc');
            var buttonElement = document.querySelector('a[name="loginButton2"]');
            if (inputElement && buttonElement) {
                inputElement.value = otp;
                buttonElement.click();
            }
        } else {
            // Calculate the time remaining for the current OTP
            var timeRemainingInSeconds = otplib.authenticator.timeRemaining();
            var minutesRemaining = Math.floor(timeRemainingInSeconds / 60);
            var secondsRemaining = timeRemainingInSeconds % 60;

            // Display OTP and time remaining in an alert
            alert("Your UU OTP is: " + otp + "\nTime Remaining: " + minutesRemaining + " minutes " + secondsRemaining + " seconds");
        }
    };
})();

