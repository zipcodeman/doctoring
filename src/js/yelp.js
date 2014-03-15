/** @jsx React.DOM */

YelpBusiness = React.createClass({
  visit: function() {
    window.open(this.props.b.url, '_blank');
  },
  render: function() {
    var b = this.props.b;
    var previous_cat = false;
    var business_style = {
      "margin-top": "5px",
      "border": "1px solid black",
      "border-radius": "10px",
      "padding": "5px",
      "height": "100px"
    };

    var img_style = {
      "float": "left"
    };

    var info_style = {
      "float": "right",
      "width": "80%"
    };

    return <div className="business"
                onClick={ this.visit }
                style={ business_style }>
      <div className="img"
           style={img_style}>
        <img src={ b.photo_url } />
      </div>
      <div className="information"
           style={info_style}>
        <div className="address">
          <b>{ b.name }</b> (<img src={ b.rating_img_url_small } /> / { b.review_count } )<br />
          {
            b.categories.map(function(cat) {
              if (previous_cat) {
                return <span>/ {cat.name}</span>;
              } else {
                previous_cat = true;
                return <span>{cat.name}</span>;
              }
            })
          }<br />
          { b.address1 } { b.address2 } { b.address3 }
          { b.city }, { b.state } { b.zip }<br />
        </div>
      </div>
    </div>;
  }
});
YelpComponent = React.createClass({
  getDefaultProps: function() {
    return {
      businesses: []
    };
  },

  render: function() {
    return <div className="yelp">
      {
        this.props.businesses.map(function(b) {
          return <YelpBusiness b={ b }
                               key={ "business" + b.id }/>;
        })
      }
    </div>;
  }
});
