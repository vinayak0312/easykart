import React, { memo } from "react";
function NormalButton({name,extraclasses}){
    return (
        <>
        <button className={"border rounded-md bg-red-500 px-6 text-xl text-white py-1 mx-2 "+ extraclasses}>{name}</button>
        </>
    )
}
export default memo(NormalButton);