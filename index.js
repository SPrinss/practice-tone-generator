import './src/practice-tone-generator-app/practice-tone-generator-app.js';
import './node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');
$_documentContainer.innerHTML = `<title>practice-tone-generator</title><practice-tone-generator-app></practice-tone-generator-app>`;
document.head.appendChild($_documentContainer.content);
