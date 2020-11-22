<template>
  <router-link :to="'/users/'+member._id" class="member-wrapper">
    <img :src="member.member.thumbnailImg || defaultImg" class="img" />
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
        defaultImg: 'https://user-images.armadama.com/default/thumbnail.jpg'

      }
    }
  }
</script>

<style scoped lang="scss">
.img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 30px;

  @include sm {
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }

  @include md {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
}

.member-wrapper {
  cursor: pointer;
  color: #2e2d2d;
  text-decoration: none;
  display: grid;
  grid-template-rows: 60px 20px;

  @include sm {
      grid-template-rows: 80px 25px;
  }

  @include md {
      grid-template-rows: 100px 30px;
  }
}

.member-wrapper:hover {
  opacity: 0.5;
}

.member-name {
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
}

</style>
