/**
 * Created by creepycake on 29.09.2015.
 */
window.onload = function () {
    var r = Raphael("holder", 640, 480);

    var bin = r.rect(500, 400, 80, 80)
        .attr({
            fill: "green"
        });
    var t = r.text(540, 440, "Bin")
        .attr({
            fill: "white",
            "font-family": "Georgia",
            "font-size": 20
        });

    var dragger = function () { //to start with movement
            this.animate({"fill-opacity": .25}, 500);
        },
        move = function (dx, dy) { //to actually move
            this.attr({
                transform : "...T" + (dx - ox) + "," + (dy - oy)
            });
            if (bin.isPointInside(this.getBBox().x, this.getBBox().y) && bin.isPointInside(this.getBBox().x2, this.getBBox().y2)) //to check if the shape is inside the bin
            {
                ox = 0;
                oy = 0;
                this.remove();
                return;
            }
            else
                ox = dx;
                oy = dy;
        },
        up = function () {
            ox = 0;
            oy = 0;
            this.animate({"fill-opacity": 0}, 500);
        },
        turn = function () { //rotating counter-clockwise by 90 degrees on double-click
            this.stop().animate({
                transform : "...R" + (-90)}, 1000, "<>");
        };

    var toolbox = r.set(r.ellipse(40, 150, 35, 20), //set of shapes to clone
        r.rect(10, 200, 60, 40),
        r.circle(40, 70, 20),
        r.path("M 45 250 L 10 300 L 80 300 z")); //triangle

    toolbox.attr({
        fill: "#000",
        stroke: "#000",
        "fill-opacity": 0,
        "stroke-width": 2,
        opacity: .8
    });

    var ox = 0;
    var oy = 0;

    var clone_handler = function(){ //to take care of cloned shapes from the panel
        var x = this.clone();
        x.drag(move, dragger, up);
        x.dblclick(turn);
    };
    toolbox.mousemove(clone_handler);
};
/**
 * Created by creepycake on 29.09.2015.
 */
