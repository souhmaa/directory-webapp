var app = app || {};

(function () {

  'use strict';

  app.Employee = Backbone.Model.extend({

    initialize:function () {
      this.reports = new app.ReportsCollection();
      this.reports.parent = this;
    },

    sync: function(method, model, options) {
      if (method === 'read') {
        app.store.findById(parseInt(this.id), function (data) {
          options.success(data);
        });
      }
    }

  });


})();
