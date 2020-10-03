/* Input Mask */
$(document).ready(function(){
    $('.inputphonemask').inputmask({
        mask: '0599 999 99 99',
        placeholder: '',
        showMaskOnFocus: true,
        showMaskOnHover: false
    });
});
/* Input Mask */

/* Alert Auto Close */
window.setTimeout(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove();
    });
}, 4000);
/* Alert Auto Close */

/* Loading Info */
// console.log("App Javascript Loading Successful");
/* Loading Info */