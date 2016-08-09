/* global $ */          // Define $ (jQuery) as global

var runAjax = function() {
  $.ajax({
    url: '../php/dbQuery.php',      // URL of the DB access page
    type: 'POST',                   // POST web command
    dataType: 'json',               // Data will be returned in JSON format
    data: {                         // These data fields MUST be passed
      username: 'rogerjaffe',       // Your MySQL username
      password: '',                 // Leave blank for Cloud 9 access
      db: 'school',                 // DB name you're connecting to
      query: 'SELECT * FROM names'  // Your DB query defined as a string
    },
    // This function is called when the database query is completed
    // Callback must follow this format:
    //  var callbackFcn = function callback(result) {...}
    // The result variable contains the following fields:
    //  result.error       TRUE if there was a DB error
    //  result.msg         String with error message if required
    //  result.errorNumber Error number if connection error
    //  result.data        Data retrieved by the query.  Remember that only
    //                    SELECT queries return data
    success: function(result) {
      console.log(result);
    }
  });
}

// When the DOM is loaded call domLoaded
$(document).ready(function() {
  $('button').click(function() {
    runAjax();
  })
});
