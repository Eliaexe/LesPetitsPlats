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
        var nameArray =[...new Set(name)]
        var uniqueChars = [...new Set(allIngr)];

        search.addEventListener('keyup', () => {
            let val = search.value.toLowerCase();
            let arr = uniqueChars;


            if(val.length >= 3){
                let pos = arr.indexOf(val)
                let nom = name.indexOf(val)

                /*if (pos < 0) {
                    console.log("nope")
                } else if (pos > 0) {
                    //console.log(arr[pos]);
                }*/


                if (nom < 0) {
                    console.log("nope")
                } else if (nom > 0) {
                    console.log(arr[nom]);
                }


            } 

        })
        console.log(nameArray);
})
}



fetchData();