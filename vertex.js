class Vertex {
    constructor(x,y) {
        this.v = ++counter;
        this.pos = createVector(x,y);
        this.visited = false;
        this.open = false;
        this.r = 50;
        this.selected = false;
        this.found = false;
        this.adj = [];
        this.current = false;
        this.par = undefined;

        this.db =undefined;
    }
    
      


    show(){
        
        stroke(255);
        strokeWeight(2);
        fill(0,0);

        if(this.visited){
            fill(100,0,100);
        }
        if(this.selected){
            fill(209, 17, 17);
        }

        if(this.found){
            fill(4, 224, 103);
        }

        circle(this.pos.x,this.pos.y,this.r);
        fill(255);
        textSize(24);
        textAlign(CENTER);
        text(this.v,this.pos.x,this.pos.y+5);


        this.adj.forEach((e) => {
            var dx = (this.pos.x - e.pos.x);
            var dy = this.pos.y - e.pos.y;
            var r = sqrt(dx * dx + dy * dy);
            if (dx) dx /= r * 2;
            if (dy) dy /= r * 2;
            strokeWeight(2);
            // console.log(this.db);
            // Kiểm tra xem đỉnh kề hiện tại đã được chọn hay chưa

            if (e.selected) {
                stroke(209, 17, 17); // Đổi màu sắc của đường kết nối sang màu đỏ nếu đỉnh kề được chọn
            } else {
                stroke(255);
            }
            line(this.pos.x - dx * this.r, this.pos.y - dy * this.r, e.pos.x + this.r * dx, e.pos.y + dy * this.r);
        })

        // this.adj.forEach((e)=>{
        //     var dx = (this.pos.x - e.pos.x);
        //     var dy = this.pos.y - e.pos.y;
        //     var r = sqrt(dx * dx + dy * dy)
        //     if(dx) dx/=r*2;
        //     if(dy) dy/=r*2;
        //     line(this.pos.x - dx * this.r,this.pos.y - dy * this.r,e.pos.x + this.r * dx ,e.pos.y + dy * this.r);
        // })
    }

    // show này được sử dụng khi muốn tô đỏ hết tất cả các cạnh láng giềng của đỉnh đang xét
    // show() {
    //     stroke(255);
    //     if (this.selected) fill(255, 153, 0);
    //     else if (this.found) fill(0, 255, 0); // nếu đỉnh đã tìm thấy thì tô màu xanh
    //     else if (this.visited) fill(255, 0, 0); // nếu đỉnh đã được duyệt thì tô màu đỏ
    //     else noFill();
    //     ellipse(this.pos.x, this.pos.y, this.r * 2);
    //     for (var i = 0; i < this.adj.length; i++) {
    //       strokeWeight(2);
    //       if ((this.adj[i].visited && this.adj[i].par == this) || (this.visited && this.adj[i].par == this.adj[i])) {
    //         stroke(255, 0, 0);
    //       } else if (this.adj[i].selected) {
    //         stroke(255, 153, 0);
    //       } else {
    //         stroke(255);
    //       }
    //       line(this.pos.x, this.pos.y, this.adj[i].pos.x, this.adj[i].pos.y);
    //     }
    //   }

}