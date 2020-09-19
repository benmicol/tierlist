const slist = document.querySelector('#slist');
const alist = document.querySelector('#alist');
const blist = document.querySelector('#blist');
const clist = document.querySelector('#clist');
const dlist = document.querySelector('#dlist');
const trackList = document.querySelector('#trackList');
const buttonS = document.querySelector('#addButtonS');
const buttonA = document.querySelector('#addButtonA');
const buttonB = document.querySelector('#addButtonB');
const buttonC = document.querySelector('#addButtonC');
const buttonD = document.querySelector('#addButtonD');
const buttonT = document.querySelector('#addButtonT');
const buttonScreen = document.querySelector('#screenButton');
const main = document.querySelector('main');
const canvasContainer = document.createElement('div');
canvasContainer.className = "canvas";
const screenshotContainer = document.createElement('div');
screenshotContainer.className = "screenshot";
document.body.appendChild(screenshotContainer);
const screenInstruct = document.createElement('div');
screenshotContainer.appendChild(screenInstruct)
screenInstruct.textContent = "Right Click and Select Save Image to Download";
screenInstruct.className = "screenInstruct";
screenshotContainer.appendChild(canvasContainer);
buttonS.addEventListener('click', addItemS);
buttonA.addEventListener('click', addItemA);
buttonB.addEventListener('click', addItemB);
buttonC.addEventListener('click', addItemC);
buttonD.addEventListener('click', addItemD);
buttonT.addEventListener('click', addTracks);
buttonScreen.addEventListener('click', screenshot);
screenshotContainer.addEventListener('click',off);
document.getElementById('slistItem').addEventListener('keydown', event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  } else if (event.keyCode === 13) {
  	addItemS();
  }});
document.getElementById('alistItem').addEventListener('keydown', event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  } else if (event.keyCode === 13) {
  	addItemA();
  }});
document.getElementById('blistItem').addEventListener('keydown', event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  } else if (event.keyCode === 13) {
  	addItemB();
  }});
document.getElementById('clistItem').addEventListener('keydown', event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  } else if (event.keyCode === 13) {
  	addItemC();
  }});
document.getElementById('dlistItem').addEventListener('keydown', event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  } else if (event.keyCode === 13) {
  	addItemD();
  }});

document.getElementById('listTitle').value = "";
clearText()

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

	  //Firefox requires the link to be in the body
	  document.body.appendChild(link);

	  //simulate click
	  link.click();

	  //remove the link when done
	  document.body.removeChild(link);
	} else {
	  window.open(uri);
	}
	}



function screenshot(){
	canvasContainer.innerHTML = "";

	html2canvas(main, {
		allowTaint: true,
		scrollY: -window.scrollY
	}).then(function(canvas) {
	saveAs(canvas.toDataURL(), document.getElementById('listTitle').value + " Tier List");
    canvasContainer.appendChild(canvas);
});
	/*document.querySelector(".screenshot").style.display = "flex";*/
}

function isValidUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;  
  }

  return true;
}

function clearText() {
	document.getElementById('slistItem').value = "";
	document.getElementById('alistItem').value = "";
	document.getElementById('blistItem').value = "";
	document.getElementById('clistItem').value = "";
	document.getElementById('dlistItem').value = "";
	document.getElementById('artist').value = "";
	document.getElementById('album').value = "";
}

let scounter = 0;
let acounter = 0;
let bcounter = 0;
let ccounter = 0;
let dcounter = 0;
let tcounter = 0;

function addTracks() {
	let artist = document.getElementById('artist').value;
	let album = document.getElementById('album').value;

	fetch('http://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist='+artist+'&album=' + album + '&api_key=cb44e36a7f8b0c6427b01d4de757a2ad&format=json', {mode: 'cors'})
    	.then(function(response) {
      		return response.json();
    	})
    	.then(function(lastFM) {
			/*console.log(lastFM.results.albummatches.album[0].image[3]["#text"])*/
			/*document.querySelector('#cover').src = lastFM.album.image[4]["#text"];*/
			let albumURL = lastFM.album.url;
			let postersrc = lastFM.album.image[4]["#text"];
			let poster = document.createElement('img');
			poster.id = 'poster';
			poster.src = postersrc;
			let trackLetter = document.querySelector('#trackletter');

			trackLetter.appendChild(poster)
			document.querySelector('#nowPlaying').innerHTML = lastFM.album.tracks.track[0].name;


				var data = [
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
			            },
			            //{
			               // name: 'title',
			                //find: 'a',
			                //grab: {
			                    //by: 'attr',
			                    //value: 'data-track-name'
			                //}
			            //},
			            // ---- new selector ---- //
			        ]
			    },
			    // ---- new website url ---- //
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
		  	playBtn.src = "quyUPXN.png";
		  	playBtn.className = "ytImage";
		  	playBtn.setAttribute("id", "youtube-icon"+i);
		  	playBtn.addEventListener('click', setVideo);
		  	imgdiv.appendChild(playBtn);

		  	

		  	/*let player = document.createElement('div');
		  	player.id = 'youtube-audio'+i
  			player.setAttribute('data-autoplay', '0')
  			player.setAttribute('data-loop', '1')
  			track.appendChild(player);
  			var	t = document.createElement("img");		    		
    		t.src = "loading.png";
    		t.className = "ytImage";
  			t.setAttribute("id", "youtube-icon"+i);
  			player.appendChild(t);
  			var a = document.createElement("div");
  			a.setAttribute("id", "youtube-player"+i);
  			player.appendChild(a);*/
		  	}

			ygrab(data, async function(result) {
				let albumIds = result;
				document.querySelector('#youtube-audio').setAttribute('data-video', albumIds[0].id);
			
			
			for (let i = 0; i < lastFM.album.tracks.track.length; i++) {
				let vidId = albumIds[i].id;
				var e = document.getElementById("track"+i);
				let player = document.querySelector('#youtube-audio');
				e.setAttribute('data-video', vidId);
				/*playBtn.onclick = player.setAttribute('data-video', e['data-video']);*/

				/*var e = document.getElementById("youtube-audio"+i);
				e.setAttribute('data-video', vidId);*/
				/*await createPlayer(i,e);*/

  			/*let track = document.createElement('li');  			
  			let trackName = lastFM.album.tracks.track[i].name;
  			track.className = "item";
		  	track.innerHTML = "<p>"+trackName+"</p>";
		  	trackList.appendChild(track);*/

  			/*let player = document.createElement('div');*/
  			/*fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q='+trackName+'&key=', {mode: 'cors'})*/
  			/*fetch('https://youtube-scrape.herokuapp.com/api/search?q=banana&page=1')
				.then(function(response) {
					return response.json();
				})
				.then(function(youtube) {
					console.log(youtube);*/
		  			/*let vidId = youtube.items[0].id.videoId;*/
		  				
		  			/*player = document.querySelector('#youtube-audio'+i);	  			
		  			player.setAttribute('data-video', vidId);
					
		  			player.id = 'youtube-audio'+i
		  			player.setAttribute('data-autoplay', '0')
		  			player.setAttribute('data-loop', '1')
		  			track.appendChild(player);*/

		  			
		    		/*var	t = document.createElement("img");		    		
		    		t.src = "loading.png";
		    		t.className = "ytImage";
		  			t.setAttribute("id", "youtube-icon"+i);
		  			e.appendChild(t);
		  			var a = document.createElement("div");
		  			a.setAttribute("id", "youtube-player"+i);
		  			e.appendChild(a);*/

		  			/*var o = function(e) {
		    			var a = e ? "IDzX9gL.png" : "quyUPXN.png";
		    			t.setAttribute("src", "https://i.imgur.com/" + a)
		  			};*/
		  			/*e.onclick = toggleAudio;*/
		  			

		  			/*var r = new YT.Player("youtube-player"+i, {
		    			height: "0",
		    			width: "0",
		    			videoId: e.dataset.video,
		    			playerVars: {
		      				autoplay: e.dataset.autoplay,
		      				loop: e.dataset.loop
		    			},
		    			events: {
		      				'onReady': onPlayerReady,
		      				'onStateChange': onPlayerStateChange
		      				}
		 			 });
		  	

		  			function togglePlayButton(play) {    
		    			document.getElementById("youtube-icon"+i).src = play ? "IDzX9gL.png" : "quyUPXN.png";
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
					  }*/
					
					/*});*/
}
await createPlayer();
});
			
  			document.querySelector('#disappear').style.display ="none";
  			document.querySelector('#disappear1').style.display ="none";
  			document.querySelector('#disappear2').style.display ="none";
  			document.querySelector('#disappear3').style.display ="none";
  			document.querySelector('#disappear4').style.display ="none";
  			document.querySelector('#disappear5').style.display ="none";
  			document.querySelector('#listTitle').value = album;
			}
)};
function setVideo(){
	let player = document.querySelector('#youtube-audio');
	let iframe = document.querySelector('#youtube-player');
	iframe.setAttribute('src', 'https://www.youtube.com/embed/'+this.parentNode.parentNode.getAttribute('data-video')+'?autoplay=1&loop=1&enablejsapi=1&origin=http%3A%2F%2Fbenmicol.com&widgetid=1');
	document.querySelector('#nowPlaying').innerHTML = this.parentNode.parentNode.firstChild.innerHTML;

	/*let song = this.parentNode.getAttribute('data-video')
	createPlayer();*/
		  	}
function createPlayer() {
	let player = document.querySelector('#youtube-audio');
	player.onclick = toggleAudio;
	var r = new YT.Player("youtube-player", {
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
		    			document.getElementById("youtube-icon").src = play ? "IDzX9gL.png" : "quyUPXN.png";
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
	/*e.onclick = toggleAudio;
	var r = new YT.Player("youtube-player"+i, {
		    			height: "0",
		    			width: "0",
		    			videoId: e.dataset.video,
		    			playerVars: {
		      				autoplay: e.dataset.autoplay,
		      				loop: e.dataset.loop
		    			},
		    			events: {
		      				'onReady': onPlayerReady,
		      				'onStateChange': onPlayerStateChange
		      				}
		 			 });
		  	

		  			function togglePlayButton(play) {    
		    			document.getElementById("youtube-icon"+i).src = play ? "IDzX9gL.png" : "quyUPXN.png";
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
					  }*/
}

/*function onYouTubeIframeAPIReady() {
	var e = document.getElementById("youtube-audio"+i),
    			t = document.createElement("img");
    		t.src = "https://i.imgur.com/quyUPXN.png";
  			t.setAttribute("id", "youtube-icon"+i), e.appendChild(t);
  			var a = document.createElement("div");
  			a.setAttribute("id", "youtube-player"+i), e.appendChild(a);
  			var o = function(e) {
    			var a = e ? "IDzX9gL.png" : "quyUPXN.png";
    			t.setAttribute("src", "https://i.imgur.com/" + a)
  			};
  			e.onclick = function() {
    			r.getPlayerState() === YT.PlayerState.PLAYING || r.getPlayerState() === YT.PlayerState.BUFFERING ? (r.pauseVideo(), o(!1)) : (r.playVideo(), o(!0))
  			};
  			var r = new YT.Player("youtube-player"+i, {
    			height: "0",
    			width: "0",
    			videoId: e.dataset.video,
    			playerVars: {
      				autoplay: e.dataset.autoplay,
      				loop: e.dataset.loop
    			},
    			events: {
      				onReady: function(e) {
        				o(r.getPlayerState() !== YT.PlayerState.CUED)
      				},
      				onStateChange: function(e) {
        				e.data === YT.PlayerState.ENDED && o(!1)
      				}
    			}
 			 })
}*/
dragula([document.querySelector('#trackList'), document.querySelector('#slist'), document.querySelector('#alist'), document.querySelector('#blist'), document.querySelector('#clist'), document.querySelector('#dlist')]);

function addItemS() {
	let newItem = document.getElementById('slistItem').value;
	let entry = document.createElement('li');
	let rembut = document.createElement('input');

	rembut.type = "button"
	rembut.className = "buttonInput"
	rembut.value = "-"
	rembut.id = "remButtonS"+scounter
	rembut.setAttribute("data-html2canvas-ignore","")
	if (isValidUrl(newItem)) {
		let image = document.createElement('img');
		image.src = newItem;
		image.className = "userImage";
		entry.appendChild(image);
		entry.className="item";
		/*let image = document.createElement('div');
		image.className = "userImage";
		entry.appendChild(image)
		image.style.background = "url("+newItem+")no-repeat";*/

	} else {
	entry.innerHTML = "<p>"+titleCase(newItem)+"</p>";
	entry.className="item";
	}
	/*slist.appendChild(entry);*/
	entry.appendChild(rembut)
	slist.insertBefore(entry, slist.firstChild);
	document.querySelector('#remButtonS'+scounter).addEventListener('click', function(){this.closest('.item').remove()});
	scounter += 1;
	clearText()
}
function addItemA() {
	let newItem = document.getElementById('alistItem').value;
	let entry = document.createElement('li');
	let rembut = document.createElement('input');
	rembut.type = "button"
	rembut.className = "buttonInput"
	rembut.value = "-"
	rembut.id = "remButtonA"+acounter
	rembut.setAttribute("data-html2canvas-ignore","")
	if (isValidUrl(newItem)) {
		let image = document.createElement('img');
		image.src = newItem;
		image.className = "userImage";
		entry.appendChild(image);
		entry.className="item";
		/*let image = document.createElement('div');
		image.className = "userImage";
		entry.appendChild(image)
		image.style.background = "url("+newItem+")no-repeat";*/

	} else {
	entry.innerHTML = "<p>"+titleCase(newItem)+"</p>";
	entry.className="item";
	}
	alist.insertBefore(entry, alist.firstChild);
	entry.appendChild(rembut)
	document.querySelector('#remButtonA'+acounter).addEventListener('click', function(){this.closest('.item').remove()});
	acounter += 1;
	clearText()
}
function addItemB() {
	let newItem = document.getElementById('blistItem').value;
	let entry = document.createElement('li');
	let rembut = document.createElement('input');
	rembut.type = "button"
	rembut.className = "buttonInput"
	rembut.value = "-"
	rembut.id = "remButtonB"+bcounter
	rembut.setAttribute("data-html2canvas-ignore","")
	if (isValidUrl(newItem)) {
		let image = document.createElement('img');
		image.src = newItem;
		image.className = "userImage";
		entry.appendChild(image);
		entry.className="item";
		/*let image = document.createElement('div');
		image.className = "userImage";
		entry.appendChild(image)
		image.style.background = "url("+newItem+")no-repeat";*/

	} else {
	entry.innerHTML = "<p>"+titleCase(newItem)+"</p>";
	entry.className="item";
	}
	blist.insertBefore(entry, blist.firstChild);
	entry.appendChild(rembut)
	document.querySelector('#remButtonB'+bcounter).addEventListener('click', function(){this.closest('.item').remove()});
	bcounter += 1;
	clearText()
}
function addItemC() {
	let newItem = document.getElementById('clistItem').value;
	let entry = document.createElement('li');
	let rembut = document.createElement('input');
	rembut.type = "button"
	rembut.className = "buttonInput"
	rembut.value = "-"
	rembut.id = "remButtonC"+ccounter
	rembut.setAttribute("data-html2canvas-ignore","")
	if (isValidUrl(newItem)) {
		let image = document.createElement('img');
		image.src = newItem;
		image.className = "userImage";
		entry.appendChild(image);
		entry.className="item";
		/*let image = document.createElement('div');
		image.className = "userImage";
		entry.appendChild(image)
		image.style.background = "url("+newItem+")no-repeat";*/

	} else {
	entry.innerHTML = "<p>"+titleCase(newItem)+"</p>";
	entry.className="item";
	}
	clist.insertBefore(entry, clist.firstChild);
	entry.appendChild(rembut)
	document.querySelector('#remButtonC'+ccounter).addEventListener('click', function(){this.closest('.item').remove()});
	ccounter += 1;
	clearText()
}
function addItemD() {
	let newItem = document.getElementById('dlistItem').value;
	let entry = document.createElement('li');
	let rembut = document.createElement('input');
	rembut.type = "button"
	rembut.className = "buttonInput"
	rembut.value = "-"
	rembut.id = "remButtonD"+dcounter
	rembut.setAttribute("data-html2canvas-ignore","")
	if (isValidUrl(newItem)) {
		let image = document.createElement('img');
		image.src = newItem;
		image.className = "userImage";
		entry.appendChild(image);
		entry.className="item";
		/*let image = document.createElement('div');
		image.className = "userImage";
		entry.appendChild(image)
		image.style.background = "url("+newItem+")no-repeat";*/

	} else {
	entry.innerHTML = "<p>"+titleCase(newItem)+"</p>";
	entry.className="item";
	}
	dlist.insertBefore(entry, dlist.firstChild);
	entry.appendChild(rembut)
	document.querySelector('#remButtonD'+dcounter).addEventListener('click', function(){this.closest('.item').remove()});
	dcounter += 1;
	clearText()
}