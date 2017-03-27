# enviante-react

connect [react](https://facebook.github.io/react/) components to [enviante](https://github.com/quarterto/enviante) stores.

## usage

### example

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

## licence

ISC