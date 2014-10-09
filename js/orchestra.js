$(document).ready(function() {
    $("#track").ready(function() {
        $("#play").css("display", "inline-block");
    });

    var selected = "";
    var playing = false;

    var event_times = [1.5, 6, 6.8, 10, 225];

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

                    $("#arrow").fadeTo(200, 0);
                    $("#detail").fadeTo(200, 0);

                }
                else {
                    $("#detail").removeClass();

                    selected = title;
                    
                    var w = $(this).width();
                    var h = $(this).height();

                    var p = $(this).position();

                    var flip = 0;

                    if (p.left+w/2 < window.innerWidth/2) {
                        $("#arrow").css("left", (p.left+w-40) + "px");
                        $("#detail").css("left", (p.left+w+100) + "px");
                    } else {
                        $("#arrow").css("left", (p.left-$("#arrow").width()+40) + "px");
                        $("#detail").css("left", (p.left-$("#arrow").width()-400) + "px");
                        flip += 1;
                    }

                    if (p.top+h/2 < window.innerHeight/2) {
                        $("#arrow").css("top", (p.top+h-40) + "px");
                        $("#detail").css("top", (p.top+h-100) + "px");
                        flip += 2;
                    }
                    else {
                        $("#arrow").css("top", (p.top-$("#arrow").height()+40) + "px");
                        $("#detail").css("top", (p.top-$("#arrow").height()-100) + "px");
                    }

                    $("#arrow").removeClass("flipH").removeClass("flipV").removeClass("flipBoth");


                    switch(flip) {
                        case(1):
                            $("#arrow").addClass("flipH");
                            break;
                        case(2):
                            $("#arrow").addClass("flipV");
                            break;
                        case(3):
                            $("#arrow").addClass("flipBoth");
                            break;
                    }

                    $("#detail").addClass(title);

                    $("#arrow").fadeTo(200, 1);
                    $("#detail").fadeTo(200, 1);

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
        console.log(document.getElementById("track").duration);

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
                $("#two").fadeTo(100, 1);
                break;
            case 1:
                $("#two").fadeTo(200, 0);
                break;
            case 2:
                $("#three").fadeTo(100, 1);
                break;
            case 3:
                $("#three").fadeTo(200, 0);
                break;
            case 4:
                $("#thanks").fadeTo(100, 1);
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
            next_event++;
        }

        $(".inst").each(function(index) {
            if ($(this).position().top < -500) $(this).remove();
            else if ($(this).attr("title") != selected) {
                $(this).css("top", "-=2px");
            }
        });
        if (playing) setTimeout(move, 18);
    }
});

