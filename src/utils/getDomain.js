const getDomain = (url) => {
    if (!url) return 'lien invalide'

    let matches = url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
    return matches && matches[1]
}
export default getDomain