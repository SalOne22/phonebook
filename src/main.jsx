import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { App } from './components/App';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider
        toastOptions={{
          defaultOptions: { position: 'top-right', duration: 2500 },
        }}
      >
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
);
