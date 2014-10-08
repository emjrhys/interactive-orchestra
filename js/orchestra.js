$(document).ready(function() {
    var currTime = 0;

    function getTime() {
        var music = document.getElementById("track");
        currTime = music.currentTime;
    }

    $("#track").ready(function() {
        $("#play").css("display", "inline-block");
    });

    var selected = "";
    var playing = false;

    var event_times = [1.5, 4, 7.2, 10];

    var times = [12.2, 18.4, 24.1, 26.8, 37.5, 43.8, 50.6, 56.4,
        64.9, 72.5, 78.9, 82.5, 90.2, 97.1, 108.1, 114.6, 120.8,
        124.1, 127.8, 130.3, 135.8, 137.9, 143.1, 144.5, 153.3,
        156.3, 162.4, 165.3, 171.3, 177.2, 182.5, 188.5, 194.6,
        210.2];
        var insts = ["harp", "cello", "flute", "piccolo", "electric-guitar",
            "uke", "classical-guitar", "banjo", "woodblock", "two-harps",
            "b3-organ", "celeste", "vibraphone", "piano", "violins", "bass",
            "tubular-bells", "glockenspiel", "cymbal", "piatti", "drums",
            "gran-cassa", "timpani", "singers", "xylophone", "bassoons", "clarinet",
            "french-horn", "tenor-sax", "trombone", "tuba", "trumpets", "singers-again",
            "triangle"];

            var next = 0;
            var next_event = 0;

            var prevPos = -500;

            function playPause() {
                if (playing) {
                    playing = false;
                    document.getElementById('track').pause();
                    $("#stop").css("background", "url(assets/play_small.gif) no-repeat center center");
                }
                else {
                    playing = true;
                    move();
                    document.getElementById('track').play();
                    $("#stop").css("background", "url(assets/stop.gif) no-repeat center center");
                }
            }

            function createInst(n) {
                d3.select("#main-container").append("div")
                .attr("class", "inst " + insts[n])
                .attr("title", insts[n]);

                var xpos = prevPos;

                while (xpos < prevPos + 350 && xpos > prevPos - 350)
                    xpos = Math.random()*(window.innerWidth-300);

                prevPos = xpos;

                if (selected != "") $("."+insts[n]).fadeTo(200, .7);

                $("."+insts[n]).css("left", xpos)
                .click(function() {
                    var title = $(this).attr("title");

                    if (title == selected) {
                        selected = "";
                        $(".inst").each(function() {
                            if(selected != $(this).attr("title"))
                                $(this).fadeTo(200, 1);
                        });
                    }
                    else {
                        selected = title;
                        $(".inst").each(function() {
                            if(selected != $(this).attr("title"))
                                $(this).fadeTo(200, .7);
                        });
                        $(this).fadeTo(200, 1);
                        $(this).addClass("foreground");
                    }
                });
            }

            $("#play").click(function() {
                if (!playing) {
                    $(".splash").addClass("playing");
                    $(".title").addClass("playing");
                    playPause();

                    setTimeout(function() {
                        $("#stop").addClass("playing");
                    }, 12500);
                }
            });

            $("#stop").click(function() {
                playPause();
            });

            function event(next) {
                switch(next) {
                    case 0:
                        $("#two").addClass("playing");
                    break;
                    case 1:
                        $("#two").removeClass("playing");
                    break;
                    case 2:
                        $("#three").addClass("playing");
                    break;
                    case 3:
                        $("#three").removeClass("playing");
                    break;
                }
            }


            function move() {
                if (next < times.length && times[next] < currTime) {
                    createInst(next);
                    next++;
                }
                if (next_event < event_times.length && event_times[next_event] < currTime) {
                    event(next_event);
                    console.log("calling event" + next_event);
                    next_event++;
                }

                $(".inst").each(function(index) {
                    var top = $(this).css("top");
                    if (parseInt(top.substring(0, top.length-2)) < -400) $(this).remove();
                    else if ($(this).attr("title") != selected) {
                        $(this).css("top", "-=1px");
                    }
                });
                if (playing) setTimeout(move, 12);
            }

});

