export const getDatas = async()=>{
    const response = await fetch("https://fakestoreapi.com/products");
    const data = response.json();
    return data
}
export const getOneData = async(id:string)=>{
    console.log(`https://fakestoreapi.com/products/${id}`);
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    return data
}