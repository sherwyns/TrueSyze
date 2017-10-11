
class Sir {

    private _isARCompatible: boolean;
    cameraPosition:string = "0 0 15";
    modelPosition:string = "0 0 0";
    modelScale:string = "0.5 0.5 0.5";


    isARCompatible(): boolean {
        return this._isARCompatible;
    }

    /**
     * Used to set the value of the _isARCompatible variable based on the browser's capability to render AR models.
     */
    constructor() {
        if (this.hasUserMedia()) {
            this._isARCompatible = true;
        }
        else {
            this._isARCompatible = false;
        }

    }

    markerlessRender(domObjectId,modelName, objUrl, mtlUrl, cameraPosition, modelPosition, modelScale) {

        var domObject = document.getElementById(domObjectId);

        if(domObject === undefined){
            console.log('SIR Log: DOM Object not found. Cannot attach the render to a non existing dom.');
            return;
        }
        if (objUrl === undefined) {
            console.log('SIR Log: No object URL passed. Cannot attach the render without object URL.');
            return;
        }

        if (mtlUrl === undefined) {
            console.log('SIR Log: No object material URL passed. Cannot attach the render without object material URL.');
            return;
        }

        // ObjURL and MtlURL file check verification needs to be done.


        if (modelName === undefined) {
            console.log('SIR Log: No model name specified. Using the default model name - Object.');
        }

        if (cameraPosition === undefined)
            cameraPosition = this.cameraPosition;

        if (modelPosition === undefined)
            modelPosition = this.modelPosition;

        if (modelScale === undefined)
            modelScale = this.modelScale;

        
        var content: string = '';
        content +="<a-scene id='scene' embedded artoolkit='sourceType: webcam;'>";
        content +="<a-entity camera position='" + this.cameraPosition + "'></a-entity>";
        content +="<a-assets>";
        content +="<a-asset-item id='" + modelName + "-obj' src='" + objUrl + "'></a-asset-item>";
        content +="<a-asset-item id='" + modelName + "-mtl' src='" + mtlUrl + "'></a-asset-item>";
        content +="</a-assets>";
        content +="<a-entity look-controls='reverseMouseDrag:true'>";
        content +="<a-obj-model  src='#" + modelName + "-obj' mtl='#" + modelName + "-mtl' position='" + this.modelPosition + "' scale='" + this.modelScale + "'>";
        content +="</a-obj-model>";
        content +="</a-entity>";
        content +="</a-scene>";
        domObject.innerHTML =content;
    }

    markerRender(domObjectId,modelName, objUrl, mtlUrl, modelPosition, modelScale) {

        var domObject = document.getElementById(domObjectId);
        if (domObject === undefined) {
            console.log('SIR Log: DOM Object not found. Cannot attach the render to a non existing dom.');
            return;
        }

        if (objUrl === undefined) {
            console.log('SIR Log: No object URL passed. Cannot attach the render without object URL.');
            return;
        }

        if (mtlUrl === undefined) {
            console.log('SIR Log: No object material URL passed. Cannot attach the render without object material URL.');
            return;
        }

        // ObjURL and MtlURL file check verification needs to be done.


        if (modelName === undefined) {
            console.log('SIR Log: No model name specified. Using the default model name - Object.');
        }

        if (modelPosition === undefined)
            modelPosition = this.modelPosition;

        if (modelScale === undefined)
            modelScale = this.modelScale;
        var content: string = '';
        content +="<a-scene id='scene' embedded artoolkit='sourceType: webcam;'>";
        content +="<a-assets>";
        content +="<a-asset-item id='" + modelName + "-obj' src='" + objUrl + "'></a-asset-item>";
        content +="<a-asset-item id='" + modelName + "-mtl' src='" + mtlUrl + "'></a-asset-item>";
        content +="</a-assets>";
        content +="<a-entity look-controls='reverseMouseDrag:true'>";
        content +="<a-obj-model  src='#" + modelName + "-obj' mtl='#" + modelName + "-mtl' position='0 0 0' scale='0.3 0.3 0.3'>";
        content +="</a-obj-model>";
        content +="</a-entity>";
        content +="<a-marker-camera preset='hiro' markersAreaEnabled='false'></a-marker-camera>";
        content +="</a-scene>";
        domObject.innerHTML =content;
    }

    hasUserMedia() {
        return !!(navigator.getUserMedia);
    }
}
console.log('Loading SIR Dependencies');
var script = document.createElement('script');
script.onload = function () {
    var script1 = document.createElement('script');
    script1.src = 'AR.js-master/aframe/build/aframe-ar.js';
    document.head.appendChild(script1);
};
script.src = 'src/aframe-v0.7.0.min.js';
document.head.appendChild(script);
console.log('Loading SIR Dependencies over');
(<any>window).sir = new Sir();