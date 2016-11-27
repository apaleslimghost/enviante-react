import React, {Component} from 'react';

export class ConnectedComponent extends Component {
	constructor(props) {
		super(props);
		this.subscriptions = [];
		this.state = {child: null};

		this.stateConnector = this.stateConnector.bind(this);
		this.wrappedSubsrcribe = this.wrappedSubsrcribe.bind(this);
	}

	unsubscribe() {}

	componentWillMount() {
		this.props.connect(this.stateConnector);
	}

	componentWillUnmount() {
		this.subscriptions.forEach(this.unsubscribe);
	}

	stateConnector(subscribe, dispatch, unsubscribe) {
		const {receiver, origProps = {}} = this.props;
		this.unsubscribe = unsubscribe;

		this.setState({
			child: receiver(
				origProps,
				{subscribe: wrapSubsrcribe(subscribe), dispatch, unsubscribe}
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

export const createConnectComponent = connect => receiver => origProps =>
	<ConnectedComponent {...{connect, receiver, origProps}} />;

export const createStoreMap = connect => (storeToProps, Child) =>
	createConnectComponent(connect)((props, {subscribe, dispatch, unsubscribe}) =>
		<Child {...props} {...storeToProps(subscribe, dispatch, unsubscribe)} />);

export default createConnectComponent;
