<template>

    <table class="table-bordered " style="width: 100%">
        <thead>
            <tr>
                <th>S.No.</th>
                <th v-for="(header, index) in headers" :key="index">{{ header.text }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <td>{{ index + from }}</td>
                <td v-for="(header, index) in headers" :key="index">
                    <template v-if="!header.type">
                        {{ item[header.value] }}
                    </template>
                    <img :src="item[header.value]" alt="" style="width: 50px; height: 50px; object-fit: contain;"
                        v-if="header?.type === 'image'">
                </td>
                
            </tr>
        </tbody>
    </table>


</template>

<style scoped>
table {
    border-collapse: collapse;
}




</style>

<script>
export default {
    props: ["items", "headers", "from"],
    mounted() {
        // console.log('props: ', this.headers);
    }

}
</script>