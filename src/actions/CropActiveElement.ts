import {Canvas, FabricImage, FabricObject, Rect} from "fabric";
import {UserDependentActions} from "./interfaces/userDependentActions.ts";
import {DialogWithButtonActions} from "./OpenDialogs/DialogWithButtonActions.ts";
import {normalizeFabricCoords} from "../utils/normalizeFabricCoords.ts";
import {lockingObjectActions} from "../utils/lockingObjectActions.ts";
import {CreateCropShapes} from "../pages/objects/CreateCropShapes.ts";
import {ContextualProperties, DecisionAction, ExecutableActions} from "./interfaces/ExecutableActions.ts";
import {buttonCallbacks} from "./interfaces/DialogProperties.ts";
import cropSVG from "../resources/cropSVG.ts";
import { onlyVisibleWhenObjectIsSelected } from "./OpenDialogs/ContextMenuItemVisibility.ts";
import {extensionCustomWindowEvents} from "./list.ts";
import { animationRotateToAngle } from "../utils/animationRotateToAngle.ts";

export type CropActiveElementConfig = {} & DecisionAction;
export type CropParams = {
    cropX: number,
    cropY: number,
    width: number,
    height: number,
}

export class CropActiveElement implements UserDependentActions, ExecutableActions {

    private activeObject: FabricObject | undefined;
    private readonly listener: (ev: KeyboardEvent) => void;

    private cropHelpers: FabricObject[] = [];
    private dialog: DialogWithButtonActions | undefined;
    private originalAngle: number | undefined;
    private lastAppliedCropParams: CropParams | undefined;
    
    private config: CropActiveElementConfig = {}
    public contextual: ContextualProperties[] = [{
        name: 'Crop',
        order: '2,0',
        svg: cropSVG,
        shortcut: {
            key: 'x',
        },
        visibility: () => onlyVisibleWhenObjectIsSelected(this.canvas),
        execute: this.execute.bind(this),
    }]

    static build(canvas: Canvas, config: CropActiveElementConfig): CropActiveElement {
        const instance = new CropActiveElement(canvas);
        instance.config = config;
        return instance;
    }

    constructor(
        private canvas: Canvas
    ) {
        const localClose = () => {
            !!this.activeObject && lockingObjectActions(this.activeObject, false);
            !!this.dialog && this.dialog.close();
            !this.dialog && this.cancel();

            this.removeHelpers();
            animationRotateToAngle({
                activeObject: this.activeObject as FabricImage,
                targetAngle: this.originalAngle || 0,
                duration: 100,
                canvas: this.canvas,
            })
            this.dialog = undefined;
            this.activeObject = undefined;

            const cropCanceledEvent = new CustomEvent(extensionCustomWindowEvents.cropCanceled);
            window.dispatchEvent(cropCanceledEvent);
        }

        canvas.on('selection:cleared', () => {
            if (!this.activeObject) return;
            lockingObjectActions(this.activeObject, false);
            localClose();
        });
        canvas.on('selection:updated', (opt) => {
            if (!(opt.deselected[0] == this.cropHelpers[1])) return;
        });
        this.listener = this.start.bind(this);
        window.addEventListener('keydown', this.listener);
    }

    private removeHelpers() {
        this.cropHelpers.forEach((helper) => {
            this.canvas.remove(helper);
        });
        this.cropHelpers = [];
    }

    private compareCropParams(obj: FabricImage): boolean {
        if (!this.lastAppliedCropParams) return false;
    
        return (
            this.lastAppliedCropParams.cropX === obj.cropX &&
            this.lastAppliedCropParams.cropY === obj.cropY &&
            this.lastAppliedCropParams.width === obj.width &&
            this.lastAppliedCropParams.height === obj.height
        );
    }

    activeElementIsCropped(): boolean {        
        const obj = this.canvas.getActiveObject() as FabricImage;
        if (!obj) return false;
    
        const hasCropProperties = 
            typeof obj.cropX === 'number' && 
            typeof obj.cropY === 'number' && 
            typeof obj.width === 'number' && 
            typeof obj.height === 'number';
    
        if (!hasCropProperties) return false;
    
        const originalWidth = (obj.getElement() as HTMLImageElement).naturalWidth;
        const originalHeight = (obj.getElement() as HTMLImageElement).naturalHeight;
    
        const isCropped = 
            obj.cropX !== 0 || 
            obj.cropY !== 0 || 
            obj.width !== originalWidth ||
            obj.height !== originalHeight;
    
        if (isCropped && (!this.lastAppliedCropParams || !this.compareCropParams(obj))) {
            this.lastAppliedCropParams = {
                cropX: obj.cropX,
                cropY: obj.cropY,
                width: obj.width,
                height: obj.height,
            };
        }        
    
        return isCropped;
    }


    apply(): void {
        const cropControlBox = this.cropHelpers[1];
        const obj = this.activeObject as Rect;
        if (!obj) return;
        const cropParams = {
            cropX: (cropControlBox.left - obj.left) / obj.scaleX,
            cropY: (cropControlBox.top - obj.top) / obj.scaleY,
            width: cropControlBox.width * cropControlBox.scaleX / obj.scaleX,
            height: cropControlBox.height * cropControlBox.scaleY / obj.scaleY,
            left: cropControlBox.left,
            top: cropControlBox.top,
        }
        
        this.lastAppliedCropParams = { ...cropParams };
        obj.set({ ...cropParams });
        animationRotateToAngle({
            activeObject: obj,
            targetAngle: this.originalAngle || 0,
            duration: 100,
            canvas: this.canvas
        });
        obj.setCoords();
        this.canvas.setActiveObject(obj);
        lockingObjectActions(obj, false);
        this.removeHelpers();

        if (this.dialog) {
            this.dialog.close();
        }
    
        this.activeObject = undefined;
        this.dialog = undefined;
        this.originalAngle = undefined;
    }

    cancel(): void {            
        const obj = this.activeObject as FabricImage;
        if (obj && this.originalAngle !== undefined) {
            animationRotateToAngle({
                activeObject: obj,
                targetAngle: this.originalAngle,
                duration: 100,
                canvas: this.canvas,
            })
            obj.setCoords();
        }

        if (this.lastAppliedCropParams) {
            obj.set({
                cropX: this.lastAppliedCropParams.cropX,
                cropY: this.lastAppliedCropParams.cropY,
                width: this.lastAppliedCropParams.width,
                height: this.lastAppliedCropParams.height,
            });
            animationRotateToAngle({
                activeObject: obj,
                targetAngle: this.originalAngle || 0,
                duration: 100,
                canvas: this.canvas,
            })
            obj.setCoords();
        }

        this.removeHelpers();
        this.activeObject = undefined;
        this.dialog = undefined;
        this.originalAngle = undefined;
    }

    clear(): void {
        const obj = this.activeObject as FabricImage;
        if (obj && this.originalAngle !== undefined) {
            animationRotateToAngle({
                activeObject: obj,
                targetAngle: this.originalAngle,
                duration: 100,
                canvas: this.canvas,
            })
            this.canvas.setActiveObject(obj);
            obj.setCoords();
        }

        this.removeHelpers();
        this.activeObject = undefined;
        this.dialog = undefined;
        this.originalAngle = undefined;
        this.lastAppliedCropParams = undefined;
    }

    start(ev: KeyboardEvent): void {
        if (ev.key === 'x' && !ev.ctrlKey && !ev.shiftKey && !ev.altKey) {
            this.execute();
        }
        if (ev.key === 'c' ) {
            this.clear();
        }
        if (ev.key === 'Escape') {
            this.cancel();
        }
        if (ev.key === 'Enter') {
            this.apply();
        }
    }

    execute() {
        const activeElement = this.canvas.getActiveObject();   
        if (!activeElement) return;
        this.activeObject = activeElement;
        if (typeof (activeElement as any).cropX !== 'number') return

        const coords = normalizeFabricCoords(activeElement, this.canvas);
        const actionCallbacks: buttonCallbacks = {
            accept: this.apply.bind(this),
            cancel: this.cancel.bind(this),
            clear: this.clear.bind(this),
        }
    
        if (this.activeElementIsCropped()) {
            const obj = activeElement as FabricImage;
            this.lastAppliedCropParams = {
                cropX: obj.cropX,
                cropY: obj.cropY,
                width: obj.width,
                height: obj.height,
            };
        }

        this.setupCrop().then();

        if (this.config?.open) {
            this.config.open(coords, actionCallbacks);
            return;
        }

        const dialog = new DialogWithButtonActions(actionCallbacks);
        dialog.open({
            coords,
            title: 'Crop',
            useClickOutside: false,
        });
        dialog.onClose(() => {
            this.cancel();
        })
        this.dialog = dialog;
    }

    async setupCrop() {        
        const obj = this.activeObject as FabricImage; 

        lockingObjectActions(obj, true);
        
        this.originalAngle = obj.angle;
        
        animationRotateToAngle({
            activeObject: obj,
            targetAngle: 0,
            duration: 100,
            canvas: this.canvas,
            onComplete: () => {
                const createCropShapes = new CreateCropShapes(obj, this);
                const { cutOutGroup, innerRect, outerRect } = createCropShapes.createCropBox();
        
                const controller = createCropShapes.createControllerBox({
                    cutOutGroup,
                    innerRect,
                    outerRect,
                });
        
                this.canvas.add(cutOutGroup);
                this.canvas.add(controller);
                controller.controls.mtr.visible = false;
                this.canvas.setActiveObject(controller);
        
                this.cropHelpers.push(cutOutGroup);
                this.cropHelpers.push(controller);
            },
        });
        
        obj.setCoords();
    }
}