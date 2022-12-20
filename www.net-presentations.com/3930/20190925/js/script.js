
	var intMouseX  = 0;
	var intMouseY  = 0;
	var intScrollY = 0;
	var intScrollHeight = 0;
	var intScrollMargin = 0;
	
	var eScrollSpace = null
	var eScrollTarget = null;
	var eScrollDocument = null;
	
	var intStartY = 0;
	var intCount = 0;
	
	
	function onScroll( intY, name ) {
		
		var eScrollSpace = document.getElementById( name );
		var intScrollHeight = parseInt( eScrollSpace.style.height );
		
		var eScrollTarget = document.getElementById( name + "bar" );
		var intScrollBarHeight = parseInt( eScrollTarget.style.height );
		
		var eScrollDocument = document.getElementById( name + "doc" );
		var intDocumentHeight = parseInt( eScrollDocument.style.height );
		
		if ( intY < 0 ) {
			intY = 0;
		}
		
		if ( intY >= 0 && intY <= intDocumentHeight - intScrollHeight ) {
			eScrollDocument.style.top = (0-intY) + "px";
			intScrollTop = intY / (intDocumentHeight - intScrollHeight) * (intScrollHeight - intScrollBarHeight);
			eScrollTarget.style.top = parseInt( intScrollTop ) + "px";
		}
	}
	
	function onScrollStart( name ) {
		intStartY = intMouseY;
		
		eScrollTarget = document.getElementById( name + "bar" );
		intScrollY = parseInt( eScrollTarget.style.top );
		
		eScrollSpace = document.getElementById( name );
		intScrollHeight = parseInt( eScrollSpace.style.height ) - parseInt( eScrollTarget.style.height );
		
		eScrollDocument = document.getElementById( name + "doc" );
		
		eScrollTarget.style.backgroundColor = "#77aaff";
	}
	
	function onScrollEnd() {
		if ( eScrollTarget != null ) {
			eScrollTarget.style.backgroundColor = "#dddddd";
		}
		eScrollTarget = null;
		eScrollDocument = null;
	}
	
	function onMouseMove( event ) {
		getXY( event );
		
		if ( eScrollTarget != null ) {
			intY = (intMouseY-intStartY) + intScrollY;
			
			if ( intY < 0 || intY > intScrollHeight - intScrollMargin ) {
				if ( intY < 0 ) {
					intY = 0;
				}
				if ( intY > intScrollHeight - intScrollMargin ) {
					intY = intScrollHeight - intScrollMargin;
				}
			}
			
			eScrollTarget.style.top = intY + "px";
			
//			intDocumentY = 0 - (parseInt( eScrollDocument.style.y ) - parseInt( eScrollDocument.style.height )) * (intY / intScrollHeight * 100);
//			intDocumentY = 0 - parseInt( eScrollDocument.style.height ) * (intY / intScrollHeight);
			intDocumentY = 0 - ( parseInt( eScrollDocument.clientHeight ) - parseInt( eScrollSpace.style.height ) - intScrollMargin ) * (intY / intScrollHeight);
			
			eScrollDocument.style.top = intDocumentY + "px";
		}
	}
	
	function onScrollUp() {
		onScrollStart( "scroll" );
		
		intY = parseInt( eScrollTarget.style.top );
		if ( intY > 10 ) {
			intY = intY - 10;
		} else {
			intY = 0;
		}
		eScrollTarget.style.top = intY + "px";
		intDocumentY = 0 - ( parseInt( eScrollDocument.clientHeight ) - parseInt( eScrollSpace.style.height ) - 20 ) * (intY / intScrollHeight);
		eScrollDocument.style.top = intDocumentY + "px";
		
		onScrollEnd();
	}
	
	function onScrollDown() {
		onScrollStart( "scroll" );
		
		intY = parseInt( eScrollTarget.style.top );
		if ( intY < intScrollHeight - 10 ) {
			intY = intY + 10;
		} else {
			intY = intScrollHeight - 10;
		}
		eScrollTarget.style.top = intY + "px";
		intDocumentY = 0 - ( parseInt( eScrollDocument.clientHeight ) - parseInt( eScrollSpace.style.height ) - 20 ) * (intY / intScrollHeight);
		eScrollDocument.style.top = intDocumentY + "px";
		
		onScrollEnd();
	}
	
	function getXY( event ) {
		if ( !event ) {
			intMouseX = window.event.clientX;
			intMouseY = window.event.clientY;
		} else {
			intMouseX = event.clientX;
			intMouseY = event.clientY;
		}
	}
	
	function initScroll() {
	    if ( document.addEventListener ) {
	        document.addEventListener( "mousemove", onMouseMove );
	        document.addEventListener( "mouseup", onScrollEnd );
	    } else if ( document.attachEvent ) {
	        document.attachEvent( "onmousemove", onMouseMove );
	        document.attachEvent( "onmouseup", onScrollEnd );
	    } else {
	    }
	}
	
	setTimeout( initScroll, 1000 );
	
	
