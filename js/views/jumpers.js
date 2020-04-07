var app = app || {};

app.JumperView = Backbone.View.extend({
    tagname: 'li',

    template: _.template($('#jumper-template').html()), 

    events: {
        'dblclick label': 'edit', 
        'keypress .edit': 'updateOnEnter'
    }, 

    // JumperView listens to changes to its model
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    }, 

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$input = this.$('edit');
        return this;
    }, 

    toggleSelected: function() {
        this.model.toggle();
    }, 

    edit: function() {
        this.$el.addClass('editing');
        this.$input.focus();
    }, 

    close: function() {
        var value = this.$input.val().trim();

        if (value) {
            this.model.save({name: value});
        }
        this.$el.removeClass('editing');
    }, 

    updateOnEnter: function(e) {
        if (e.which == ENTER_KEY) {
            this.close();
        }
    }, 

    clear: function() {
        this.model.destroy();
    }
})