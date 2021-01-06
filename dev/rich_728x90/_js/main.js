import {txt, startF1, start_basic, start_rich, helpers} from '../../_common/js/common.js'
import {creative} from '../../_common/js/creative.js'





function callback_yes(lottoSum){	
	console.log('callback_yes');
	creative.populateAd(lottoSum)
    const tl = new TimelineMax()
	tl.set([".frame1", ".words"], {opacity:1})
	tl.add( helpers.happyTxt() )
	tl.add("blink", "+=1.8")
	tl.add( helpers.blinker(.4), "blink" )
	tl.to(".word1", .3, {opacity:0}, "blink")
	
	tl.set([".numbers"], {opacity:1})
	

	tl.add( helpers.richText(), "-=.5" )

	tl.from(".end_3", .3, {opacity:0}, "+=2")
	
	tl.from(".cta", .3, {opacity:0})

	tl.add("shift")

	tl.to(".bg2", .4, {x:-45}, "shift")
	tl.to(".logo", .4, {x:-140}, "shift")
	tl.from(".footer", .4, {x:"+=150"}, "shift")
	

	
}

function callback_no(){	
	console.log('callback_no');
    const tl = new TimelineMax()
	tl.set([".frame1", ".words"], {opacity:1})

	
	tl.add( helpers.happyTxt() )

	tl.add("blink", "+=1.8")
	tl.add( helpers.blinker(.4), "blink" )
	tl.to(".word1", .3, {opacity:0}, "blink")
	

	tl.add( txt([".t2a", ".t2b", ".t2c", ".t2d"]), "-=.3" )	

	
	
	tl.from(".cta", .3, {opacity:0})

	tl.add("shift")

	tl.to(".bg2", .4, {x:-45}, "shift")
	tl.to(".logo", .4, {x:-140}, "shift")
	tl.from(".footer", .4, {x:"+=150"}, "shift")

}


creative.showAd = ()=>{    
    creative.loadJSON().then( callback_yes ).catch(callback_no)
}







creative.dynamicDataAvailable = function () { };









module.exports = {};

