<template>
    <div class="background-wrapper d-flex justify-content-center align-items-center">
      <div class="calendar-card p-4 shadow">
        <div class="calendar-header">
          <h2 class="text-center text-dark">Your Created Events</h2>
          <p class="text-center text-dark">Manage the events you've created!</p>
        </div>
        <div class="calendar-content">
          <div v-if="userEvents.length">
            <ul class="list-unstyled">
              <li v-for="event in userEvents" :key="event.id" class="event-card mb-3 p-3 text-dark">
                <div class="d-flex justify-content-between align-items-center">
                  <router-link 
                    :to="{ name: 'event', params: { id: event.id, name: event.event_name } }" 
                    class="event-link"
                  >
                    <strong class="card-title">{{ event.event_name }}</strong>
                  </router-link>
                  <div class="d-flex align-items-center">
                    <span class="like-count me-3">{{ event.likeCount }} Likes</span>
                    <button @click="editEvent(event.id)" class="btn btn-primary me-2">Edit</button>
                    <button class="btn btn-danger">Delete</button>
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
            }
        },
        mounted() {
            this.getUserEvents()
            console.log(this.userEvents)
        }
    }


</script>



<style>
.background-wrapper {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.calendar-card {
  width: 60vw;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
}

.calendar-header {
  margin-bottom: 20px;
}

.calendar-content {
  max-height: 60vh;
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