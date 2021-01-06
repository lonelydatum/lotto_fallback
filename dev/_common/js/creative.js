// Setup namespace for ad.
var creative = {};


creative.testing = function(good, bad){
		// for testing purposes
		const urlParams = new URLSearchParams(window.location.search);
		var lottoSum = urlParams.get('jackpot');
		
		if(lottoSum){
			if(Number(lottoSum)>0){
				
				good(lottoSum)
			}else{
				creative.jackpot_no(bad)
			}			
			return true
		}else{
			return false
		}
}

creative.loadJSON = function(){
	let isLoaded = false
	let timeout = null


	return new Promise((good, bad)=>{
		// max 5 seconds to resolve failed
		timeout = window.setTimeout(()=>{

			if(!isLoaded){
				console.log('clearTimeout');
				creative.xhr.abort()
				bad()
			}      
		}, 5000)

		let lottoSum
	
		if( creative.testing(good, bad)	 ){
			window.clearTimeout(timeout)
			
			return
		}
		
		




		creative.xhr = new XMLHttpRequest();
		creative.xhr.open( 'GET', 'https://playnow-proxy.poundandgrain.ca/json-proxy.php?url=https://www.playnow.com/services2/lotto/jackpot', true );
		creative.xhr.onload = function () {
			window.clearTimeout(timeout)
			isLoaded = true
			var result = window.JSON.parse( creative.xhr.responseText );
			lottoSum = result.contents.SIX49.jackpot
			console.log( lottoSum );
			good(lottoSum)
		};

		creative.xhr.ontimeout = ()=>{
			console.log("ontimeout");
			creative.jackpot_no(bad)
		}

		creative.xhr.onerror = ()=>{
			console.log("onerror");
			creative.jackpot_no(bad)
		}

		creative.xhr.send();



	})

	// LOAD JSON FEED
	
}


creative.jackpot_no = function(bad){
	TweenMax.set([".jackpot_no" ], {display:"block"})
	TweenMax.set([".jackpot_yes" ], {display:"none"})
	bad()
}


creative.populateAd = function (lottoSum, callback) { 

	TweenMax.set([".jackpot_yes", ".numbers" ], {display:"block"})
	TweenMax.set([".jackpot_no" ], {display:"none"})


	const end_2b = document.getElementById(`end_2b`)
	
	


		// var lottoSum = json.SIX49.jackpot
		// console.log(json);
		
		

		const millions = lottoSum/1000000
		const totalDigits = millions.toString().length

		const numList = []
		console.log(lottoSum);
		const promList = millions.toString().split("").map(item=>{

			const num = document.getElementById(`num_${item}`).cloneNode(true)
			numList.push(num)
			const prom = new Promise((good, bad)=>{
				num.onload = good
			})

			document.getElementById("millions").append(num)
			return prom
		})

		let width = 0
		let x = 0
		Promise.all(promList).then(()=>{
			numList.map(item=>{
				width += (item.width*.5) + 7
				console.log(item.width, x);
				TweenLite.set(item, {opacity:1, x:x})
				x = width
			})

			
			TweenLite.set(end_2b, {x:x+13})
			if(callback){
				callback()  
			}
			
		})




		
		
	};


	creative.init = function () {
		creative.setupDOMElements();

	// Check if Enabler is initialized.
	if (Enabler.isInitialized()) {
		// Check if ad is visible to user.
		if (Enabler.isVisible()) {
			creative.enablerInitHandler();
		} else {
			Enabler.addEventListener(studio.events.StudioEvent.VISIBLE,
				creative.enablerInitHandler);
		}
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.INIT,
			creative.enablerInitHandler);
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
		Enabler.addEventListener(
			studio.events.StudioEvent.PAGE_LOADED, creative.pageLoadHandler);
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

export {creative}
