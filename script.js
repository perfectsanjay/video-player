const video = document.querySelector('video')
const ProgressRange = document.querySelector('.progress-range')
const progressBar = document.querySelector('.progress-bar')
const playBtn = document.getElementById('play-btn')
const volumeIcon = document.getElementById('volume-icon')
const volumeRange = document.querySelector('.volume-range')
const volumeBar = document.querySelector('.volume-bar')
const currentTime = document.querySelector('.time-elapsed')
const duration = document.querySelector('.time-duration')
const speed = document.querySelector('.player-speed')
const fullscreenBtn = document.querySelector('.fullscreen')
const player = document.querySelector('.player')


// Play & Pause ----------------------------------- //
function togglePlay(){
    if (video.paused){
        video.play()
        playBtn.classList.replace('fa-play','fa-pause')
        playBtn.setAttribute('title','Pause')
    }else{
        video.pause()
        playBtn.classList.replace('fa-pause','fa-play')
        playBtn.setAttribute('title','Play')
    }
}

// display time of video
function display(time){
    const minutes = Math.floor(time/60)
    let seconds = Math.floor(time%60)
    seconds = seconds > 9 ? seconds : `0${seconds}`
    return `${minutes}:${seconds}`

}

// Progress Bar ---------------------------------- //
function updateProgressBar(){
    // console.log(video.currentTime,video.duration);
    progressBar.style.width = `${(video.currentTime/video.duration)*100}%`
    currentTime.textContent = `${display(video.currentTime)}`
    duration.textContent = `${display(video.duration)}`
}

function setProgressBar(e){
    // console.log(e)
    // console.log(ProgressRange.offsetwidth);
    const newTime = e.offsetX/ProgressRange.offsetWidth
    progressBar.style.width = `${newTime*100}%`
    video.currentTime = newTime * video.duration;

}

// Volume Controls --------------------------- //

let lastVolume = 1
function setVolumeBar(e){
    // console.log(e);
    let volume = e.offsetX / volumeRange.offsetWidth
    if (volume < 0.1){
        volume = 0
    }
    if (volume > 0.9){
        volume = 1
    }
    volumeBar.style.width = `${volume*100}%`
    video.volume = volume
    volumeIcon.className = '';
    if (volume > 0.7){
        volumeIcon.classList.add('fas', 'fa-volume-up')
    }else if (volume < 0.7 && volume > 0){
        volumeIcon.classList.add('fas','fa-volume-down')
    }
    else if (volume === 0){
        volumeIcon.classList.add('fas','fa-volume-off')
    }
    lastVolume = volume

}
function toggleMute(){
    volumeIcon.className =''
    if (video.volume){
        lastVolume = video.volume
        video.volume = 0
        volumeBar.style.width = 0
        volumeIcon.classList.add('fas','fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute')
    }else{
        video.volume = lastVolume
        volumeBar.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.add('fas','fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute')
    }
}


// Change Playback Speed -------------------- //
function changeSpeed(){
    video.playbackRate = speed.value
}



// Fullscreen ------------------------------- //

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen')
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen')
  }

let fullscreen = false
function toggleFullScreen(){
    if (!fullscreen){
        openFullscreen(player)
    }else{
        closeFullscreen()
    }
    fullscreen = !fullscreen

}






// add Event Listner
playBtn.addEventListener('click',togglePlay)
video.addEventListener('click',togglePlay)
video.addEventListener('timeupdate',updateProgressBar)
ProgressRange.addEventListener('click',setProgressBar)
volumeRange.addEventListener('click',setVolumeBar)
volumeIcon.addEventListener('click',toggleMute)
speed.addEventListener('change',changeSpeed)
fullscreenBtn.addEventListener('click',toggleFullScreen)