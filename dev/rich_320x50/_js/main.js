import {txt, startF1, start_basic, start_rich, helpers} from '../../_common/js/common.js'
import {creative, populateAd} from '../../_common/js/creative.js'





function callback_yes(lottoSum){	
	console.log("lottoSum");
	creative.populateAd(lottoSum)
	TweenLite.set(".numbers", {opacity:1})
    const tl = new TimelineMax()
    tl.to(".frame1.jackpot_yes", .3, {opacity:1})

    tl.to([".frame1.jackpot_yes"], .3, {opacity:0}, "+=3")
    tl.set(".frame3.jackpot_yes", {opacity:1})

    tl.from(".t2.jackpot_yes", .3, {opacity:0})
    tl.from(".cta.jackpot_yes", .3, {opacity:0}, "+=.7")
}

function callback_no(){			
	console.log("callback_no");
	TweenMax.set([".jackpot_no"], {display:"block"})
    TweenMax.set([".jackpot_yes"], {display:"none"})

    const tl = new TimelineMax()

    tl.to(".frame1", .3, {opacity:1})

    tl.add( helpers.happyTxt() )	
    tl.to(".frame1", .3, {opacity:0}, "+=2")
    tl.set(".frame3", {opacity:1})

    tl.add( txt([".t2a", ".t2b", ".t2c", ".t2d"]), "-=.3" )	
    tl.from(".cta", .3, {opacity:0}, "+=.7")
}





creative.showAd = ()=>{    
    creative.loadJSON().then( callback_yes ).catch(callback_no)
}






creative.dynamicDataAvailable = function () { };









module.exports = {};

