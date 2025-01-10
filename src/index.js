import 'bootstrap/dist/css/bootstrap.css';
import 'highlight.js/styles/github-dark.css';

import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';

import showdown from 'showdown';
import showdownHighlight from 'showdown-highlight';

export const init = (repository, branch = 'main') => {
  const README_URL = `https://raw.githubusercontent.com/${repository}/${branch}/README.md`;

  window.addEventListener('load', () => {
    const viewportElement = document.createElement('meta');

    viewportElement.setAttribute('name', 'viewport');
    viewportElement.setAttribute('content', 'width=device-width, initial-scale=1');
    document.head.appendChild(viewportElement);

    fetch(README_URL)
      .then(response => response.text())
      .then(content => {
        const containerElement = document.createElement('div');

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.setAttribute('data-bs-theme', 'dark');
        }
        containerElement.classList.add('container');
        containerElement.innerHTML = new showdown.Converter({
          emoji: true,
          extensions: [showdownHighlight],
          ghCodeBlocks: true,
          ghCompatibleHeaderId: true,
          ghMentions: true
        }).makeHtml(content);
        document.body.appendChild(containerElement);

        if (!document.querySelector('title')) {
          const firstHeader = containerElement.querySelector('h1');

          if (firstHeader) {
            const title = document.createElement('title');

            title.textContent = firstHeader.textContent;
            document.body.appendChild(title);
          }
        }
      })
      .catch(() => {
        const errorMessageElement = document.createElement('p');

        errorMessageElement.innerText = 'An error occurred.';
        document.body.appendChild(errorMessageElement);
      });
  });
};
