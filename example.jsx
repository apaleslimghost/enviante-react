import createStore from 'enviante';
import React from 'react';
import {render} from 'react-dom';
import createConnectComponent from './';

const connect = createStore({count: 1});
const connectComponent = createConnectComponent(connect);

const Counter = connectComponent((props, {subscribe, dispatch}) => <div>
	{subscribe('count')}
	<button onClick={() => dispatch('count', count => count + 1)}>+</button>
</div>);

render(<Counter />, document.querySelectorAll('main'));
