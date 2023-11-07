import {useState} from "react"
export default function useArray(Initial_Array){
    const [Array, setArray] = useState(Initial_Array);
    function set (){
        setArray([4,5,6])
    }
    function push() {
        setArray([...Array,4])
    }
    function replace(){
        const tempArray = [...Array]
        tempArray[1] = 9
        setArray(tempArray)
    }
    function filter(){
        setArray(Array=>Array.filter(element=>element<3))
    }
    function remove(){
        setArray(Array=>[...Array.slice(0, 1), ...Array.slice(2)])
    }
    function clear(){
        setArray(Array=>[])
    }
    function reset(){
        setArray(Array=>Initial_Array)
    }
    return {Array,set,push,replace,filter,remove,clear,reset}
}
