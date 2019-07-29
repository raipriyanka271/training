import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Main from './components/main'
import { ConfigureStore } from './store/configureStore';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <div>
        <Main />
      </div>

    </Provider>
  );
}
export default App;