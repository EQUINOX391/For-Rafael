document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Observer (Existing Logic) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // --- Music Player Logic ---
    const playlist = [
        {
            title: "Hindia - Kita Ke Sana",
            src: "Music/Hindia - Kita ke Sana (Official Lyric Video).mp3"
        },
        {
            title: "Ruang Baru (My Annoying Brother)",
            src: "Music/Ruang Baru (From My Annoying Brother) Official Lyric Video.mp3"
        },
        {
            title: "Hindia - Kita Ke Sana (Piano)",
            src: "Music/Hindia - Kita Ke Sana Karaoke Piano Piano Tutorial.mp3"
        },
        {
            title: "Ruang Baru (Piano)",
            src: "Music/Ruang Baru - Barsena Bestandhi (From My Annoying Brother) Karaoke Piano Piano Tutorial.mp3"
        }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    const audio = new Audio();

    // Elements
    const overlay = document.getElementById('welcome-overlay');
    const openBtn = document.getElementById('open-btn');
    const musicPlayer = document.getElementById('music-player');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const songTitle = document.getElementById('song-title');
    const vinylRecord = document.querySelector('.vinyl-record');

    // Initialize Player
    function loadSong(index) {
        const song = playlist[index];
        audio.src = song.src;
        songTitle.textContent = song.title;
    }

    function playSong() {
        musicPlayer.classList.add('playing');
        playBtn.textContent = '⏸'; // Pause icon
        audio.play().catch(error => {
            console.log("Autoplay prevented:", error);
        });
        isPlaying = true;
    }

    function pauseSong() {
        musicPlayer.classList.remove('playing');
        playBtn.textContent = '▶'; // Play icon
        audio.pause();
        isPlaying = false;
    }

    function togglePlay() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        playSong();
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        playSong();
    }

    // Event Listeners
    playBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);

    // Auto-next
    audio.addEventListener('ended', nextSong);

    // --- Welcome Overlay Logic ---
    openBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
        // Wait for transition to finish before removing from DOM (optional, but good for performance)
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 800);

        // Start Music
        loadSong(currentSongIndex);
        playSong();
    });

    // --- Scroll Effect (Vinyl Transformation) ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            musicPlayer.classList.add('minimized');
        } else {
            musicPlayer.classList.remove('minimized');
        }
    });

    // Click on Vinyl to toggle play when minimized
    vinylRecord.addEventListener('click', () => {
        if (musicPlayer.classList.contains('minimized')) {
            togglePlay();
        }
    });
});
