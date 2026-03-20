// 留言板打字机效果
(function() {
    // 只在留言板页面运行
    if (!window.location.pathname.includes('/message/')) return;
    
    const messages = [
        "有什么想问的？",
        "有什么想说的？",
        "有什么想吐槽的？",
        "哪怕是有什么想说的，都可以告诉我哦～"
    ];
    
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    const container = document.getElementById('typing-text');
    
    function type() {
        const currentMsg = messages[index];
        if (isDeleting) {
            container.textContent = currentMsg.substring(0, charIndex - 1);
            charIndex--;
        } else {
            container.textContent = currentMsg.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentMsg.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % messages.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    // 等待页面加载完
    window.addEventListener('DOMContentLoaded', type);
})();