export const fetchPriorities = async ()=>{
    
    const res = await fetch(import.meta.env.VITE_API_URL+'/priority')
    if(!res){
        throw new Error('Error al obtener informacion')
    }
    return res.json()
}