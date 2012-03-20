/**
 * @autor ntakeda67
 * @site https://github.com/ntakeda67/jquery.inplim.js
 * @version 0.0.1
 * @title jquery.inplim
 * @overview limit character inputed when pressed key with jQuery.
 * The MIT License
 *
 * Copyright (c) 2012 ntakeda67
 *
 * mission is hereby granted, free of charge, to any person obtaining a copy
 * this software and associated documentation files (the "Software"), to deal
 * the Software without restriction, including without limitation the rights
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * ies of the Software, and to permit persons to whom the Software is
 * nished to do so, subject to the following conditions:
 *
 *  above copyright notice and this permission notice shall be included in
 *  copies or substantial portions of the Software.
 *
 *  SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * LIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * NESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * HORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * BILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  SOFTWARE.
 */
(function(jQuery){
   jQuery.fn.extend(
     {
       /**
	* @param options {Object}
	* @param options.regexStr {String}
	* @param options.jp {Boolean}
	* @param options.copy {Boolean}
	* @return {Boolean} true: restriction enabled, false:disabled
	*/
       inplim : function(options){
	 var defaults = {
	   jp: false,
	   regexStr: '.*',
	   paste:false
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
	 if(options.paste){
	   $(this).bind('paste', function(event){
			  var corrected = deleteIllegalText($(event.target).val(), regex);
			  $(event.taget).val(corrected);
			});
	 }

	 return true;

	 /**
	  * 日本語入力確定をトリガーとして、
	  * テキストボックス全体の入力を検証する。
	  */
	 function jpRestrict(event){
	   var code = getInputCode(event);
	   if(code === 13){
	     var corrected = deleteIllegalText($(event.target).val(), regex);
	     $(event.target).val(corrected);
	   }
	 }

	 /**
	  * 入力検証に違反している文字列を削除する。
	  * @param 検査対象文字列
	  * @return 削除後の文字列
	  */
	 function deleteIllegalText(text, regex){
	     var corrected = '';
	     $.each(text, function(){
		      corrected += regex.test(this) ? this : '';
		    });
	     return corrected;
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