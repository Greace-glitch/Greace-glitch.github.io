// 四角星星点击特效
(function() {
    // 创建画布
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
    var particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    function drawStar4(ctx, x, y, size, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.scale(size / 10, size / 10);
        
        ctx.beginPath();
        for (var i = 0; i < 4; i++) {
            var angle = i * 90 * Math.PI / 180;
            var x1 = Math.cos(angle) * 5;
            var y1 = Math.sin(angle) * 5;
            var angle2 = (i * 90 + 45) * Math.PI / 180;
            var x2 = Math.cos(angle2) * 2.5;
            var y2 = Math.sin(angle2) * 2.5;
            
            if (i === 0) {
                ctx.moveTo(x1, y1);
            } else {
                ctx.lineTo(x1, y1);
            }
            ctx.lineTo(x2, y2);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    document.addEventListener('click', function(e) {
        var count = 12;
        for (var i = 0; i < count; i++) {
            particles.push({
                x: e.clientX,
                y: e.clientY,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 5 - 1,
                size: Math.random() * 15 + 5,
                color: 'hsla(' + (Math.random() * 60 + 30) + ', 100%, 60%, 1)',
                life: 1,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 0.2
            });
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = particles.length - 1; i >= 0; i--) {
            var p = particles[i];

            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            drawStar4(ctx, p.x, p.y, p.size, p.rotation);

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.08;
            p.rotation += p.rotationSpeed;
            p.life -= 0.008;

            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
})();