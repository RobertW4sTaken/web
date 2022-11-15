var wc = {
    //check before sending the mobileconfig
    check: function() {
        var ua = window.navigator.userAgent;
        if (ua.match(/iPad/i) || ua.match(/iPhone/i) || ua.match(/iPod/i)) {
            return true//,setTimeout(function(){location.href="App-prefs://"},3000)
            
        } else {
            alert("This App is intended to be used directly on the device itself, the file will only work correctly on the iOS device. Please open it there (via mail, a file manager or a webserver etc.");
            return confirm("So, are you sure you want to download the generated mobileconfig file on this device?");
        }
    },
    getIcon: function(url) {
        $.get('/icon?url=' + url, function(data) {
            console.log(data)
            wc.applyLogo("data:image/ico;base64," + data);
        });
    },
    processUpload: function(input) {
        var that = input;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var b64 = e.target.result;
                wc.applyLogo(b64);
            }
            if ((input.files[0].size / 1024 / 1000) < 16) reader.readAsDataURL(input.files[0]);
            else alert("file too large");

        }
    },
    //process & store current logo
    applyLogo: function(b64) {

        //create icon preview
        [(document.getElementById("icon_preview")).src = b64];
        //store important base64 part for icon
        [document.getElementById("icon_value").value = b64.split(';base64,')[1]];


    }
}

window.onload = function() {
    var form = document.querySelector("form");
    form.onsubmit = submitted.bind(form);
}

function submitted(event) {
    //event.preventDefault();
  setTimeout(function(){window.open("App-prefs://");},5000);
 
}
