function generateBookmarkletCode(secretKey) {
    return 'javascript:(function() {' +
        'var script = document.createElement(\'script\');' +
        'script.src = \'https://cdn.jsdelivr.net/npm/otplib@11.1.0-0/otplib-browser.js\';' +
        'document.head.appendChild(script);' +
        'script.onload = function() {' +
        'var secretKey = \'' + secretKey + '\';' +
        'var otp = otplib.authenticator.generate(secretKey);' +
        'var inputElement = document.getElementById(\'nffc\');' +
        'var buttonElement = document.querySelector(\'a[name="loginButton2"]\');' +
        'if (inputElement && buttonElement) {' +
        'inputElement.value = otp;' +
        'buttonElement.click();' +
        '}' +
        '};' +
        '})();';
}

window.onload = function() {
    var generateBookmarkletButton = document.getElementById('generateBookmarkletButton');
    var bookmarkletButton = null;

    generateBookmarkletButton.addEventListener('click', function() {
        var secretKeyInput = document.getElementById('secretKeyInput');
        var secretKey = secretKeyInput.value;
        var bookmarkletCode = generateBookmarkletCode(secretKey);
        var bookmarkletURL = 'javascript:' + encodeURIComponent(bookmarkletCode);

        if (bookmarkletButton) {
            bookmarkletButton.setAttribute('href', bookmarkletURL);
        } else if (secretKey != null && secretKey != "") {
            bookmarkletButton = document.createElement('button');
            bookmarkletButton.innerText = 'Bookmarklet';
            bookmarkletButton.addEventListener('click', function() {
                window.location.href = bookmarkletURL;
            });

            var targetElement = generateBookmarkletButton.nextElementSibling;
            targetElement.parentNode.insertBefore(bookmarkletButton, targetElement.nextSibling);
        }
    });
};