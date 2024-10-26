<template>
    <div id="eventMapTitle">
        <h2>Event Map</h2>
    </div>
    <div id="map"></div>

    <div class="container mt-5">
        <h1 class="text-center">Our Events</h1>
        <!-- Carousel -->
        <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                
                <!-- Loop through the events in groups of 3 -->
                <div 
                    class="carousel-item" 
                    :class="{ active: index === 0 }" 
                    v-for="(eventGroup, index) in groupedEvents" 
                    :key="index"
                >
                    <div class="row d-flex justify-content-center"> <!-- div 1 item, consisting of 3 cards in it -->

                        <!-- Individual Card Details-->
                        <div class="col-md-3" v-for="event in eventGroup">
                            <
                            <div class="card mb-4 shadow-sm">
                                <img :src="event.image" class="card-img-top" :alt="event.name">
                                <div class="card-body">
                                    <h5 class="card-title">{{ event.name }}</h5>
                                    <h6 class="card-subtitle">{{ event.location }}</h6>
                                    <p class="card-text">{{ event.content }}</p>
                                    <router-link class="btn btn-outline-success" to="/event#event">Learn more...</router-link>
                                    <a :href=event.signup>Signup Here!   </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            numEvents: 8, // adjust the number of events displayed in total
            events: [],
            numEventsGroup: 3 //adjust the number of events diplayed together (need to adjust col-3 for this in html)
        };
    },
    computed: {
        groupedEvents() {
            // Group events into arrays of num events specified
            const num = this.numEventsGroup
            return this.events.reduce((acc, event, index) => {
                const groupIndex = Math.floor(index / num);
                if (!acc[groupIndex]) acc[groupIndex] = [];
                acc[groupIndex].push(event);
                return acc;
            }, []);
        }
    },
    created() {
        // Create the number of events
        for (let i = 1; i <= this.numEvents; i++) {
            this.events.push({
                image: "",
                name: "SMOOOO" + i,
                location: "Big Steps @ SCIS " + i,
                content: `This is the description for event number ${i}.`,
                signup:"http://www.google.com"
            });
        }
    },
    mounted(){
    // -------- CODE TO INITIALISE GOOGLE MAPS ---------
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

    let map; // Initialize and add the map
    let service; // Initialize the Places API
    let debounceTimeout; // So to not make too many calls to the API

    const allowedBounds = { // TODO: fix this
        // north: 1.2988, // Upper boundary (latitude)
        // south: 1.2938, // Lower boundary (latitude)
        // west: 103.8430, // Left boundary (longitude)
        // east: 103.8580 // Right boundary (longitude)
    };

    async function initMap() { // Initialise conditions for overall map
        // The location of SMU
        const position = { lat: 1.2963, lng: 103.8502 };
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        map = new Map(document.getElementById("map"), { 
            zoom: 18, // Zoom level when application is opened
            minZoom: 13, // Set minimum zoom level
            maxZoom: 19, // Set maximum zoom level
            center: position,
            mapId: "SMU",
            disableDefaultUI: true,
            restriction: {
                latLngBounds: allowedBounds,
                strictBounds: true,
            },
        });

        service = new google.maps.places.PlacesService(map);

        // Event listeners
        google.maps.event.addListener(map, 'bounds_changed', debounce(getVisibleBuildings, 600));
        google.maps.event.addListener(map, 'zoom_changed', debounce(getVisibleBuildings, 600));

        const marker = new AdvancedMarkerElement({ //
        map: map,
        position: position,
        title: "SMU",
        })
    }

    function debounce(func, delay) { // Ensure not too many calls are made
        return function(...args) {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    initMap();


    function getVisibleBuildings() {    
        const bounds = map.getBounds();
        const request = {
            bounds: bounds,
        };

        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(results);
            }
        });
    }
    }
}
</script>

<style scoped>
    .carousel-control-prev,
    .carousel-control-next{
        width: 80px;
    }

    #eventMapTitle {
        background-color: black;
        text-align: center;
        color: white;
    }
    #map {
        height: 400px;
        width: 100%;
    }
    #eventCardArea {
        display: flex;
    }
</style>
