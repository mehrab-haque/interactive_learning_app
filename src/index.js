import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux'
import allReducers from './reducer'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {loginRedux,checkAuth} from './action/auth'
import {useSelector,useDispatch} from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { usePreview } from 'react-dnd-preview';



export const base_url='https://0jymup9y4j.execute-api.ap-south-1.amazonaws.com/d/'



const MyPreview = () => {
    const {display, itemType, item, style} = usePreview();
    if (!display) {
        return null;
    }
    style['padding']='0.5rem 1rem'
    style['border']='1px dashed #0090ff'
    style['borderRadius']='8px'
    style['color']='#0090ff'
    style['background']='white'
    return <div class="item-list__item" style={style}>{itemType}</div>;
};
//redux
const store=createStore(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <DndProvider backend={TouchBackend} options={{enableMouseEvents:true}}>

              <App />
            <MyPreview />
          </DndProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
