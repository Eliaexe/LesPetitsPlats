function fetchData() {
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw Error('ERROR');
        }
        return response.json();
    })
    .then(data => {
        //console.log(data)
        let search = document.getElementById('search');
        let name = data.map(e => e.name)
        let ingr = data.map(e => e.ingredients)
        let descr = data.map(e => e.description)
        var allIngr = []

        for (let i = 0; i < ingr.length; i++) {
            const el = ingr[i];
            let single = el.map(e => e.ingredient)

            for (let i = 0; i < single.length; i++) {
                const el = single[i];
                allIngr.push(single[i].toLowerCase())
            }
        }

        var uniqueChars = [...new Set(allIngr)];
        var nameArr = name.map(n => n.toLowerCase());

        search.addEventListener('keyup', () => {
            let val = search.value.toLowerCase();
            let arr = uniqueChars;
            let nom = nameArr
            let des = descr

            let all = [arr, nom, des]
            var regEx = new RegExp('(\\w*'+val+'\\w*)','gi');
            
            function matches (pat, str) {
                return str.match(pat)
            }

            function getObj(val){
                for (const z in data) {
                    let y = data[z];
                    for (const k in y) {
                        console.log(y[k]);

                    }
                }
                
            }

            if(val.length >= 3){

               for (const e of  all){
                   let y = []
                console.clear()
                    for (let i = 0; i < e.length; i++) {
                        const el = e[i];
                        let x = matches(val, el);
                        if (x !== null){
                            getObj(el)
                        }
                    }
               }
            } 
        })
})
}

fetchData();