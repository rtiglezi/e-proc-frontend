<template>
    <div class="page-title">
        <h1><i v-if="icon" :class="icon"></i> {{ main }}</h1>
        <h2>{{ sub }}</h2>
        <hr>
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['icon', 'main', 'sub']
}
</script>

<style>
    .page-title h1 {
        font-size: 1.2rem;
         margin-left: 5px;
    }

    .page-title h2 {
        color: #777;
        margin-top: 3px;
        margin-left: 30px;
        font-size: 0.9rem;
    }
    
</style>
