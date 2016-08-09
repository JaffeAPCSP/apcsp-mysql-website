/* global $ */          // Define $ (jQuery) as global
/* global moment */     // Define moment as global too

// Set up an AJAX call to Query the database  
function ajaxCall(query, callback) {
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
    // Callback must follow this format:
    //  var callbackFcn = function callback(result) {...}
    // The result variable contains the following fields:
    //  result.error       TRUE if there was a DB error
    //  result.msg         String with error message if required
    //  result.errorNumber Error number if connection error
    //  result.data        Data retrieved by the query.  Remember that only
    //                    SELECT queries return data
    success: callback
  });
}

// This function will display the full student roster in the first
// (left-most) table
function displayStudentRoster() {
  // Define the callback function first
  // See the callback function definition format in the 
  // comments for ajaxCall() above
  var render = function(result) {
    // If there's no error then...
    if (!result.error) {
      // Iterate through all the data rows and display the data like this:
      // Column 1: ID number
      // Column 2: Last name
      // Column 3: First name
      // Column 4: Birthday
      $.each(result.data, function(idx, item) {
        // Create the <tr></tr> tag first
        var tr = $('<tr></tr>');
        
        // First column in the table is the ID number
        // Create the <td></td> tag with the id-number class
        var idTd = $('<td class="id-number"></td>');
        
        // Create the <a></a> tag with the ID number embedded
        var a = $('<a href="#" idNumber="'+item.IDnumber+'">'+item.IDnumber+'</a>');
        
        // Attach the click handler function to the <a></a> tag so that 
        // the handler function is fired when the a-tag is clicked
        a.click(studentIdClickHandler);
        
        // Insert the <a></a> tag into the <td></td> tag we built above
        idTd.append(a);
        
        // And add the <td></td> tag to the <tr></tr> of the table
        tr.append(idTd);
        
        // Now add the 2nd and 3rd columns with the last name and first name
        tr.append('<td>'+item.Lastname+'</td>');
        tr.append('<td>'+item.Firstname+'</td>');
        
        // Finally, add the 4th column with the birthday
        // The moment function comes from the moment.js library.  See
        // http://momentjs.com/docs/ for the momentjs library webpage and
        // http://momentjs.com/docs/#/displaying/ for specific information
        // about the format function
        tr.append('<td class="birthday">'+moment(item.Birthday).format('MMM DD, YYYY')+'</td>');
        
        // And put the whole row into the <tbody></tbody> tag of the table
        $('.roster-table tbody').append(tr);
      });
    } else {
      // If there's an error retrieving the data, log the error
      // message to the console
      console.log(result.msg);
    }
  }
  
  // Make the call to the ajaxCall function passing the query
  // and the callback function we defined above.  The callback
  // function is fired with the query has completed
  ajaxCall(
    'SELECT * FROM names ORDER BY Lastname, Firstname',
    render
  )
}

// This function will display the room and course list in the
// second (middle) table
function displayRoomList() {
  // Define the callback function first
  // See the callback function definition format in the 
  // comments for ajaxCall() above
  var render = function(result) {
    // If there's no error then...
    if (!result.error) {
      // Iterate through all the data rows and display the data like this:
      // Column 1: Room number
      // Column 2: Course name
      $.each(result.data, function(idx, item) {
        // Create the <tr></tr> tag for the table
        var tr = $('<tr></tr>');
        
        // And add the <td></td> tags for each column
        tr.append('<td class="room-number">'+item.Room+'</td>');
        tr.append('<td class="course">'+item.Course+'</td>');
        
        // Finally add the <tr></tr> to the <tbody></tbody> tag
        // of the table
        $('.rooms-table tbody').append(tr);
      });
    } else {
      // If there's an error, log it to the console
      console.log(result.msg);
    }
  }
  
  // Make the call to the ajaxCall function passing the query
  // and the callback function we defined above.  The callback
  // function is fired with the query has completed
  ajaxCall(
    'SELECT * FROM rooms ORDER BY Course', 
    render
  );
}

// This function will display the room and course list in the
// third (right-most) table
// Input: idNumber -> The ID number of the student whose
//                    schedule we wish to display
function displaySchedule(idNumber) {
  // Define the callback function first
  // See the callback function definition format in the 
  // comments for ajaxCall() above
  var render = function(result) {
    // If there's no error then...
    if (!result.error) {
      // Clear the existing schedule data in the table first
      $('.student-schedule-table tbody').empty();
      
      // Iterate through all the data rows and display the data like this:
      // Column 1: Period
      // Column 2: Room
      // Column 3: Course
      $.each(result.data, function(idx, item) {
        // Create the <tr></tr> tag for the row first
        var tr = $('<tr></tr>');
        
        // Create the three columns of information in <td></td>
        // tags with the appropriate class name
        tr.append('<td class="room-number">'+item.Period+'</td>');
        tr.append('<td class="room">'+item.Room+'</td>');
        tr.append('<td class="course">'+item.Course+'</td>');
        
        // Add the <tr></tr> tag with the row information into
        // the <tbody></tbody> tag of the table
        $('.student-schedule-table tbody').append(tr);
      });
    } else {
      // If there's an error, log the error message on the console
      console.log(result.msg);
    }
  }
  
  // Create a query that will retrieve all schedule information and
  // JOIN the room and course information from the room and course
  // fields in the schedule table
  var query = 'SELECT schedule.*, rooms.Course FROM `schedule` JOIN rooms ON schedule.room=rooms.room WHERE StudentId='+idNumber+' ORDER BY Period';
  ajaxCall(query, render);
}

// This function fires whenever a student ID number is clicked
// on the page
// evt: The event that was generated with the click.
// evt.currentTarget has the DOM node that was clicked (the <a></a> tag)
function studentIdClickHandler(evt) {
  // Get the element that was clicked (the <a></a> tag)
  var element = $(evt.currentTarget);
  
  // Get the last and first names by looking at the parent (<td></td>) tag
  // then the siblings (the other <td></td> tags).  Take the first (index 0)
  // <td></td> tag's text to get the last name and the second tag's text
  // to get the first name.
  var lastName = $(element.parent().siblings()[0]).text();
  var firstName = $(element.parent().siblings()[1]).text();
  
  // Insert the first name / last name into the <span></span> tag with
  // the 'student-name' class in the HTML file
  $('.student-name').text(firstName+' '+lastName);
  
  // Now get the idNumber from the element attribute
  var idNumber = element.attr('IDnumber');
  
  // And display the schedule for the student with that ID number
  displaySchedule(idNumber);
}

function domLoaded() {
  // Display the student roster in the first table
  displayStudentRoster();
  displayRoomList();
};

// When the DOM is loaded call domLoaded
$(document).ready(domLoaded);
