import {Canvas, Rect} from "fabric";
import install from "./api/install.ts";
import {ObjectBuilder} from "./pages/ObjectBuilder.ts";


const addRectButton = document.getElementById('add-rect-button')!;

const mainCanvas = new Canvas('main-canvas', {
    backgroundColor: 'white',
    preserveObjectStacking: true,
});
mainCanvas.renderAll();


install(mainCanvas);


addRectButton.addEventListener('click', () => {
    new ObjectBuilder({
        left: 0,
        top: 0,
        width: 200,
        height: 200,
        fill: '#ff0000'
    }, "rect")
        .build<Rect>()
        .then((rect) => {
            mainCanvas.add(rect);
            mainCanvas.setActiveObject(rect);
        });

    new ObjectBuilder({
        left: -200,
        top: -200,
        width: 200,
        height: 200,
        fill: '#0000ff'
    }, "rect")
        .build<Rect>()
        .then((rect) => {
            mainCanvas.add(rect);
            mainCanvas.setActiveObject(rect);
        });
});
addRectButton.click();
