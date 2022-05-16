const nameInput = document.getElementById('name-input')
const comment = document.getElementById('textarea-coment')
const msg = document.querySelector('.msg')
const msgContact = document.querySelector('.msg-contact')
const nameContactInput = document.getElementById('name-contato')
const emailContactInput = document.getElementById('email-contato')
const telefoneContactInput = document.getElementById('telefone-contato')

axios.defaults.baseURL = 'https://curriculo-daniel-api.herokuapp.com/'

async function addComment(event) {
    event.preventDefault()

    const newComment = {
        name: nameInput.value,
        comment: comment.value
    }

    await axios.post('/comments', newComment)
        .then(response => {
            msg.innerHTML = response.data
        })
        .catch(error => {
            msg.innerHTML = error.response.data.message;
        })

    showComments();
};

async function showComments() {
    await axios.get('/comments')
        .then(response => {
            const ul = document.querySelector('.comments');
            const comments = response.data
            ul.innerHTML = '';
            return comments.map(item => {
                ul.innerHTML +=
                    `
                <li>
                    <p class="name-comment">${item.name}</p>
                    <p class="comment">${item.comment}</p>
                </li>
                `
            })
        })
        .catch(error => {
            console.log(error);
        })
}

showComments()

function addContact(event) {
    event.preventDefault()

    const newContact = {
        name: nameContactInput.value,
        email: emailContactInput.value,
        telefone: telefoneContactInput.value
    };

    axios.post('/contacts', newContact)
    .then(response => {
        msgContact.innerHTML = response.data.message
    })
    .catch(error => {
        msgContact.innerHTML = error.response.data.message
    })
}
