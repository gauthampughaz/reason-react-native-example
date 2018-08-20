import React from "react";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";

import {AppRegistry} from "react-native";
import ReactDOMServer from "react-dom/server";
const App = require("./lib/js/re/greeting.js").default;

const server = express();

server
.get("/", (req, res) => {
    const ServerRoot = () => <App />;
    AppRegistry.registerComponent("App", () => ServerRoot);
    const {element, stylesheets} = AppRegistry.getApplication("App");
    const markup = ReactDOMServer.renderToString(element);
    const initialStyles = stylesheets
      .map(sheet => ReactDOMServer.renderToStaticMarkup(sheet))
      .join("\n");
    res.send(
    `<!doctype html>
        <html lang="en">
            <head>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta charSet='utf-8' />
            <title>Reason React Native Web</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="description" content="We are the ReasonML community in NYC">
            <meta name="keywords" content="reason,reasonml,react,new york,nyc,2017,red badger,facebook">
            <link rel="shortcut icon" href="/favicon.ico">
            ${initialStyles}
            </head>
            <body>
            <div id="root">${markup}</div>
            </body>
        </html>`,
    );
});

