"use strict";

const defaultListenPort = 3000;

const portFromEnv = () => {
  const x = parseInt(process.env.PORT, 10);
  /* istanbul ignore next */
  return (x !== null && !isNaN(x)) ? x : defaultListenPort;
};

module.exports = {
  "plugins": {
    "inert": {
      "enable": true
    },
    "electrodeStaticPaths": {
      "enable": true,
      "options": {
        "pathPrefix": "dist"
      }
    },
    "./server/plugins/pwa": {},
    "webapp": {
      "module": "electrode-react-webapp/lib/hapi",
      "options": {
        "pageTitle": "hello-world",
        "paths": {
          "/{args*}": {
            "content": {
              "module": "./server/views/index-view"
            }
          }
        }
      }
    }
  },
  "connections": {
    "default": {
      "host": process.env.HOST,
      "address": process.env.HOST_IP || "0.0.0.0",
      "port": portFromEnv(),
      "routes": {
        "cors": true
      },
      "state": {
        "ignoreErrors":true
      }
    }
  }
};
