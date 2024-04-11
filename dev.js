// Logging a welcome message to the console
console.log("Welcome to Spotify-Navneet");

// Innitializing the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// Array containing song information
let songs = [
    { songName: "Legion-MARVEL", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Trap-CARTEL", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Rich-the-kid ", filepPath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "An Unknown", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "The Safety Dance", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Back-IT-UP", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "The Mysterious women", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "The girl with red-hat", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Let me love you", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
];

// Update song items with cover images and names
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Event listener for play/pause button click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Event listener for time update to update progress bar
audioElement.addEventListener('timeupdate', () => {
    // Update progress bar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressbar.value = progress;
});

// Event listener for progress bar change to seek through the song
myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = ((myprogressbar.value * audioElement.duration) / 100);
});

// Function to pause all other songs when one song is played
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Event listener for play button click on individual song items
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Event listener for next button click
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Event listener for previous button click
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
