import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import reducers from './redux/reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker';

const store=createStore(reducers,applyMiddleware(ReduxThunk))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
