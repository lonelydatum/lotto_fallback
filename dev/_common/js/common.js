const banner = document.getElementById('banner')
const size = {w:banner.offsetWidth, h:banner.offsetHeight}

TweenLite.defaultEase = Power2.easeInOut


function txt(list){
	const tl = new TimelineMax()
	list.map(item=>{
		tl.from(item, .2, {opacity:0, y:"-=10", ease:Power2.easeInOut}, "-=.1")
	})
	return tl
}



function happyTxt(){
	const tl = txt([".t1a", ".t1b", ".t1c", ".t1d"])
	tl.from(".brush", .3, {clip: `rect(0px, 0px, ${size.h}px, 0px)`}, "-=.25")
	// tl.to(".word1", .3, {opacity:0}, "+=1")

	return tl
}

function blinker(time=.8){
	const tl = new TimelineMax()

	tl.set(".frame.blinkFrame", {opacity:1})
	tl.add('blink_close')
	tl.from(".blink.top", time, {opacity:.6, y:"-100%", scale:2}, 'blink_close')
	tl.from(".blink.bottom", time, {opacity:.6, y:"100%", scale:2}, 'blink_close')
	tl.set([".endframe", ".frame.numbers", ".frame2", ".bg2"], {opacity:1})
	
	tl.add('blink_open', "-=0")
	
	tl.to(".blink.top", time*.7, {y:"-100%"}, 'blink_open')
	tl.to(".blink.bottom", time*.7, {y:"100%"}, 'blink_open')
	return tl
}

function richText(){
	const tl = new TimelineMax()
	tl.from(".end_1", .3, {opacity:0})
	tl.from([".end_2a", "#millions", ".end_2b"], .3, {opacity:0})	
	tl.from(".end_3", .3, {opacity:0}, "+=.3")
	return tl
}



function startF1(){
	const tl = new TimelineMax()
	tl.set(".frame1", {opacity:1})
	// tl.add( txt([".t1a", ".t1b", ".t1c", ".t1d"]) )
	// tl.from(".brush", .5, {clip: `rect(0px, 0px, ${size.h}px, 0px)`})
	tl.add(happyTxt())
	tl.add(blinker(), "+=1.6")
	return tl
}


function start_basic(){
	const tl = new TimelineMax()
	tl.add(startF1())
	tl.add( txt([".t2a", ".t2b", ".t2c", ".t2d"]), "+=.2" )	
	tl.from(".cta", .3, {opacity:0}, "+=.8")	
	return tl
}

function start_rich(){
	const tl = new TimelineMax()	
	tl.add(startF1())
	tl.add(richText())	
	return tl
}


const helpers = {
	happyTxt, richText, blinker
}

export {size, start_basic, start_rich, startF1, txt, helpers}


