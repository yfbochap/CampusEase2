<template>
      <div v-if="alertVisible_errors" class="fixed-alert alert alert-danger d-flex justify-content-between align-items-center slide-down-enter-active slide-up-exit-active" role="alert">
        <h5 class="m-0"> {{ errorText }} </h5>
        <button v-if="deleteButton" class="btn btn-outline-danger margin" @click="confirmDelete()">Delete</button>
        <button type="button" class="close close-icon alertclose" @click="closeAlert_errors()" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="background-wrapper d-flex justify-content-center align-items-center">
      <div class="calendar-card p-4 shadow">
        <div class="calendar-header">
          <h2 class="text-center">Your Created Events</h2>
          <p class="text-center ">Manage the events you've created!</p>
        </div>
        <div class="calendar-content your-scrollable-element">
        <div class="calendar-content your-scrollable-element">
          <div v-if="userEvents.length">
            <ul class="list-unstyled">
                <li 
                    v-for="event in userEvents" 
                    :key="event.id" 
                    class="event-card mb-3 p-3 text-dark border rounded bg-light"
                    >
                    <!-- Card header with event title and link -->
                    <div class="d-flex">

                        <div class="col d-flex flex-column  align-items-start maindeets">
                        <router-link 
                        :to="{ name: 'event', params: { id: event.id, name: event.event_name } }" 
                        class="event-link mb-2 mb-sm-0"
                        >
                        <h5 class="card-title">{{ event.event_name }} &nbsp;<i class="bx bx-link-external"></i></h5>
                        </router-link>
                        
                        <span class="like-count mb-2 mb-sm-0 me-sm-3">{{ event.likeCount }} Likes</span>

                        <div class="row">
                        <p class="mb-2">{{ event.location_short }}</p>
                        <p style="font-size: 12px;">
                            {{ getDates(event.start_date_time, event.end_date_time) }}<br>
                            {{ getTime(event.start_date_time, event.end_date_time) }}
                        </p>
                        </div>

                        
                        <!-- </div> -->
                    </div>
                    <div class="button-container d-flex align-items-start ms-auto">
                        <button 
                            @click="editEvent(event.id)" 
                            class="btn"
                        >
                            <i class="bx bx-edit btnns"></i>
                        </button>
                        <button class="btn" @click="deleteEvent(event.id)">
                            <i class="bx bx-trash btnns"></i>
                        </button>
                        </div>
                </div>
                    
                    </li>

            </ul>
          </div>
          <div v-else>
            <p class="text-center text-light">No events found.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </template>



<script>
    import router from '@/router';
    import { getEventsByUserId, getLikedUsersByEventId, deleteEventByEventID } from '../../utils/supabaseRequests';
    import { useUserStore } from '@/stores/counter';

    const userStore = useUserStore()

    if (userStore.getAuthToken() == null){ //immediately redirect
      router.push("/signin")
    }

    export default {
        data(){
            return {
                userId: userStore.getAuthToken(),
                userEvents: [],
                alertVisible_errors: false,
                delete_event_id: "",
                errorText: "",
                deleteButton: true,
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
            deleteEvent(id){
              console.log(id)
              this.delete_event_id = id
              this.deleteButton = true
              this.errorText = "Delete Event?"
              this.openAlert_errors()
            },
            openAlert_errors(){
              console.log("sent")
              this.alertVisible_errors = true;
            },
            closeAlert_errors(){
              this.alertVisible_errors = false;
            },
            async confirmDelete(){
              this.closeAlert_errors()
              let id = this.delete_event_id
              console.log(id)
              await deleteEventByEventID(id)
              this.deleteButton = false
              this.errorText = "Event Deleted"
              this.openAlert_errors()
              await this.getUserEvents()
            },
        },
        mounted() {
            this.getUserEvents()
            console.log(this.userEvents)
        }
    }


</script>



<style>
/* For Chrome, Edge, Safari */
.your-scrollable-element {
  overflow: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.your-scrollable-element::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
.bx-trash{
    color: red;
    
}

.btnns{
    font-size: 28px;
}

i{
    color: black;
    font-size: 25px;
   
}
/* For extra-small screens (below 576px) */
@media (max-width: 575.98px) {
  .button-container {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: auto; /* Push buttons to the bottom */
    width: 100%;
  }
}


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
  background-color: #333435;
  border-radius: 15px;
  
}

.calendar-header {
  margin-bottom: 20px;
  color: white;
}

.calendar-content {
  max-height: 50vh;
  overflow-y: auto;
  background-color: #333435;
}

.event-card {
  background-color: rgb(99, 29, 29);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 4px;
}

.event-link {
  text-decoration: none;
  color: inherit;
}

.like-count {
  font-size: 14px;
  color: #666;
}

.fixed-alert {
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1050;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.close-icon {
  font-size: 30px; 
  color: darkolivegreen; 
  background: transparent; 
  border: none; 
  cursor: pointer; 
}


.fixed-alert.slide-down-enter-active {
  animation: slideDown 0.5s ease forwards;
}
.slide-up-exit-active {
  transform: translate(-50%, -100%);
  opacity: 0;
}
@keyframes slideDown {
  0% {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, 100px);
    opacity: 1;
  }
}
.invalid-input {
  border-color: red;
}
.alertclose {
  margin-left: 10px; /* Adjust this value as needed */
}

.margin{
  margin-left:20px;
}
.card-title {
  border-bottom: 1px solid black; 
}
</style>