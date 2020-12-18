const isImage = (extension) => {
    return extension.match(/.(jpg|jpeg|png|gif)$/i)

}

export default isImage