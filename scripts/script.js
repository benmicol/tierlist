const listArr = ['s','a','b','c','d'];
let counter = 0;
let r;
document.getElementById('listTitle').value = "";
dragula([document.querySelector('#trackList'), document.querySelector('#slist'), document.querySelector('#alist'), document.querySelector('#blist'), document.querySelector('#clist'), document.querySelector('#dlist')]);
clearText();
eventListeners();

function clearText() {
	for (let i = 0; i < listArr.length; i++) {
		document.getElementById(listArr[i]+'listItem').value = "";
	};
	document.getElementById('artist').value = "";
	document.getElementById('album').value = "";
};
function eventListeners() {
	for (let i = listArr.length - 1; i >= 0; i--) {
		document.getElementById('addButton'+listArr[i].toUpperCase()).addEventListener('click', event => {
			addItem(listArr[i]);
		});
		document.getElementById(listArr[i]+'listItem').addEventListener('keydown', event => {
	  		if (event.isComposing || event.keyCode === 229) {
	    		return;
	  		} else if (event.keyCode === 13) {
	  			addItem(listArr[i]);
	  		}});
	};
	document.querySelector('#addButtonT').addEventListener('click', addTracks);
	document.querySelector('#screenButton').addEventListener('click', screenshot);
	document.querySelector('#album').addEventListener('keydown', event => {
		if (event.isComposing || event.keyCode === 229) {
		  return;
		} else if (event.keyCode === 13) {
			addTracks();
		}});
};
function titleCase(myStr) {
	return myStr.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
}
function off(){
	document.querySelector(".screenshot").style.display = "none";
}
function saveAs(uri, filename) {
	let link = document.createElement('a');
	if (typeof link.download === 'string') {
	  link.href = uri;
	  link.download = filename;
	  document.body.appendChild(link);
	  link.click();
	  document.body.removeChild(link);
	} else {
	  window.open(uri);
	}};
function screenshot(){
	const main = document.querySelector('main');
	html2canvas(main, {
		allowTaint: true,
		scrollY: -window.scrollY
	}).then(function(canvas) {
	saveAs(canvas.toDataURL(), document.getElementById('listTitle').value + " Tier List");
})};
function isValidUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;  
  }
  return true;
};
function addTracks() {
	const trackList = document.querySelector('#trackList');
	let artist = document.getElementById('artist').value;
	let album = document.getElementById('album').value;
	let playerBtn = document.createElement('img');
	let youtubeAudio = document.querySelector('#youtube-audio');
  	playerBtn.src = "icons/quyUPXN.png";
  	playerBtn.className = "ytImage";
  	playerBtn.setAttribute("id", "youtube-icon");
  	youtubeAudio.appendChild(playerBtn);
  	let nowPlaying = document.createElement('div');
  	nowPlaying.id = 'nowPlaying';
  	youtubeAudio.appendChild(nowPlaying);
	fetch('https://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist='+artist+'&album=' + album + '&api_key=cb44e36a7f8b0c6427b01d4de757a2ad&format=json', {mode: 'cors'})
    	.then(function(response) {
      		return response.json();
    	})
    	.then(function(lastFM) {
			let albumURL = lastFM.album.url;
			let postersrc = lastFM.album.image[4]["#text"];
			let poster = document.createElement('img');
			poster.id = 'poster';
			poster.src = postersrc;
			let trackLetter = document.querySelector('#trackletter');
			trackLetter.appendChild(poster)
			document.querySelector('#nowPlaying').innerHTML = lastFM.album.tracks.track[0].name;
			let data = [
			    {
			        url: albumURL, // url string rquired
			        selector: 'td.chartlist-play', // selector string rquired
			        loop: true, // each boolean rquired
			        result: [
			            {
			                name: 'id', // key string rquired
			                find: 'a', // selector child string rquired
			                grab: {
			                    by: 'attr', // attribut string rquired
			                    value: 'data-youtube-id' // attribut value string optional
			                }
			            }			    
			        ]
			    },
			];
			for (let i = 0; i < lastFM.album.tracks.track.length; i++) {
				let track = document.createElement('li');  			
				let trackName = lastFM.album.tracks.track[i].name;
				track.className = "item";
				track.id = 'track'+i
				track.innerHTML = "<p>"+trackName+"</p>";
				trackList.appendChild(track);
				let imgdiv = document.createElement('div');
				imgdiv.className = "imgdiv";
				track.appendChild(imgdiv);
				let player = document.querySelector('#youtube-audio');
				let playBtn = document.createElement('img');
				playBtn.src = "icons/quyUPXN.png";
				playBtn.className = "ytImage";
				playBtn.setAttribute("id", "youtube-icon"+i);
				playBtn.setAttribute("data-html2canvas-ignore","");
				playBtn.addEventListener('click', setVideo);
				imgdiv.appendChild(playBtn);
		  	};
			ygrab(data, async function(result) {
				let albumIds = result;
				document.querySelector('#youtube-audio').setAttribute('data-video', albumIds[0].id);
				for (let i = 0; i < lastFM.album.tracks.track.length; i++) {
					let vidId = albumIds[i].id;
					var e = document.getElementById("track"+i);
					let player = document.querySelector('#youtube-audio');
					e.setAttribute('data-video', vidId);
					let icon = document.querySelector('#youtube-icon'+i);
					icon.id = vidId;
				};
			await createPlayer();
			});
			let disArray = ['S','A','B','C','D','T'];
			for (let i = disArray.length - 1; i >= 0; i--) {
				document.querySelector('#disappear'+disArray[i]).style.display = "none";
			}
  			document.querySelector('#listTitle').value = titleCase(album);
		}
	)};
function setVideo(){
	let player = document.querySelector('#youtube-audio');
	if (player.getAttribute('data-video') == this.parentNode.parentNode.getAttribute('data-video')) {
		if ( r.getPlayerState() == 1 || r.getPlayerState() == 3 ) {
	      r.pauseVideo(); 
	      document.getElementById("youtube-icon").src = "icons/quyUPXN.png";
		  document.getElementById(player.getAttribute('data-video')).src = "icons/quyUPXN.png";
	    } else {
	      r.playVideo(); 
	      document.getElementById("youtube-icon").src = "icons/IDzX9gL.png";
		  document.getElementById(player.getAttribute('data-video')).src = "icons/IDzX9gL.png";
	    } 
	} else {
		document.getElementById(player.getAttribute('data-video')).src = "icons/quyUPXN.png";
		document.querySelector('#youtube-player').remove();
		let ytdiv = document.createElement('div');
		ytdiv.id = "youtube-player";
		player.appendChild(ytdiv);
		player.setAttribute('data-video', this.parentNode.parentNode.getAttribute('data-video'));
		player.setAttribute('data-autoplay', '1');
		this.src = "icons/IDzX9gL.png"
		document.querySelector('#nowPlaying').innerHTML = this.parentNode.parentNode.firstChild.innerHTML;
		createPlayer();
	}
}
function createPlayer() {
	let player = document.querySelector('#youtube-audio');
	player.onclick = toggleAudio;
	r = new YT.Player("youtube-player", {
		    			height: "0",
		    			width: "0",
		    			videoId: player.dataset.video,
		    			playerVars: {
		      				autoplay: player.dataset.autoplay,
		      				loop: player.dataset.loop
		    			},
		    			events: {
		      				'onReady': onPlayerReady,
		      				'onStateChange': onPlayerStateChange
		      				}
		 			 });
	function togglePlayButton(play) {    
		document.getElementById("youtube-icon").src = play ? "icons/IDzX9gL.png" : "icons/quyUPXN.png";
		document.getElementById(player.getAttribute('data-video')).src = play ? "icons/IDzX9gL.png" : "icons/quyUPXN.png";
		}
	function toggleAudio() {
	    if ( r.getPlayerState() == 1 || r.getPlayerState() == 3 ) {
	      r.pauseVideo(); 
	      togglePlayButton(false);
	    } else {
	      r.playVideo(); 
	      togglePlayButton(true);
	    } 
	  } 
	function onPlayerReady(event) {
	    togglePlayButton(r.getPlayerState() !== 5);
	  }
	function onPlayerStateChange(event) {
	    if (event.data === 0) {
	      togglePlayButton(false); 
	    }
	  }
}
function addItem(item) {
	console.log(item)
	let newItem = document.getElementById(item+'listItem').value;
	let entry = document.createElement('li');
	let rembut = document.createElement('input');
	let list = document.querySelector('#'+item+'list');
	rembut.type = "button"
	rembut.className = "buttonInput"
	rembut.value = "-"
	rembut.id = "remButton"+item.toUpperCase()+counter;
	rembut.setAttribute("data-html2canvas-ignore","");
	if (isValidUrl(newItem)) {
		let image = document.createElement('img');
		image.src = newItem;
		image.className = "userImage";
		entry.appendChild(image);
		entry.className="item";
	} else {
	entry.innerHTML = "<p>"+titleCase(newItem)+"</p>";
	entry.className="item";
	}
	entry.appendChild(rembut)
	list.insertBefore(entry, list.firstChild);
	rembut.addEventListener('click', function(){this.closest('.item').remove()});
	counter += 1;
	clearText()
};