window.addEventListener("DOMContentLoaded", () => {

    function initModal(btnSelector, modalSelector, closeBtnSelector, contentSelector) {
        const openBtn = document.querySelector(btnSelector);
        const modal = document.querySelector(modalSelector);
        const closeBtn = document.querySelector(closeBtnSelector);

        const content = modal.querySelector(contentSelector);

        const originalHTML = content.innerHTML;
        const type = content.dataset.type;
        const url = content.dataset.url;


        openBtn.addEventListener('click', () => {
            modal.showModal();
        });


        content.addEventListener('click', () => {
            if (content.classList.contains('is-playing')) return;

            if (type === 'iframe') {
                const autoplayUrl = url.includes('autoplay=1') ? url : url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`;
                content.innerHTML = `
                    <iframe 
                        src="${autoplayUrl}" 
                        frameborder="0" 
                        allow="autoplay; encrypted-media" 
                        allowfullscreen 
                        class="watch-modal__preview">
                    </iframe>
                `;
            } else if (type === 'video') {
                content.innerHTML = `
                    <video src="${url}" controls autoplay class="watch-modal__video"></video>
                `;
            }

            content.classList.add('is-playing');
        });

        const handleClose = () => {
            modal.close();
            content.innerHTML = originalHTML;
            content.classList.remove('is-playing');
        };

        closeBtn.addEventListener('click', handleClose);

        modal.addEventListener('click', (e) => {
            const rect = modal.getBoundingClientRect();
            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                handleClose();
            }
        });
    }

    initModal('#watch-video', '#watch-modal', '#close-btn-watch-video', ".watch-modal__content");
})