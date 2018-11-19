<template>
   <div>
        <div v-if="!username">
            You can't chat without a name. What's your name? <br />
            <input type="text" placeholder="Name"
                v-on:keyup.enter="updateUsername">
        </div>
        <div v-else>
            From : {{username}}<br />
            Message:<br />
          <textarea name="" id="" cols="30" rows="3" placeholder="New Message" v-on:keyup.enter="sendMessage"></textarea>
        </div>
        <hr>
        <div class="messages">
            <h3>Messages</h3>
            <div class="message" v-for="(message,index) in messages" :key ="index">
                <strong>{{message.username}}</strong>
                <p>{{message.text}}</p>
            </div>
</div>
    </div>
</template>

<script>
import db from '@/firebase.js'
export default {
  data () {
    return {
      username: '',
      messages: ''
    }
  },
  methods: {
    updateUsername (event) {
      event.preventDefault()
      if (event.target.value) {
        this.username = event.target.value
      }
    },
    sendMessage (event) {
      event.preventDefault()
      const message = {
        username: this.username,
        text: event.target.value
      }
      db.database().ref('messages').push(message)
      event.target.value = ''
    }
  },
  mounted () {
    let vm = this
    const itemsRef = db.database().ref('messages')
    itemsRef.on('value', snapshot => {
      let data = snapshot.val()
      let messages = []
      Object.keys(data).forEach(key => {
        messages.push({
          id: key,
          username: data[key].username,
          text: data[key].text
        })
      })
      vm.messages = messages
    })
  }
}
</script>

<style>

</style>
