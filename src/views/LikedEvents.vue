<template>
  <div class="background-wrapper d-flex justify-content-center align-items-center">
    <div class="calendar-card p-4 shadow">
      <div class="calendar-header">
        <h2 class="text-center text-dark">Your Liked Events</h2>
      </div>
      <div class="calendar-content">
        <div v-if="events.length">
          <ul class="list-unstyled">
            <li v-for="event in events" :key="event.id" class="event-card mb-3 p-3 text-dark">
              <strong class="card-title">{{ event.event_name }}</strong><br>
              {{ event.location_short}} 
              <p style="font-size: 12px;"> {{getDates(event.start_date_time,event.end_date_time)}}<br>
                {{getTime(event.start_date_time,event.end_date_time)}}</p>

            </li>
          </ul>
        </div>
        <div v-else>
          <p class="text-center">No upcoming events found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/counter';
import { checkUserLike,getEventByEventId } from '../../utils/supabaseRequests';


export default {
  name: 'CalendarPage',
  data() {
    return {
      events: [],
      userid: '' 
    };
  },
  mounted() {
    const eventsQuery = this.$route.query.events;
    if (eventsQuery) {
      this.events = JSON.parse(eventsQuery);
    }
  },
  methods: {
    getUserID(){
      const userStore = useUserStore()
      this.userid = userStore.getAuthToken();
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
    },
    async getUserLiked(){
      let eventIDs = await checkUserLike(this.userid)
      let allLikedEvents = []
      for (let eventID of eventIDs) {
        let event = await getEventByEventId(eventID);  // Use await here
        console.log(event)
        allLikedEvents.push(event)
      }
      
      this.events = allLikedEvents
    },
    getDates(start, end) {
      const formatDate = (isoString) => {
        const date = new Date(isoString.substring(0, 10));
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${date.getDate()} ${months[date.getMonth()]} ${String(date.getFullYear()).substring(2)} (${days[date.getDay()]})`;
      };

      const displayed_start_date = formatDate(start);
      const displayed_end_date = formatDate(end);

      if (displayed_start_date === displayed_end_date) {
        return `${displayed_start_date}`;
      }

      return `${displayed_start_date} - ${displayed_end_date}`;
    },
    getTime(start, end) {
      const formatTime = (isoString) => {
        const [hour, minute] = isoString.substring(11, 16).split(':').map(Number);
        const period = hour >= 12 ? 'pm' : 'am';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minute.toString().padStart(2, '0')}${period}`;
      };

      const start_time_formatted = formatTime(start);
      const end_time_formatted = formatTime(end);

      return `${start_time_formatted} - ${end_time_formatted}`;
    },
  },
  async mounted(){
    this.getUserID()
    await this.getUserLiked()
    console.log(this.events)
  }
  
};
</script>

<style scoped>
.background-wrapper {
  background-image: url('@/assets/images/bg-7.png'); 
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden; 
}

.calendar-card {
  max-height: 80vh; 
  width: 40vw;
  border-radius: 10px;
  background-color: #f8f9fa;
  overflow: hidden; 
  display: flex;
  flex-direction: column;
}

.calendar-header {
  position: sticky;
  top: 0;
  background-color: #f8f9fa;
  z-index: 10; 
  padding-bottom: 8px;
}

.calendar-content {
  flex: 1;
  overflow-y: auto; 
}

.event-card {
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #ffffff;
}

.card-title {
  font-weight: bold;
  color: black;
}
</style>
