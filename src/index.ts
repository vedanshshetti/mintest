import { ObjectFlags } from "typescript";

type CBType=()=> {
        res: boolean,
        [key: string]: any
}

function oTr(cb: CBType){
    const r=cb();
    if(r.res) console.log("orTrue(...) passed.")
    else console.error("orTrue(...) failed.")
    return {orTrue: oTr, orFalse: oFls};
}

function oFls(cb: CBType){
    const r=cb();
    if(r.res) console.log("orTrue(...) passed.")
    else console.error("orTrue(...) failed.")
    return {orTrue: oTr, orFalse: oFls};
}

function end() {
    console.log("Test finished.");
}

class TestSuite {
    public whereTrue(cb: CBType) {
        const r= cb();
        if(r.res) console.log("whereTrue(...) passed!")
        else console.error("whereTrue(...) failed.");
        return {
            prevMetadata: r.metadata,
            orTrue: oTr,
            orFalse: oFls,
            end
        }
    }
    public whereFalse(cb: CBType){
        const r= cb();
        if(!r.res) console.log("Test passed!")
        else console.log("Test failed. ERR_WHEREFALSE_FAILED");
        return {
            prevReturn: r,
            orTrue: oTr,
            orFalse: oFls,
            end
        }
    }
}

export default function test(name: string){
    console.log(`Starting test "${name}": `);
    return new TestSuite();
}