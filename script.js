/**
 * Created by Travis on 8/1/2016.
 */
$(document).ready(function(){
    (function(){

        var viewer = {

            streams : ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
            storedJson : [],

            init : function(){
                this.cacheDOM();
                this.bindEvents();
                this.getStreams();
            },


            cacheDOM : function(){
                this.$el = $("#application");
                this.$banner = this.$el.find("#banner");
                this.$everyoneButton = this.$el.find("#everyone-button");
                this.$onlineButton = this.$el.find("#online-button");
                this.$offlineButton = this.$el.find("#offline-button");
                this.$searchInput = this.$el.find("#search-input");
                this.$searchSubmit = this.$el.find("#search-submit");
            },

            bindEvents : function(){
                this.$everyoneButton.on("click", {mode : "everyone"}, this.switchMode.bind(this));
                this.$onlineButton.on("click", {mode : "online"}, this.switchMode.bind(this));
                this.$offlineButton.on("click", {mode : "offline"}, this.switchMode.bind(this));
                this.$searchSubmit.on("click", this.addStreamer.bind(this));
                this.$searchInput.on("keypress", function(e){
                    if (e.keyCode === 13) {
                        viewer.addStreamer();
                    }
                });
            },

            ajaxCall : function(i){
                $.ajax({
                    url: "https://api.twitch.tv/kraken/streams/" + this.streams[i] + "/",
                    dataType: "jsonp",
                    success: function (parsedJson) {
                        viewer.storedJson = parsedJson;
                        viewer.buildStreamer(i);
                    }
                });
            },

            getStreams : function(){
                for(var i = 0; i < this.streams.length; i++) {
                    this.ajaxCall(i);
                }
            },
            
            addStreamer : function(){
                var userInput = document.getElementById('search-input').value;
                var searchString = userInput.split(" ").join("_");
                if(this.streams.indexOf(searchString) == -1){
                    this.streams.push(searchString);
                    this.ajaxCall(this.streams.length - 1);
                }
            },

            removeStreamer : function(event){
                $("#" + event.data.divID).remove();
                var streamToRemove = this.streams.indexOf(event.data.divID);
                this.streams.splice(streamToRemove, 1);
            },

            buildStreamer : function(i){
                if(viewer.storedJson.stream !== null){
                    for (var j = 0; j < 1; j++) {
                        $("#viewer-backing").append("<div id = '" + viewer.streams[i] + "' class = 'online streamer-info row'><div class = 'streamer-photo-container col-xs-3'><img class = 'streamer-photo' src = '" + viewer.storedJson.stream.channel.logo + "'></div><h2 class = 'streamer-name col-xs-3'><a href = 'http://www.twitch.tv/" + viewer.streams[i] + "'>" + viewer.streams[i] + "</a></h2><i id = '" + viewer.streams[i] + "-remove' class='btn glyphicon glyphicon-remove col-xs-1' value = '" + viewer.streams[i] + "'></i><p class = 'streamer-game col-xs-3'>" + viewer.storedJson.stream.channel.game + "</p><p class = 'streamer-status col-xs-2'>Online</p></div>");
                        var removeButtonID = '#' + viewer.streams[i] + '-remove';
                        var x = viewer.streams[i];
                        viewer.x = viewer.$el.find(removeButtonID);
                        viewer.x.on("click", {divID : x}, viewer.removeStreamer.bind(viewer));
                    }
                } else for (var j = 0; j < 1; j++) {
                    $("#viewer-backing").append("<div id = '" + viewer.streams[i] + "' class = 'offline streamer-info row'><div class = 'streamer-photo-container col-xs-3'><img class = 'streamer-photo' src = 'https://i.imgur.com/wFmVxtq.jpg'></div><h2 class = 'streamer-name col-xs-3'><a href = 'http://www.twitch.tv/" + viewer.streams[i] + "'>" + viewer.streams[i] + "</a></h2><i id = '" + viewer.streams[i] + "-remove' class='btn glyphicon glyphicon-remove col-xs-1' value = '" + viewer.streams[i] + "'></i><p class = 'streamer-game col-xs-3'>Not Playing</p><p class = 'streamer-status col-xs-2'>Offline</p></div>");
                    var removeButtonID = '#' + viewer.streams[i] + '-remove';
                    var x = viewer.streams[i];
                    viewer.x = viewer.$el.find(removeButtonID);
                    viewer.x.on("click", {divID : x}, viewer.removeStreamer.bind(viewer));
                }
            },

            switchMode : function(event){
                if(event.data.mode === "everyone"){
                    $(".online").css("display", "block");
                    $(".offline").css("display", "block");
                    this.$banner.html("<h2>Everyone</h2>");
                } else if(event.data.mode === "online"){
                    $(".online").css("display", "block");
                    $(".offline").css("display", "none");
                    this.$banner.html("<h2>Online Only</h2>");
                } else if(event.data.mode === "offline"){
                    $(".offline").css("display", "block");
                    $(".online").css("display", "none");
                    this.$banner.html("<h2>Offline Only</h2>");
                }
            }

        };

        viewer.init();

    })();
});