var app = app || {};

(function() {

  'use strict';

  app.EmployeeCollection = Backbone.Collection.extend({

    model: app.Employee,

    sync: function(method, model, options) {
      if (method === 'read') {
        app.store.findByName(options.data.name, function (data) {
          options.success(data);
        });
      }
    }

  });

})();
