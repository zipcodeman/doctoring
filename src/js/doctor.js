function yelpHandlerFor(dn) {
  return function(data) {
    n = dn.find('.yelp');
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
  };
}


function main() {
  var providers = $('.providerContainer');
  for (i = 0; i < providers.length; i++) {
    var p = $(providers[i]);
    if (p.data('_doctoring_applied_')) continue;
    var doctor_node = $('<div class="doctor"></div>');
    doctor_node.append('<div class="yelp"></div>');
    p.data('_doctoring_applied_', doctor_node);
    p.append(doctor_node);

    // The below will only apply to a providerContainer once
    $.get('//api.yelp.com/business_review_search', {
      ywsid: '_Q514U0COwKR-CLO80mYfA',
      term: p.find('.providerName').text(),
      location: p.find('.address').text(),
    }, yelpHandlerFor(doctor_node));
    /*
      url: http://api.yelp.com/business_review_search?term=yelp&tl_lat=37.9&tl_long=-122.5&br_lat=37.788022&br_long=-122.399797&limit=3&ywsid=_Q514U0COwKR-CLO80mYfA
    });*/
  }
  setTimeout(main, 1000);
}
main();
