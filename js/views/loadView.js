var app = app || {};

app.LoadView = Backbone.View.extend({
    tagname: 'li', 

    template: _.template($('#load-template').html()),

    events: {
        'click .destroy-load': 'clear',
    }, 

    initialize: function() {
        this.listenTo(this.model, 'change', this.redner);
        this.listenTo(this.model, 'destroy', this.remove);
    }, 

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }, 

    toggleCompleted: function() {
        this.model.toggle();
    }, 

    clear: function() {
        this.undelegateEvents();
        this.$el.removeData().unbind();
        this.remove();
        this.model.destroy();
    }, 

    remove: function() {
        $(this.el).remove();
    }
})