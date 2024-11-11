<template>
  <div class="background-wrapper d-flex justify-content-center align-items-center">
    <div class="calendar-card p-4 shadow ">
      <div class="calendar-header">
        <h2 class="text-center ">Your Liked Events</h2>
        <p class="text-center ">Check Out Your Liked Events Here!</p>
      </div>
      <div class="calendar-content your-scrollable-element">
        <div v-if="events.length">
          <ul class="list-unstyled">
            <li v-for="event in events" :key="event.id" class="event-card mx-2 mb-3 p-3 text-dark">
                <div class="d-flex justify-content-between align-items-center">
                  <router-link :to="{name: 'event', params: {id: event.id, name:event.event_name} }" class="event-link">
                    <strong class="card-title">{{ event.event_name }} &nbsp;<i class="bx bx-link-external"></i></strong>
                  </router-link>
                  <button class="heart-btn" @click="toggleLike(event.id)" :aria-label="isLiked(event.id) ? 'Unlike' : 'Like'">
                    <svg class="heart-icon" :class="{ filled: isLiked(event.id) }" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                </div>
                <p>{{ event.location_short }}</p>
                <router-link :to="{name: 'event', params: {id: event.id, name:event.event_name} }" class="event-link">
                <p style="font-size: 12px;">
                  {{ getDates(event.start_date_time, event.end_date_time) }}<br>
                  {{ getTime(event.start_date_time, event.end_date_time) }}
                </p>
                </router-link>
            </li>
          </ul>
        </div>
        <div v-else>
          <p class="text-center text-light">No Liked Events found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/counter';
import { checkUserLike, getEventByEventId, addUserLike, removeUserLike } from '../../utils/supabaseRequests';
import router from '@/router';

export default {
  data() {
    return {
      events: [],
      userId: '',
      likedEventIds: [],
    };
  },
  methods: {
    getUserID() {
      const userStore = useUserStore();
      this.userId = userStore.getAuthToken();
      console.log(this.userId)
      if (this.userId == null){ //immediately redirect
        router.push("/signin")
      } 
    },
    async getUserLiked() {
      this.likedEventIds = await checkUserLike(this.userId);
      const allLikedEvents = [];
      for (let eventId of this.likedEventIds) {
        let event = await getEventByEventId(eventId);
        allLikedEvents.push(event);
      }
      this.events = allLikedEvents;
    },
    isLiked(eventId) {
      return this.likedEventIds.includes(eventId);
    },
    async toggleLike(eventId) {
      const liked = this.isLiked(eventId);
      try {
        if (liked) {
          await removeUserLike(eventId, this.userId);
          this.likedEventIds = this.likedEventIds.filter(id => id !== eventId);
        } else {
          await addUserLike(eventId, this.userId);
          this.likedEventIds.push(eventId);
        }
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    },
    getDates(start, end) {
      const formatDate = (isoString) => {
        const date = new Date(isoString.substring(0, 10));
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${date.getDate()} ${months[date.getMonth()]} ${String(date.getFullYear()).substring(2)} (${days[date.getDay()]})`;
      };
      const displayedStartDate = formatDate(start);
      const displayedEndDate = formatDate(end);
      return displayedStartDate === displayedEndDate ? displayedStartDate : `${displayedStartDate} - ${displayedEndDate}`;
    },
    getTime(start, end) {
      const formatTime = (isoString) => {
        const [hour, minute] = isoString.substring(11, 16).split(':').map(Number);
        const period = hour >= 12 ? 'pm' : 'am';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minute.toString().padStart(2, '0')}${period}`;
      };
      const startTimeFormatted = formatTime(start);
      const endTimeFormatted = formatTime(end);
      return `${startTimeFormatted} - ${endTimeFormatted}`;
    },
  },
  async mounted() {
    this.getUserID();
    await this.getUserLiked();
  },
};
</script>

<style scoped>
.your-scrollable-element {
  overflow: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.your-scrollable-element::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
.event-link {
  color: inherit; 
  text-decoration: none; 
  display: block; 
}
.event-card {
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #ffffff;
}

.event-link:hover{
  background-color:transparent;
}

.background-wrapper {
  background-image: url('@/assets/images/bg-7.jpg');
  background-size: cover;
  background-position: center;
  height: 110vh;
  width: 100vw;
  overflow: hidden;
}

.calendar-card {
  max-height: 80vh;
  width: 40vw;
  border-radius: 10px;
  background-color: #333435;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
}

.calendar-header {
  position: sticky;
  top: 0;
  background-color: #333435;
  z-index: 10;
  /* padding-bottom: 8px; */
  color: white;
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

.heart-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.heart-icon {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: #666;
  stroke-width: 2;
  transition: all 0.2s;
}

.heart-icon.filled {
  fill: #ff3040;
  stroke: #ff3040;
}

.card-title {
  border-bottom: 1px solid black; 
}
</style>
