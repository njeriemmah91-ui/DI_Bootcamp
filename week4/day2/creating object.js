// ================= Video Class Exercise =================

class Video {
    constructor(title, uploader, time) {
        this.title = title;
        this.uploader = uploader;
        this.time = time; // duration in seconds
    }

    watch() {
        console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
    }
}

// ---------- Create two video instances ----------
const video1 = new Video("JavaScript Basics", "Elijah", 300);
video1.watch();

const video2 = new Video("CSS Flexbox Tutorial", "Sophia", 600);
video2.watch();

// ---------- Bonus: Array of video data ----------
const videoData = [
    { title: "HTML Crash Course", uploader: "Liam", time: 420 },
    { title: "React for Beginners", uploader: "Emma", time: 900 },
    { title: "Node.js Tutorial", uploader: "Noah", time: 720 },
    { title: "Python OOP Concepts", uploader: "Olivia", time: 600 },
    { title: "Django Full Tutorial", uploader: "Ava", time: 850 }
];

// Instantiate Video objects using the array
const videoInstances = videoData.map(data => new Video(data.title, data.uploader, data.time));

// Loop through instances and call watch()
videoInstances.forEach(video => video.watch());