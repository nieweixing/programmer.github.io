var currentScript=document.currentScript||document.scripts[document.scripts.length-1],library=(currentScript.src.match(/[?&]library=([^&]*)/i)||["",""])[1],music=(currentScript.src.match(/[?&]music=([^&]*)/i)||["",""])[1];class Player{constructor(){return Player.instance||this.getInstance(...arguments)}getInstance(){var t=new PlayerCreator(...arguments);return Player.instance=t}}class Musics{constructor(){var t;"netease"==library?($.ajaxSettings.async=!1,t=$.getJSON("https://api.uomg.com/api/rand.music?",{sort:"热歌榜",format:"json"}).responseJSON,this.songs=[{id:t.code,title:t.data.name,singer:t.data.artistsname,songUrl:t.data.url,imageUrl:t.data.picurl}]):"qqkg"==library&&($.ajaxSettings.async=!1,t=$.getJSON("https://api.uomg.com/api/get.kg?",{songurl:music,format:"json"}).responseJSON,this.songs=[{id:t.code,title:t.data.song_name,singer:t.data.kg_nick,songUrl:t.data.playurl,imageUrl:t.data.pic}])}getSongByNum(t){var i;return"netease"==library?($.ajaxSettings.async=!1,[{id:(i=$.getJSON("https://api.uomg.com/api/rand.music?",{sort:"热歌榜",format:"json"}).responseJSON).code,title:i.data.name,singer:i.data.artistsname,songUrl:i.data.url,imageUrl:i.data.picurl}][0]):"qqkg"==library?($.ajaxSettings.async=!1,[{id:(i=$.getJSON("https://api.uomg.com/api/get.kg?",{songurl:music,format:"json"}).responseJSON).code,title:i.data.song_name,singer:i.data.kg_nick,songUrl:i.data.playurl,imageUrl:i.data.pic}][0]):void 0}}class PlayerCreator{constructor(){this.audio=document.querySelector(".music-player__audio"),this.audio.volume=.8,this.util=new Util,this.musics=new Musics,this.song_index=0,this.loop_mode=0,this.song_list=$(".music__list_content"),this.render_doms={title:$(".music__info--title"),singer:$(".music__info--singer"),image:$(".music-player__image img"),blur:$(".music-player__blur")},this.ban_dom={control__btn:$(".control__volume--icon")},this.render_time={now:$(".nowTime"),total:$(".totalTime")},this.disc={image:$(".music-player__image"),pointer:$(".music-player__pointer")},this.init()}init(){this.renderSongList(),this.renderSongStyle(),this.bindEventListener()}renderSongList(){let s="";this.musics.songs.forEach((t,i)=>{s+=`<li class="music__list__item">${t.title}</li>`}),this.song_list.html(s)}renderSongStyle(){var{title:t,singer:i,songUrl:s,imageUrl:e}=this.musics.getSongByNum(this.song_index);this.audio.src=s,this.render_doms.title.html(t),this.render_doms.singer.html(i),this.render_doms.image.prop("src",e),this.render_doms.blur.css("background-image",'url("'+e+'")'),this.song_list.find(".music__list__item").eq(this.song_index).addClass("play").siblings().removeClass("play")}bindEventListener(){this.$play=new Btns(".player-control__btn--play",{click:this.handlePlayAndPause.bind(this)}),this.$prev=new Btns(".player-control__btn--prev",{click:this.changeSong.bind(this,"prev")}),this.$next=new Btns(".player-control__btn--next",{click:this.changeSong.bind(this,"next")}),this.$mode=new Btns(".player-control__btn--mode",{click:this.changePlayMode.bind(this)}),this.$ban=new Btns(".control__volume--icon",{click:this.banNotes.bind(this)}),this.song_list.on("click","li",t=>{t=$(t.target).index();this.changeSong(t)}),new Progress(".control__volume--progress",{min:0,max:1,value:this.audio.volume,handler:t=>{this.audio.volume=t}}),this.audio.oncanplay=()=>{if(this.progress)return this.progress.max=this.audio.duration,this.render_time.total.html(this.util.formatTime(this.audio.duration)),!1;this.progress=new Progress(".player__song--progress",{min:0,max:this.audio.duration,value:0,handler:t=>{this.audio.currentTime=t}}),this.render_time.total.html(this.util.formatTime(this.audio.duration))},this.audio.ontimeupdate=()=>{this.progress.setValue(this.audio.currentTime),this.render_time.now.html(this.util.formatTime(this.audio.currentTime))},this.audio.onended=()=>{this.changeSong("next"),this.audio.play()}}handlePlayAndPause(){let t=this.$play.$el.find("i");this.audio.paused?(this.audio.play(),t.removeClass("icon-play").addClass("icon-pause"),this.disc.image.addClass("play"),this.disc.pointer.addClass("play")):(this.audio.pause(),t.addClass("icon-play").removeClass("icon-pause"),this.disc.image.removeClass("play"),this.disc.pointer.removeClass("play"))}changePlayMode(){this.loop_mode++,2<this.loop_mode&&(this.loop_mode=0),this.renderPlayMode()}renderPlayMode(){let t=this.$mode.$el.find("i");t.prop("class","iconfont icon-"+["loop","random","single"][this.loop_mode])}changeSongIndex(t){if("number"==typeof t)this.song_index=t;else if(0===this.loop_mode)this.song_index+="next"===t?1:-1,this.song_index>this.musics.songs.length-1&&(this.song_index=0),this.song_index<0&&(this.song_index=this.musics.songs.length-1);else if(1===this.loop_mode){var s=this.musics.songs.length;let i=Math.floor(Math.random()*s);for(let t=0;t<1e4;t++){if(this.song_index!=i){this.song_index=i;break}i=Math.floor(Math.random()*s)}}else 2===this.loop_mode&&(this.song_index=this.song_index)}songTime(){var t=parseInt(this.audio.duration/60)<10?"0"+parseInt(this.audio.duration/60):parseInt(this.audio.duration/60),i=parseInt(this.audio.duration%60)<10?"0"+parseInt(this.audio.duration%60):parseInt(this.audio.duration%60);$(".totalTime").text(t+":"+i)}changeSong(t){this.changeSongIndex(t);t=this.audio.paused;this.renderSongStyle(),t||this.audio.play()}banNotes(){let t=this.$ban.$el.find("i");1==this.audio.muted?(this.audio.muted=!1,t.removeClass("icon-muted").addClass("icon-volume")):(this.audio.muted=!0,t.removeClass("icon-volume").addClass("icon-muted"))}}class Progress{constructor(t,i){$.extend(this,i),this.$el=$(t),this.width=this.$el.width(),this.init()}init(){this.renderBackAndPointer(),this.drag(),this.value,this.changeDOMStyle(this.width*this.value)}renderBackAndPointer(){this.$back=$('<div class="back">'),this.$pointer=$('<div class="pointer">'),this.$el.append(this.$back),this.$el.append(this.$pointer)}setValue(t){t=this.width*t/(this.max-this.min);this.changeDOMStyle(t)}drag(){let e=this.$pointer,n=this.$el,a=!1;e.mousedown(t=>{a=!0;let s={x:t.offsetX};$(document).mousemove(t=>{var i;!0===a&&(i=t.clientX-n.offset().left-s.x,i=(t=Math.max(0,Math.min(i,n.outerWidth(!1)-e.outerWidth(!1))))/n.outerWidth(!1)*(this.max-this.min),this.changeDOMStyle(t),this.handler(i))})}),$(document).mouseup(()=>{a=!1})}bindEvents(){this.$el.click(t=>{var i=t.offsetX,t=i/this.width*(this.max-this.min);this.changeDOMStyle(i),this.handler(t)})}changeDOMStyle(t){this.$back.width(t+7==7?0:t+7),this.$pointer.css("left",t+"px")}}class Btns{constructor(t,i){this.$el=$(t),this.bindEvents(i)}bindEvents(t){for(const i in t)t.hasOwnProperty(i)&&this.$el.on(i,t[i])}}new Player;