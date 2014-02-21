function scrollBar(scrollBoxId) {

	var scrollbar;
	var scrollable;
	var scrollbarBut;

	var multi = 0; //Defines the speed of the bar

	
	
	function loading(scrollBoxId){
		var general = document.getElementById(scrollBoxId);
		
		scrollable = general.children[0];

		scrollbar = general.children[1];
	
		scrollbarBut = scrollbar.children[0];
	
		multi = (scrollable.scrollHeight - scrollable.offsetHeight) / (scrollbar.offsetHeight) ;
		
		
		addHandler(scrollbarBut,'mousedown',beginScroll);
	
	}	
	
	function beginScroll(e){
		if (e.target == scrollbarBut) {
				addHandler(window,'mousemove',mouseMoveEvent);
				addHandler(window,'mouseup',mouseUpEvent);
				
				adddUnclickShape();
				addHandler(document,'mouseout',mouseLeaveWindowEvent);
			}
	}
	
	function addHandler(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    }
	
	function removeHandler(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
	
	function mouseMoveEvent(e){
		var positionScrollBar = getElementTopLeft(scrollbar);
		var posBottom = positionScrollBar.top + scrollbar.offsetHeight;
		var clientY = e.pageY;//Current position in document
		
			if (clientY >= positionScrollBar.top && clientY <= posBottom){ //Check if the mouse is out of bounds
				scrollable.scrollTop = (clientY - positionScrollBar.top) * multi;	
					scrollbarBut.style.top = clientY - positionScrollBar.top - 20+ "px";	
			}else{
				if (clientY<= positionScrollBar.top){ //Set the top position
					scrollbarBut.style.top = -20 +  "px"; //In the top
				}else{
					scrollbarBut.style.top = scrollbar.offsetHeight - 20+ "px"; // Set the bottom position
				}	
			
			}		
	}
		
	//Disable the move of the scrollbar
	function removeMouseScroll(){
		
		
		removeUnclickShape(); //Remove the invisible shape
		removeHandler(window,'mousemove',mouseMoveEvent);
		removeHandler(window,'mouseup',mouseUpEvent);
		removeHandler(document,'mouseout',mouseLeaveWindowEvent);
	}
	
	function mouseLeaveWindowEvent(e){
		var from = e.relatedTarget;
		if (!from || from.nodeName == "HTML"){
			removeMouseScroll();
		}
	}
	
	function mouseUpEvent(e){
		removeMouseScroll();
	}
		
	//Add a invisible shape to remove selection
	function adddUnclickShape(){
		var newdiv = document.createElement('div');
		newdiv.setAttribute('id',"unclick");
		newdiv.style.cssText="z-index:999;position:absolute;top:0;left:0;height:100%;width:100%";
		document.body.appendChild(newdiv);
	
	}
	
	//Remove the inivisible shape
	function removeUnclickShape(){
		var element = document.getElementById("unclick");
		document.body.removeChild(element);
	}

	
	function getElementTopLeft(element) {

		var top = 0;
		var left = 0;
	   
		while(element.tagName != "BODY") {
			top += element.offsetTop;
			left += element.offsetLeft;
			element = element.offsetParent;
		}
   
		return { top: top, left: left };
	}

	loading(scrollBoxId);
}
