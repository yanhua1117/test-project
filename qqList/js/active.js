window.onload = function(){
	var oUl = document.getElementById('list');
	var aH2 = oUl.getElementsByTagName('h2');
	var aUl = oUl.getElementsByTagName('ul');
	
	for(var i=0;i<aH2.length;i++){
		aH2[i].index = i;
		aH2[i].onclick = function(){
			
			if(this.className == ''){
				aUl[this.index].style.display = 'block';
				this.className = 'active';
			}else{
				aUl[this.index].style.display = 'none';
				this.className = '';
			}
		}
	}
}
