export const setDefaultValue = (input, defaultValue) => {
    return input === undefined ? defaultValue : input;
};



export const htmlDecode = (input) => {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
};


export const extractPageNumberFromURL = (url) => {
    let urlArray = url.split("&");
    let pageParam = urlArray[urlArray.length - 1];
    let pageNumber = pageParam.split("=");
    return pageNumber[pageNumber.length - 1];
};




