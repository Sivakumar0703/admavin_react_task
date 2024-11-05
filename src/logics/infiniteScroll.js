
// mimicing the data fetching from api
export function loadContentsDynamically(setLoading,setContainers){
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight * 0.75){
        const parent = document.getElementById('content-page-for-scrolling');
        const children = parent.getElementsByTagName('div'); 
        setLoading(true);
        setTimeout(()=>{
            setContainers( prev => [...prev , ...Array.from({length:30},(_,index) => `container - ${children.length+1+index}`)]);
            setLoading(false);
        },3000)
    }
}


// decbouncing function to limit the frequency of function call
export function debounce(fn,delay){
    let timer;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(() => {
        fn();
        },delay)
    }
}

