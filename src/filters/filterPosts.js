const filterPosts = (terms, item) => {
    return terms.every(term =>
        ['tags', 'author', 'description', 'link', 'createdAt']
            .some(attribute => {
                if (item[attribute] !== null) {
                    if (typeof item[attribute] !== 'object') {
                        return item[attribute] && item[attribute].toLowerCase().includes(term.toLowerCase())
                    } else {
                        return item[attribute].some(attribute => {
                            return attribute && attribute.toLowerCase().includes(term.toLowerCase())
                        })
                    }
                }
            }))
}
export default filterPosts;