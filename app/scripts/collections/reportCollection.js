var app = app || {};

(function() {

  'use strict';

  app.ReportsCollection = Backbone.Collection.extend({

    model: app.Employee,

    sync: function(method, model, options) {
      if (method === 'read') {
        app.store.findByManager(this.parent.id, function (data) {
          options.success(data);
        });
      }
    }

  });

})();
