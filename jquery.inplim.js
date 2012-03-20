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
	 var defaults = {
	   jp: false,
	   regexStr: '.*'
	 };
	 if(!options){
	   return false;
	 }

	 var that = this;
	 var options = $.extend(defaults, options);
	 var regex = new RegExp(options.regexStr);
	 $(this).keypress(restrict);
	 if(options.jp){
	   $(this).keyup(jpRestrict);
	 }

	 return true;

	 /**
	  * 日本語入力確定をトリガーとして、
	  * テキストボックス全体の入力を検証する。
	  */
	 function jpRestrict(event){
	   var code = getInputCode(event);
	   if(code === 13){
	     var corrected = '';
	     $.each($(that).val(), function(){
		      corrected += regex.test(this) ? this : '';
		      console.log(this);
		    });
	     $(that).val(corrected);
	   }
	 }

	 /**
	  * stop to input not allowed character.
	  * @param event {Object} event object.
	  */
	 function restrict(event){
	   var code = getInputCode(event);
	   var ch = String.fromCharCode(code);
	   if( (!code) || (code < 32) || (!regex.test(ch)) ) {
	     event.preventDefault();
	     return false;
	   }
	   return true;
	 }

	 /**
	  * get input key code;
	  * @param event {Object} event object.
	  */
	 function getInputCode(event){
	   return event.which ? event.which : event.keyCode ? event.keyCode : event.charCode ? event.charCode : 0 ;
	   }
       }
     }
   );
}(jQuery));