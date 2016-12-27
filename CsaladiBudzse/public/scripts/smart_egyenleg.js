$('#mire').selectize({
  valueField: 'name',
  labelField: 'name',
  searchField: 'name',
  create: true,
  createOnBlur: true,
  render: {
    option: function(item, escape) {
      return '<div>' +
        '<span class="name">' + escape(item.name) + '</span>' +
        '</div>';
    }
  },
  load: function(query, callback) {
    if (!query.length) return callback();
    $.ajax({
      url: '/ajax/egyenleg/search/' + encodeURIComponent(query),
      type: 'GET',
      error: function() {
        callback();
      },
      success: function(res) {
        callback(res.mire_items.slice(0, 10));
      }
    });
  }
});
