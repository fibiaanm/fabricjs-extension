import objects from "./objects.ts";

const pagesConfiguration: any = {
    objects: {
        ...objects
    }
}

const getValue = (key: string) => {
    const [first, ...rest] = key.split(".");
    let res = pagesConfiguration[first];
    for (const k of rest) {
        res = res[k];
    }
    return res;
}

const setValue = (key: string, value: any) => {
    console.log(key, value);
}

export default (key: string, modifier?: any) => {
    if (modifier) {
        setValue(key, modifier);
    } else {
        return getValue(key);
    }
}