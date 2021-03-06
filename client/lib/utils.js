// Utility methods common to many scripts

utils = {
  getCurrentPage: function() {
    var page_slug = Session.get('page-slug');
    if (!page_slug)
      return {notFound: true, title: 'Sorry, we couldn\'t find the requested page'};
    return Pages.findOne({slug: page_slug});
  },
  getFormValues: function(selector) {
    var values = {};
    
    // Turn form into array and handle special cases
    $.each($(selector).serializeArray(), function(i, field) {
      // if (field.name == 'tags') field.value = field.value.split(',');
    	if (field.value == 'on') field.value = true;
      values[field.name] = field.value;
    });
    $.each($(selector).find(':checkbox:not(:checked)'), function(i, field) {
    	values[field.name] = false;
    });
    return values;
  },
  displayHumanReadableTime: function(timestamp){
    var a = new Date(timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date+'/'+month+'/'+year.toString().slice(2)+' @ '+hour+':'+min+':'+sec ;
    return time;
  },
  loadTemplate: function(template) {
    return Meteor.render(function () {
      return Template[ template ](); // this calls the template and returns the HTML.
    });
  },
  getSetting: function(settingName) {
    var settings = Settings.findOne();
    if (!settings || !settingName) return '';
    return Settings.findOne()[settingName];
  },
  getBlockFragment: function(block) {
    if (block && block.template) {
      Template[block.template].block = block;
      var fragment = Template[block.template](); // this calls the template and returns the HTML.
    } else {
      console.log('Block not found (or has no template specified)' );
      return false;
    }

    return fragment;
  }
};