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
    var bookmarkletLink = null;

    generateBookmarkletButton.addEventListener('click', function() {
        var secretKeyInput = document.getElementById('secretKeyInput');
        var secretKey = secretKeyInput.value;
        var bookmarkletCode = generateBookmarkletCode(secretKey);
        var bookmarkletURL = 'javascript:' + encodeURIComponent(bookmarkletCode);

        if (bookmarkletLink) {
            bookmarkletLink.setAttribute('href', bookmarkletURL);
        } else {
            bookmarkletLink = document.createElement('a');
            bookmarkletLink.setAttribute('href', bookmarkletURL);
            bookmarkletLink.setAttribute('draggable', true);
            bookmarkletLink.innerText = 'UU 2FA Tool';

            bookmarkletLink.style.padding = '10px 20px';
            bookmarkletLink.style.backgroundColor = '#4CAF50';
            bookmarkletLink.style.color = 'white';
            bookmarkletLink.style.borderRadius = '4px';
            bookmarkletLink.style.textDecoration = 'none';
            bookmarkletLink.style.fontWeight = 'bold';

            var targetElement = generateBookmarkletButton.nextElementSibling;
            targetElement.parentNode.insertBefore(bookmarkletLink, targetElement.nextSibling);
        }
    });
};