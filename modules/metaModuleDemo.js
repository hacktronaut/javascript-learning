
console.log("This is a meta module")
export let data = {
    "firstName": "Kirito"
}

export let printMetaInformation = () => {
    console.log(import.meta);
}

