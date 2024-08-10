let postId = 0;
const postsContainer = document.getElementById('posts');
const postButton = document.getElementById('postButton');
const newPostInput = document.getElementById('newPost');

// Добавление события на кнопку постинга
postButton.addEventListener('click', addPost);

// Функция добавления поста
function addPost() {
    const postContent = newPostInput.value.trim();
    if (postContent === '') return;

    const post = {
        id: postId++,
        content: postContent,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    displayPost(post);
    newPostInput.value = '';
    scrollToBottom();
}

// Функция отображения поста
function displayPost(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
        <small>${post.timestamp}</small>
        <p>${post.content.replace(/\n/g, '<br>')}</p>
    `;

    postsContainer.appendChild(postElement);
}

// Прокрутка к последнему сообщению
function scrollToBottom() {
    postsContainer.scrollTop = postsContainer.scrollHeight;
}
