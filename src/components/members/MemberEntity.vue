<template>
  <router-link :to="'/users/'+member._id" class="member-wrapper">
    <img :src="member.profileImg || defaultImg" class="img" />
    <div class="member-name">{{member.member.alias}}</div>
  </router-link>
</template>

<script>
  export default {
    name: 'Member',
    props: [
      'member'
    ],
    data() {
      return {
        defaultImg: 'https://armada-user-images.s3.amazonaws.com/default/thumbnail.jpg'
      }
    }
  }
</script>

<style scoped>
.img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50px
}

.member-wrapper {
  cursor: pointer;
  color: #2e2d2d;
  text-decoration: none;
  display: grid;
  grid-template-rows: 100px 20px;
}

.member-wrapper:hover {
  opacity: 0.5;
}

.member-name {
  font-size: 15px;
}

</style>
