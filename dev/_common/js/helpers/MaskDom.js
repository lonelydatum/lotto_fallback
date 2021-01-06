

window.frameTween = function( tl, frame, showHide){


	if(showHide==='hide'){
		tl.add('hide', "+="+frame.readTime)
	}else{
		TweenLite.set("."+frame.name,{opacity:1} )
	}

	var frameEL = document.querySelector("."+frame.name)
	for(var i=0;i<frame.children.length;i++){
		var childData = frame.children[i];

		var childList = frameEL.querySelectorAll('.'+childData.name)
		var frameLabel = {
			show: {name:frame.name+childData.name, delay:childData.show.delay}
		}

		if(showHide==="show"){
			show(tl, childList, frameLabel, 'show')
		}

		if(showHide==="hide"){
			hide(tl, childList)
		}
	}
}

function show(tl, childList, labelOject, showHide){

	var label = labelOject[showHide];
	tl.add(label.name, "+="+label.delay)
	// console.log(label);
	for(var j=0;j<childList.length;j++){
		var childEL = childList[j];
		var pTag = childEL.querySelector('p');
		TweenLite.set(childEL, {overflow:'hidden'})
		// TweenLite.set(childEL, {border:'1px solid green'})
		try{
			tl.from(pTag, .5, {y:pTag.offsetHeight+2, ease:Sine.easeOut}, label.name)
		}catch(e){
			console.log(labelOject);
		}

	}
}


function hide(tl, childList, labelOject){
	for(var j=0;j<childList.length;j++){
		var childEL = childList[j];
		var pTag = childEL.querySelector('p');
		tl.to(pTag, .3, {y:"-="+pTag.offsetHeight, ease:Sine.easeOut}, 'hide')
	}
}