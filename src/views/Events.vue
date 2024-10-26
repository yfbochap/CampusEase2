<template>
<div class="container d-flex flex-column justify-content-center">
    <h1>{title}</h1>
    <br><br>
    <div class="row">
        <div class="col-5 justify-content-end d-flex">
            <a class="btn btn-secondary " href="#readMore" role="button" >Read More</a>
        </div>
        <div class="col-2"></div>
        <div class="col-auto">
            <a class=" btn btn-primary" href="#" role="button">Sign Up</a>
        </div>
    </div>
    <br>
    <div class="d-flex justify-content-center">{add relevant information}</div>
</div>
<hr>
<div class="row map" id="readMore">
    <div id="map" class="col-6"></div>
    <div class="col-6 mr-5">
        <h4 class="d-flex justify-content-center"><u>Event Details</u></h4>
        <p class="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse omnis repellendus quod mollitia voluptatem eius consectetur rem modi fugiat! Animi assumenda dolorem suscipit eligendi illum? Consequatur sed temporibus nemo voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, recusandae dignissimos. Nam veniam repellat quos quibusdam facilis voluptas sed blanditiis atque laboriosam! Nostrum reprehenderit, minima magni qui possimus iusto dolores. Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptate fugit tenetur explicabo obcaecati odio officiis dolores sequi sapiente vitae, cum possimus fuga quas, vero nihil, suscipit quia molestias facere!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse omnis repellendus quod mollitia voluptatem eius consectetur rem modi fugiat! Animi assumenda dolorem suscipit eligendi illum? Consequatur sed temporibus nemo voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, recusandae dignissimos. Nam veniam repellat quos quibusdam facilis voluptas sed blanditiis atque laboriosam! Nostrum reprehenderit, minima magni qui possimus iusto dolores. Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptate fugit tenetur explicabo obcaecati odio officiis dolores sequi sapiente vitae, cum possimus fuga quas, vero nihil, suscipit quia molestias facere!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse omnis repellendus quod mollitia voluptatem eius consectetur rem modi fugiat! Animi assumenda dolorem suscipit eligendi illum? Consequatur sed temporibus nemo voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, recusandae dignissimos. Nam veniam repellat quos quibusdam facilis voluptas sed blanditiis atque laboriosam! Nostrum reprehenderit, minima magni qui possimus iusto dolores. Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptate fugit tenetur explicabo obcaecati odio officiis dolores sequi sapiente vitae, cum possimus fuga quas, vero nihil, suscipit quia molestias facere!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse omnis repellendus quod mollitia voluptatem eius consectetur rem modi fugiat! Animi assumenda dolorem suscipit eligendi illum? Consequatur sed temporibus nemo voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, recusandae dignissimos. Nam veniam repellat quos quibusdam facilis voluptas sed blanditiis atque laboriosam! Nostrum reprehenderit, minima magni qui possimus iusto dolores. Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptate fugit tenetur explicabo obcaecati odio officiis dolores sequi sapiente vitae, cum possimus fuga quas, vero nihil, suscipit quia molestias facere!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse omnis repellendus quod mollitia voluptatem eius consectetur rem modi fugiat! Animi assumenda dolorem suscipit eligendi illum? Consequatur sed temporibus nemo voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, recusandae dignissimos. Nam veniam repellat quos quibusdam facilis voluptas sed blanditiis atque laboriosam! Nostrum reprehenderit, minima magni qui possimus iusto dolores. Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptate fugit tenetur explicabo obcaecati odio officiis dolores sequi sapiente vitae, cum possimus fuga quas, vero nihil, suscipit quia molestias facere!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse omnis repellendus quod mollitia voluptatem eius consectetur rem modi fugiat! Animi assumenda dolorem suscipit eligendi illum? Consequatur sed temporibus nemo voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, recusandae dignissimos. Nam veniam repellat quos quibusdam facilis voluptas sed blanditiis atque laboriosam! Nostrum reprehenderit, minima magni qui possimus iusto dolores. Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptate fugit tenetur explicabo obcaecati odio officiis dolores sequi sapiente vitae, cum possimus fuga quas, vero nihil, suscipit quia molestias facere!</p>
    </div>
</div>
</template>

<style scoped>
    a {
        width: 150px;
    }
    h1 {
        text-align: center;
    }
    .container{
        height: 75vh;
    }
    center{
        margin: auto;
    }
    .description{
        overflow-y:auto;
        height: 500px; 
        border-left: 1px dashed grey;
        padding: 5px;
    }
    p {
        white-space: pre; 
        text-wrap: wrap;
    }
</style>

<script>
export default {
    mounted(){
        (g => {
        var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
        b = b[c] || (b[c] = {});
        var d = b.maps || (b.maps = {}), r = new Set(), e = new URLSearchParams(), u = () => h || (h = new Promise(async (f, n) => {
            await (a = m.createElement("script"));
            e.set("libraries", [...r] + "");
            for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
            e.set("callback", c + ".maps." + q);
            a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
            d[q] = f;
            a.onerror = () => h = n(Error(p + " could not load."));
            a.nonce = m.querySelector("script[nonce]")?.nonce || "";
            m.head.append(a);
        }));
        d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
    })({
        key: "AIzaSyDeVgAhC9VSqh64BteBWNqi3EWDm9vJXvU",
        v: "weekly",
    });

    let map; 

    async function initMap() { // Initialise conditions for overall map
        // The location of SMU
        const position = { lat: 1.2963, lng: 103.8502 };
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        const allowedBounds = {
            north:position.lat + 0.004,
            south:position.lat - 0.004,
            east:position.lng  + 0.006,
            west:position.lng - 0.006,
        }

        map = new Map(document.getElementById("map"), { 
            zoom: 17, // Zoom level when application is opened
            center: position,
            mapId: "SMU",
            disableDefaultUI: true,
            zoomControl: false,
            restriction: {
                latLngBounds: allowedBounds,
                strictBounds: true,
            }
            });

            const marker = new AdvancedMarkerElement({ //
                map: map,
                position: position,
                title: "SMU",
            })
        }   
        initMap();
    },
}

</script>

