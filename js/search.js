var searchFunc=function(t,r,i){"use strict";$.ajax({url:t,dataType:"xml",success:function(t){var e,n=$("entry",t).map(function(){return{title:$("title",this).text(),content:$("content",this).text(),url:$("url",this).text()}}).get(),t=document.getElementById(r);t&&(e=document.getElementById(i),0<$("#local-search-input").length&&t.addEventListener("input",function(){var u='<ul class="search-result-list">',h=this.value.trim().toLowerCase().split(/[\s\-]+/);e.innerHTML="",this.value.trim().length<=0||(n.forEach(function(t){var n=!0;t.title&&""!==t.title.trim()||(t.title="Untitled");var r,e,i,l=t.title.trim().toLowerCase(),a=t.content.trim().replace(/<[^>]+>/g,"").toLowerCase(),c=t.url,s=-1,o=-1;""!==a?h.forEach(function(t,e){r=l.indexOf(t),s=a.indexOf(t),r<0&&s<0?n=!1:(s<0&&(s=0),0==e&&(o=s))}):n=!1,n&&(u+="<li><a href='"+c+"' class='search-result-title'>"+l+"</a>",e=t.content.trim().replace(/<[^>]+>/g,""),0<=o&&(c=o+80,(c=0==(t=(t=o-20)<0?0:t)?100:c)>e.length&&(c=e.length),i=e.substring(t,c),h.forEach(function(t){var e=new RegExp(t,"gi");i=i.replace(e,"<em class=\"search-keyword\"><i style='color:rgb(231,133,104);'><b>"+t+"</b></i></em>")}),u+='<p class="search-result">'+i+"...</p>"),u+="</li>")}),u+="</ul>",e.innerHTML=u)}))}})};$(document).ready(function(){$("#local-search-input").bind("keypress",function(t){"13"==t.keyCode&&alert("search")})});