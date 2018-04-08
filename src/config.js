import axios from 'axios';
import {Toast} from 'antd-mobile';
axios.interceptors.request.use( config => {
    Toast.loading('加载中', 0);
    const date1 = new Date();
    console.log('拦截器：发送前拦截再发送',`${date1.getHours()}时${date1.getMinutes()}分${date1.getSeconds()}秒` )
    return config;
});
axios.interceptors.response.use( config => {
    Toast.hide();
    const date1 = new Date();
    console.log('拦截器：收到后拦截再收到',`${date1.getHours()}时${date1.getMinutes()}分${date1.getSeconds()}秒` )
    return config;
})