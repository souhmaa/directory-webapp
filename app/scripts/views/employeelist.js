var app = app || {};

(function() {

  'use strict';

  app.EmployeeListView = Backbone.View.extend({

    tagName:'ul',

    className:'nav nav-list',

    initialize:function () {
      var self = this;
      this.model.on('reset', this.render, this);
      this.model.on('add', function (employee) {
        self.$el.append(new app.EmployeeListItemView({model:employee}).render().el);
      });
    },

    render:function () {
      this.$el.empty();
      _.each(this.model.models, function (employee) {
        this.$el.append(new app.EmployeeListItemView({model:employee}).render().el);
      }, this);
      return this;
    }

  });

})();
