function getTagColor (tag) {
    if (!tag) {
        return 'lightgray'
    }

    let tags = [
        { key: 0, label: 'Économie', color: '#FF4B38' },
        { key: 1, label: 'Environnement', color: '#0aa31c' },
        { key: 2, label: 'Energie', color: '#730cc2' },
        { key: 3, label: 'Climat', color: '#3860FF' },
        { key: 4, label: 'Collapsologie', color: '#452f02' },
        { key: 5, label: 'Social', color: '#f7ab88' },
    ]

    tag = tags.find(tagItem => tag === tagItem.label)

    if (tag) {
        return tag.color
    }

    return 'lightgray'
}
export default getTagColor