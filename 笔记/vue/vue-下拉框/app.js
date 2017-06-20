//var list = [
//	{
//		title:"吃饭打豆豆",
//		isChecked:false //状态为false，为不选中  任务未完成
//	},
//	{
//		title:"妙味课堂",
//		isChecked:true   //状态为true，为选中    任务完成
//	}
//];

var store = {
	save( key,value ){
		localStorage.setItem( key,JSON.stringify(value) );
	},
	fetch( key ){
		return JSON.parse( localStorage.getItem(key) ) || [];
	}
}

var filter = {
	all : function(list){
		return list;
	},
	finished : function(list){
		return list.filter(function(item){
			return item.isChecked;
		})
	},
	unfinished : function(list){
		return list.filter(function(item){
			return !item.isChecked;
		})
	}
}

var list = store.fetch("task");

var app = new Vue({
	el:".main",
	data : {
		list : list,
		editTodos : '',
		beforeTitle : '',
		visibily : 'all'
	},
	methods : {
		addTodo(ev){//添加任务
			//向list中添加一个任务
			//事件处理函数中的this 指向vue实例
			this.list.push({
				title : ev.target.value,
				isChecked : false
			})
		},
		deleteTodo(todo){
			var index = this.list.indexOf(todo);
			this.list.splice( index,1 );
		},
		editTodo(todo){
			this.beforeTitle = todo.title;
			this.editTodos = todo;
		},
		editOver(todo){
			this.editTodos = "";
		},
		cancelTodo(todo){
			todo.title = this.beforeTitle;
			this.editTodos = "";
		}
	},
	directives : {
		focus : {
			update(el,binding){
				if( binding.value === true ){
					el.focus();
				}
			}
		}
	},
	computed : {
		noCheckLength : function(){
			return this.list.filter(function(item){
				return !item.isChecked; 
			}).length
		},
		filterList : function(){
			
			return filter[this.visibily] ? filter[this.visibily]( this.list ) : this.list;
		}
	},
	watch : {
//		list : function(){
//			store.save("task",this.list);
//		}
		list : {
			handler(){
				store.save("task",this.list);
			},
			deep:true
		}
	}
});

function watchHashChange(){
	var hash = window.location.hash.slice(1);
	app.visibily = hash;
}

watchHashChange();

window.addEventListener("hashchange",watchHashChange);