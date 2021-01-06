import {txt, startF1, start_basic, start_rich} from '../../_common/js/common.js'
import {creative} from '../../_common/js/creative.js'




function callback_yes(lottoSum){	
	creative.populateAd(lottoSum)
	const tl = start_rich()    
	tl.from(".cta", .3, {opacity:0}, "+=.5")
}

function callback_no(){		
	const tl = start_basic()
    tl.to(".footer", .3, {opacity:1}, "-=1.8")
}





creative.showAd = ()=>{    
    creative.loadJSON().then( callback_yes ).catch(callback_no)
}




creative.dynamicDataAvailable = function () { };









module.exports = {};

