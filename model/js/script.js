const modal = document.getElementsByTagName("div")[0];

function close(){
    // console.log(e.target);
    // // "this" point to target of the event
    // console.log(this);
    modal.style.display = "none";
}

// const close = (e) => {
//     console.log(e.target);
//     console.log(this);
        // "this" key word point to windows instead of target of event 
// }

setTimeout( function(){
    modal.style.display = "block";
}, 2000);

document.querySelector("span").addEventListener("click", close);
