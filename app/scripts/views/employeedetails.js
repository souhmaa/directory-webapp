var app = app || {};

(function() {

  'use strict';

  app.EmployeeView = Backbone.View.extend({

    render: function () {
      this.$el.html(this.template(this.model.attributes));
      $('#details', this.el).html(new app.EmployeeSummaryView({model:this.model}).render().el);
      this.model.reports.fetch({
        success:function (data) {
          if (data.length == 0)
            $('.no-reports').show();
        }
      });
      $('#reports', this.el).append(new app.EmployeeListView({model:this.model.reports}).render().el);
      return this;
    }

  });

})();
