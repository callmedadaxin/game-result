import React, { Component } from "react";
import moment from "moment";
import "./App.css";
import { get, post } from "./fetch";

class App extends Component {
  state = {
    list: [],
    start: false
  };
  start = () => {
    this.setTime();
    this.timer = setInterval(() => {
      this.getRank();
    }, 1000);
  };
  setTime() {
    const time = moment().format("YYYY-MM-DD HH:mm:ss");
    post("/game/settime", {
      time
    }).then(() => {
      this.setState({
        start: true
      });
    });
  }
  stop = () => {
    const time = moment("2020-11-20 00:00:00").format("YYYY-MM-DD HH:mm:ss");
    post("/game/settime", {
      time
    });
    this.setState({
      start: false
    });
    clearInterval(this.timer);
  };
  getRank() {
    get("/game/rank").then((res = []) => {
      this.setState({
        list: res.slice(0, 5)
      });
    });
  }
  render() {
    const { list, start } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={
              "https://threatbook.cn/assets/68325bd5190b80a6e59594df2f70a51a.svg"
            }
            className="App-logo"
            alt="logo"
          />
          <h2>游戏排行榜</h2>
          <div className="button-wrap">
            {start ? "" : <button onClick={this.start}>点击开始</button>}
            <button onClick={this.stop}>结束</button>
          </div>
          <ul>
            {list.map(item => (
              <li key={item.uuid}>
                {item.nickName}: {item.useTime}秒
              </li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
