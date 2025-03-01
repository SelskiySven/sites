async function getJson(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (err) {
        console.error("Ошибка:", err);
    }
}

getJson("sample.json").then(data => {
    let jsonData = data;
    let cities = []
    jsonData.forEach(element => {
        cities.push(element['cityName'])
    });
    cities.forEach(element => {
        let ct = document.createElement("button")
        ct.id = "city-" + element
        ct.innerText = element
        ct.hidden = true
        ct.onclick = function () { 
            cities.forEach(element => {
                document.getElementById("city-" + element).classList.remove("active")
            });
            let c = element
            jsonData.forEach(city => {
                if (city['cityName']==c) {
                    console.log(city)
                    document.getElementById("city-" + c).classList.add("active")
                    document.getElementById("fill-humidity").style.height = `${city["humidity"]*100}%`
                    document.getElementById("fill-uvIndex").style.height = `${city["uvIndex"]/20*100}%`
                    document.getElementById("rotate").style.animationDuration = `${20/Number(city["windSpeed"].replace("km",""))}s`
                }
            })
        }
        document.getElementById("cities").append(ct)
    });

    var selectedIndex = -1

    document.getElementById("search-city").addEventListener("input", function (e) {
        selectedIndex = -1
        let val = document.getElementById("search-city").value.toLowerCase()
        cities.forEach(element => {
            document.getElementById("city-" + element).hidden = !element.toLowerCase().includes(val) || val == ""
            document.getElementById("city-" + element).classList.remove("active")
        });
    })
    document.getElementById("dropdown-search").addEventListener("keydown", function (e) {
        let active_cities = []
        cities.forEach(element => {
            document.getElementById("city-" + element).classList.remove("active")
            if (!document.getElementById("city-" + element).hidden) active_cities.push(document.getElementById("city-" + element))
        });
        if (e.key === "ArrowDown") {
            e.preventDefault()
            selectedIndex = (selectedIndex + 1) % active_cities.length;
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            selectedIndex = (selectedIndex - 1 + active_cities.length) % active_cities.length;
        } else if (e.key === "Enter") {
            if (selectedIndex != -1) {
                e.preventDefault()
                active_cities[selectedIndex].click()
            } else if (selectedIndex == -1 && active_cities.length > 0) {
                active_cities[0].click()
            }
        }
        if (selectedIndex != -1) active_cities[selectedIndex].classList.add("active")
    });
    document.addEventListener("keydown", function (e){
        if (e.key =="Escape"){
        electedIndex = -1
            document.getElementById("search-city").value = ""
            document.getElementById("search-city").blur();
            cities.forEach(element => {
                document.getElementById("city-" + element).hidden = true
            });
        }
    })
});