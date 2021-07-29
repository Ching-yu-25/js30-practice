(function () {
  const player = document.querySelector('.player');
  const sliders = document.querySelectorAll('.player__slider');
  const playbtn = document.querySelector('.toggle'); //playbtn
  const skipbtns = document.querySelectorAll('.player__button');
  const progressWrapper = document.querySelector('.progress');
  const progress = document.querySelector('.progress__filled');
  const video = document.querySelector('.viewer');

  /*播放暫停*/
  function playHandler() {
    let status = video.paused ? 'play' : 'pause';
    video[status]();
    // playbtn.innerHTML = playTxt;
  }

  function btnTxt() {
    let icon = video.paused ? '►' : '❚ ❚';
    playbtn.innerHTML = icon;
  }

  /*進度控制*/
  function progressHandler(e) {
    let scrubTime = (e.offsetX / progressWrapper.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  function progressShow() {
    let nowtime = video.currentTime;
    let totaltime = video.duration;
    progress.style.flexBasis = (nowtime / totaltime) * 100 + '%';
    //flexBasis 預設寬度
  }

  function skipHandler() {
    let time = video.currentTime;
    video.currentTime = time + parseFloat(this.dataset.skip);
  }

  /*音量控制*/
  function rangeHandler() {
    video[this.name] = this.value;
    //input name命名與屬性名相同
  }

  /*註冊*/
  video.addEventListener('click', playHandler);
  playbtn.addEventListener('click', playHandler); //控制影片撥放，影響play/pause事件

  video.addEventListener('play', btnTxt); //影片狀態改變而更新畫面
  video.addEventListener('pause', btnTxt);

  skipbtns.forEach(skipbtn => skipbtn.addEventListener('click', skipHandler))
  sliders.forEach(slider => slider.addEventListener('change', rangeHandler));

  //拖曳狀態切換
  let mousedown = false;
  progress.addEventListener('mousemove', (e) => {
    //第一個條件通過才會執行第二個
    mousedown && progressHandler(e)
  });
  progress.addEventListener('mouseup', () => mousedown = false);
  progress.addEventListener('mousedown', () => mousedown = true);
  progressWrapper.addEventListener('click', progressHandler)
  video.addEventListener('timeupdate', progressShow);
})()