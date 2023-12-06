import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { configureStore } from './store.js';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore();
const persistor = persistStore(store);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate 
				loading={<div>Loading...</div>}
				persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
// ReactDOM.render(<App />, document.getElementById('root'));