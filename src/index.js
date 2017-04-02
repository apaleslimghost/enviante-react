import React, {Component} from 'react';

export class ConnectedComponent extends Component {
	constructor(props) {
		super(props);
		this.subscriptions = [];
		this.state = {child: null};

		this.stateConnector = this.stateConnector.bind(this);
	}

	unsubscribe() {}

	componentWillMount() {
		this.props.connect(this.stateConnector);
	}

	componentWillUnmount() {
		this.subscriptions.forEach(this.unsubscribe);
	}

	componentWillReceiveProps() {
		this.componentWillUnmount();
		this.componentWillMount();
	}

	stateConnector({subscribe, dispatch, unsubscribe, meta}) {
		const {receiver, origProps = {}} = this.props;
		this.unsubscribe = unsubscribe;

		this.setState({
			child: receiver(
				origProps,
				{subscribe: this.wrapSubsrcribe(subscribe), dispatch, unsubscribe, meta}
			)
		});
	}

	wrapSubsrcribe(subscribe) {
		return (path, defaultValue) => {
			this.subscriptions.push(path);
			return subscribe(path, defaultValue);
		}
	}

	render() {
		return this.state.child;
	}
}

export default connect => receiver => origProps =>
	<ConnectedComponent {...{connect, receiver, origProps}} />;
