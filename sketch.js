var vertices = [];
var counter = 0;
var sel;
var start;
var stack = [];
var current;

var listOrder = [];
var listPassed = [];

function setup() {
  createCanvas(1300, 850).parent("canvas");
  counter = 0;
  sel = undefined;
  var input = createInput();
  input.parent("buttonsBeforeCanvas");
  input.class("input");
  input.id("myInput");
  input.attribute('placeholder', 'Enter target vertex');
  var button = createButton("Start DFS");
  button.parent("buttonsBeforeCanvas");
  button.class("btn btn-success");
  var reset = createButton("Reset");
  reset.parent("buttonsBeforeCanvas");
  reset.class("btn btn-danger");

  var createSampleCaseButton = createButton("Sample Case");
  createSampleCaseButton.parent("buttonsBeforeCanvas");
  createSampleCaseButton.class("btn btn-primary");


  current = undefined;
  start = false;
  button.mousePressed(startDFS);



  reset.mousePressed(() => {

    var dataContentDiv = document.getElementById("data-content");
    Array.from(dataContentDiv.children).forEach(child => {
      if (child.id !== 'output') {
        dataContentDiv.removeChild(child);
      }
    });
    
    start = false;
    vertices = [];
    stack = [];
    sel = undefined;
    current = undefined;
    counter = 0;
    var input = document.getElementById("myInput");
    input.value = "";
    content.innerHTML = "Specific information";
  });


  createSampleCaseButton.mousePressed(createSampleCase);
}

function startDFS() {
  if (vertices.length == 0 || start) return;
  start = true;
  stack = [vertices[0]];
  current = vertices[0];

}

function createSampleCase() {
  start = false;
  vertices = [];
  stack = [];
  sel = undefined;
  current = undefined;
  counter = 0;
  vertices.push(new Vertex(450, 180));
  vertices.push(new Vertex(325, 340));
  vertices.push(new Vertex(625, 340));
  vertices.push(new Vertex(165, 540));
  vertices.push(new Vertex(380, 540));
  vertices.push(new Vertex(595, 540));
  vertices.push(new Vertex(810, 540));

  for (var i = 0; i < 3; i++) {
    var c1 = 2 * (i + 1) - 1;
    var c2 = 2 * (i + 1)
    vertices[i].adj.push(vertices[c1]);
    vertices[i].adj.push(vertices[c2]);
    vertices[c1].adj.push(vertices[c1]);
    vertices[c2].adj.push(vertices[c2]);
  }
  background(0);
  vertices.forEach((e) => e.show());

}

var btnFrameRate = document.getElementById("simulator_speed");
btnFrameRate.addEventListener('mouseup', function () {
  var FrameRateText = document.getElementById("frame_Rate");
  FrameRateText.innerHTML = "Speed: x" + btnFrameRate.value;
});

//Duyệt theo nhánh trái, phải chứ không duyệt theo số thứ tự lớn nhỏ của cây
//Khi nhấn đồ thị cho sẵn, samplecase thì không thể vẽ thêm, vì nếu vẽ thêm nó vẫn sẽ đi theo thứ tự của cây mẫu ban đầu
//chứ không đi theo cây đã vẽ thêm
//Thứ tự duyệt phụ thuộc khi kéo các cạnh, kéo cạnh nào trước, đồ thì ghi nhánh trái trc


async function sleep(ms, element) {
  frameRate(0);
  await new Promise(resolve => setTimeout(resolve, ms / 2));
  element.classList.remove('select');
  return new Promise(resolve => setTimeout(resolve, ms / 2));
}

var content = document.getElementById("content_code_a_step");
var wait_time = 2000;
var speed = 1000;
const data_display = document.getElementById("data-content");



async function draw() {

  wait_time = 2000 / btnFrameRate.value; //có thể cập nhật thường xuyên tốc độ
  var cur;

  //Nếu không nhấn start-> không draw
  if (start) {
    if (!current) {
      return;
    }

    listPassed.push(current);
    cur = current;
    
    var element = document.getElementById('code1');
    element.classList.add('select');
    if (current.visited != true) {
      content.innerHTML = "DFS (" + cur.v + ")";

      var p = document.createElement('p');
      p.innerHTML = "DFS (" + cur.v + ")";
      data_display.appendChild(p);
      data_display.scrollTop = data_display.scrollHeight;

      setTimeout(function () {
        content.innerHTML = "";
      }, wait_time);

    } else {
      content.innerHTML = "Back to DFS (" + cur.v + ")";

      var p = document.createElement('p');
      p.innerHTML = "Back to DFS (" + cur.v + ")";
      //p.classList.add('choose');
      data_display.appendChild(p);
      data_display.scrollTop = data_display.scrollHeight;
      
      setTimeout(function () {
        content.innerHTML = "";
      }, wait_time);
    }

    wait_time = 2000 / btnFrameRate.value; //có thể cập nhật thường xuyên tốc độ
    await sleep(wait_time, element);
    frameRate(speed);


    if (current.visited != true) {

      content.innerHTML = "Color the vertex " + current.v;

      setTimeout(function () {
        content.innerHTML = "";
      }, wait_time);

      var element = document.getElementById('code1-1');
      vertices.forEach((e) => e.show());
      element.classList.add('select');

      wait_time = 2000 / btnFrameRate.value; //có thể cập nhật thường xuyên tốc độ
      await sleep(wait_time, element);
      frameRate(speed);
    } else {
      content.innerHTML = "Vertex " + current.v + " is visited";
      setTimeout(function () {
        content.innerHTML = "";
      }, wait_time);
    }


    current.visited = true;
    current.selected = true;

    // Đưa các đỉnh vào danh sách thứ tự duyệt, loại bỏ các đỉnh trùng
    var check = true;
    if (current.visited == true && current.selected == true) {
      for (var i = 0; i < listOrder.length; i++) {
        if (listOrder[i].v == current.v) {
          check = false;
          break;
        }
      }
      if (check == true) {
        listOrder.push(current);
      }

    }

    vertices.forEach((e) => e.show());

    var inputElement = document.getElementById("myInput");
    var inputValue;
    if (inputElement.value == "") {
      alert("You have not entered the target vertex");
      start = false;
      return;
    }
    else {
      inputValue = inputElement.value;
    }

    //Kiểm tra đỉnh đang xét có phải đỉnh cần tìm không
    if (current.v == inputValue) {

      var p = document.createElement('p');
      p.innerHTML = "Found " + current.v + " !!!";
      data_display.appendChild(p);
      // data_display.scrollTop = myDiv.scrollHeight - myDiv.clientHeight;
      data_display.scrollTop = data_display.scrollHeight;


      


      var element = document.getElementById('code2');
      element.classList.add('select');
      wait_time = 2000 / btnFrameRate.value; //có thể cập nhật thường xuyên tốc độ
      await sleep(wait_time, element);
      frameRate(speed);
      current.found = true;



      //Hiển thị đường đi các node
      var lsPass = "Vertices have passed: ";
      lsPass+= listPassed[0].v;
      for(var i=1; i<listPassed.length; i++){
        lsPass= lsPass + " -> " + listPassed[i].v;
      }
      var p = document.createElement('p');
      p.innerHTML = lsPass;
      data_display.appendChild(p);
      // data_display.scrollTop = myDiv.scrollHeight - myDiv.clientHeight;
      data_display.scrollTop = data_display.scrollHeight;



      // Hiển thị thứ tự duyệt
      var order = "Order of vertices traversal: ";
      order+= listOrder[0].v;
      for(var i=1; i<listOrder.length; i++){
        order= order + " -> " + listOrder[i].v;
      }
      console.log(order);
      var p = document.createElement('p');
      p.innerHTML = order;
      data_display.appendChild(p);
      // data_display.scrollTop = myDiv.scrollHeight - myDiv.clientHeight;
      data_display.scrollTop = data_display.scrollHeight;


      // tìm thấy, tất cả các cạnh trả về màu ban đầu
      vertices.forEach((v) => {
        v.adj.forEach((e) => {
          e.selected = false;
        });
      });


      start = false;// thấy rồi kết thúc, n cũng sẽ chạy hết lần này
      return;// muốn ko chạy hết lần này, thì return
    }


    var next;

    var element = document.getElementById('code3');
    element.classList.add('select');
    wait_time = 2000 / btnFrameRate.value; //có thể cập nhật thường xuyên tốc độ
    await sleep(wait_time, element);
    frameRate(speed);


    for (var i = 0; i < current.adj.length; i++) {

      if (current.adj[i].v != current.v) {
        content.innerHTML = "Vertex " + current.adj[i].v + " is a neighbor of " + current.v;

        // var p = document.createElement('p');
        // p.innerHTML = "Vertex " + current.adj[i].v + " is a neighbor of " + current.v;
        // //p.classList.add('choose');
        // data_display.appendChild(p);
        // data_display.scrollTop = data_display.scrollHeight;


        setTimeout(function () {
          content.innerHTML = "";
        }, wait_time);

      } else {
        content.innerHTML = "Vertex " + current.adj[i].par.v + " is a neighbor of " + current.v;



        setTimeout(function () {
          content.innerHTML = "";
        }, wait_time);
      }

      var element = document.getElementById('code4');
      element.classList.add('select');
      wait_time = 2000 / btnFrameRate.value; //có thể cập nhật thường xuyên tốc độ
      await sleep(wait_time, element);
      frameRate(speed);

      if (!current.adj[i].visited) {

        content.innerHTML = "Vertex " + current.adj[i].v + " is not visited -> DFS(" + current.adj[i].v + ")";


        setTimeout(function () {
          content.innerHTML = "";
        }, wait_time);

        var element = document.getElementById('code5');
        element.classList.add('select');
        wait_time = 2000 / btnFrameRate.value; //có thể cập nhật thường xuyên tốc độ
        await sleep(wait_time, element);
        frameRate(speed);

        next = current.adj[i];
        next.par = current;
        break;

      } else {

        var element = document.getElementById('code3');
        element.classList.add('select');
        wait_time = 2000 / btnFrameRate.value; //có thể cập nhật thường xuyên tốc độ
        await sleep(wait_time, element);
        frameRate(speed);
      }
    }

    if (!next) current = current.par;
    else current = next;

    if (!current) {
      alert("Không tìm thấy đỉnh " + inputValue + "!!!");

      

      console.log("Done");
    }
    frameRate(speed); //để chỉnh tốc độc thuật toán
  }
  else frameRate(speed);
  background(0);


  vertices.forEach((e) => e.show());
  if (cur) { cur.selected = false; }
}



function intersect(x, y) {
  for (var i = 0; i < vertices.length; i++) {
    if (dist(vertices[i].pos.x, vertices[i].pos.y, x, y) + 30 <= vertices[i].r * 2) {
      console.log(i);
      if (sel) {
        if (sel == vertices[i]) {
          sel = undefined;
          vertices[i].selected = false;
          return true;
        }
        sel.adj.push(vertices[i]);
        vertices[i].adj.push(sel);
        sel.selected = false;
        sel = undefined;
      }
      else { sel = vertices[i]; vertices[i].selected = true; }
      return true;
    }
  }
  return false;
}


function mousePressed() {
  console.log(mouseX, mouseY);
  if (intersect(mouseX, mouseY)) {
    console.log(true);
    return;
  };
  console.log(false);
  if (mouseX + 50 > width || mouseY + 50 > height || mouseX < 50 || mouseY < 50) return;

  vertices.push(new Vertex(mouseX, mouseY));
}
