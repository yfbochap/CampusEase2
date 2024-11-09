import { ref, computed } from 'vue'

import { defineStore } from 'pinia';

export const useUserStore = defineStore('event', () => {
  const userid = ref(null);
  const event = ref(null);

  // Storing event details
  function setEventID(id){
    event.value = id
    console.log("Event ID Set", event.value)
  }

  function getEventID(){
    console.log("Event ID got", event.value)
    return event.value;
  }


  // Storing user data
  function setAuthToken(userToken) {
    userid.value = userToken;
    console.log(userid.value, " set");
  }

  function getAuthToken() {
    console.log(userid.value, " got");
    return userid.value;
  }

  return { event, setEventID, getEventID, userid, setAuthToken, getAuthToken };
}, {
  persist: {
    storage: sessionStorage,
    pick: ['userid']
  }
});
