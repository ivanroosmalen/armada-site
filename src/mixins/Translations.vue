<script>
  import en from '@/translations/en.json'
  import pt from '@/translations/pt.json'
  export default {
    name: 'TranslationsMixin',
    data() {
      return {
        translations: {
          en,
          pt
        }
      }
    },
    computed: {
      language() {
        return this.$store.getters.getLanguage || 'en';
      }
    },
    methods: {
      translate(text, defaultText = '') {
        return this.translations[this.language][text] || defaultText;
      },
      setLanguage(language = 'en') {
        localStorage.locale = language;
        this.$store.commit('setLanguage', language);
      }
    },
    mounted() {
      this.setLanguage(localStorage.locale);
    }
  }
</script>
