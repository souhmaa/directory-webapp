var app = app || {};

(function() {

  'use strict';

  app.ContactView = Backbone.View.extend({
    render:function () {
      this.$el.html(this.template());
      return this;
    }
  });

})();
