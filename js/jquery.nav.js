!function(o,a,n){function i(t,i){this.elem=t,this.$elem=o(t),this.options=i,this.metadata=this.$elem.data("plugin-options"),this.$win=o(a),this.sections={},this.didScroll=!1,this.$doc=o(n),this.docHeight=this.$doc.height()}i.prototype={defaults:{navItems:"a",currentClass:"current",changeHash:!1,easing:"swing",filter:"",scrollSpeed:750,scrollThreshold:.5,begin:!1,end:!1,scrollChange:!1,padding:0},init:function(){return this.config=o.extend({},this.defaults,this.options,this.metadata),this.$nav=this.$elem.find(this.config.navItems),""!==this.config.filter&&(this.$nav=this.$nav.filter(this.config.filter)),this.$nav.on("click.onePageNav",o.proxy(this.handleClick,this)),this.getPositions(),this.bindInterval(),this.$win.on("resize.onePageNav",o.proxy(this.getPositions,this)),this},adjustNav:function(t,i){t.$elem.find("."+t.config.currentClass).removeClass(t.config.currentClass),i.addClass(t.config.currentClass)},bindInterval:function(){var t,i=this;i.$win.on("scroll.onePageNav",function(){i.didScroll=!0}),i.t=setInterval(function(){t=i.$doc.height(),i.didScroll&&(i.didScroll=!1,i.scrollChange()),t!==i.docHeight&&(i.docHeight=t,i.getPositions())},250)},getHash:function(t){return t.attr("href").split("#")[1]},getPositions:function(){var t,i,n=this;n.$nav.each(function(){t=n.getHash(o(this)),(i=o("#"+t)).length&&(i=i.offset().top,n.sections[t]=Math.round(i))})},getSection:function(t){var i,n=null,s=Math.round(this.$win.height()*this.config.scrollThreshold);for(i in this.sections)this.sections[i]-s<t&&(n=i);return n},handleClick:function(t){var i=this,n=o(t.currentTarget),s=n.parent(),e="#"+i.getHash(n);s.hasClass(i.config.currentClass)||(i.config.begin&&i.config.begin(),i.adjustNav(i,s),i.unbindInterval(),i.scrollTo(e,function(){i.config.changeHash&&(a.location.hash=e),i.bindInterval(),i.config.end&&i.config.end()})),t.preventDefault()},scrollChange:function(){var t=this.$win.scrollTop(),t=this.getSection(t);null!==t&&((t=this.$elem.find('a[href$="#'+t+'"]').parent()).hasClass(this.config.currentClass)||(this.adjustNav(this,t),this.config.scrollChange&&this.config.scrollChange(t)))},scrollTo:function(t,i){t=o(t).offset().top-this.config.padding;o("html, body").animate({scrollTop:t},this.config.scrollSpeed,this.config.easing,i)},unbindInterval:function(){clearInterval(this.t),this.$win.unbind("scroll.onePageNav")}},i.defaults=i.prototype.defaults,o.fn.onePageNav=function(t){return this.each(function(){new i(this,t).init()})}}(jQuery,window,document);