let flag = true;

function NoPromise(flag) {
    let a = 10;
    if (flag) {
        setTimeout(()=>{a = a + 10; return a;}, 3000); //3초 후 실행
        console.log("Doing something...");
    } return a;
}

function KeepPromise(flag) {
    let a = 10;
    const p = new Promise(
        (resolve, reject) => {
            if (flag) {
                setTimeout(()=>{a = a + 10; resolve(a);}, 3000);
                console.log("Doing something...");
            } else {
                const reason = "ERROR!"; reject(reason);
            }
        }
    );
    return p;
}



//console.log(NoPromise(flag));

//console.log(KeepPromise(true));

KeepPromise(flag)
    .then((result)=>console.log(result))
    .catch((err) => console.log(err));


/*
(async () => {
    try {
        const result = await KeepPromise(flag);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
})();

 */
