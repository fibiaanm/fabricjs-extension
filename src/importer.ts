import './index.css';
import {Canvas, FabricImage, Rect, Circle} from "fabric";
import install, {FabricJsExt} from "./api/install.ts";
import {ObjectBuilder} from "./pages/objects/ObjectBuilder.ts";
import {randomHexColor} from "./utils/random.ts";
import keyboardSVG from "./resources/keyboardSVG.ts";

declare global {
    interface Window {
        actions: FabricJsExt;
    }
}

const addRectButton = document.getElementById('add-rect-button')!;
const addCircleButton = document.getElementById('add-circle-button')!;

const mainCanvas = new Canvas('main-canvas', {
    backgroundColor: 'white',
    preserveObjectStacking: true,
});
mainCanvas.renderAll();


(window as Window).actions = install(mainCanvas, {
    'actionsToInstall': {
        '*': true,
    }
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

addCircleButton.addEventListener('click', () => {
    new ObjectBuilder({
        left: 10,
        top: 10,
        fill: randomHexColor(),
        radius: 100,
    }, "circle")
        .build<Circle>()
        .then((circle) => {
            mainCanvas.add(circle);
            mainCanvas.setActiveObject(circle);
        });
});

const addImage = (url: string) => {
    new ObjectBuilder({
        left: 200,
        top: 200,
        scaleX: 0.4,
        scaleY: 0.4,
    }, 'image').setUrl(url)
        .build<FabricImage>()
        .then((image) => {
            mainCanvas.add(image);
            mainCanvas.setActiveObject(image);
        });
}

const imagesLibrary = [
    'https://miro.medium.com/v2/resize:fit:4800/format:webp/1*5rs2blbZqWYzEILxZAcHcQ.jpeg',
    'https://miro.medium.com/v2/resize:fit:4800/format:webp/1*7uYNscvYYqzS7fsa7R_KoQ.png',
    'https://img.freepik.com/free-photo/cyberpunk-warrior-looking-city_23-2150712594.jpg',
    'https://img.freepik.com/free-photo/futuristic-style-possums-wearing-clothing_23-2151039133.jpg',
    'https://img.freepik.com/free-photo/long-shot-adult-nature-with-3d-geometric-shapes_23-2150697288.jpg',
    'https://img.freepik.com/free-photo/digital-environment-scene_23-2151873110.jpg',
    'https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg'

];
const imagesLibraryContainer = document.getElementById('images-library')!;
const CONTAINER_CLASS = 'w-1/3 lg:w-1/4 aspect-square flex items-center justify-center overflow-hidden cursor-pointer p-0.5';
const CONTAINER_CLASS_LIST = CONTAINER_CLASS.split(' ');
const IMAGE_CLASS = 'w-full h-full object-cover rounded';
const IMAGE_CLASS_LIST = IMAGE_CLASS.split(' ');

imagesLibrary.forEach((image) => {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add(...CONTAINER_CLASS_LIST);
    const imgElement = document.createElement('img');
    imgElement.classList.add(...IMAGE_CLASS_LIST, 'animate-image-loading');
    imgElement.src = image;
    imgElement.onload = () => {
        imgElement.classList.remove('animate-image-loading');
    }
    imageContainer.appendChild(imgElement);
    imagesLibraryContainer.appendChild(imageContainer);
    imageContainer.addEventListener('click', () => {
        addImage(image);
    });
});

const keyboardSVGContainer = document.getElementById('keyboard-svg')!;
keyboardSVGContainer.innerHTML = keyboardSVG;