(function($) {
  $(window).load(function() { 
    $('input.form-pno-input').blur(function() { 
       // Check valid length & form
      var input = $(this).val();
      if (!input) return;

      if (input.indexOf('-') == -1 && input.indexOf('+') == -1) {
          if (input.length === 10) {
              input = input.slice(0, 6) + "-" + input.slice(6);
          } else {
              input = input.slice(0, 8) + "-" + input.slice(8);
          }
      }
      var m = input.match(/^(\d{6})([\-\+])(\d{4})|(\d{8})([\-\+])(\d{4})$/);
      if (!m) return;
      var sep = (typeof m[2] != 'undefined') ? m[2] : m[5];

      // Clean input
      input = input.replace(/[\+\-]/g, '');
      if (input.length == 12) {
          input = input.substring(2);
      }

      // Declare variables
      var d = new Date(((!!RegExp.$1) ? RegExp.$1 : RegExp.$5), (((!!RegExp.$2) ? RegExp.$2 : RegExp.$6)-1), ((!!RegExp.$3) ? RegExp.$3 : RegExp.$7)),
              sum = 0,
              numdigits = input.length,
              parity = numdigits % 2,
              i,
              digit;

      // Check valid date
      if (Object.prototype.toString.call(d) !== "[object Date]" || isNaN(d.getTime())) return;

      // Check luhn algorithm
      for (i = 0; i < numdigits; i = i + 1) {
          digit = parseInt(input.charAt(i))
          if (i % 2 == parity) digit *= 2;
          if (digit > 9) digit -= 9;
          sum += digit;
      }
      if((sum % 10) == 0) {
        //success
        $(this).val(input.replace(/(\d{6})(\d{4})/,"$1"+sep+"$2"));
      }
    });
  });
})(jQuery);