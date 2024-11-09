import {Canvas, FabricImage, Rect} from "fabric";
import install from "./api/install.ts";
import {ObjectBuilder} from "./pages/objects/ObjectBuilder.ts";
import {randomHexColor} from "./utils/random.ts";


const addRectButton = document.getElementById('add-rect-button')!;

const mainCanvas = new Canvas('main-canvas', {
    backgroundColor: 'white',
    preserveObjectStacking: true,
});
mainCanvas.renderAll();


install(mainCanvas);

new ObjectBuilder({
    left: -150,
    top: -150,
    width: 200,
    height: 200,
    fill: '#0000ff'
}, "rect")
    .build<Rect>()
    .then((rect) => {
        mainCanvas.add(rect);
    });

new ObjectBuilder({
    left: 200,
    top: 200,
    scaleX: 0.4,
    scaleY: 0.4,
}, 'image').setUrl('https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg')
    .build<FabricImage>()
    .then((image) => {
        image.set({
            cropX: 100,
            cropY: 100,
            width: 200,
            height: 200,
        })
        mainCanvas.add(image);
    });

addRectButton.addEventListener('click', () => {
    new ObjectBuilder({
        left: 10,
        top: 10,
        width: 200,
        height: 200,
        fill: randomHexColor(),
    }, "rect")
        .build<Rect>()
        .then((rect) => {
            mainCanvas.add(rect);
            mainCanvas.setActiveObject(rect);
        });
});
addRectButton.click();


const cropCode = () => {
    return;

}
cropCode();