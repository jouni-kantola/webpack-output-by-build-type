import pageStyles from '../styles/page.less';

let content = document.createElement('div');
content.classList.add('content');

let greeting = document.createElement('div');
greeting.classList.add('greeting');
greeting.textContent = 'Opa!';
content.appendChild(greeting);

document.body.appendChild(content);
