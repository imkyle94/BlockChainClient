const events = require("events");
const util = require("util");
const net = require("net");

const myEmitter = new events.EventEmitter();

const a = net.connect({ port: 8888 });
a.on("connect", function () {
  console.log("연결됨");
});
// 이런식으로 만들수 있음
myEmitter.tran = {};
myEmitter.clients = {};
myEmitter.subscriptions = {};

// 이벤트 발생했을 때 처리하는것
myEmitter.on("error", function (err) {
  this.tran = "바보야";
  console.log("에러에용" + err.message);
  // 이처럼 중첩 가능
  this.on("broadcast");
});

// error 빼고는 맘대로 작명 가능
myEmitter.on("join", function (id, client) {
  console.log("join해보자");
  this.clients[id] = client;
  this.subscriptions[id] = function (senderId, message) {
    if (id != senderId) {
      this.clients[id].write(message);
    }
  };
  this.on("broadcast", this.subscriptions[id]);
});

myEmitter.on("leave", function (id) {
  myEmitter.removeListener("broadcast");
  myEmitter.emit("broadcast", "나갓어요 알림!");
});

myEmitter.on("shutdown", function () {
  myEmitter.emit("broadcast");
  myEmitter.removeAllListeners("broadcast");
});

myEmitter.on("jungho", function (socket) {
  console.log("정호 클라 실행");
  socket.write("connection");
});

const server = net.createServer(function (socket) {
  console.log("서버연결");
  let id = socket.remoteAddress + ":" + socket.remotePort;
  console.log(id);

  // 여기서 클라이언트에게 뭘 실행시켜야 겠는데?
  // 이벤트 발생하기
  // myEmitter.emit("error", new Error("뭔가 잘못됨"));

  socket.on("connect", function () {
    // 이런 것도 가능
    console.log("connection 연결");
    // myEmitter.emit("jungho");
    myEmitter.emit("join", id, client);
  });

  socket.on("data", function (data) {
    data = data.toString();
    myEmitter.emit("broadcast", id, data);
  });
});
// 한번은 once

server.listen(8888);
