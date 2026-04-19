// ===== Navbar scroll effect =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== Mobile hamburger =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== Scroll fade-in (Intersection Observer) =====
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all other items
            faqItems.forEach(other => other.classList.remove('active'));
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    }
});

// ===== Contact Form (AJAX FormSubmit) =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // 画面遷移を防ぐ
        
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '送信中...';
        btn.disabled = true;

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // 送信成功時にフォームをメッセージに置き換える
                contactForm.innerHTML = `
                    <div class="success-message" style="text-align: center; padding: 3rem 1.5rem; background: var(--glass-bg); border-radius: var(--radius); border: 1px solid var(--glass-border);">
                        <div style="font-size: 3.5rem; margin-bottom: 1rem;">✅</div>
                        <h3 style="margin-bottom: 1rem; color: var(--text-main);">送信完了しました</h3>
                        <p style="color: var(--text-muted); line-height: 1.8;">
                            お問い合わせありがとうございます。<br>
                            メッセージは正常に送信されました。<br><br>
                            内容を確認の上、折り返しご連絡いたしますので、<br>
                            今しばらくお待ちくださいませ。
                        </p>
                    </div>
                `;
            } else {
                alert('エラーが発生しました。時間をおいて再度お試しください。');
                btn.textContent = originalText;
                btn.disabled = false;
            }
        })
        .catch(error => {
            alert('通信エラーが発生しました。ネットワーク環境をご確認ください。');
            btn.textContent = originalText;
            btn.disabled = false;
        });
    });
}
