/* global $ */
/* global moment */

function domLoaded() {
  // Display the student roster in the first table
  displayStudentRoster();
  displayRoomList();
};

function displayStudentRoster() {
  // Set up an AJAX call to Query the database  
  $.ajax({
    url: '../php/dbQuery.php',      // URL of the DB access page
    type: 'POST',                   // POST web command
    dataType: 'json',               // Data will be returned in JSON format
    data: {                         // These data fields MUST be passed
      username: 'rogerjaffe',       // Your MySQL username
      password: '',                 // Leave blank for Cloud 9 access
      db: 'school',                 // DB name you're connecting to
      query: 'SELECT * FROM names ORDER BY Lastname'  // Your DB query defined as a string
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
          var idTd = $('<td class="id-number"></td>');
          var a = $('<a href="#" idNumber="'+item.IDnumber+'">'+item.IDnumber+'</a>');
          a.click(studentIdClickHandler);
          idTd.append(a);
          tr.append(idTd);
          tr.append('<td>'+item.Lastname+'</td>');
          tr.append('<td>'+item.Firstname+'</td>');
          // The moment function comes from the moment.js library.  See
          // http://momentjs.com/docs/ for the momentjs library webpage and
          // http://momentjs.com/docs/#/displaying/ for specific information
          // about the format function
          tr.append('<td class="birthday">'+moment(item.Birthday).format('MMM DD, YYYY')+'</td>');
          $('.roster-table tbody').append(tr);
        });
      } else {
        console.log(result.msg);
      }
    }
  });
}

function displayRoomList() {
  // Set up an AJAX call to Query the database  
  $.ajax({
    url: '../php/dbQuery.php',      // URL of the DB access page
    type: 'POST',                   // POST web command
    dataType: 'json',               // Data will be returned in JSON format
    data: {                         // These data fields MUST be passed
      username: 'rogerjaffe',       // Your MySQL username
      password: '',                 // Leave blank for Cloud 9 access
      db: 'school',                 // DB name you're connecting to
      query: 'SELECT * FROM rooms ORDER BY Course'// Your DB query defined as a string
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
          tr.append('<td class="room-number">'+item.Room+'</td>');
          tr.append('<td class="course">'+item.Course+'</td>');
          $('.rooms-table tbody').append(tr);
        });
      } else {
        console.log(result.msg);
      }
    }
  });
}

function displaySchedule(idNumber) {
  // Set up an AJAX call to Query the database  
  var query = 'SELECT schedule.*, rooms.Course FROM `schedule` JOIN rooms ON schedule.room=rooms.room WHERE StudentId='+idNumber+' ORDER BY Period';
  $.ajax({
    url: '../php/dbQuery.php',      // URL of the DB access page
    type: 'POST',                   // POST web command
    dataType: 'json',               // Data will be returned in JSON format
    data: {                         // These data fields MUST be passed
      username: 'rogerjaffe',       // Your MySQL username
      password: '',                 // Leave blank for Cloud 9 access
      db: 'school',                 // DB name you're connecting to
      query: query                  // Your DB query defined as a string
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
        $('.student-schedule-table tbody').empty();      // Clear existing info first
        $.each(result.data, function(idx, item) {
          var tr = $('<tr></tr>');
          tr.append('<td class="room-number">'+item.Period+'</td>');
          tr.append('<td class="room">'+item.Room+'</td>');
          tr.append('<td class="course">'+item.Course+'</td>');
          $('.student-schedule-table tbody').append(tr);
        });
      } else {
        console.log(result.msg);
      }
    }
  });
}

function studentIdClickHandler(evt) {
  var element = $(evt.currentTarget);
  var lastName = $(element.parent().siblings()[0]).text();
  var firstName = $(element.parent().siblings()[1]).text();
  $('.student-name').text(firstName+' '+lastName);
  var idNumber = element.attr('IDnumber');
  displaySchedule(idNumber);
}

// When the DOM is loaded call domLoaded
$(document).ready(domLoaded);
