<template>
    <br>
    <div id="eventMapTitle">
      <p>Choose your view</p>
    </div>


    <div class="row d-flex justify-content-center">
        <button class="col-3 btn " v-on:click="switchView('mapView')">Map View</button>
        <div class="col-1"></div>
        <button class="col-3 btn " v-on:click="switchView('otherView')">All Events</button>
    </div>
    <br>

    <!-- Map View -->
    <div v-if="view == 'map'">
        <div id="mapDimensions">
            <div id="map"></div>
        </div>

        <div class="container-fluid mt-5">
        <h1 class="text-center">Our Events</h1>

            <!-- Carousel -->
            <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                <div
                    class="carousel-item"
                    :class="{ active: index === 0 }"
                    v-for="(eventGroup, index) in groupedEvents"
                    :key="index">

                    <div class="row d-flex justify-content-center">
                    <div class="col-sm-8 col-md-5 col-lg-3" v-for="event in eventGroup" :key="event.id">
                        <div class="card mb-4 shadow-sm">
                        <img :src="event.image" class="card-img-top" :alt="event.name" />
                        <div class="card-body">
                            <h5 class="card-title">{{ event.event_name }}</h5>
                            <hr>
                            <h6 class="card-subtitle">{{ event.location }}</h6>
                            <p class="card-text">
                            {{ truncateDescription(event.description) }}
                                <span v-if="event.description.length > 100">
                                        <a @click="showModal(event)"><u>Read More</u></a>
                                </span>
                            </p>
                        <div class="card-footer">
                            <button @click="goToEvent(event)">View Event</button>
                            <span v-if="event.external_url" >
                                <a :href="event.external_url" target="__blank">Signup Here!</a>
                            </span>
                        </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
        
                <!-- Carousel controls -->
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
    </div>

    <!-- Other View -->
    <div v-else class="mt-2 mb-2">
        <h1 class="category-title">Upcoming Events</h1>
        <!-- add buttons for 3: week, month and next month -->
        <div class="d-flex row align-items-center " id="otherView">
            <div class="col-2"></div>
            <div class="col-4">
                <h1>{{ all_events[0].event_name }}</h1>
                <hr style="width:100px">
                <p>{{ getFirstTwoSentences(all_events[0].description) }}</p>
            </div>
            <div class="col-2"></div>
        </div>
    </div>

    <!-- Search Function -->
    <div>
        <div>
            <div class="d-flex justify-content-center">
                <input class="input-size" v-model="searchTerm" @input="searchForEvents" type="text" placeholder="Search events..." aria-label="Search">
            </div>
            <br>
            <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-secondary btn-pill" :class="{ active: selectedCategory === 'All' }" @click="selectCategory('All')">All</button>&nbsp;&nbsp;
                <button type="button" class="btn btn-secondary btn-pill" :class="{ active: selectedCategory === 'Academic' }" @click="selectCategory('Academic')">Academic</button>&nbsp;&nbsp;
                <button type="button" class="btn btn-secondary btn-pill" :class="{ active: selectedCategory === 'Sports' }" @click="selectCategory('Sports')">Sports</button>&nbsp;&nbsp;
                <button type="button" class="btn btn-secondary btn-pill" :class="{ active: selectedCategory === 'Arts' }" @click="selectCategory('Arts')">Arts</button>&nbsp;&nbsp;
                <button type="button" class="btn btn-secondary btn-pill" :class="{ active: selectedCategory === 'Networking' }" @click="selectCategory('Networking')">Networking</button>&nbsp;&nbsp;
                <button type="button" class="btn btn-secondary btn-pill" :class="{ active: selectedCategory === 'Charity' }" @click="selectCategory('Charity')">Charity</button>&nbsp;&nbsp;
                <button type="button" class="btn btn-secondary btn-pill" :class="{ active: selectedCategory === 'Community' }" @click="selectCategory('Community')">Community</button>&nbsp;&nbsp;
                <button type="button" class="btn btn-secondary btn-pill" :class="{ active: selectedCategory === 'Welfare' }" @click="selectCategory('Welfare')">Welfare</button>
            </div>
            <br>
            <div>
                <div>
                    <h1 class="category-title">
                        {{ selectedCategory }} Events Around Campus
                    </h1>
                    <div class="row d-flex p-5 justify-content-center">
                        <div class="col-sm-8 col-md-5 col-lg-3" v-for="event in searchedEvents" :key="event.id">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ event.event_name }}</h5>
                                        <hr>
                                        <h6 class="card-subtitle">{{ event.location }}</h6>
                                        <p class="card-text">
                                        {{ truncateDescription(event.description) }}
                                            <span v-if="event.description.length > 100">
                                                    <a @click="showModal(event)"><u>Read More</u></a>
                                            </span>
                                        </p>
                                        <div class="card-footer">
                                            <button @click="goToEvent(event)">View Event</button>
                                            <span v-if="event.external_url" >
                                                <a :href="event.external_url" target="__blank">Signup Here!</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal Information -->
    <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">{{ selectedEvent?.event_name }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
            <h6>Event Details:</h6>
            <p style="white-space: pre-line">{{ selectedEvent?.description }}</p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            </div>
        </div>
        </div>
    </div>
</template>
  



<script>
  import { getEvents } from '../../utils/supabaseRequests.js';
  import { MarkerClusterer } from "@googlemaps/markerclusterer";
  import { searchEvents } from '../../utils/supabaseRequests.js';

  
  
  export default {
    data() {
      return {
        view: "map",
        events: [], //change this to change events shown on the carousel 
        all_events: [], // keeping track of all events shown
        numEventsGroup: 3,
        selectedEvent: null, // Variable to hold the selected event details
        map:null, // Google Map holder
        debounceTimeout: null,
        markerCluster: null,
        searchTerm: "", //Search term input by user
        searchedEvents: [],
        selectedCategory: "All"
      };
    },


    computed: {
      groupedEvents() { //show events in groups
        const num = this.numEventsGroup;
        return this.events.reduce((acc, event, index) => {
          const groupIndex = Math.floor(index / num);
          if (!acc[groupIndex]) acc[groupIndex] = [];
          acc[groupIndex].push(event);
          return acc;
        }, []);
      },

    //   filteredEvents(){
    //     const category = this.
    //   }


    },
    created() {
    },


    methods: {  
      // Show Modal
      showModal(event) {
        this.selectedEvent = event; 
        const modalElement = new bootstrap.Modal(document.getElementById('eventModal'));
        modalElement.show(); 
      },
  
      // Close Modal
      closeModal() {
        const modalElement = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
        modalElement.hide(); 
        delay(0.3) //needed so that fade animation works properly   
        this.selectedEvent = null;
      },

      //Card Display Changes due to different breakpoints 
      setNumEventsGroup() {
        const width = window.innerWidth;
        if (width >= 992) {
            this.numEventsGroup = 3; // Large 
        } else if (width >= 768) {
            this.numEventsGroup = 2; // Medium 
        } else {
             this.numEventsGroup = 1; // Small 
            } 
        },
  
      // Reduce Description Size
      truncateDescription(description) {
        const maxLength = 99;
        return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
      },

      async fetchEvents() {
        try {
            const fetchedEvents = await getEvents();
            this.all_events = fetchedEvents;
            // console.log("All Events:", this.all_events); 
            return fetchedEvents;
        } catch (error) {
        console.error("Error fetching events:", error);
            }
        },
      switchView(current_view){
            if(this.view == "map" && current_view == "otherView"){
                this.view = "other"
            }else if (this.view == "other" && current_view == "mapView"){
                this.initMap()
                this.view = "map"
            }
        },

      async  initMap() { // map initialisation data, including centerpoint, marker placement and debouncing 
            const position = { lat: 1.2963, lng: 103.8502 };
            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

            const allowedBounds = { //map dimensions
                // north:;
                // south:;
                // east:;
            // west:;
            };
  
            this.map = new Map(document.getElementById("map"), { // create map
            zoom: 18,
            minZoom: 14,
            maxZoom: 19,
            center: position,
            mapId: '731858d4ebe716cc',
            disableDefaultUI: true,
            restriction: {
                // latLngBounds: allowedBounds,
                strictBounds: true,
            },
            });

            // Adding markers based on event location USE ALL EVENTS TO POPULATE ALL THE MARKERS SHOWN 
            await this.fetchEvents();
            this.showEvents();
            await this.createMarkers();


            google.maps.event.addListener(this.map, 'bounds_changed', this.debounce(this.showEvents,600));
            google.maps.event.addListener(this.map, 'zoom_changed', this.debounce(this.showEvents,600));
        },

        async createMarkers(){
            const markers = [];

            if (this.markerCluster) {
                this.markerCluster.clearMarkers();
            }

            this.all_events.forEach(event => {
                console.log(event)
                const marker = new google.maps.Marker({
                    map: this.map,
                    position: { lat: event.place_lat, lng: event.place_lng },
                });
                markers.push(marker)
            });
            console.log(markers)
            this.markerCluster = new MarkerClusterer(this.map, markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            });
        },
  
       debounce(func, delay) { //for reducing the API calls made
        return function (...args) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = setTimeout(() => {
                func.apply(this, args);
            }, delay);
            };
        },

       showEvents(){
                const dimensions = this.map.getBounds() //fi : lo left hi right, Jh: lo bottom hi top
                const all_events = this.all_events
                let events_shown = []
                let array_keys = []

                array_keys = Object.keys(dimensions)
                // console.log(array_keys)
                let lat = array_keys[0]
                let lng = array_keys[1]

                events_shown = []
                all_events.forEach(event => {
                    // console.log(event, event.place_lat, event.place_lng) 
                    if(this.isBetween(event.place_lat,dimensions[lat].lo,dimensions[lat].hi) && this.isBetween(event.place_lng,dimensions[lng].lo,dimensions[lng].hi)){
                        // console.log("here")
                        events_shown.push(event)
                    }
                });

                // console.log(events_shown)
                if(events_shown.length == 0){
                    // console.log("here")
                    let dummy_event = {
                        created_at:"",
                        created_by:"",
                        description:"",
                        end_date_time:"",
                        event_name:"There are currently no events near here!",
                        event_type:"",
                        external_url:"",
                        id:"",
                        location:"",
                        organisation:"",
                        photos:"",
                        place_id:"",
                        place_lat:"",
                        place_lng:"",
                        start_date_time:"",
                        venue:"",
                    }

                    events_shown.push(dummy_event)
                }

                this.events = events_shown
        },

        isBetween(value, min, max){
            return value >= min && value <= max
        },


        getFirstTwoSentences(inputText) {
            const sentences = inputText.split('.').map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);
      
            return sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '.' : '');
        },

        async searchForEvents(){
            const data = await searchEvents('event_name',this.searchTerm)
            const category = this.selectedCategory
            let events_criteria = data.filter(event =>  // filter according to events which meet the 
                this.selectedCategory === "All" || event.event_type === this.selectedCategory
            );

            return this.searchedEvents = events_criteria
        },

        selectCategory(category){
            this.selectedCategory = category
            this.searchForEvents()
        },
    },

    mounted() {
        this.setNumEventsGroup(); // Set initial value based on current viewport
        window.addEventListener('resize', this.setNumEventsGroup); // Update on resize

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
      // -------- END CODE TO INITIALISE GOOGLE MAPS ---------

    this.initMap();
    this.fetchEvents(); 
    this.searchForEvents(); //initial population

    },
  };
</script>
  


<style scoped>
  .carousel-control-prev,
  .carousel-control-next {
    width: 80px;
  }
  
  #eventMapTitle {
    margin-top: 60px;
    text-align: center;
    color: rgb(14, 14, 14);
  }
  
  #map {
    height: 350px;
    width:80%
  }

  #mapDimensions{
    display:flex;
    justify-content: center;
  }
  
  .modal-title,
  .modal-body {
    color: black;
  }

  .card-body {
    height: 400px; /* fixed height for cards */
  }

  #otherView{
    height: 400px
  }

  .btn-pill{
    border-radius: 50px;
  }

  .category-title{
    text-align: center;
  }

  .input-size{
    width: 80%;
  }
</style>
  