import React, { Component } from "react";
import moment from "moment";
import "./App.css";
import { get, post } from "./fetch";
import logo from "./logo.png";

class App extends Component {
  state = {
    list: [],
    start: false,
    limit: 5 * 60 * 1000
  };
  start = () => {
    this.setTime();
    this.timer = setInterval(() => {
      this.getRank();
      const { limit } = this.state;
      if (limit < 0) {
        this.stop();
      }
      this.setState({
        limit: limit - 1000
      });
    }, 1000);
  };
  refresh = () => {
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
        list: res.slice(0, 3)
      });
    });
  }
  render() {
    const { list, start, limit } = this.state;
    let time = parseInt((limit % 60000) / 1000);
    if (time < 0) {
      time = 0;
    }
    return (
      <div className="App">
        <img
          src={
            "https://threatbook.cn/assets/68325bd5190b80a6e59594df2f70a51a.svg"
          }
          className="App-logo"
          alt="logo"
        />
        <div className="left">
          <h2>游戏排行榜</h2>
          <div className="time">
            0{parseInt(limit / 60000)}:{time < 10 ? "0" + time : time}
          </div>
          <div className="button-wrap">
            {start ? "" : <button onClick={this.start}>点击开始</button>}
            <button onClick={this.stop}>结束</button>
            <button onClick={this.refresh}>刷新</button>
          </div>

          <ol>
            {list.map(item => (
              <li key={item.uuid}>
                {item.nickName}: {(item.useTime / 1000).toFixed(2)}秒
              </li>
            ))}
          </ol>
        </div>
        <div className="right">
          <img className="logo" src={logo} />
        </div>
      </div>
    );
  }
}

export default App;
