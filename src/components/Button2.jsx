import React, { memo } from "react";
function FormButton({name}){
    return(
        <>
        <button type="submit" className="my-6 border rounded-md bg-blue-600 text-white text-xl py-2 disabled:bg-blue-300" >{name}</button>
        </>
    )
}
export default memo(FormButton);