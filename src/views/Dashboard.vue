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
          <div
            class="carousel-item"
            :class="{ active: index === 0 }"
            v-for="(eventGroup, index) in groupedEvents"
            :key="index"
          >
            <div class="row d-flex justify-content-center">
              <div class="col-md-3" v-for="event in eventGroup" :key="event.id">
                <div class="card mb-4 shadow-sm">
                  <img :src="event.image" class="card-img-top" :alt="event.name" />
                  <div class="card-body">
                    <h5 class="card-title">{{ event.event_name }}</h5>
                    <h6 class="card-subtitle">{{ event.location }}</h6>
                    <p class="card-text">
                      {{ truncateDescription(event.description) }}
                        <span v-if="event.description.length > 100">
                                <a @click="showModal(event)"><u>Read More</u></a>
                        </span>
                    </p>
                    <a :href="event.external_url" target="__blank">Signup Here!</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Carousel controls -->
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
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
    </div>
  </template>
  
  <script>
  import { getEvents } from '../../utils/supabaseRequests.js';
  
  export default {

    
    data() {
      return {
        events: [], //change this to change events shown on the carousel 
        all_events: [], // keeping track of all events shown
        numEventsGroup: 3,
        selectedEvent: null, // Variable to hold the selected event details
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
  
      // Reduce Description Size
      truncateDescription(description) {
        const maxLength = 99;
        return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
      },
      async fetchEvents() {
        try {
            const fetchedEvents = await getEvents();
            this.all_events = fetchedEvents;
            console.log("All Events:", this.all_events); 
            return fetchedEvents;
        } catch (error) {
        console.error("Error fetching events:", error);
            }
        },
    },




    mounted() {
        let map; // Initialize and add the map
        let debounceTimeout; // To not make too many calls to the API might not need

        const vm = this; //to access pointer to vue instance to access data

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
  
  
      const allowedBounds = { //map dimensions
        // north:;
        // south:;
        // east:;
        // west:;
      };
  
        async function initMap() { // map initialisation data, including centerpoint, marker placement and debouncing 
            const position = { lat: 1.2963, lng: 103.8502 };
            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
            map = new Map(document.getElementById("map"), { // create map
            zoom: 17,
            minZoom: 13,
            maxZoom: 19,
            center: position,
            mapId: "SMU",
            disableDefaultUI: true,
            restriction: {
                latLngBounds: allowedBounds,
                strictBounds: true,
            },
            });

            // Adding markers based on event location USE ALL EVENTS TO POPULATE ALL THE MARKERS SHOWN 
            vm.fetchEvents().then(() => { 
                showEvents();
                const events = vm.all_events
                // console.log("Events Fetched:", events);
                events.forEach(event => {
                    // console.log(event.place_lat,event.place_lng)
                    new AdvancedMarkerElement({
                        map: map,
                        position: {lat: event.place_lat, lng: event.place_lng},
                        title: event.location
                    })
                })
            });
            google.maps.event.addListener(map, 'bounds_changed', debounce(showEvents,600));
            google.maps.event.addListener(map, 'zoom_changed', debounce(showEvents,600));
        }
  
      function debounce(func, delay) { //for places API call
        return function (...args) {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                func.apply(this, args);
            }, delay);
            };
        }

      function showEvents(){
                const dimensions = map.getBounds() //fi : lo left hi right, Jh: lo bottom hi top
                const all_events = vm.all_events
                let events_shown = []
                let array_keys = []

                // console.log(all_events)
                // console.log(events_shown)

                array_keys = Object.keys(dimensions)
                console.log(array_keys)
                let lat = array_keys[0]
                let lng = array_keys[1]

                // console.log(dimensions[lat].lo ,"1") //left of map
                // console.log(dimensions[lng].lo, "2") //bottom of map
                // console.log(dimensions[lat].hi, "3") //right of map
                // console.log(dimensions[lng].hi, "4") //top of map


                events_shown = []
                all_events.forEach(event => {
                    console.log(event, event.place_lat, event.place_lng) 
                    if(isBetween(event.place_lat,dimensions[lat].lo,dimensions[lat].hi) && isBetween(event.place_lng,dimensions[lng].lo,dimensions[lng].hi)){
                        // console.log("here")
                        events_shown.push(event)
                    }
                });
                console.log(events_shown)
                //add code for dummy event to be put in of no one is there
                if(events_shown.length == 0){
                    // console.log("here")
                    let dummy_event = {
                        created_at:"",
                        created_by:"",
                        description:"There are currently no events near here!",
                        end_date_time:"",
                        event_name:"",
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
                console.log(events_shown)


                vm.events = events_shown
        }

        function isBetween(value, min, max){
            return value >= min && value <= max
        }

        
    initMap();
    },
  };
  </script>
  
  <style scoped>
  .carousel-control-prev,
  .carousel-control-next {
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
  
  .modal-title,
  .modal-body {
    color: black;
  }
  </style>
  