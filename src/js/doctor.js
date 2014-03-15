/** @jsx React.DOM */

function yelpHandlerFor(dn) {
  return function(data) {
    n = dn.find('.yelp')[0];
    React.renderComponent(<YelpComponent businesses={data.businesses} />, n);
    /* 
    for (i = 0; i < data.businesses.length; i++) {
      var b = data.businesses[i];
      n.append('<div class="node' + i + '"></div>');
      var me = n.find('.node' + i);
      me.append('<img src="' + b.photo_url + '" />');
      stuff += '<a target="_blank" href="' + b.url + '">';
      stuff += b.avg_rating;
      stuff += '<img src="' + b.photo_url + '" />';
      stuff += '</a>';
    }
    stuff += ")";
    if (stuff != "()") {
      n.append(stuff);
    }
    */
  };
}

function main() {
  var base_providers = $('.providerContainer');
  var iframe_providers = $('iframe').contents().find('.providerContainer');
  var providers = $.merge(base_providers, iframe_providers);
  for (i = 0; i < providers.length; i++) {
    var p = $(providers[i]);
    if (p.data('_doctoring_applied_')) continue;
    var doctor_node = $('<div class="doctor"></div>');
    doctor_node.css({
      "clear": "both",
      "padding-left": "10px",
      "margin-right": "10px",
      "margin-bottom": "5px"
    });
    doctor_node.append('<div class="yelp"></div>');
    p.data('_doctoring_applied_', doctor_node);
    p.find('.providerBox').append(doctor_node);

    // The below will only apply to a providerContainer once
    $.get('//api.yelp.com/phone_search', {
      ywsid: '_Q514U0COwKR-CLO80mYfA',
      phone: p.find('.phone').text()
    }, yelpHandlerFor(doctor_node));
    /*
      url: http://api.yelp.com/business_review_search?term=yelp&tl_lat=37.9&tl_long=-122.5&br_lat=37.788022&br_long=-122.399797&limit=3&ywsid=_Q514U0COwKR-CLO80mYfA
    });*/
  }
  setTimeout(main, 1000);
}
main();
