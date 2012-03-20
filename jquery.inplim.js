/**
 * @autor ntakeda
 * @site https://github.com/ntakeda67/jquery.inplim.js
 * @version 0.0.1
 */
(function(jQuery){
   jQuery.fn.extend(
     {
       /**
	* @param options {Object}
	* @param options.regexStr {String}
	* @return {Boolean} true: restriction enabled, false:disabled
	*/
       inplim : function(options){
	 if(!options){
	   return false;
	 }

	 var regexStr = options.regexStr || '.*';
	 var regex = new RegExp(regexStr);
	 $(this).keypress(restrict);
	 $(this).keyup(function(event){
			 //13だけひろう
		       });

	 return true;
	 /**
	  * stop to input not allowed character.
	  * @param event {Object} event object.
	  */
	 function restrict(event){
	   var code = event.which ? event.which : event.keyCode ? event.keyCode : event.charCode ? event.charCode : 0 ;
	   var ch = String.fromCharCode(code);
	   if( (!code) || (code < 32) || (!regex.test(ch)) ) {
	     event.preventDefault();
	     return false;
	   }
	   return true;
	 }
       }
     }
   );
}(jQuery));