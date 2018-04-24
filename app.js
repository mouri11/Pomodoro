var myVar, podo, short, long, podotext = "Work", interval;

var status = "stopped";
var controls = {
	"sb": ["sbincr","sbdcr","shortbrk",5],
	"work": ["wdincr","wddcr","work",25],
	"lb": ["lbincr","lbdcr","longbrk",20]
}

$(document).ready(function() {
	var count, degree;
	
	count=[0,0,0];
	degree = 0;
	setVal();
	
	$.each(controls, function(i, val) {
		$("#"+val[0]).on("click", function() {
			if (status === "stopped") {	
				var value = parseInt($("#"+val[2]).text());
				if (value < val[3]) value++;
				$("#"+val[2]).text(value);
				setVal();
			}
			else alert("Press reset before changing intervals!");
		});
		$("#"+val[1]).on("click", function() {
			if (status === "stopped") {	
				var value = parseInt($("#"+val[2]).text());
				if (value > 1) value--;
				$("#"+val[2]).text(value);
				setVal();
			}
			else alert("Press reset before changing intervals!");
		});
	});

	$("#controls").on("click", "span#play" ,function() {
		status = "running";
		$("#controls").html("<span id='pause'><i class='fa fa-pause'></i></span>");
		$("body").css("animation", "colorchange 50s");

		myVar = setInterval(function() {
			$("#pomodoro").css("transform", "rotate("+ degree +"deg)");
			var mod = interval % 60 >= 10 ? interval % 60 + "" : "0" + interval % 60;
			$("#centered").text(podotext + ": " + Math.floor(interval/60) + ":" + mod);
			interval--;
			//console.log(degree + " at " + new Date().getSeconds());

			degree += count[0] === count[1] ? count[2] === 1 ? 360/(long * 60) : 360/(podo * 60) : 360/(short * 60);
			if (degree === 360){
				degree = 0;
				if (count[0] === count[1]) {
					count[2] = 0;
					count[0]++;
					interval = short * 60;
					podotext = "Short Break";
				}
				else if (count[0] > count[1]) {
					count[1]++;
					if (count[0] === 4) {
						count[0] = count[1] = 0;
						count[2]++;
						interval = long * 60;
						podotext = "Long Break";
					}
					else {
						interval = podo * 60;
						podotext = "Work";
					}
				}
				console.log(count);
			}
		}, 1000);
	});

	$("#controls").on("click","span#pause" ,function() {
		status = "paused";
		$("#controls").html("<span id='play'><i class='fa fa-play'></i></span>");
		$("body").css("animation", "");
		clearInterval(myVar);
	});

	$("#reset").on("click", function() {
		status = "stopped";
		$("#controls").html("<span id='play'><i class='fa fa-play'></i></span>");
		$("body").css("animation", "");
		clearInterval(myVar);
		$("#pomodoro").css("transform", "rotate("+ 0 +"deg)");
		podotext = "Work";
		count=[0,0,0];
		degree = 0;
		setVal();
	});

	
});

function setVal() {
	podo = parseInt($("#work").text());
	short = parseInt($("#shortbrk").text());
	long = parseInt($("#longbrk").text());
	interval = podo * 60;
	//console.log(podo + ", "+short+", "+long+","+interval);
	$("#centered").text(podotext + ": " + Math.floor(interval/60) + ":0" + interval % 60);
}