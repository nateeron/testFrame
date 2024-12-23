import { StrictMode } from 'react'
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { Provider } from 'react-redux';
import store from '../manage_Redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//    <Provider store={store}>
//       <App />
//     </Provider>
//   </StrictMode>,
// )
