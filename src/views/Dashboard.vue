<template>
  <br>
  <!-- <div id="eventMapTitle">
    <p>Choose your view</p>
  </div> -->

  <div class="container-fluid maincon">
  <div class="row d-flex justify-content-center">
    <button class="col-3 btn viewbutton" v-on:click="switchView('otherView')">All Events</button>
    <!-- <div class="col-1"></div> -->
      <button class="col-3 btn viewbutton" v-on:click="switchView('mapView')">Map View</button>
  </div>

  <!-- All Events View -->
  <div v-if="view === 'other'" class="mt-2 mb-2">
      <h1 class="category-title">Upcoming Events</h1>
      <!-- add buttons for 3: week, month and next month -->
      <!-- <div id="carouselAllEvents" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
              <div class="carousel-item" :class="{ active: index === 0 }" v-for="(event, index) in all_events" :key="event.id">
                  <div class="d-flex justify-content-center">
                      <img :src=getPhotoURL(event) alt="Card image cap" style="width:200px;height:282px"> {{event.event_name}}
                  </div>
              </div>
          </div> -->

              <!-- Carousel controls -->
          <!-- <button class="carousel-control-prev" type="button" data-bs-target="#carouselAllEvents" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
          </button>

          <button class="carousel-control-next" type="button" data-bs-target="#carouselAllEvents" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
          </button> -->
      </div>
  <!-- </div> -->

  <div v-else>
    <div id="mapDimensions">
          <div id="map"></div>
      </div>

      <div class="container-fluid mt-5">
      <h1 class="text-center">Our Events</h1>

          <!-- Carousel -->
          <div id="carouselMap" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
              <div
                  class="carousel-item"
                  :class="{ active: index === 0 }"
                  v-for="(eventGroup, index) in groupedEvents"
                  :key="index">

                  <div class="row d-flex justify-content-center">
                    <div class="col-sm-8 col-md-5 col-lg-3 align-items-stretch" v-for="event in eventGroup" :key="event.id">
                      <div class="card mb-4">
                        <div class="card-body d-flex flex-column">
                          <img class="event-image" :src=getPhotoURL(event) alt="Event Image">
                            <h4 class="card-title">{{ event.event_name }}</h4>
                            <hr>
                            <h6>{{ getDates(event.start_date_time,event.end_date_time) }}</h6>
                            <h6 class="card-subtitle">{{ event.location_short}}</h6>
                            <div class="mt-auto">
                              <HeartIcon :isLiked="isLiked(event)" :eventId="event.id" :userId="user_id" @toggle-like="toggleLikeStatus"/>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              </div>
      
              <!-- Carousel controls -->
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselMap" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
              </button>

              <button class="carousel-control-next" type="button" data-bs-target="#carouselMap" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
              </button>
          </div>
      </div>
  </div>

  <!-- Search Function -->
  <div>
      <div>
          <div class="d-flex justify-content-center">
              <input id="searchbar" class="i" v-model="searchTerm" @input="searchForEvents" type="text" placeholder="Search events..." aria-label="Search">
          </div>
          <br>
          <div class="d-flex justify-content-center">
            <div>
              <button type="button" class="btn btn-secondary btn-pill all " :class="{ active: selectedCategory === 'All' }" @click="selectCategory('All')">All</button>&nbsp;&nbsp;
              <button type="button" class="btn btn-secondary btn-pill academic" :class="{ active: selectedCategory === 'Academic' }" @click="selectCategory('Academic')">Academic</button>&nbsp;&nbsp;
              <button type="button" class="btn btn-secondary btn-pill sports" :class="{ active: selectedCategory === 'Sports' }" @click="selectCategory('Sports')">Sports</button>&nbsp;&nbsp;
              <button type="button" class="btn btn-secondary btn-pill arts" :class="{ active: selectedCategory === 'Arts' }" @click="selectCategory('Arts')">Arts</button>&nbsp;&nbsp;
              <button type="button" class="btn btn-secondary btn-pill networking" :class="{ active: selectedCategory === 'Networking' }" @click="selectCategory('Networking')">Networking</button>&nbsp;&nbsp;
              <button type="button" class="btn btn-secondary btn-pill charity" :class="{ active: selectedCategory === 'Charity' }" @click="selectCategory('Charity')">Charity</button>&nbsp;&nbsp;
              <button type="button" class="btn btn-secondary btn-pill community" :class="{ active: selectedCategory === 'Community' }" @click="selectCategory('Community')">Community</button>&nbsp;&nbsp;
              <button type="button" class="btn btn-secondary btn-pill welfare" :class="{ active: selectedCategory === 'Welfare' }" @click="selectCategory('Welfare')">Welfare</button>
            </div>
          </div>
          <br>
          <div>
              <div>
                  <h1 class="category-title">
                      {{ selectedCategory }} Events Around Campus
                  </h1>
                  <div v-if="searchedEvents.length != 0" class="row d-flex p-5 justify-content-center">
                    <transition-group name="fade" tag="div" class="row">
                        <div class="col-sm-8 col-md-5 col-lg-4 align-items-stretch fade-item" v-for="(event,index) in searchedEvents" :key="event.id" :style="{ animationDelay: (index * 0.5) + 's' }">
                            <div class="card mb-4 fade-item">
                                <div class="card-body d-flex flex-column">
                                  <img class="event-image" :src=getPhotoURL(event) alt="Event Image"/>
                                    <h4 class="card-title" @click="goToEventPage(event.id)" style="cursor: pointer;">{{ event.event_name }}</h4>
                                    
                                    <h6>{{ getDates(event.start_date_time,event.end_date_time) }}</h6>
                                    <h6 class="card-subtitle ">{{ event.location_short}}</h6>
                                    <div class="mt-auto">
                                     <HeartIcon :isLiked="isLiked(event)" :eventId="event.id" :userId="user_id" @toggle-like="toggleLikeStatus"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </transition-group>
                  </div>
                  <div class="p-5" v-else>
                    <h1 style="text-align: center;height: 200px;">There are currently no events matching your search</h1> <!-- to tell that there are no events happening according to search -->
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>
</template>




<script>
  import { getEvents } from '../../utils/supabaseRequests.js';
  import { searchEvents, checkUserLike, addUserLike, removeUserLike} from '../../utils/supabaseRequests.js';
  import { supabase } from '../../utils/supabaseClient.js';
  import { useUserStore } from '@/stores/counter.ts';
  import HeartIcon from '@/components/HeartIcon.vue';

  export default {
    data() {
      return {
        view: "other", //
        events: [], //change this to change events shown on the carousel 
        all_events: [], // keeping track of all events shown
        numEventsGroup: 3,
        selectedEvent: null, // Variable to hold the selected event details
        map:null, // Google Map holder
        debounceTimeout: null,
        markerCluster: null,
        searchTerm: "", //Search term input by user
        searchedEvents: [],
        selectedCategory: "All",
        likedEvents: [],
        user_id: '',
        event_id: ''
      };
    },

  components: {
    HeartIcon
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
  async created() {
      this.fetchEvents();
      this.getUserID();
      this.fetchLikedEvents();
  },


  methods: {
      async goToEventPage(eventId) {
        // Trigger the setEventID function and navigate to the event details page
        const userStore = useUserStore();
        await userStore.setEventID(eventId);
        this.$router.push(`/event/${eventId}`);
      },
      // Like Functionality
      async fetchLikedEvents(){
        try{
          console.log("Checking Profile ID: ", this.user_id)
          this.likedEvents = await checkUserLike(this.user_id);
          console.log("Liked Events: ", this.likedEvents);
        } catch(error){
          console.error("Error fetching liked events:", error);
        }
      },
      isLiked(event){
        return this.likedEvents.includes(event.id);
      },
      async toggleLikeStatus(event){
        console.log('Toggling Like for event:', event);
        const eventId = event;
        const isLiked = this.likedEvents.includes(eventId);

        try{
          console.log("Event ID: ", eventId);
          console.log("Profile ID: ", this.user_id);
          if(isLiked){
            await removeUserLike(eventId, this.user_id);
            this.likedEvents = this.likedEvents.filter(id => id !== eventId);
          }
          else{
            await addUserLike(eventId, this.user_id);
            this.likedEvents = [...this.likedEvents, eventId];
          }
        } catch (error){
          console.error("Error toggling like:", error);
        }
      },
      // View related functions:
      switchView(button_pressed){
          if(this.view === "other" && button_pressed === "mapView"){
              this.view = "map"
              this.initMap()
              console.log("Map View")  
            
          }else if (this.view === "map" && button_pressed === "otherView"){
              this.fetchEvents()
              this.view = "other"
              console.log("Other View")  
          }
      },

      // Card related functions:
      setNumEventsGroup() { //change number of cards displayed due to different breakpoints 
          const width = window.innerWidth;
          if (width >= 992) {
              this.numEventsGroup = 3; // Large 
          } else if (width >= 768) {
              this.numEventsGroup = 2; // Medium 
          } else {
              this.numEventsGroup = 1; // Small 
          } 
      },


      // Event fetching related functions:
      async fetchEvents() { // fetch events from database and sort according to date --> needs to run on initialisation
          try {
              const fetchedEvents = await getEvents();
              this.all_events = fetchedEvents;
              // console.log("All Events:", this.all_events); 
              this.all_events.sort((a, b) => new Date(a.start_date_time) - new Date(b.start_date_time)); // sort events based on start time
              return fetchedEvents;
          } catch (error) {
              console.error("Error fetching events:", error);
          }
      },

      // All Events View related functions:
      async searchForEvents(){ // by search for events in database by search term + selected catagory
          const data = await searchEvents('event_name',this.searchTerm) 
          const category = this.selectedCategory
          let events_criteria = data.filter(event =>  // filter according to events which meet the 
              category === "All" || event.event_type === category
          );

          return this.searchedEvents = events_criteria.sort((a, b) => new Date(a.start_date_time) - new Date(b.start_date_time)); // sort events based on start time
      },

      selectCategory(category){ //update category selected and call search for events
          this.selectedCategory = category
          this.searchForEvents()
      },

      getDates(start, end) {
        const formatTime = (isoString) => {
          const [hour, minute] = isoString.substring(11, 16).split(':').map(Number);
          const period = hour >= 12 ? 'pm' : 'am';
          const hour12 = hour % 12 || 12;
          return `${hour12}:${minute.toString().padStart(2, '0')}${period}`;
        };

        const formatDate = (isoString) => {
          const date = new Date(isoString.substring(0, 10));
          const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          return `${date.getDate()} ${months[date.getMonth()]} ${String(date.getFullYear()).substring(2)} (${days[date.getDay()]})`;
        };

        const start_time_formatted = formatTime(start);
        const end_time_formatted = formatTime(end);
        const time = `${start_time_formatted} - ${end_time_formatted}`;

        const displayed_start_date = formatDate(start);
        const displayed_end_date = formatDate(end);

        if (displayed_start_date === displayed_end_date) {
          return `${displayed_start_date} ${time}`;
        }
        
        return `${displayed_start_date} - ${displayed_end_date} ${time}`;
      },
          
      getPhotoURL(event){
          // console.log(event)
          const { data, error } = supabase.storage.from('eventPhotos').getPublicUrl(event.thumbnail);
          if (error) {
              console.error('Error fetching public URL for', event.photos, error);
          } else {
          return data.publicUrl;
          }

      },



      // Map View related functions:
      async  initMap() { // map initialisation data, including getting centerpoint, marker placement and debouncing 
          const position = { lat: 1.2963, lng: 103.8502 };
          const { Map } = await google.maps.importLibrary("maps");
          // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

          this.map = new Map(document.getElementById("map"), { // create map
          zoom: 18,
          minZoom: 14,
          maxZoom: 19,
          center: position,
          mapId: '731858d4ebe716cc',
          disableDefaultUI: true,
          });

          // Adding markers based on event location USE ALL EVENTS TO POPULATE ALL THE MARKERS SHOWN 
          await this.fetchEvents();
          this.showEventsOnCaurosel();
          await this.createMarkers();


          google.maps.event.addListener(this.map, 'bounds_changed', this.debounce(this.showEventsOnCaurosel,600));
          google.maps.event.addListener(this.map, 'zoom_changed', this.debounce(this.showEventsOnCaurosel,600));
          
      },

      showEventsOnCaurosel(){ // display all the events in the caurosel
          const dimensions = this.map.getBounds() //fi : lo left hi right, Jh: lo bottom hi top
          const all_events = this.all_events // sorted events
          let event_visible = []
          let array_keys = []

          array_keys = Object.keys(dimensions)
          // console.log(array_keys)
          let lat = array_keys[0]
          let lng = array_keys[1]

          event_visible = []
          all_events.forEach(event => {
              if(this.isBetween(event.place_lat,dimensions[lat].lo,dimensions[lat].hi) && this.isBetween(event.place_lng,dimensions[lng].lo,dimensions[lng].hi)){
                  event_visible.push(event)
              }
          });

          if(event_visible.length == 0){
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
              event_visible.push(dummy_event)
          }
          this.events = event_visible
      },
      debounce(func, delay) { //for reducing the API calls made
      return function (...args) {
          clearTimeout(this.debounceTimeout);
          this.debounceTimeout = setTimeout(() => {
              func.apply(this, args);
          }, delay);
          };
      },

      async createMarkers(){ // add all markers to map
          const markers = [];
          this.all_events.forEach(event => {
              console.log(event)
              const marker = new google.maps.Marker({
                  map: this.map,
                  position: { lat: event.place_lat, lng: event.place_lng },
              });
              markers.push(marker)
          });
          console.log(markers)
      },


      isBetween(value, min, max){
          return value >= min && value <= max
      },

      getUserID(){
        const userStore = useUserStore();
        this.user_id = userStore.getAuthToken()
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
  this.searchForEvents(); //initial population

  },
};
</script>



<style scoped>
.card {
  background-color: transparent;
  color: whitesmoke;
  border: none;
  
}
.card-title {
  text-align: center;
  margin-bottom: 20px; 
}
.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-body h6 {
  margin-bottom: 15px; /* Adjust as needed */
}
.card-body .heart-icon {
  margin-top: auto;
}
.event-image {
  width: 200px;
  height: 278px;
  display: block; /* Ensures the image doesn't have extra spaces */
  margin: 0 auto; /* Centers the image horizontally */
  margin-bottom: 20px; /* Adds space below the image */
  
}

.viewbutton{
  color: white;
  border: solid 1px rgb(120, 117, 117);
  margin: 30px;
  width: 200px;
  transition: background-color 0.3s ease;
}
.viewbutton:hover{
  background-color: #68686a;
  border-color: #68686a;
}

/* Styling for the input */
.i {
  width: 100%;
  max-width: 600px; /* Adjust width as needed */
  height: 40px; /* Adjust height as needed */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px; /* Make corners rounded */
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none; /* Remove default browser styles */
  -moz-appearance: none;
  outline: none; /* Remove default outline */
}

.maincon{
  padding-top: 50px;
  background-color: rgb(24, 24, 24); 
  color: white;
}
/* .carousel-control-prev,
.carousel-control-next {
  width: 80px;
} */

#eventMapTitle {
  margin-top: 60px;
  text-align: center;
  color: rgb(14, 14, 14);
}

#map {
  height: 550px;
  width: 90%
}

#mapDimensions{
  display:flex;
  justify-content: center;
}

.modal-title,
.modal-body {
  color: black;
}

/* .card-body {
  height: 200px; 
} */

#otherView{
  height: 400px
}

.btn-pill{
  border-radius: 50px;
  border: none;
  
}
.btn-pill:hover{
  transform:scale(1.1);
}

.category-title{
  text-align: center;
}

.input-size{
  width: 80%;
}

/* CATEGORY BUTTON STYLING */
.all {
  background-color: #7B8794;
  border: none;
}

.academic {
  background-color: #4A90E2;
  border:none;
}

.sports {
  background-color: #50C878;
}

.arts {
  background-color: #9B59B6;
}

.networking {
  background-color: #F5A623;
}

.charity {
  background-color: #E74C3C;
}

.community {
  background-color: #F1C40F;
}

.welfare {
  background-color: #1ABC9C;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-item {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


</style>
