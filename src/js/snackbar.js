import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmit,);

function onSubmit(ev){
    ev.preventDefault();

    let delay = Number(ev.target.elements.delay.value);
    let state = ev.target.elements.state.value;

    createPromise(delay)
    .then(() =>{
        iziToast.success({
            title: '',
            message:`✅ Fulfilled promise in ${delay}ms`,
            position:'topCenter',

        })
      })
    .catch(() =>{
            iziToast.error({
                title:'',
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topCenter',

            })
    })

    function createPromise(delay){
    return new Promise((res, rej) =>{
        setTimeout(() =>{
            if(state ==='fulfilled'){
                res();
            }else{
                rej()
            }
        }, delay)
    })
    }

    ev.target.reset();
}


