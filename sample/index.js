/* global $ */
/* global moment */

function domLoaded() {
  // Set up an AJAX call to Query the database  
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
    // Information passed to the function is:
    // result.error       TRUE if there was a DB error
    // result.msg         String with error message if required
    // result.errorNumber Error number if connection error
    // result.data        Data retrieved by the query.  Remember that only
    //                    SELECT queries return data
    success: function(result) {
      if (!result.error) {
        $.each(result.data, function(idx, item) {
          var tr = $('<tr></tr>');
          tr.append('<td class="id-number">'+item.IDnumber+'</td>');
          tr.append('<td>'+item.Lastname+'</td>');
          tr.append('<td>'+item.Firstname+'</td>');
          // The moment function comes from the moment.js library.  See
          // http://momentjs.com/docs/ for the momentjs library webpage and
          // http://momentjs.com/docs/#/displaying/ for specific information
          // about the format function
          tr.append('<td class="birthday">'+moment(item.Birthday).format('MMM DD, YYYY')+'</td>');
          $('tbody').append(tr);
        });
      } else {
        console.log(result.msg);
      }
    }
  })
};

// When the DOM is loaded 
$(document).ready(domLoaded);
