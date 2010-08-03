// the interval the timer runs on
var interval
// have we started the game yet?
var started = false
// are we currently paused?
var paused = false
// the blinds levels
// at the end, the timer will continue, but not raise the blinds
var blinds = ['5/10', '10/20', '25/50', '50/100', '100/200', '200/400', '500/1000', '1000/2000']
// index to track the blind increases
var blinds_index = 0
// length of time between blind increases, in seconds
var blinds_duration = 5
// time remaining in current blind leve
var time = blinds_duration

function resize_fonts() {
  $('body').css('font-size', $(window).width()/1000 + 'em')
}

$(window).resize(function() {
  resize_fonts()
})

$(window).click(function() {
  toggle_timer()
})

$(function() {
  resize_fonts();
})

function format_timer() {
  seconds = ((time % 60 < 10) ? '0' : '') + time % 60
  return Math.floor(time/60) + ':' + seconds
}



function init_blinds() {

  $('#current_blinds').html(blinds[blinds_index])

  interval = window.setInterval(function(){
    // reset timer if done
    if (time == 0) {
      $('body').effect('highlight', {color: '#F00'}, 3000)
      time = blinds_duration
      blinds_index += 1
      $('#current_blinds').html(blinds[blinds_index])
    }
    
    // update time
    $('#current_time').html(format_timer())
    time -= 1

  }, 1000)
}

function toggle_timer() {
    if (!started) {
        $('#begin').fadeOut('fast')
        init_blinds()
        started = true
    } else {
        (paused) ? unpause() : pause();
        paused = !paused;        
    }
}

function pause() {
    clearInterval(interval)
    $('#paused').fadeIn('fast');
}

function unpause()
{
    init_blinds()
    $('#paused').fadeOut('fast');
}
