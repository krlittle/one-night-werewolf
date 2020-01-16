
var stompClient = null;

function connect() {
    var socket = new SockJS('/one-night-werewolf-socket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/one-night/users-playing', function (greeting) {
                  var playingList = JSON.parse(greeting.body)
                  regeneratePlayersPlaying(playingList)
        });

        var player = { username: $("#playerName").text(), lobbyPlaying: "234"};
        stompClient.send("/one-night/join-game", {}, JSON.stringify(player));

    });

}

function regeneratePlayersPlaying(playingList) {
    $("#playingList").empty()
    $("#playingAmount").text(playingList.length)
    $.each(playingList, function(i, obj) {
        $("#playingList").append("<li>" + obj  + "</li>")
    });
}

$(document).ready(function(){
    connect()
});

