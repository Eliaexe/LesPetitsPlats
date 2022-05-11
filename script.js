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
        let appareils = data.map(e => e.appliance)
        let ustensils = data.map(e => e.ustensils)
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

        let ing = uniqueChars.sort();
        let nom = nameArr
        let des = descr
        let appa = appareils.sort();
        let utns = ustensils.sort();

            function matches (pat, str) {
                str = str.toLowerCase()
                return str.match(pat)
            }

        search.addEventListener('keyup', () => {
            let val = search.value.toLowerCase();
            let all = [ing, nom, des]
            var regEx = new RegExp('(\\w*'+val+'\\w*)','gi');
            


            function getObj(val){
                for (const z in data) {
                    let y = data[z];
                    for (const k in y) {
                        console.log(y[k]);

                    }
                }
            }

            if(val.length >= 3){
                for (const e of all){
                    let y = []
                    console.clear()
                    for (let i = 0; i < e.length; i++) {
                        const el = e[i];
                        let x = matches(regEx,el);
                        console.log(x);
                        if (x !== null){
                            getObj(el)
                        }
                    }
                }
            }
        })

        let in1 = document.getElementById('blue')
        let in2 = document.getElementById('green')
        let in3 = document.getElementById('red')

        let allIn = [in1, in2, in3]

        allIn.forEach(e => {
            e.addEventListener('keyup', () => {
                let val = (e.value).toLowerCase();
                var regEx = new RegExp('(\\w*'+val+'\\w*)','gi');

                if (e == in1) {
                    ing.forEach(el => {
                        console.log(matches(regEx, el));
                    });
                } else if(e == in2){
                    appa.forEach(ele => {
                        console.log(matches(regEx, ele));
                    });
                } else if (e == in3){
                    utns.forEach(em => {
                        console.log(matches(regEx, em));
                    });
                }
        })

});


})
}

fetchData();


