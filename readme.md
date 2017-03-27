# enviante-react

connect [react](https://facebook.github.io/react/) components to [enviante](https://github.com/quarterto/enviante) stores.

## usage

### mobx-style

```jsx
import createStore from 'enviante';
import {createObserve} from 'enviante-react';
const connect = createStore({count: 1});
const observe = createObserve(connect);

const Counter = observe((props, {subscribe, dispatch}) => <div>
	{subscribe('count')}
	<button onClick={() => dispatch('count', count => count + 1)} />
</div>);
```

### meteor-style

```jsx
import createStore from 'enviante';
import {createConnectComponent} from 'enviante-react';
const connect = createStore({count: 1});
const connectComponent = createConnectComponent(connect);

const Counter = ({count, increment}) => <div>
	{count}
	<button onClick={increment} />
</div>;

const CounterContainer = connectComponent((subscribe, dispatch) => ({
	count: subscribe('count'),
	increment: () => dispatch('count', count => count + 1)
}), Counter);
```

## licence

ISC
