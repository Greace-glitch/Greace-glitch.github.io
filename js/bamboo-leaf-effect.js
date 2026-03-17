// 稳定版流星特效 - 仅自动生成
(function() {
    var canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var meteors = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function drawMeteor(ctx, x, y, length, angle, brightness) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        
        var gradient = ctx.createLinearGradient(0, 0, -length, 0);
        gradient.addColorStop(0, `rgba(255, 215, 0, ${brightness})`);
        gradient.addColorStop(0.4, `rgba(0, 100, 0, ${brightness * 0.6})`);
        gradient.addColorStop(0.8, `rgba(0, 50, 0, ${brightness * 0.2})`);
        gradient.addColorStop(1, 'rgba(0, 30, 0, 0)');
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-length, -5);
        ctx.lineTo(-length, 5);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${brightness})`;
        ctx.fill();
        
        ctx.restore();
    }

function createMeteor() {
    // 随机选择出现方向：0=上方，1=右侧
    var side = Math.random() > 0.3 ? 'top' : 'right';
    var startX, startY;
    
    if (side === 'top') {
        // 从上方任意位置出现
        startX = Math.random() * canvas.width;
        startY = -30 - Math.random() * 100;
    } else {
        // 从右侧任意位置出现
        startX = canvas.width + 30 + Math.random() * 150;
        startY = Math.random() * canvas.height * 0.7; // 只在上部70%区域
    }
    
    var angle = 135 * Math.PI / 180;  // 方向固定指向左下
    var speed = Math.random() * 8 + 5;  // 速度5-13（和你原来一样）
    
    return {
        x: startX, y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: Math.random() * 50 + 35,  // 尾巴长度25-65（和你原来一样）
        angle: angle,
        brightness: Math.random() * 0.5 + 0.5,  // 亮度0.5-1.0（和你原来一样）
        life: 2.2,
        fadeSpeed: Math.random() * 0.004 + 0.002
    };
}
    // 初始生成
    for (let i = 0; i < 5; i++) {
        setTimeout(() => meteors.push(createMeteor()), i * 200);
    }

    setInterval(() => {
        if (meteors.length < 25) {
            meteors.push(createMeteor());
        }
    }, 1200);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = meteors.length - 1; i >= 0; i--) {
            let m = meteors[i];
            drawMeteor(ctx, m.x, m.y, m.length, m.angle, m.brightness * m.life);
            m.x += m.vx;
            m.y += m.vy;
            m.life -= m.fadeSpeed;
            if (m.life <= 0 || m.x < -200 || m.y > canvas.height + 200) {
                meteors.splice(i, 1);
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
})();