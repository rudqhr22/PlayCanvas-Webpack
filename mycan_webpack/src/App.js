
import * as pc from "../node_modules/playcanvas/build/playcanvas.mjs/index.js";
//namespace pc;
let canvas;
let app;
var CANVAS_ID = 'application-canvas';

let button;
let _mouse;
let _camera;


function example() 
{
    button = new pc.Entity("2d screeb");
    app.root.addChild(button);

    button.addComponent("screen", {resolution: { width : 100, height: 100}});
    



    const b1 = new pc.Entity("cube ME");
    b1.addComponent("render", { type: "box", });    
    app.root.addChild(b1);

    // create box entity
    const box = new pc.Entity("cube");
    box.addComponent("render", { type: "box", });
    box.setLocalPosition(0.2,0.2,0.2);
    b1.addChild(box);

    // create directional light entity
    const light = new pc.Entity("light");
    light.addComponent("light");        
    light.setEulerAngles(45, 0, 0);
    app.root.addChild(light);

    // rotate the box according to the delta time since the last frame
    app.on("update", (dt) => b1.rotate(10 * dt, 20 * dt, 30 * dt));

    app.start();
}



export default class App 
{
    constructor(_) 
    {

        console.log("MY TEST!!!");
        CreateCanvas();
        CreateApp();
        CreateCamera();
    	example();
    }
}


function CreateCanvas()
{
    canvas = document.createElement('canvas');
    canvas.width = 1300;
    canvas.height = 1300;
    canvas.setAttribute('id', CANVAS_ID);
    //canvas.setAttribute('tabindex', 0);
    // canvas.style.visibility = 'hidden';

    // Disable I-bar cursor on click+drag
    canvas.onselectstart = function () { return false; };
    document.body.appendChild(canvas);
}

function CreateApp()
{
    _mouse = new pc.Mouse(document.body)    

    app = new pc.Application(canvas, { 

        mouse: _mouse,
        touch: new pc.TouchDevice(document.body),
        elementInput: new pc.ElementInput(canvas),

    });


    let x = 0;
    let y = 0;
    _mouse.on("mousemove", (event) =>
    {
        if (event.buttons[pc.MOUSEBUTTON_LEFT]) 
        {
            x += event.dx;
            y += event.dy;

            _camera.setLocalEulerAngles(0.02 * y, 0.02 * x, 0);
        }

        
        if (event.buttons[pc.EVENT_MOUSEWHEEL]) 
        {
            x += event.dx;
            

            _camera.setEulerAngles(0, 0, x);
        }
        
    });
    
}

function CreateCamera()
{
    _camera = new pc.Entity("camera");
    _camera.addComponent("camera", { clearColor: new pc.Color(0.5, 0.6, 0.9), });
    _camera.setPosition(0, 0, 5);
    app.root.addChild(_camera);
}