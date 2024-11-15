import {Canvas, FabricImage, FabricObject, Rect} from "fabric";
import {UserDependentActions} from "./interfaces/userDependentActions.ts";
import {DialogWithButtonActions} from "./OpenDialogs/DialogWithButtonActions.ts";
import {normalizeFabricCoords} from "../utils/normalizeFabricCoords.ts";
import {lockingObjectActions} from "../utils/lockingObjectActions.ts";
import {CreateCropShapes} from "../pages/objects/CreateCropShapes.ts";
import {DecisionAction} from "./interfaces/ExecutableActions.ts";
import {buttonCallbacks} from "./OpenDialogs/Dialog.ts";

export type CropActiveElementConfig = {} & DecisionAction;

export class CropActiveElement implements UserDependentActions {

    private activeObject: FabricObject | undefined;
    private readonly listener: (ev: KeyboardEvent) => void;

    private cropHelpers: FabricObject[] = [];
    private dialog: DialogWithButtonActions | undefined;

    private config: CropActiveElementConfig = {}

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
            this.removeHelpers();
            this.dialog = undefined;
            this.activeObject = undefined;
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

    apply(): void {
        const cropControlBox = this.cropHelpers[1];
        const obj = this.activeObject as Rect;

        obj.set({
            cropX: (cropControlBox.left - obj.left) / obj.scaleX,
            left: cropControlBox.left,
            cropY: (cropControlBox.top - obj.top) / obj.scaleY,
            top: cropControlBox.top,
            width: cropControlBox.width * cropControlBox.scaleX / obj.scaleX,
            height: cropControlBox.height * cropControlBox.scaleY / obj.scaleY,
        })
        obj.setCoords();
        this.canvas.setActiveObject(obj);
        lockingObjectActions(obj, false);
        this.removeHelpers();

        this.activeObject = undefined;
        this.dialog = undefined;
    }

    cancel(): void {
        this.removeHelpers();
        this.activeObject = undefined;
        this.dialog = undefined;
    }

    clear(): void {
    }

    start(ev: KeyboardEvent): void {
        if (ev.key === 'x' && !ev.ctrlKey && !ev.shiftKey && !ev.altKey) {
            this.execute();
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
        const createCropShapes = new CreateCropShapes(obj);
        const {
            cutOutGroup,
            innerRect,
            outerRect,
        } = createCropShapes.createCropBox();
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
    }
}