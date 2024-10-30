<template>
  <div class="background-wrapper d-flex justify-content-center align-items-center">
    <div class="calendar-card p-4 shadow" style="width: 50%;">
      <h2 class="text-center">Your CampusEase Events</h2>
      <div v-if="events.length">
        <ul class="list-unstyled">
          <li v-for="event in events" :key="event.id" class="event-card mb-3 p-3">
            <strong class="card-title">{{ event.summary }}</strong><br>
            Date: {{ formatDate(event.start.dateTime || event.start.date) }}<br>
            Day: {{ formatDay(event.start.dateTime || event.start.date) }}<br>
            Start Time: {{ formatTime(event.start.dateTime) }}<br>
            End Time: {{ formatTime(event.end.dateTime) }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="text-center">No upcoming events found.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarPage',
  data() {
    return {
      events: []
    };
  },
  mounted() {
    const eventsQuery = this.$route.query.events;
    if (eventsQuery) {
      this.events = JSON.parse(eventsQuery);
    }
  },
  methods: {
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
  }
};
</script>

<style scoped>
.background-wrapper {
  background-image: url('@/assets/images/bg-3.jpg'); 
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
}

.calendar-card {
  border-radius: 10px;
  background-color: #f8f9fa;
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
