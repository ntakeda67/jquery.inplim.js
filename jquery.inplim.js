(function(jQuery){
   jQuery.fn.extend(
     {
       inplim : function(method){
	 var methods = {
	   init: function(options){
	     // 初期化処理
	     this.inplim.settings = jQuery.extend({}, this.inplim.defaults, options);
	     return this.each(function(){
				// initialize
			      });
	   },
	   limit: function(regexp){
	   }
	 };

	 if(methods[method]){
	   return methods[method].apply(this, Array.prototype.slice.call(arugemntes, 1));
	 } else if(typeof method === 'object' || !method) {
	   return methods.init.apply(this, arguments);
	 } else {
	   jQuery.error(method + ' does not exist jquery.inplim');
	 }

	 jQuery.fn.inplim.defaults = {
	   // 正規表現の未指定時の入力検証に用いる
	   regexpStr: '.*'
	 };
       }
     }
   );
}(jQuery));