//服务端同构代码，目前问题是存在部分组件png不识别的问题
import csshook from 'css-modules-require-hook/preset';
csshook({
    generateScopedName: '[name]__[local]___[hash:base64:5]',
  });
// 处理服务端图片
import assethook from 'asset-require-hook';
assethook({
    extensions:['png'],
    limit: 9000
});

import React, {Component}from 'react';
//处理服务端css
import {createStore, applyMiddleware, compose} from 'redux';
import { StaticRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server'
import reducers from '../src/reducers';
import App from '../src/App';
import staticPath from '../build/asset-manifest.json';


const store = createStore(reducers,
	applyMiddleware(thunk));

let context = {};
const markup = renderToString(
    (<Provider store={store}>
        <StaticRouter
            location={req.url}
            context={context}
        >
            <App />
        </StaticRouter>
    </Provider>)
);

const pageHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="stylesheet" href="/${staticPath['main.css']}">
    <title>React App</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root">${markup}</div>
    <script src="/${staticPath['main.js']}"></script>
  </body>
</html>`;
export default pageHtml;



