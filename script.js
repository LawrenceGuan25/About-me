document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Blue Rain Canvas Animation
    const canvas = document.getElementById('rainCanvas');
    const ctx = canvas.getContext('2d');
    let width, height, drops = [];

    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };

    class Drop {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * -height;
            this.length = Math.random() * 20 + 10;
            this.speed = Math.random() * 5 + 2;
        }
        draw() {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 210, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.length);
            ctx.stroke();
            this.y += this.speed;
            if (this.y > height) this.reset();
        }
    }

    const animateRain = () => {
        ctx.clearRect(0, 0, width, height);
        drops.forEach(drop => drop.draw());
        requestAnimationFrame(animateRain);
    };

    window.addEventListener('resize', resize);
    resize();
    for(let i=0; i<80; i++) drops.push(new Drop());
    animateRain();

    // 2. Reveal Sections on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(s => observer.observe(s));

    // 3. Audio Controller
    const music = document.getElementById('bg-music');
    const toggle = document.getElementById('music-toggle');
    const bars = document.querySelectorAll('.bar');

    toggle.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            bars.forEach(b => b.style.animationPlayState = 'running');
            document.getElementById('music-status').innerText = 'Listening';
        } else {
            music.pause();
            bars.forEach(b => b.style.animationPlayState = 'paused');
            document.getElementById('music-status').innerText = 'PAUSED';
        }
    });

    // 4. Nav Active Tracker
    window.addEventListener("scroll", () => {
        let current = "";
        document.querySelectorAll("section").forEach(s => {
            if (window.pageYOffset >= s.offsetTop - 300) current = s.getAttribute("id");
        });
        document.querySelectorAll("nav a").forEach(a => {
            a.classList.remove("active");
            if (a.getAttribute("href").includes(current)) a.classList.add("active");
        });
    });
});