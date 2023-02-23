// remove tag if click on x img
function menageFilter(data) {
    let listForSearch = document.getElementById('specificSelected')
    let tags = listForSearch.childNodes
    for (let i = 0; i < tags.length; i++) {
        const e = tags[i].childNodes[1];
        const bkg = e.parentNode.classList.value
        let group = findTheDrop(bkg)
        searchWhitTags(data, 'add'); 
        sortSpecific(data, group)
        e.addEventListener('click', () =>{
            if (tags.length == 1) {
                resetRecepies(data)
            }
            e.parentElement.remove()
            searchWhitTags(data, 'remove'); 
            sortSpecific(data, group)
        })
    }
}
