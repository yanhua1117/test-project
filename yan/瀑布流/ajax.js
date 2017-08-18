function ajax( methed, url, data, success ){
	
	var xhr = null;
	
	try{
		xhr = new XMLHttpRequest();
	}catch(e){
		//TODO handle the exception
		xhr = new ActiveXObject( 'Microsoft.XMLHTTP' );
	}
	
	if ( methed == 'get' && data ) {
		url += '?' + data;
	}
	
	xhr.open( methed,url,true );
	
	if ( methed == 'get' ) {
		xhr.send();
	} else{
		xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
	}
	
	xhr.onreadystatechange = function(){
		
		if ( xhr.readyState == 4 ) {
			if ( xhr.status == 200 ) {
				success && success( xhr.responseText );
			} else{
				alert( '出错了，Err: ' + xhr.status );
			}
		}
		
	}
	
}
