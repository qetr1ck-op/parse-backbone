(function () {
    var appleData = [
        {
            name: "fuji",
            url: "img/fuji.jpg"
        },
        {
            name: "gala",
            url: "img/gala.jpg"
        }
    ];

    var router = Backbone.Router.extend({
        routes: { //'path/:param':'action'
            '': 'homeRender',
            'apples/:appleName': 'appleRender'
        },
        initialize: function () {
            //init model
            var apples = new Apples;
            apples.reset(appleData);
            this.homeView = new homeView({collection: apples});
            this.appleView = new appleView({collection: apples});
        },
        homeRender: function () {
            this.homeView.render();
        },
        appleRender: function (appleName) { //appleName same as in route
            this.appleView.render(appleName);
        }
    })


    var homeView = Backbone.View.extend({
        el: 'body',
        template: _.template('Data: <%= data %>'),
        render: function () {
            this.$el.html(this.template({
                data: JSON.stringify(this.collection.models)
            }));
        }
    });

    var appleView = Backbone.View.extend({
        el: 'body',
        template: _.template(
            '<figure>\
                <a href="<%= attributes.url %>"><%= attributes.name %></a>\
            </figure>'
        ),
        render: function (appleName) {
            var appleModel = this.collection.where({name: appleName})[0];
            this.$el.html(this.template(appleModel));
        }
    });


    var Apples = Backbone.Collection.extend({});

    var app = new router;
    Backbone.history.start();
})();

//Test wheres git credentials were saved