var app = app || {};
(function () {

  'use strict';

  app.loadTemplates = function(views, callback) {
    var deferreds = [];

    $.each(views, function (index, view) {
      if (app[view]) {
        deferreds.push($.get('templates/' + view + '.html', function (data) {
          app[view].prototype.template = _.template(data);
        }, 'html'));
      } else {
        alert(view + ' not found!');
      }
    });

    $.when.apply(null, deferreds).done(callback);
  };

  app.Router = Backbone.Router.extend({

    routes: {

      '': 'home',
      'contact': 'contact',
      'employees/:id': 'employeeDetails'

    },

    initialize: function () {
      app.shellView = new app.ShellView();
      $('body').html(app.shellView.render().el);
      // Close the search dropdown on click anywhere in the UI
      $('body').click(function () {
        $('.dropdown').removeClass('open');
      });
      this.$content = $('#content');
    },

    home: function () {
      // Since the home view never changes, we instantiate it and render it only once
      if (!app.homelView) {
        app.homelView = new app.HomeView();
        app.homelView.render();
      } else {
        console.log('reusing home view');
        app.homelView.delegateEvents(); // delegate events when the view is recycled
      }
      this.$content.html(app.homelView.el);
      app.shellView.selectMenuItem('home-menu');
    },

    contact: function () {
      if (!app.contactView) {
        app.contactView = new app.ContactView();
        app.contactView.render();
      }
      this.$content.html(app.contactView.el);
      app.shellView.selectMenuItem('contact-menu');
    },

    employeeDetails: function (id) {
      var employee = new app.Employee({id: id});
      var self = this;
      employee.fetch({
        success: function (data) {
          console.log(data);
          // Note that we could also 'recycle' the same instance of EmployeeFullView
          // instead of creating new instances
          self.$content.html(new app.EmployeeView({model: data}).render().el);
        }
      });
      app.shellView.selectMenuItem();
    }
  });

  app.loadTemplates(['HomeView', 'ContactView', 'ShellView', 'EmployeeView', 'EmployeeSummaryView', 'EmployeeListItemView'],
    function () {
      app.router = new app.Router();
      Backbone.history.start();
    });

})();

