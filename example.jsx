import createStore from 'enviante';
import React from 'react';
import {render} from 'react-dom';
import createObserve from './';

const connect = createStore({count: 1});
const observe = createObserve(connect);

const Counter = observe((props, {subscribe, dispatch}) => <div>
	{subscribe('count')}
	<button onClick={() => dispatch('count', count => count + 1)}>+</button>
</div>);

render(<Counter />, document.querySelectorAll('main'));
