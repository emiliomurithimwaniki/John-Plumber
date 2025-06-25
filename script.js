// Contact form AJAX handler

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            status.textContent = 'Sending...';
            const formData = new FormData(form);
            fetch('sendmail.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text().then(text => ({status: response.status, text})))
            .then(res => {
                if (res.status === 200) {
                    status.style.color = '#0077b6';
                    status.textContent = res.text;
                    form.reset();
                } else {
                    status.style.color = 'red';
                    status.textContent = res.text || 'There was an error sending your message.';
                }
            })
            .catch(() => {
                status.style.color = 'red';
                status.textContent = 'There was an error sending your message.';
            });
        });
    }
});
