
async function getMetadata({url}){
const apiUrl = `https://jsonlink.io/api/extract?url=${url}&api_key=${process.env.META_API}`;
try {
    const data= await fetch(apiUrl);
    const response= await data.json();
    return response;
} catch (error) {
    console.log(error);
    return null;
}

}
export default getMetadata;