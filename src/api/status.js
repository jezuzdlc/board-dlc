export const fetchStatus = async ()=>{
    try {
        const res = await fetch('http://localhost:3000/status')
        if(!res.ok){
            throw new Error('Error al obtener información')
        }
        return res.json()
    } catch (error) {
        if(error.name == 'AbortError'){
            console.log('aqui esta');
            throw new Error('Error: se agoto el tiempo de espera')
        }

        throw new Error('Error al obtener información')
    }
}