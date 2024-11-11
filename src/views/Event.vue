<template>
  <div class="main container-fluid">
    <div class="row">
      <!-- Photos Section -->
      <div class="col-md-6 photos d-flex justify-content-center">
        <div>
          <img :src=thumbnail :alt=eventTitle  id="thumbnail" class="img-fluid" />

          <div class="gallery d-flex flex-wrap mt-3">
            <img
              v-for="(photo, index) in galleryPhotos"
              :key="index"
              :src="photo.src"
              :alt="photo.alt"
              class="small-photo"
              @click="openLightbox(photo.src)"
            />
          </div>
        </div>
      </div>

      <!-- Event Details Section -->
      <div class="col-md-6 details">
        <div>
          <h2 id="eventTitle" class="d-inline-block mr-3">
            {{ eventTitle }}
            <span v-if="this.user_id != null">
              <HeartIcon :isLiked="isLiked" :eventId="Number(eventID)" :userId="user_id" @toggle-like="toggleLikeStatus"/>
            </span>
          </h2>
          <hr>
          
          <br>
          <p style="white-space: pre-line">{{ description }}</p>

          <div class="row">
            <div class="col-6">
              <h3>Location</h3>
            <p>{{ location }}</p>
            </div>
            <div class="col-6">
              <h3>Venue</h3>
              <p>{{ venue }}</p>
            </div>

          </div>


          <h3>Time</h3>
          <p>{{ time }}</p>

        <h5>
          <u style="color: green;"><a class= "btn btn-outline-success d-inline-flex align-items-center" v-if='signUpLink != ""' :href="signUpLink" target="_blank">Sign Up here!&nbsp;<i class="bx bx-link-external"></i></a></u> &nbsp;
          <u><a class="btn btn-outline-light d-inline-flex align-items-center" src="" @click="handleEventsCalendar">Add to Calendar&nbsp;<i class="bx bx-calendar"></i></a></u>
        </h5>
  
      </div>
    </div>

      <!-- Lightbox -->
      <div v-if="lightboxVisible" id="lightbox" class="lightbox align-items-center justify-content-center" @click.self="closeLightbox">
        <span class="close" @click="closeLightbox">&times;</span>
        <img class="lightbox-content" :src="lightboxImage" />
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/base.css'
import { useUserStore } from '@/stores/counter';
import { getEventByEventId, checkUserLike, addUserLike, removeUserLike } from '../../utils/supabaseRequests';
import { supabase } from '../../utils/supabaseClient';
import HeartIcon from '@/components/HeartIcon.vue';
import { gapi } from 'gapi-script';

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      eventTitle: "",
      isLiked: false,
      location: "",
      venue: "",
      description: "",
      signUpLink: "",
      thumbnail: '',
      galleryPhotos: [],
      lightboxVisible: false,
      lightboxImage: "",
      time: "",
      start_date_time: "",
      end_date_time: "",
      user_id: "",
      likedEvents: [],
      eventID: "",
      //For Google Calendar
      campusEaseCalendarId: null,
      userEmail: null,
      user: null,
      profileData: null
      
    };
  },
  created(){
    this.getUserID();
  },
  mounted(){
    this.getEvent()
    console.log(this.id)
  },
  components: {
    HeartIcon
  },
  methods: {
    getUserID(){
        const userStore = useUserStore();
        this.user_id = userStore.getAuthToken()
        console.log(this.user_id)
    },
    async getEvent(){
      console.log("getting events")
      const userStore = useUserStore()
      console.log(userStore.getEventID(), this.id)
      this.eventID = userStore.getEventID() || this.id;
      console.log(this.eventID)
      let event = await getEventByEventId(this.eventID)
      console.log("Event Data: ", event)
      this.eventTitle = event.event_name
      this.location = event.location
      this.venue = event.venue
      this.description = event.description
      this.thumbnail = this.getPhotoURL(event)
      this.start_date_time = event.start_date_time
      this.end_date_time = event.end_date_time
      this.time = this.getDates(event.start_date_time, event.end_date_time)
      this.signUpLink = event.external_url
      this.galleryPhotos = this.getGalleryPhotos(event)
      await this.fetchLikedEvents(); 
    },
    async fetchLikedEvents(){
      try {
        this.likedEvents = await checkUserLike(this.user_id);
        console.log("Liked Events: ", this.likedEvents);
        this.isLiked = this.likedEvents.includes(Number(this.eventID));
        console.log(this.isLiked);
      } catch(error) {
        console.error("Error fetching liked events:", error);
      }
    },
    async toggleLikeStatus(){
      const isLiked = this.isLiked;
      try {
        if (isLiked) {
          await removeUserLike(this.eventID, this.user_id);
        } else {
          await addUserLike(this.eventID, this.user_id);
        }
        this.isLiked = !isLiked; 
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    },
    openLightbox(src) {
      this.lightboxImage = src;
      this.lightboxVisible = true;
    },
    closeLightbox() {
      this.lightboxVisible = false;
      this.lightboxImage = "";
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
    getPhotoURL(event) {
      const { data, error } = supabase.storage.from('eventPhotos').getPublicUrl(event.thumbnail);
      if (error) {
        console.error('Error fetching public URL for', event.photos, error);
      } else {
        return data.publicUrl;
      }
    },
    getGalleryPhotos(event){
      let gallery = []
      event.photos.forEach(photo => {
        if (photo != null){
          const {data} = supabase.storage.from('eventPhotos').getPublicUrl(photo);
          gallery.push({src: data.publicUrl, alt: photo})
        }
      });
      return gallery
    },
    // Functions for "Add to Calendar"
    initClient() {
      return gapi.client.init({
        apiKey: "AIzaSyAdMutgjV2OcfJgxr8ywiyj3Z1smkAiMRM",
        clientId: "689557435886-91ofkj6r70cg7k3dsphhe54cn3s51ftj.apps.googleusercontent.com",
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar"
      });
    },
    async handleEventsCalendar() {
      gapi.load('client:auth2', async () => {
        await this.initClient();
        const authInstance = gapi.auth2.getAuthInstance();
        await authInstance.signIn();

        this.userEmail = authInstance.currentUser.get().getBasicProfile().getEmail();

        const calendarExists = await this.checkCampusEaseCalendar();
        if (!calendarExists) {
          await this.createCampusEaseCalendar();
        }

        await this.insertOrUpdateEvents();
        window.open(`https://calendar.google.com/calendar/u/0/r?cid=${this.userEmail}`, "_blank");
      });
    },
    async checkCampusEaseCalendar() {
      try {
        const response = await gapi.client.calendar.calendarList.list();
        const calendars = response.result.items;
        const campusEaseCalendar = calendars.find(calendar => calendar.summary === 'CampusEase Events');
        if (campusEaseCalendar) {
          this.campusEaseCalendarId = campusEaseCalendar.id;
          return true;
        }
      } catch (error) {
        console.error("Error checking CampusEase Calendar:", error);
      }
      return false;
    },
    async createCampusEaseCalendar() {
      try {
        const response = await gapi.client.calendar.calendars.insert({
          resource: {
            summary: 'CampusEase Events',
            timeZone: 'Asia/Singapore'
          }
        });
        this.campusEaseCalendarId = response.result.id;
      } catch (error) {
        console.error("Error creating CampusEase Calendar:", error);
      }
    },
    async insertOrUpdateEvents() {
      const currEvent = {
        summary: this.eventTitle,
        description:  this.description,
        location: this.location,
        start: { dateTime: this.start_date_time, timeZone: 'Asia/Singapore' },
        end: { dateTime: this.end_date_time, timeZone: 'Asia/Singapore' }
      }

    const existingEvent = await this.findEventByTitle(currEvent.summary);
      if (existingEvent) {
        await gapi.client.calendar.events.delete({
          calendarId: this.campusEaseCalendarId,
          eventId: existingEvent.id
        });
      }
      await gapi.client.calendar.events.insert({
        calendarId: this.campusEaseCalendarId,
        resource: currEvent
      });
    },
    async findEventByTitle(title) {
      try {
        const response = await gapi.client.calendar.events.list({
          calendarId: this.campusEaseCalendarId,
          q: title,
          timeMin: new Date().toISOString(),
          singleEvents: true
        });
        return response.result.items.find(event => event.summary === title) || null;
      } 
      catch (error) {
        console.error("Error finding event by title:", error);
      }
      return null;
    },
    formatDate(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleDateString();
    },
    formatDay(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    },
    formatTime(dateTime) {
      if (!dateTime) return 'N/A';
      const time = new Date(dateTime);
      return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  },
}
</script>


<style scoped>
body {
  background-color: #29292a;
  font-family: 'Nunito Sans';
}
h2{
  /* margin-bottom: 30px; */
  color: white;
}
.photos > img#thumbnail {
  width: 400px;
  height: auto;
  margin-top: 70px;
}
.gallery {
  display: flex;
  margin-top: 10px;
}
.small-photo {
  width: 80px;
  height: auto;
  margin-right: 10px;
  margin-bottom: 10px;
  object-fit: cover;
  border: 2px solid #ddd;
  cursor: pointer;
  transition: transform 0.2s;
}
.heart-btn {
  background: none;
  border: none;
  cursor: pointer;
  /* padding: 8px; */
  position: relative;
  bottom: 2px;
}
.heart-icon {
  width: 30px;
  height: 30px;
  fill: none;
  stroke: #666;
  stroke-width: 2;
  transition: all 0.2s;
  /* margin-left: 10px; */
}
.heart-icon.filled {
  fill: #ff3040;
  stroke: #ff3040;
}
.lightbox {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  justify-content: center;
  align-items: center;
}
.lightbox img {
  max-width: 80%;
  max-height: 80%;
  border: 3px solid white;
  border-radius: 10px;
}
.close {
  position: absolute;
  top: 20px;
  right: 35px;
  color: white;
  font-size: 40px;
  cursor: pointer;
}
.details > *,
.photos > img,
.galler > img {
  opacity: 0;
  animation: fadeIn 0.6s forwards;
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
.main{
  background-color: #29292a;
  padding: 100px 50px;
  color: #ddd;
  min-height: 100vh;
  
}
/* Apply animation delays dynamically for each child element */
.details > *:nth-child(1) {
    animation-delay: 0.2s;
}
.details > *:nth-child(2) {
    animation-delay: 0.4s;
}
.details > *:nth-child(3) {
    animation-delay: 0.6s;
}
.details > *:nth-child(4) {
    animation-delay: 0.8s;
}
.details > *:nth-child(5) {
    animation-delay: 1s;
}
.details > *:nth-child(6) {
    animation-delay: 1.2s;
}
.details > *:nth-child(7) {
    animation-delay: 1.4s;
}
.details > *:nth-child(8) {
    animation-delay: 1.6s;
}
.details > *:nth-child(9) {
    animation-delay: 1.8s;
}
.details > *:nth-child(10) {
    animation-delay: 2s;
}
.details > *:nth-child(11) {
    animation-delay: 2.2s;
}
.details > *:nth-child(12) {
    animation-delay: 2.2s;
}
/* Sequential delay for the thumbnail and gallery images */
.photos > img#thumbnail {
    animation-delay: 0.2s; /* Thumbnail fades in first */
}

.gallery > img:nth-child(1) {
    animation-delay: 0.5s; /* First small photo */
}

.gallery > img:nth-child(2) {
    animation-delay: 0.6s; /* Second small photo */
}

.gallery > img:nth-child(3) {
    animation-delay: 0.8s; /* Third small photo */
}
p{
  margin-bottom: 25px;
        }
</style>