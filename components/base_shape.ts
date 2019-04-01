
export default class BaseShape {
    ctx: any
    constructor(canvas: any){
        this.ctx = canvas; 
    }

    drawPixel(x: number, y: number) {
        this.ctx.fillRect(x, y, 1, 1);
    }

    draw(){
        throw new Error("You should implement draw function");
    }

}