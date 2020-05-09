var app = app || {};

app.JumperView = Backbone.View.extend({
    tagname: 'li',

    template: _.template($('#jumper-template').html()), 

    events: {
        'dblclick .jumper': 'edit', 
        'focusout .edit': 'close',
        'keypress .edit': 'updateOnEnter',
        'click .destroy': 'clear'
    }, 

    // JumperView listens to changes to its model
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    }, 

    /**
     * Renders the model
     */
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$input = this.$('input');
        return this;
    }, 

    toggleSelected: function() {
        this.model.toggle();
    }, 

    /*
    * Opens the jumper for editing
    */
    edit: function() {
        this.$el.addClass('editing');
        console.log(this.$input);
        this.$input.focus();
    }, 

   /**
    * Closes the jumper for editing
    */
    close: function() {
        var value = this.$input.val().trim();

        if (value) {
            this.model.save({name: value});
        }
        this.$el.removeClass('editing');
    }, 

    /**
     * If ENTER_KEY is pressed, closes the jumper for editing
     * @param {} e - the event
     */
    updateOnEnter: function(e) {
        if (e.which == ENTER_KEY) {
            this.close();
        }
    }, 

    /**
     * Clears a jumper from the collection.
     * Destroys the model
     */
    clear: function() {
        this.undelegateEvents();
        this.$el.removeData().unbind();
        this.remove();
        this.model.destroy();
    }, 

    /**
     * Removes the DOM element
     */
    remove: function() {
        $(this.el).remove();
    }
})