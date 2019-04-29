<template>
  <div>
    <Header/>
    <Container/>
    <Footer/>
  </div>
</template>

<script>
  import Header from '@/components/Home/Header';
  import Container from '@/components/Home/Container';
  import Footer from '@/components/Home/Footer';

  export default {
    components: {
      Header,
      Container,
      Footer,
    }
  }
</script>
