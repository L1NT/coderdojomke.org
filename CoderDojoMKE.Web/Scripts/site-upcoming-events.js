var UpcomingEvents = function () {

    var loadEvents = function () {
        $('.dojo-event').each(function (index, element) {
            var eventId = $(this).data('eventbrite');
            var eventUrl = 'https://www.eventbriteapi.com/v3/events/' + eventId + '/';
            var that = this;

            $.ajax({
                method: 'GET',
                url: eventUrl,
                data: {
                    'token': 'VXFP6CIOSA7NV6PAHWL5'
                },
                success: function (data, status, xhr) {
                    
                    var eventDate = data.start.local.split('T');
                    var eventDateParts = eventDate[0].split('-');
                    var formattedDate = eventDateParts[1] + '/' + eventDateParts[2] + '/' + eventDateParts[0];
                    var href = 'http://www.eventbrite.com/e/coderdojo-mke-building-web-pages-tickets-' + eventId;
                    $(that).children('a.event-date-and-time').prop('href', href).html('Build Your First Web Page - Saturday ' + formattedDate);

                    var pcProvided = data.ticket_classes[0];
                    var pcProvidedAvailable = pcProvided.quantity_total - pcProvided.quantity_sold;
                    var bringPC = data.ticket_classes[1];
                    var bringPCAvailable = bringPC.quantity_total - bringPC.quantity_sold;

                    if (pcProvidedAvailable === 0 && bringPCAvailable === 0) {
                        $(that).children('.event-spaces-left-pc').html('Sorry, all sold out!  Please try select a future event.');
                    } else {

                        if (pcProvidedAvailable === 0) {
                            $(that).children('.event-spaces-left-pc').html('Sorry, no more spots are left with a provided PC.');
                        } else {
                            $(that).children('.event-spaces-left-pc').html('<span class="number-available">' + pcProvidedAvailable +
                                '</span> available with PC provided');
                        }
                        
                        if (bringPCAvailable === 0) {
                            $(that).children('.event-spaces-left-bring').html('Sorry, no more spots are left to bring a laptop.');
                        } else {
                            $(that).children('.event-spaces-left-bring').html('<span class="number-available">' + bringPCAvailable +
                                '</span> available to bring your own laptop');
                        }
                    }
                }
            });
        });        
    };

    var _public = {};
    _public.init = function () {
        loadEvents();
    };

    return _public;
}();
$(document).ready(UpcomingEvents.init);