import {txt, startF1, start_basic, start_rich} from '../../_common/js/common.js'
import {creative} from '../../_common/js/creative.js'







function callback_yes(lottoSum){	
	console.log("callback_yes");
	creative.populateAd(lottoSum)
	const tl = start_rich()
    tl.to(".end_3", .3, {opacity:0}, "+=2")
    tl.from(".footer", .3, {opacity:0})
	tl.from(".cta", .3, {opacity:0})
}

function callback_no(){			
	console.log("callback_no");
	start_basic()    
}





creative.showAd = ()=>{    
    creative.loadJSON().then( callback_yes ).catch(callback_no)
}









creative.dynamicDataAvailable = function () { };









module.exports = {};

