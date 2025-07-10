import {  useEffect } from "react"

export const useKey = (code,action,isCmdOrCtrAct=false)=>{
    useEffect(()=>{
        const callbackListener = (e)=>{
            const isMac = navigator.userAgentData?.platform === 'macOS';
            const cmdKey = isMac ? e.metaKey : e.ctrlKey;
            if(isCmdOrCtrAct){
                if(cmdKey && e.code==code){
                    action()
                }
            }
            else{
                if(e.code==code){
                    action()
                }
            }
        }
        document.addEventListener('keydown',callbackListener)
        return ()=>{
            document.removeEventListener('keydown',callbackListener)
        }
    },[code,action,isCmdOrCtrAct])
}