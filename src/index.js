import 'bootstrap/dist/css/bootstrap.css';

import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';

import showdown from 'showdown';

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

        containerElement.classList.add('container');
        containerElement.innerHTML = new showdown.Converter({
          ghCodeBlocks: true,
          ghCompatibleHeaderId: true
        }).makeHtml(content);
        document.body.appendChild(containerElement);
      })
      .catch(() => {
        const errorMessageElement = document.createElement('p');

        errorMessageElement.innerText = 'An error occurred.';
        document.body.appendChild(errorMessageElement);
      });
  });
};
