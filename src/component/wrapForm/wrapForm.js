import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
//性能优化，整合login与register共同使用的函数，以高阶组件的形式减少代码的复写
function  WrapForm(Comp) {
   @connect(state => state, null)
   class WrapComp extends Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state={
                type:'',
                avatar:'', 
                company:'', 
                job:'',
                money:'',
                desc:''
            }
        }   
        componentWillReceiveProps(nextProps) {
            const msg = nextProps.user.msg;
            console.log('msg',msg)
            {msg ? Toast.info(`${msg}`, 3) : null};
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
    return WrapComp;
}
export default  WrapForm;