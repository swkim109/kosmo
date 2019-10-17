let flag = true;
function NoPromise(flag) {
    let result = 10;
    if (flag) {
        setTimeout(()=>{result = result + 10; return result;}, 3000); //3초 후 실행
        console.log("Doing something...");
    } return result;
}
function KeepPromise(flag) {
    let result = 10;
    const p = new Promise(
        (resolve, reject) => {
            if (flag) {
                setTimeout(()=>{result = result + 10; resolve(result);}, 3000);
                console.log("Doing something...");
            } else {
                const reason = "ERROR!"; reject(reason);
            }
        }
    );
    return p;
}
//console.log(NoPromise(flag));
KeepPromise(flag).then((result)=>console.log(result));