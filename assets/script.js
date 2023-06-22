// Main driver of webpage.
// Display current date at the top of the page.
// Add a function to the page for each clickable hour of the workday.
// That function saves the info input to local storage when the save button is clicked.
// Then the info input is displayed when the page is refeshed.

$(document).ready(function() {
    // Display current day at the top of the calendar
    var currentDay = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDay);
  
    // Create timeblocks for standard business hours
    var startTime = 9;
    var endTime = 17;
    var container = $('.container');
  
    for (var hour = startTime; hour <= endTime; hour++) {
      var timeblock = $('<div>').addClass('timeblock');
      var hourText = hour > 12 ? hour - 12 + ' PM' : hour + ' AM';
      var hourCol = $('<div>').addClass('hour').text(hourText);
      var eventInput = $('<textarea>').addClass('event-input');
      var saveBtn = $('<button>').addClass('save-btn').text('Save');
  
      timeblock.append(hourCol, eventInput, saveBtn);
      container.append(timeblock);
    }
  
    // Color code timeblocks based on past, present, or future
    function updateTimeblockColors() {
      var currentHour = dayjs().hour();
  
      $('.timeblock').each(function() {
        var hour = parseInt($(this).find('.hour').text());
        if (hour < currentHour) {
          $(this).removeClass('present future').addClass('past');
        } else if (hour === currentHour) {
          $(this).removeClass('past future').addClass('present');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
      });
    }
  
    updateTimeblockColors();
  
    // Save event text to local storage
    $('.save-btn').on('click', function() {
      var eventText = $(this).siblings('.event-input').val();
      var hour = $(this).siblings('.hour').text();
  
      localStorage.setItem(hour, eventText);
    });
  
    // Load saved events from local storage
    function loadSavedEvents() {
      $('.timeblock').each(function() {
        var hour = $(this).find('.hour').text();
        var eventText = localStorage.getItem(hour);
  
        $(this).find('.event-input').val(eventText);
      });
    }
  
    loadSavedEvents();
  });
  