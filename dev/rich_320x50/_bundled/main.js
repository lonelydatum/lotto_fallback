(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var banner = document.getElementById('banner');
var size = { w: banner.offsetWidth, h: banner.offsetHeight };

TweenLite.defaultEase = Power2.easeInOut;

function txt(list) {
	var tl = new TimelineMax();
	list.map(function (item) {
		tl.from(item, .2, { opacity: 0, y: "-=10", ease: Power2.easeInOut }, "-=.1");
	});
	return tl;
}

function happyTxt() {
	var tl = txt([".t1a", ".t1b", ".t1c", ".t1d"]);
	tl.from(".brush", .3, { clip: "rect(0px, 0px, " + size.h + "px, 0px)" }, "-=.25");
	// tl.to(".word1", .3, {opacity:0}, "+=1")

	return tl;
}

function blinker() {
	var time = arguments.length <= 0 || arguments[0] === undefined ? .8 : arguments[0];

	var tl = new TimelineMax();

	tl.set(".frame.blinkFrame", { opacity: 1 });
	tl.add('blink_close');
	tl.from(".blink.top", time, { opacity: .6, y: "-100%", scale: 2 }, 'blink_close');
	tl.from(".blink.bottom", time, { opacity: .6, y: "100%", scale: 2 }, 'blink_close');
	tl.set([".endframe", ".frame.numbers", ".frame2", ".bg2"], { opacity: 1 });

	tl.add('blink_open', "-=0");

	tl.to(".blink.top", time * .7, { y: "-100%" }, 'blink_open');
	tl.to(".blink.bottom", time * .7, { y: "100%" }, 'blink_open');
	return tl;
}

function richText() {
	var tl = new TimelineMax();
	tl.from(".end_1", .3, { opacity: 0 });
	tl.from([".end_2a", "#millions", ".end_2b"], .3, { opacity: 0 });
	tl.from(".end_3", .3, { opacity: 0 }, "+=.3");
	return tl;
}

function startF1() {
	var tl = new TimelineMax();
	tl.set(".frame1", { opacity: 1 });
	// tl.add( txt([".t1a", ".t1b", ".t1c", ".t1d"]) )
	// tl.from(".brush", .5, {clip: `rect(0px, 0px, ${size.h}px, 0px)`})
	tl.add(happyTxt());
	tl.add(blinker(), "+=1.6");
	return tl;
}

function start_basic() {
	var tl = new TimelineMax();
	tl.add(startF1());
	tl.add(txt([".t2a", ".t2b", ".t2c", ".t2d"]), "+=.2");
	tl.from(".cta", .3, { opacity: 0 }, "+=.8");
	return tl;
}

function start_rich() {
	var tl = new TimelineMax();
	tl.add(startF1());
	tl.add(richText());
	return tl;
}

var helpers = {
	happyTxt: happyTxt, richText: richText, blinker: blinker
};

exports.size = size;
exports.start_basic = start_basic;
exports.start_rich = start_rich;
exports.startF1 = startF1;
exports.txt = txt;
exports.helpers = helpers;

},{}],2:[function(require,module,exports){
// Setup namespace for ad.
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var creative = {};

creative.testing = function (good, bad) {
	// for testing purposes
	var urlParams = new URLSearchParams(window.location.search);
	var lottoSum = urlParams.get('jackpot');

	if (lottoSum) {
		if (Number(lottoSum) > 0) {

			good(lottoSum);
		} else {
			creative.jackpot_no(bad);
		}
		return true;
	} else {
		return false;
	}
};

creative.loadJSON = function () {
	var isLoaded = false;
	var timeout = null;

	return new Promise(function (good, bad) {
		// max 5 seconds to resolve failed
		timeout = window.setTimeout(function () {

			if (!isLoaded) {
				console.log('clearTimeout');
				creative.xhr.abort();
				bad();
			}
		}, 5000);

		var lottoSum = undefined;

		if (creative.testing(good, bad)) {
			window.clearTimeout(timeout);

			return;
		}

		creative.xhr = new XMLHttpRequest();
		creative.xhr.open('GET', 'https://playnow-proxy.poundandgrain.ca/json-proxy.php?url=https://www.playnow.com/services2/lotto/jackpot', true);
		creative.xhr.onload = function () {
			window.clearTimeout(timeout);
			isLoaded = true;
			var result = window.JSON.parse(creative.xhr.responseText);
			lottoSum = result.contents.SIX49.jackpot;
			console.log(lottoSum);
			good(lottoSum);
		};

		creative.xhr.ontimeout = function () {
			console.log("ontimeout");
			creative.jackpot_no(bad);
		};

		creative.xhr.onerror = function () {
			console.log("onerror");
			creative.jackpot_no(bad);
		};

		creative.xhr.send();
	});

	// LOAD JSON FEED
};

creative.jackpot_no = function (bad) {
	TweenMax.set([".jackpot_no"], { display: "block" });
	TweenMax.set([".jackpot_yes"], { display: "none" });
	bad();
};

creative.populateAd = function (lottoSum, callback) {

	TweenMax.set([".jackpot_yes", ".numbers"], { display: "block" });
	TweenMax.set([".jackpot_no"], { display: "none" });

	var end_2b = document.getElementById('end_2b');

	// var lottoSum = json.SIX49.jackpot
	// console.log(json);

	var millions = lottoSum / 1000000;
	var totalDigits = millions.toString().length;

	var numList = [];
	console.log(lottoSum);
	var promList = millions.toString().split("").map(function (item) {

		var num = document.getElementById('num_' + item).cloneNode(true);
		numList.push(num);
		var prom = new Promise(function (good, bad) {
			num.onload = good;
		});

		document.getElementById("millions").append(num);
		return prom;
	});

	var width = 0;
	var x = 0;
	Promise.all(promList).then(function () {
		numList.map(function (item) {
			width += item.width * .5 + 7;
			console.log(item.width, x);
			TweenLite.set(item, { opacity: 1, x: x });
			x = width;
		});

		TweenLite.set(end_2b, { x: x + 13 });
		if (callback) {
			callback();
		}
	});
};

creative.init = function () {
	creative.setupDOMElements();

	// Check if Enabler is initialized.
	if (Enabler.isInitialized()) {
		// Check if ad is visible to user.
		if (Enabler.isVisible()) {
			creative.enablerInitHandler();
		} else {
			Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, creative.enablerInitHandler);
		}
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.INIT, creative.enablerInitHandler);
	}
};

creative.setupDOMElements = function () {
	creative.domElements = {};
	creative.domElements.exit_button = document.getElementById('pn-bg-exit');
	creative.domElements.casino_img = document.getElementById('endframe');
};

creative.enablerInitHandler = function (event) {
	creative.dynamicDataAvailable();

	creative.domElements.exit_button.addEventListener('click', creative.exitClickHandler);

	if (Enabler.isPageLoaded()) {
		creative.pageLoadHandler();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, creative.pageLoadHandler);
	}
};

creative.exitClickHandler = function (event) {
	Enabler.exit('exit', creative.dynamicExitUrl);
};

creative.pageLoadHandler = function (event) {
	// creative.domElements.casino_img.src = creative.dynamicData.Casino_Frame_Image.Url;
	creative.showAd();
};

// Is triggered when the background image in polite.js was fully loaded.

// Handle Animation

// Start creative once all elements in window are loaded.
window.addEventListener('load', creative.init.bind(creative));

exports.creative = creative;

},{}],3:[function(require,module,exports){
'use strict';

var _commonJsCommonJs = require('../../_common/js/common.js');

var _commonJsCreativeJs = require('../../_common/js/creative.js');

function callback_yes(lottoSum) {
   console.log("lottoSum");
   _commonJsCreativeJs.creative.populateAd(lottoSum);
   TweenLite.set(".numbers", { opacity: 1 });
   var tl = new TimelineMax();
   tl.to(".frame1.jackpot_yes", .3, { opacity: 1 });

   tl.to([".frame1.jackpot_yes"], .3, { opacity: 0 }, "+=3");
   tl.set(".frame3.jackpot_yes", { opacity: 1 });

   tl.from(".t2.jackpot_yes", .3, { opacity: 0 });
   tl.from(".cta.jackpot_yes", .3, { opacity: 0 }, "+=.7");
}

function callback_no() {
   console.log("callback_no");
   TweenMax.set([".jackpot_no"], { display: "block" });
   TweenMax.set([".jackpot_yes"], { display: "none" });

   var tl = new TimelineMax();

   tl.to(".frame1", .3, { opacity: 1 });

   tl.add(_commonJsCommonJs.helpers.happyTxt());
   tl.to(".frame1", .3, { opacity: 0 }, "+=2");
   tl.set(".frame3", { opacity: 1 });

   tl.add((0, _commonJsCommonJs.txt)([".t2a", ".t2b", ".t2c", ".t2d"]), "-=.3");
   tl.from(".cta", .3, { opacity: 0 }, "+=.7");
}

_commonJsCreativeJs.creative.showAd = function () {
   _commonJsCreativeJs.creative.loadJSON().then(callback_yes)['catch'](callback_no);
};

_commonJsCreativeJs.creative.dynamicDataAvailable = function () {};

module.exports = {};

},{"../../_common/js/common.js":1,"../../_common/js/creative.js":2}]},{},[3])


//# sourceMappingURL=main.js.map
