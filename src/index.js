import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';
// import WebFont from 'webfontloader';

// WebFont.load({
//   google: {
//     families: [
//       'Roboto Slab:400,500,700',
//       'Raleway:400,500,700',
//       'Montserrat:400,500,700',
//       'EB Garamond'
//     ]
//   }
// });

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
