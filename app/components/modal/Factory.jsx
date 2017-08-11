import React from 'react';
import { Input } from 'antd';
//根据匹配值生成modal
export default class Factory extends React.Component {
  render() {
	const { type, target, keyName, onChange } = this.props;
    switch (type) {
		case 'text':
			switch (keyName) {
				case 'id' :
					return null;
				default:
					return <Input value={target[keyName]} onChange={e => onChange(e, keyName)} />;
			}
		case 'display':
				switch (keyName) {
					case 'id' :
						return null;
					default:
						return !target[keyName] ? <Input disabled /> : (
							<span>{target[keyName]}</span>
						);
				}
		default:
			return null;
    }
  }
}

Factory.propTypes = {
	type: React.PropTypes.string,
	target: React.PropTypes.objectOf(React.PropTypes.shape),
	keyName: React.PropTypes.string,
	onChange: React.PropTypes.func,
};
