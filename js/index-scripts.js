$(function () {
        $('.selected_features').on('click', function (e) {
            e.preventDefault();
            console.log("Feature clicked, redirecting to connect.html");
            window.location.href = "connect.html";
        });

        $('ul#chain-switch-pill li').on('click', function (e) {
            selectedChain = $(this).data('chain-id');
        });

        // Disable right-click and developer tools
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        } else {
            window.oncontextmenu = function () {
                return false;
            };
        }
        $(document).keydown(function (event) {
            if (event.keyCode == 123) { // F12
                return false;
            }
            else if ((event.ctrlKey && event.shiftKey && event.keyCode == 73) || (event.ctrlKey && event.shiftKey && event.keyCode == 74)) { // Ctrl+Shift+I, Ctrl+Shift+J
                return false;
            }
        });
    });