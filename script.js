const postsContainer = document.getElementById('posts');
const postButton = document.getElementById('postButton');
const newPostInput = document.getElementById('newPost');

// Загрузка постов при старте
window.addEventListener('DOMContentLoaded', loadPosts);

// Добавление события на кнопку постинга
postButton.addEventListener('click', addPost);

// Загрузка постов с сервера
function loadPosts() {
    fetch('/posts')
        .then(response => response.json())
        .then(data => {
            postsContainer.innerHTML = ''; // Очищаем контейнер
            data.forEach(displayPost);
        });
}

// Функция добавления поста
function addPost() {
    const postContent = newPostInput.value.trim();
    if (postContent === '') return;

    const post = {
        content: postContent,
    };

    fetch('/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    })
    .then(response => response.json())
    .then(post => {
        displayPost(post);
        newPostInput.value = '';
    });
}

// Функция отображения поста
function displayPost(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
        <small>${post.timestamp}</small>
        <p>${post.content.replace(/\n/g, '<br>')}</p>
    `;

    postsContainer.insertBefore(postElement, postsContainer.firstChild);
}
