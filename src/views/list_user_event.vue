<template>
    <div class="background-wrapper">
      <div class="calendar-card p-4 shadow">
        <div class="calendar-header">
          <h2 class="text-center text-dark">Your Created Events</h2>
          <p class="text-center text-dark">Manage the events you've created!</p>
        </div>
        <div class="calendar-content">
          <div v-if="userEvents.length">
            <ul class="list-unstyled">
              <li v-for="event in userEvents" :key="event.id" class="event-card mx-2 mb-2 p-3 text-dark">
                <div class="d-flex justify-content-between align-items-center">
                  <router-link 
                    :to="{ name: 'event', params: { id: event.id, name: event.event_name } }" 
                    class="event-link">
                    <h6 class="card-title"><u><strong>{{ event.event_name }}</strong></u></h6>
                  </router-link>
                  <div class="d-flex align-items-center">
                    <div>
                      <span class="like-count me-3">{{ event.likeCount }} Likes</span>
                    </div>
                    <div>
                      <button @click="editEvent(event.id)" class="btn btn-primary me-2">Edit</button>
                    </div>
                    <div>
                      <button class="btn btn-danger">Delete</button>
                    </div>
                  </div>
                </div>
                <p>{{ event.location_short }}</p>
                <p style="font-size: 12px;">
                  {{ getDates(event.start_date_time, event.end_date_time) }}<br>
                  {{ getTime(event.start_date_time, event.end_date_time) }}
                </p>
              </li>
            </ul>
          </div>
          <div v-else>
            <p class="text-center text-dark">No events found.</p>
          </div>
        </div>
      </div>
    </div>
  </template>



<script>
    import router from '@/router';
    import { getEventsByUserId, getLikedUsersByEventId } from '../../utils/supabaseRequests';
    import { useUserStore } from '@/stores/counter';

    const userStore = useUserStore()

    if (userStore.getAuthToken() == null){ //immediately redirect
      router.push("/signin")
    }

    export default {
        data(){
            return {
                userId: userStore.getAuthToken(),
                userEvents : []
            }
        },
        methods: {
            async getUserEvents() {
                let id = this.userId
                this.userEvents = await getEventsByUserId(id)
                // Fetch the number of likes for each event
                for (const event of this.userEvents) {
                    event.likeCount = await this.getNumberOfLikes(event.id);
                }
            },
            editEvent(event_id){
                console.log(event_id)
                userStore.setEventID(event_id)
                router.push("edit_event")
            },
            async getNumberOfLikes(id){
                let data = await getLikedUsersByEventId(id)
                return data.length
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
        mounted() {
            this.getUserEvents()
            console.log(this.userEvents)
        }
    }


</script>



<style>
.background-wrapper {
  background-image: url('@/assets/images/bg-9.jpg');
  background-size: cover;
  background-position: center;
  min-height: 90vh;
  height: 110vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.calendar-card {
  width: 45vw;
  background-color: #f8f9fa;
  border-radius: 15px;
}

.calendar-header {
  margin-bottom: 20px;
}

.calendar-content {
  max-height: 50vh;
  overflow-y: auto;
}

.event-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.event-link {
  text-decoration: none;
  color: inherit;
}

.like-count {
  font-size: 14px;
  color: #666;
}
</style>