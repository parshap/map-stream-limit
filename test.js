var test = require("tape");
var mapLimit = require("./");

test("one at a time", function(t) {
	var waiting = false;
	var stream = mapLimit(function(data, callback) {
		t.ok( ! waiting);
		waiting = true;
		setTimeout(function() {
			waiting = false;
			callback();
		}, 100);
	}, 1);
	stream.on("end", function() {
		t.end();
	});
	stream.write("a");
	stream.write("a");
	stream.write("a");
	stream.end();
});
