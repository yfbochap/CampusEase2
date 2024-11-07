<template>
<!-- get events which users have signed up for and set up buttons to edit and delete (should take 2 hours) -->

<div id="body" class="d-flex flex-column justify-content-center align-items-center">
    <div id="eventView">
        <h1 style="text-align: center; color: black;padding-top: 10px;">Edit Your Events Here</h1>
        <hr>
        <div id="editEvents">
            <div v-for="event in userEvents" class="row">
                <h5 class="col-12">{{ event.event_name }}</h5>
                <button @click="editEvent(event.id)" class="btn btn-primary col-2">Edit</button>
                <button class="btn btn-danger col-2">Delete</button>
            </div>
        </div>
    </div>
</div>

</template>



<script>
    import router from '@/router';
    import { getEventsByUserId } from '../../utils/supabaseRequests';
    import { useUserStore } from '@/stores/counter';

    const userStore = useUserStore()

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
            },
            editEvent(event_id){
                console.log(event_id)
                userStore.setEventID(event_id)
                router.push("edit_event")
            },
        },
        mounted() {
            this.getUserEvents()
            console.log(this.userEvents)
        }
    }


</script>



<style>
#body{
    height: 90vh;
}

#eventView{
    display: flex;
    flex-direction: column;
    width: 40vw; 
    height: 70%;
    margin-top: 0; 
    background-color: rgba(255, 255, 255, 0.8); 
    border-radius: 15px;
}

#editEvents{
    flex-grow: 1; 
    overflow: auto;
    color: black;
    padding:10px
}

</style>