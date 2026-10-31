export const fetchTickets = async(search)=>{
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort()
    }, 10000);
    
    try{
        
        const res = await fetch('http://localhost:3000/tasks?search='+search,{
            signal:controller.signal
        });
        clearTimeout(timeout)
        
        if(!res.ok){
            const errData = await res.json()
            throw new Error(errData?.message)
        }
        return res.json()

    }catch(e){
        if(e.name == 'AbortError'){
            throw new Error('Error: se agoto el tiempo de espera')
        }
        console.log(e);
        throw new Error('Error al obtener información desde catch')
    }
}

export const createTicket = async ({ticket})=>{
    console.log(ticket);
    const res = await fetch('http://localhost:3000/tasks',
        {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(ticket)
        }
    )
    
    if(!res.ok){
        throw new Error('Error al crear ticket')
    }

    return true
}


export const updateStatus = async({id,data})=>{
    const res = await fetch('http://localhost:3000/tasks/'+id+'/status',
        {
            method:'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }
    )
    

    if(!res.ok){
        throw new Error('Error al actualizar estatus')
    }
    return true;
}


export const updateTicket = async ({id,data})=>{
    const res = await fetch('http://localhost:3000/tasks/'+id,
        {
            method:'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(data)
        }
    )
    if(!res.ok){
        throw new Error('Error al actualizar ticket')
    }

    return true;
}


export const deleteTicket = async ({id})=>{
    const res = await fetch (`http://localhost:3000/tasks/${id}`,
        {
            method:'DELETE'
        }
    )
    if(!res.ok){
        throw new Error('Error al eliminar tarjeta')
    }
    return true
}