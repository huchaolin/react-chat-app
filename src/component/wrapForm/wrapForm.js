import React, {Component} from 'react';
//性能优化，整合login与register共同使用的函数，以高阶组件的形式减少代码的复写
function  WrapForm(Comp) {
    return class WrapForm extends Component {
        constructor(props) {
            super(props);
            this.state = {type: 'boss'};
            this.handleChange = this.handleChange.bind(this);
        }   
        handleChange(key,val){
			this.setState({
				[key]:val
			})
		}
        render() {
            return <Comp state={this.state} handleChange={this.handleChange} {...this.props}> </Comp>
        }
    }
}
export default  WrapForm;