import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
export default class Home extends Component {

  render() {
    return (<body class = "text-center">
            <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <header class = "masthead mb-auto">
                <div class = "inner">
                    <h3 class = "masthead-brand">Handshake</h3>
                </div>
            </header>
        <a href ="/signup">Sign up</a>

        </div>
    </body>);
  }
}