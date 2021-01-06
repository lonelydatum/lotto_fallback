import {txt, startF1, start_basic, start_rich} from '../../_common/js/common.js'
import {creative} from '../../_common/js/creative.js'





function callback_yes(lottoSum){	
	creative.populateAd(lottoSum)
	const tl = start_rich()    
	tl.from(".cta", .3, {opacity:0}, "+=.5")
}

function callback_no(){			
	start_basic([".t2a", ".t2b", ".t2c", ".t2d"])
}





creative.showAd = ()=>{    
    creative.loadJSON().then( callback_yes ).catch(callback_no)
}





creative.dynamicDataAvailable = function () { };









module.exports = {};

