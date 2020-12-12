const getDomain = (url) => {
    let matches = url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
    return matches && matches[1]
}
export default getDomain