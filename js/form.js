document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formContato');
    const formMessage = document.getElementById('form-message');
    
    // Substitua com seu email do Formspree
    form.setAttribute('action', 'https://formspree.io/f/seu-email-aqui');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();
        
        xhr.open('POST', form.getAttribute('action'), true);
        xhr.setRequestHeader('Accept', 'application/json');
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Sucesso
                    formMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                    formMessage.classList.remove('error');
                    formMessage.classList.add('success');
                    form.reset();
                } else {
                    // Erro
                    formMessage.textContent = 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.';
                    formMessage.classList.remove('success');
                    formMessage.classList.add('error');
                }
                
                formMessage.style.display = 'block';
                
                // Esconder a mensagem após 5 segundos
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        };
        
        xhr.send(formData);
    });
    
    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 2) {
                value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
            }
            
            if (value.length > 10) {
                value = `${value.substring(0, 10)}-${value.substring(10, 14)}`;
            }
            
            e.target.value = value;
        });
    }
});
