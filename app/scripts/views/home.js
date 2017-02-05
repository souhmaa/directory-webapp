var app = app || {};

(function () {

  'use strict';

  app.HomeView = Backbone.View.extend({

    events: {
      'click #showMeBtn': 'showMeBtnClick'
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    },

    showMeBtnClick: function () {
      console.log('showme');
      app.shellView.search();
    }

  });

})();
